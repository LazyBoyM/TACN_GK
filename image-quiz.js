// Independent progress for the image processing question bank.
(() => {
  'use strict';
  const KEY='image-processing-quiz-v1';
  const root=document.getElementById('active-card-container');
  const e=escapeHTML,bank=IMAGE_BANK.studyQuestions;
  const BATCH_SIZE=20,fullBatchCount=Math.ceil(bank.length/BATCH_SIZE);
  const TEST_BATCH_SIZE=50;
  const originalBank=IMAGE_BANK.questions;
  const questionsById=new Map(originalBank.map(q=>[q.id,q]));
  // Preserve existing saved test batch IDs after removing the priority set.
  const testStart=12;
  const testBatchCount=Math.ceil(originalBank.length/TEST_BATCH_SIZE);
  const isTestBatch=batch=>batch>=testStart&&batch<testStart+testBatchCount;
  const validBatch=batch=>Number.isInteger(batch)&&batch>=0&&(batch<fullBatchCount||isTestBatch(batch));
  function questionsInBatch(batch) {
    const test=isTestBatch(batch);
    const source=test?originalBank:bank;
    const size=test?TEST_BATCH_SIZE:BATCH_SIZE;
    const start=(test?batch-testStart:batch)*size;
    return source.slice(start,start+size);
  }
  function batchOptions(selected,includeTest=false) {
    const options=(start,count,labelPrefix)=>Array.from({length:count},(_,i)=>{
      const value=start+i;
      const label=`${labelPrefix} ${i+1} · ${questionsInBatch(value).length} câu`;
      return `<option value="${value}" ${value===selected?'selected':''}>${label}</option>`;
    }).join('');
    const test=includeTest?`<optgroup label="Tự kiểm tra 400 câu gốc">${options(testStart,testBatchCount,'Kiểm tra')}</optgroup>`:'';
    return `<optgroup label="${bank.length} câu không trùng">${options(0,fullBatchCount,'Lượt')}</optgroup>${test}`;
  }
  const hasNextBatch=batch=>isTestBatch(batch)?isTestBatch(batch+1):batch+1<fullBatchCount;
  const optionOrders=new Map();
  const optionOrder=q=>optionOrders.get(state.batch)?.get(q.id)||q.options.map((_,index)=>index);
  function shuffleOptions(batch) {
    const orders=new Map();
    for(const q of questionsInBatch(batch)){
      const previous=optionOrder(q),order=[...previous];
      for(let i=order.length-1;i>0;i--){
        const j=Math.floor(Math.random()*(i+1));
        [order[i],order[j]]=[order[j],order[i]];
      }
      if(order.every((index,position)=>index===previous[position]))order.push(order.shift());
      orders.set(q.id,order);
    }
    optionOrders.set(batch,orders);
  }
  let thirdLengthIds=new Set(),visualReady=false,visualSignature='';
  const visualWidths=new Map();
  function measureVisualLengths() {
    if(!active())return;
    const probe=document.createElement('button');
    probe.className='image-option';probe.style.cssText='position:fixed;left:-10000px;visibility:hidden';
    document.body.append(probe);
    const style=getComputedStyle(probe),context=document.createElement('canvas').getContext('2d');
    context.font=style.font;
    if('letterSpacing' in context)context.letterSpacing=style.letterSpacing==='normal'?'0px':style.letterSpacing;
    const measurements=bank.map(q=>q.options.map(option=>context.measureText(option.replace(/\s+/g,' ').trim()).width));
    probe.remove();
    const signature=JSON.stringify(measurements);
    if(signature===visualSignature)return;
    visualSignature=signature;thirdLengthIds=new Set();
    bank.forEach((q,index)=>{
      const widths=measurements[index],correct=widths[q.answer];visualWidths.set(q.id,widths);
      // Count from shortest to longest; near-identical widths are treated as tied.
      if(widths.filter(width=>width<correct-.5).length===2&&widths.filter(width=>Math.abs(width-correct)<=.5).length===1)thirdLengthIds.add(q.id);
    });
    visualReady=true;resetQueue();render();
  }
  function visualLengthDetails(q) {
    const widths=visualWidths.get(q.id);if(!widths)return '';
    const order=optionOrder(q).map((original,index)=>({width:widths[original],index})).sort((a,b)=>a.width-b.width);
    return `<details class="image-reference"><summary>So độ dài nhìn thấy</summary><p>${order.map(item=>`${'ABCD'[item.index]} (${item.width.toFixed(1)} px)`).join(' → ')}</p><p>Ngắn → dài, đo theo font hiện tại trước khi xuống dòng.</p></details>`;
  }
  let state={questionId:1,answers:{},testAnswers:{},filter:'all',topic:'all',batch:0,lengthRule:'skip',deduplicated:true,batchSize:BATCH_SIZE,testBatchSize:TEST_BATCH_SIZE};
  const currentAnswers=()=>isTestBatch(state.batch)?state.testAnswers:state.answers;
  let storageError=false;
  try {
    const raw=JSON.parse(localStorage.getItem(KEY));
    if(raw&&typeof raw==='object') {
      const savedQuestion=questionsById.get(raw.questionId);
      // Accept a saved test position from either the 20- or 50-question layout.
      const savedTestSize=raw.testBatchSize||raw.batchSize||TEST_BATCH_SIZE;
      const savedTest=Number.isInteger(raw.batch)&&raw.batch>=testStart&&raw.batch<testStart+Math.ceil(originalBank.length/savedTestSize);
      const current=savedTest?savedQuestion:imageQuestionsByExplanation.get(savedQuestion?.explanation);
      if(current)state.questionId=current.id;
      if(savedTest){
        const start=(raw.batch-testStart)*savedTestSize;
        const index=originalBank.indexOf(current);
        state.batch=testStart+Math.floor((index>=start&&index<start+savedTestSize?index:start)/TEST_BATCH_SIZE);
      }else if(validBatch(raw.batch)&&raw.batchSize===BATCH_SIZE)state.batch=raw.batch;
      else if(current)state.batch=Math.floor(bank.indexOf(current)/BATCH_SIZE);
      if(['all','wrong','unanswered'].includes(raw.filter))state.filter=raw.filter;
      if(bank.some(q=>q.topic===raw.topic))state.topic=raw.topic;
      if(['all','skip','only'].includes(raw.lengthRule))state.lengthRule=raw.lengthRule;
      for(const key of ['answers','testAnswers']){
        const answers=raw[key];
        if(!answers||typeof answers!=='object'||Array.isArray(answers))continue;
        for(const [id,value] of Object.entries(answers)){
          if(questionsById.has(Number(id))&&Number.isInteger(value)&&value>=0&&value<4)state[key][id]=value;
        }
      }
    }
  } catch {}
  const topics=[...new Set(bank.map(q=>q.topic))];
  const keywordKey='image-keyword-study-v1',keywordGroups=[];
  const keywordHints={
    'Ảnh màu RGB':['Đỏ – lục – lam · phối màu cộng','RGB là ba kênh màu; không phải nội suy màu từ cảm biến.'],
    'Lọc trung bình':['Trung bình vùng lân cận → làm mượt','Trung bình là tính tổng rồi chia; trung vị là lấy giá trị giữa.'],
    'Lọc trung vị':['Giá trị giữa → khử nhiễu muối tiêu','Trung vị không phải trung bình cộng.'],
    'Nhiễu muối tiêu':['Điểm sáng, tối rải rác','Nhớ hạt muối trắng, hạt tiêu đen.'],
    'KNN':['K hàng xóm → bỏ phiếu','KNN phân lớp; K-means gom cụm và cập nhật tâm.'],
    'K-means':['K cụm → cập nhật tâm','Means là trung bình: tâm cụm là trung bình các mẫu.'],
    'Huffman':['Xuất hiện nhiều → mã ngắn','Nhớ: hay gặp thì viết ngắn.'],
    'LZW':['Nén bằng từ điển','Phân biệt RLE đếm chuỗi lặp; Huffman dùng mã theo tần suất.'],
    'RLE':['Đếm số lần lặp liên tiếp','Ví dụ AAAA → 4A.'],
    'Tăng độ sáng':['Cộng hằng số dương','Sáng hơn → cộng thêm vào mức xám.'],
    'Phép co':['Thu nhỏ vùng sáng','Co lại; đối chiếu phép giãn mở rộng vùng sáng.'],
    'Cân bằng histogram':['Phân bố lại mức xám → tăng tương phản','Không đồng nghĩa với cộng cùng một số vào mọi điểm ảnh.']
  };
  bank.forEach(q=>{
    const split=q.explanation.indexOf(':'),name=split>0?q.explanation.slice(0,split).trim():q.topic;
    keywordGroups.push({id:q.id,name,prompt:q.prompt,answer:q.options[q.answer],caution:q.caution,explanation:q.explanation,meaning:split>0?q.explanation.slice(split+1).trim():q.explanation});
  });
  let keywordProgress={};
  try {const raw=JSON.parse(localStorage.getItem(keywordKey));if(raw&&typeof raw==='object'&&!Array.isArray(raw))keywordProgress=raw;}catch{}
  let studyMode='quiz',keywordBatch=0,keywordIndex=0,keywordReveal=false,keywordReview=false;
  const keywordsById=new Map(keywordGroups.map(group=>[group.id,group]));
  const promptCues={
    191:'tham gia tích cực trong giờ giảng',
    192:'tích lũy và cập nhật kiến thức',
    193:'thực hiện nhiệm vụ được giao',
    194:'tự đánh giá việc học',
    368:'giá trị trung bình của các đối tượng đang được gán vào cụm',
    373:'Bản đồ tự tổ chức'
  };
  const shortKeywords={
    'Nhiễu ngẫu nhiên':'Không rõ quy luật → dùng phép lọc',
    'Tăng số mức xám':'Nội suy mức xám trung gian → ảnh mịn hơn',
    'Ảnh số':'Số hóa → ma trận điểm ảnh',
    'Nén không bảo toàn thông tin':'Nén cao hơn → ảnh khôi phục có thể khác ảnh gốc',
    'Mô hình HSV':'Sắc độ · độ bão hòa · giá trị sáng'
  };
  const answerCues={
    1:['không rõ quy luật','phép lọc'],
    2:['Nội suy các mức xám trung gian','tăng độ mịn'],
    3:['ma trận các điểm ảnh'],
    4:['nén cao hơn','không hoàn toàn giống ảnh gốc'],
    6:['đỏ, xanh lá và xanh dương','phối màu cộng'],
    8:['sắc độ, độ bão hòa và giá trị sáng'],
    9:['bitmap','cấu trúc điểm ảnh'],
    10:['cộng các thành phần ánh sáng'],
    11:['hấp thụ bớt thành phần ánh sáng'],
    12:['thu nhận trực tiếp','mức xử lý tối thiểu'],
    13:['Camera và scanner'],
    14:['các vị trí rời rạc'],
    15:['các đối tượng hình học','không bị vỡ hình'],
    16:['một cảm biến','cần nội suy'],
    17:['ba cảm biến riêng'],
    19:['nhiều kiểu mã hóa và nhiều kiểu màu'],
    21:['giá trị trung bình của vùng lân cận'],
    22:['Ước lượng ảnh gốc','mô hình suy hao và nhiễu'],
    23:['hình dạng và cấu trúc'],
    25:['giảm sai số trung bình bình phương'],
    26:['Cộng một hằng số dương'],
    27:['Phân bố lại mức xám','cải thiện độ tương phản'],
    28:['Mở rộng dải mức xám'],
    30:['trung bình trên k giá trị','mức xám gần với điểm đang xét'],
    31:['rất sáng hoặc rất tối rải rác'],
    33:['bù trực tiếp hàm suy hao','miền tần số'],
    36:['hiệu giữa ảnh đã giãn và ảnh đã co'],
    38:['hai ngưỡng','biên mạnh, biên yếu'],
    39:['hiệu giữa ảnh gốc và ảnh sau phép co'],
    40:['biến thiên mức xám','đạo hàm'],
    41:['xấp xỉ đạo hàm theo hai hướng'],
    42:['trọng số lớn hơn ở hàng hoặc cột giữa'],
    43:['nhiều bước','biên mảnh và liên tục'],
    44:['co vùng đối tượng','loại bỏ chi tiết nhỏ'],
    45:['giãn ảnh rồi co ảnh'],
    46:['chi tiết mịn và điểm cô lập','nhạy với nhiễu'],
    48:['Mẫu hình học'],
    50:['Đạo hàm bậc nhất','sự thay đổi mức xám'],
    51:['sự sắp xếp và biến thiên cục bộ của mức xám'],
    52:['vùng đối tượng và nền','ngưỡng mức xám'],
    53:['Giảm dao động','histogram'],
    54:['tính đối xứng','mức xám thuộc nền'],
    55:['Ghép các vùng lân cận','tiêu chuẩn đồng nhất'],
    56:['đặc trưng texture'],
    57:['hai nhóm mức xám','nền và đối tượng'],
    58:['lân cận của điểm ảnh'],
    60:['cập nhật ngưỡng cho đến khi ổn định'],
    61:['thư viện mẫu chuẩn đã biết'],
    62:['vector nhiều chiều','mỗi chiều là một đặc trưng'],
    63:['K cụm','tâm gần nhất và cập nhật tâm'],
    64:['lớp chiếm đa số','K mẫu gần nhất'],
    65:['liên kết đầy đủ','tự kết hợp để hồi tưởng mẫu'],
    66:['từ tần số thấp đến cao'],
    67:['nhiều mức kích thước','low-pass','high-pass'],
    68:['không thu được hoàn toàn dữ liệu gốc','tỷ lệ nén cao hơn'],
    69:['Biến đổi ảnh sang miền khác'],
    70:['ghép hai nút có xác suất nhỏ nhất'],
    71:['mở rộng từ điển các chuỗi','không cần truyền từ điển hoàn chỉnh'],
    72:['loại bỏ hoặc biểu diễn hiệu quả hơn'],
    73:['cấu trúc và mô hình ảnh ở mức cao hơn'],
    74:['thay đổi của thống kê dữ liệu'],
    75:['4096 phần tử','12 bit'],
    191:['chủ động trao đổi'],
    192:['thường xuyên bổ sung kiến thức mới'],
    193:['đúng phạm vi và thời điểm'],
    194:['kiểm tra lại mức độ hiểu bài','nội dung cần bổ sung'],
    207:['lớp đã xác định','mẫu chuẩn'],
    213:['không làm mất thông tin gốc'],
    233:['CMY','thành phần đen'],
    257:['ngưỡng dựa trên đặc trưng phân bố mức xám'],
    261:['trung vị','nhiễu xung'],
    275:['Cộng một hằng số âm'],
    289:['Nhóm các mức xám gần nhau'],
    339:['Chia một vùng chưa đồng nhất'],
    363:['tách và gộp lớp'],
    367:['bảo toàn tương đối quan hệ lân cận'],
    373:['bảo toàn tương đối quan hệ lân cận'],
    375:['mở rộng động','các chuỗi mới'],
    377:['Tỷ số','trước nén','sau nén'],
    379:['các khối dữ liệu','các từ mã tương ứng'],
    383:['chỉ khác nhau một bit'],
    385:['kết thúc từ điển hiện tại','bắt đầu lại từ điển mới'],
    395:['khôi phục chính xác dữ liệu gốc'],
    399:['lặp liên tiếp','độ dài loạt']
  };
  function highlightCues(value,cues) {
    let end=0,html='';
    const lower=value.toLowerCase();
    for(const cue of cues){
      const start=lower.indexOf(cue.toLowerCase(),end);
      if(start<0)continue;
      html+=e(value.slice(end,start))+'<mark class="image-cue">'+e(value.slice(start,start+cue.length))+'</mark>';
      end=start+cue.length;
    }
    return html+e(value.slice(end));
  }
  function wrongAnswerCue(q) {
    const split=q.explanation.indexOf(':');
    const name=split>0?q.explanation.slice(0,split).trim():'';
    const meaning=q.explanation.slice(split+1).trim().replace(/\.$/,'');
    const cue=promptCues[q.id]||(name&&q.prompt.includes(name)?name:meaning);
    const keyword=name&&cue===meaning?name:keywordHints[name]?.[0]||shortKeywords[name]||meaning;
    const answer=q.options[q.answer];
    return {prompt:highlightCues(q.prompt,[cue]),answer:highlightCues(answer,answerCues[q.id]||[answer]),keyword};
  }
  const keywordList=()=>keywordReview?keywordGroups.filter(group=>keywordProgress[group.id]?.due<=Date.now()):questionsInBatch(keywordBatch).map(q=>keywordsById.get(q.id));
  function renderKeywords() {
    const items=keywordList(),group=items[keywordIndex],hint=group&&keywordHints[group.name];
    root.innerHTML=`<div class="pm-app image-quiz"><div class="image-toolbar"><button class="btn-quiet" data-image-mode="quiz">← Trắc nghiệm</button><button class="btn-quiet" data-keyword-action="review" aria-pressed="${keywordReview}">${keywordReview?'Tất cả từ khóa':'Ôn đến hạn'}</button></div>
      <label><span class="pm-sr-only">Lượt 20 câu</span><select data-keyword-batch>${batchOptions(keywordBatch)}</select></label>
      <p class="image-progress">${keywordReview?`${items.length} câu đến hạn`:`${bank.length} câu không trùng`} · Mỗi câu một thẻ từ khóa<span>Đáp án tham khảo</span></p>
      ${group?`<section class="image-question image-keyword-card" data-keyword-id="${group.id}"><p>Câu ${group.id} · ${keywordIndex+1}/${items.length}</p><h2>${e(group.prompt)}</h2><p>Tự nhớ ý chính trước khi mở.</p>
      ${keywordReveal?`<div class="image-feedback" role="status"><strong>${e(hint?.[0]||group.meaning)}</strong>${hint?`<p>${e(hint[1])}</p>`:''}<details class="image-reference"><summary>Xem đáp án và giải thích</summary><p>Đáp án tham khảo: ${e(group.answer)}</p><p>${e(group.explanation)}</p></details>${group.caution?`<p class="pm-note">${e(group.caution)}</p>`:''}</div><div class="image-toolbar"><button class="btn-quiet" data-keyword-action="again">Ôn lại · 10 phút</button><button class="btn-primary" data-keyword-action="remember">Đã nhớ · mai ôn</button></div>`:'<button class="btn-primary" data-keyword-action="reveal">Hiện từ khóa</button>'}</section>
      <nav class="pm-reading-nav" aria-label="Chuyển từ khóa"><button class="btn-quiet" data-keyword-action="previous" ${keywordIndex===0?'disabled':''}>← Trước</button><button class="btn-quiet" data-keyword-action="next" ${keywordIndex===items.length-1?'disabled':''}>Tiếp →</button></nav>`:'<p class="pm-empty" role="status">Chưa có từ khóa đến hạn. Chọn một lượt để học tiếp.</p>'}
      ${storageError?'<p class="pm-error" role="status">Không lưu được lịch ôn. Hãy giữ trang đang mở.</p>':''}</div>`;
  }
  const active=()=>document.body.dataset.subject==='image';
  const batchQuestions=()=>questionsInBatch(state.batch).filter(q=>state.batch>=fullBatchCount||!visualReady||state.lengthRule==='all'||(state.lengthRule==='skip'?!thirdLengthIds.has(q.id):thirdLengthIds.has(q.id)));
  const list=()=>{
    const answers=currentAnswers();
    return batchQuestions().filter(q=>(state.topic==='all'||q.topic===state.topic)&&(state.filter==='all'||(state.filter==='wrong'?answers[q.id]!==undefined&&answers[q.id]!==q.answer:answers[q.id]===undefined)));
  };
  // Keep a stable queue until a filter changes; answering must not move a question away.
  let queue=[];
  let showTestResult=false;
  function save() {
    try {localStorage.setItem(KEY,JSON.stringify(state));storageError=false;}
    catch {storageError=true;}
  }
  function resetQueue(restart=false) {
    queue=list();
    if(restart||!queue.some(q=>q.id===state.questionId))state.questionId=queue[0]?.id||1;
    save();
  }
  function render() {
    if(!active())return;
    if(studyMode==='keywords'){renderKeywords();return;}
    const q=queue.find(q=>q.id===state.questionId),index=queue.indexOf(q);
    const answers=currentAnswers();
    const batch=batchQuestions(),answered=batch.filter(q=>answers[q.id]!==undefined).length,correct=batch.filter(q=>answers[q.id]===q.answer).length;
    const selected=q?answers[q.id]:undefined;
    const correction=selected!==undefined&&selected!==q.answer?wrongAnswerCue(q):null;
    const order=q?optionOrder(q):[];
    const testing=isTestBatch(state.batch),finished=answered===batch.length;
    root.innerHTML=`<div class="pm-app image-quiz">
      <button class="btn-quiet" data-image-mode="keywords">Học từ khóa →</button>
      <label><span class="pm-sr-only">Chọn lượt câu hỏi</span><select data-image-field="batch">${batchOptions(state.batch,true)}</select></label>
      <button class="btn-quiet" data-image-action="shuffle" ${batch.length===0?'disabled':''}>Trộn đáp án và làm lại</button>
      ${state.batch>=fullBatchCount?'':`<label><span class="pm-sr-only">Độ dài hiển thị, xếp từ ngắn đến dài</span><select data-image-field="lengthRule" ${visualReady?'':'disabled'}>${[['skip',visualReady?`Ôn ${bank.length-thirdLengthIds.size} câu · Bỏ nhóm thứ 3`:'Đang đo độ dài hiển thị…'],['only',`Chỉ ${thirdLengthIds.size} câu · Ngắn → dài, thứ 3`],['all',`Đủ ${bank.length} câu`]].map(([value,label])=>`<option value="${value}" ${value===state.lengthRule?'selected':''}>${label}</option>`).join('')}</select></label>`}
      <div class="image-toolbar"><label><span class="pm-sr-only">Lọc câu hỏi</span><select data-image-field="filter">${[['all','Tất cả câu'],['unanswered','Chưa làm'],['wrong','Câu sai']].map(([value,label])=>`<option value="${value}" ${value===state.filter?'selected':''}>${label}</option>`).join('')}</select></label><label><span class="pm-sr-only">Chủ đề</span><select data-image-field="topic"><option value="all">Tất cả chủ đề</option>${topics.map(topic=>`<option ${topic===state.topic?'selected':''}>${e(topic)}</option>`).join('')}</select></label></div>
      <p class="image-progress">Đã làm ${answered}/${batch.length} · Đúng ${correct}<span>Đáp án tham khảo</span></p>
      ${testing?`<button class="btn-quiet" data-image-action="grade" ${answered===0?'disabled':''}>Chấm kết quả</button>
      ${showTestResult||finished?`<div class="image-feedback" data-image-result role="status" tabindex="-1"><strong>Kết quả lượt ${state.batch-testStart+1} · ${correct}/${batch.length} điểm</strong><p>Đúng ${correct} · Sai ${answered-correct} · Chưa làm ${batch.length-answered}</p></div>`:''}`:''}
      ${storageError?'<p class="pm-error" role="status">Không lưu được tiến độ. Hãy giữ trang đang mở.</p>':''}
      ${q?`<label class="image-jump"><span class="pm-sr-only">Chọn câu</span><select data-image-field="question">${queue.map(item=>`<option value="${item.id}" ${item.id===q.id?'selected':''}>Câu ${item.id}</option>`).join('')}</select><span>${index+1}/${queue.length}</span></label>
      <section class="image-question" aria-label="Câu ${q.id}"><h2>${correction?.prompt||e(q.prompt)}</h2><div class="image-options">${order.map((original,position)=>`<button type="button" data-image-answer="${position}" aria-pressed="${selected===original}" ${selected!==undefined?'disabled':''} class="image-option ${selected!==undefined&&original===q.answer?'is-correct':''} ${selected===original&&original!==q.answer?'is-wrong':''}"><span class="image-letter">${'ABCD'[position]}</span><span>${correction&&original===q.answer?correction.answer:e(q.options[original])}</span>${selected!==undefined&&original===q.answer?'<strong class="image-verdict">Đúng</strong>':selected===original?'<strong class="image-verdict">Bạn chọn</strong>':''}</button>`).join('')}</div>
      ${visualLengthDetails(q)}${selected!==undefined?`<div class="image-feedback" role="status"><strong>${selected===q.answer?'Đúng':'Chưa đúng · Đáp án '+ 'ABCD'[order.indexOf(q.answer)]}</strong>${correction?`<p>Từ khóa cần nhớ: <mark class="image-cue">${e(correction.keyword)}</mark></p>`:''}<p>${e(q.explanation)}</p>${q.caution?`<p class="pm-note">${e(q.caution)}</p>`:''}<button class="btn-quiet" type="button" data-image-action="retry">Làm lại câu này</button></div>`:''}</section>
      <nav class="pm-reading-nav" aria-label="Chuyển câu"><button class="btn-quiet" type="button" data-image-move="-1" ${index===0?'disabled':''}>← Trước</button><span>${index+1}/${queue.length}</span><button class="btn-primary" type="button" data-image-move="1" ${index===queue.length-1?'disabled':''}>Tiếp →</button></nav>`:'<p class="pm-empty" role="status">Không có câu phù hợp. Chọn bộ lọc khác để tiếp tục.</p>'}
      ${(index===queue.length-1||!q)&&hasNextBatch(state.batch)?'<button class="btn-quiet" type="button" data-image-action="next-batch">Lượt tiếp theo →</button>':''}
      <details class="image-reference"><summary>Về đáp án</summary><p>Đáp án do trợ lý suy luận từ nội dung câu hỏi, chưa phải đáp án chính thức của giảng viên.</p>${IMAGE_BANK.sources.map(source=>`<p><a href="${e(source.url)}" target="_blank" rel="noopener noreferrer">${e(source.title)}</a></p>`).join('')}</details>
      <details class="image-reference"><summary>Cách lọc theo độ dài</summary><p>Đo chiều ngang chữ bằng font đang hiển thị, trước khi xuống dòng; xếp từ ngắn đến dài. Chỉ lọc câu có đáp án tham khảo đứng thứ 3; chênh lệch không quá 0,5 px được tính đồng hạng. Số câu có thể đổi nếu thiết bị dùng font khác. Đây không phải quy luật chọn đáp án đúng.</p></details>
    </div>`;
  }
  function move(step) {
    const index=queue.findIndex(q=>q.id===state.questionId),next=queue[index+step];
    if(!next)return;
    state.questionId=next.id;save();render();root.querySelector('.image-question h2')?.scrollIntoView({block:'nearest'});
  }
  function answer(position) {
    const q=queue.find(q=>q.id===state.questionId);
    const answers=currentAnswers();
    if(!q||answers[q.id]!==undefined||!Number.isInteger(position)||position<0||position>=q.options.length)return;
    const value=optionOrder(q)[position];
    showTestResult=false;
    answers[q.id]=value;save();render();
    window.studyCompanion?.react({correct:value===q.answer,source:'image',complete:state.filter==='all'&&batchQuestions().every(item=>answers[item.id]!==undefined)});
  }
  root.addEventListener('click',event=>{
    if(!active())return;
    const button=event.target.closest('button');if(!button||button.disabled)return;
    if(button.dataset.imageMode){
      studyMode=button.dataset.imageMode;
      if(studyMode==='quiz')resetQueue();
      render();return;
    }
    if(button.dataset.keywordAction){
      const action=button.dataset.keywordAction,items=keywordList(),group=items[keywordIndex];
      if(action==='reveal')keywordReveal=true;
      if(action==='review'){keywordReview=!keywordReview;keywordIndex=0;keywordReveal=false;}
      if(action==='previous'||action==='next'){keywordIndex+=action==='next'?1:-1;keywordReveal=false;}
      if(group&&keywordReveal&&(action==='again'||action==='remember')){
        keywordProgress[group.id]={due:Date.now()+(action==='again'?10*60*1000:24*60*60*1000)};
        try{localStorage.setItem(keywordKey,JSON.stringify(keywordProgress));storageError=false;}catch{storageError=true;}
        keywordIndex=keywordReview?Math.min(keywordIndex,keywordList().length-1):Math.min(keywordIndex+1,items.length-1);
        keywordIndex=Math.max(0,keywordIndex);keywordReveal=false;
      }
      render();return;
    }
    if(button.dataset.imageAnswer!==undefined)answer(Number(button.dataset.imageAnswer));
    if(button.dataset.imageAction==='grade'&&isTestBatch(state.batch)){
      showTestResult=true;render();root.querySelector('[data-image-result]')?.focus();
    }
    if(button.dataset.imageAction==='shuffle'){
      showTestResult=false;
      shuffleOptions(state.batch);
      const answers=currentAnswers();
      for(const q of questionsInBatch(state.batch))delete answers[q.id];
      if(state.filter==='wrong')state.filter='all';
      resetQueue(true);render();
    }
    if(button.dataset.imageMove)move(Number(button.dataset.imageMove));
    if(button.dataset.imageAction==='retry'){showTestResult=false;delete currentAnswers()[state.questionId];save();render();}
    if(button.dataset.imageAction==='next-batch'&&hasNextBatch(state.batch)){showTestResult=false;state.batch++;resetQueue();render();}
  });
  root.addEventListener('change',event=>{
    if(!active())return;
    const field=event.target.dataset.imageField,value=event.target.value;
    if(event.target.matches('[data-keyword-batch]')){keywordBatch=Number(value);keywordIndex=0;keywordReview=false;keywordReveal=false;render();return;}
    if(field==='lengthRule'&&['all','skip','only'].includes(value)){state.lengthRule=value;resetQueue();}
    if(field==='batch'&&validBatch(Number(value))){
      showTestResult=false;
      if(isTestBatch(Number(value))!==isTestBatch(state.batch)){state.filter='all';state.topic='all';}
      state.batch=Number(value);resetQueue();
    }
    if(field==='question'&&queue.some(q=>q.id===Number(value)))state.questionId=Number(value);
    if(field==='filter'&&['all','wrong','unanswered'].includes(value)){state.filter=value;resetQueue();}
    if(field==='topic'&&(value==='all'||topics.includes(value))){state.topic=value;resetQueue();}
    save();render();
  });
  window.addEventListener('keydown',event=>{
    if(!active()||event.ctrlKey||event.metaKey||event.altKey)return;
    if(event.key==='Escape'){window.studyCompanion?.dismiss();return;}
    event.stopImmediatePropagation();
    if(studyMode==='keywords')return;
    if(event.target.matches('input,textarea,select,button,a,summary')||event.target.isContentEditable)return;
    if(/^[1-4a-d]$/i.test(event.key)){event.preventDefault();answer(/^[1-4]$/.test(event.key)?Number(event.key)-1:event.key.toUpperCase().charCodeAt(0)-65);}
    if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowLeft'?-1:1);}
  },true);
  window.ImageQuiz={open(){
    // Commit focus changes before replacing a previous subject's active form.
    if(root.contains(document.activeElement))document.activeElement.blur();
    resetQueue();render();
    document.fonts.ready.then(measureVisualLengths);
  }};
  document.fonts.addEventListener('loadingdone',measureVisualLengths);
})();
