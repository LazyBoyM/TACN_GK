// Independent progress for the image processing question bank.
(() => {
  'use strict';
  const KEY='image-processing-quiz-v1';
  const root=document.getElementById('active-card-container');
  const e=escapeHTML,bank=IMAGE_BANK.questions;
  const BATCH_SIZE=50,batchCount=Math.ceil(bank.length/BATCH_SIZE);
  const batchOrders=new Map();
  function orderedBatch(items,batch) {
    const order=batchOrders.get(batch);
    return order?[...items].sort((a,b)=>order.indexOf(a.id)-order.indexOf(b.id)):items;
  }
  function shuffleBatch(batch) {
    const ids=bank.slice(batch*BATCH_SIZE,(batch+1)*BATCH_SIZE).map(q=>q.id),previous=batchOrders.get(batch)||[...ids];
    for(let i=ids.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[ids[i],ids[j]]=[ids[j],ids[i]];}
    if(ids.every((id,index)=>id===previous[index]))ids.push(ids.shift());
    batchOrders.set(batch,ids);
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
    const order=widths.map((width,index)=>({width,index})).sort((a,b)=>a.width-b.width);
    return `<details class="image-reference"><summary>So độ dài nhìn thấy</summary><p>${order.map(item=>`${'ABCD'[item.index]} (${item.width.toFixed(1)} px)`).join(' → ')}</p><p>Ngắn → dài, đo theo font hiện tại trước khi xuống dòng.</p></details>`;
  }
  let state={questionId:1,answers:{},filter:'all',topic:'all',batch:0,lengthRule:'skip'};
  let storageError=false;
  try {
    const raw=JSON.parse(localStorage.getItem(KEY));
    if(raw&&typeof raw==='object') {
      if(bank.some(q=>q.id===raw.questionId))state.questionId=raw.questionId;
      state.batch=Number.isInteger(raw.batch)&&raw.batch>=0&&raw.batch<batchCount?raw.batch:Math.floor((state.questionId-1)/BATCH_SIZE);
      if(['all','wrong','unanswered'].includes(raw.filter))state.filter=raw.filter;
      if(bank.some(q=>q.topic===raw.topic))state.topic=raw.topic;
      if(['all','skip','only'].includes(raw.lengthRule))state.lengthRule=raw.lengthRule;
      if(raw.answers&&typeof raw.answers==='object'&&!Array.isArray(raw.answers))for(const [id,value] of Object.entries(raw.answers)) {
        if(bank.some(q=>String(q.id)===id)&&Number.isInteger(value)&&value>=0&&value<4)state.answers[id]=value;
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
  const keywordList=()=>keywordReview?keywordGroups.filter(group=>keywordProgress[group.id]?.due<=Date.now()):orderedBatch(keywordGroups.slice(keywordBatch*BATCH_SIZE,(keywordBatch+1)*BATCH_SIZE),keywordBatch);
  function renderKeywords() {
    const items=keywordList(),group=items[keywordIndex],hint=group&&keywordHints[group.name];
    root.innerHTML=`<div class="pm-app image-quiz"><div class="image-toolbar"><button class="btn-quiet" data-image-mode="quiz">← Trắc nghiệm</button><button class="btn-quiet" data-keyword-action="review" aria-pressed="${keywordReview}">${keywordReview?'Tất cả từ khóa':'Ôn đến hạn'}</button></div>
      <label><span class="pm-sr-only">Lượt 50 câu</span><select data-keyword-batch>${Array.from({length:batchCount},(_,i)=>`<option value="${i}" ${i===keywordBatch?'selected':''}>Lượt ${i+1} · Câu ${i*BATCH_SIZE+1}–${Math.min((i+1)*BATCH_SIZE,keywordGroups.length)}</option>`).join('')}</select></label>
      ${keywordReview?'':'<button class="btn-quiet" data-keyword-action="shuffle">Trộn 50 câu</button>'}
      <p class="image-progress">${keywordGroups.length} câu · Mỗi câu một thẻ từ khóa<span>Đáp án tham khảo</span></p>
      ${group?`<section class="image-question image-keyword-card" data-keyword-id="${group.id}"><p>Câu ${group.id} · ${keywordIndex+1}/${items.length}</p><h2>${e(group.prompt)}</h2><p>Tự nhớ ý chính trước khi mở.</p>
      ${keywordReveal?`<div class="image-feedback" role="status"><strong>${e(hint?.[0]||group.meaning)}</strong>${hint?`<p>${e(hint[1])}</p>`:''}<details class="image-reference"><summary>Xem đáp án và giải thích</summary><p>Đáp án tham khảo: ${e(group.answer)}</p><p>${e(group.explanation)}</p></details>${group.caution?`<p class="pm-note">${e(group.caution)}</p>`:''}</div><div class="image-toolbar"><button class="btn-quiet" data-keyword-action="again">Ôn lại · 10 phút</button><button class="btn-primary" data-keyword-action="remember">Đã nhớ · mai ôn</button></div>`:'<button class="btn-primary" data-keyword-action="reveal">Hiện từ khóa</button>'}</section>
      <nav class="pm-reading-nav" aria-label="Chuyển từ khóa"><button class="btn-quiet" data-keyword-action="previous" ${keywordIndex===0?'disabled':''}>← Trước</button><button class="btn-quiet" data-keyword-action="next" ${keywordIndex===items.length-1?'disabled':''}>Tiếp →</button></nav>`:'<p class="pm-empty" role="status">Chưa có từ khóa đến hạn. Chọn một lượt để học tiếp.</p>'}
      ${storageError?'<p class="pm-error" role="status">Không lưu được lịch ôn. Hãy giữ trang đang mở.</p>':''}</div>`;
  }
  const active=()=>document.body.dataset.subject==='image';
  const batchQuestions=()=>bank.slice(state.batch*BATCH_SIZE,(state.batch+1)*BATCH_SIZE).filter(q=>!visualReady||state.lengthRule==='all'||(state.lengthRule==='skip'?!thirdLengthIds.has(q.id):thirdLengthIds.has(q.id)));
  const list=()=>orderedBatch(batchQuestions().filter(q=>(state.topic==='all'||q.topic===state.topic)&&(state.filter==='all'||(state.filter==='wrong'?state.answers[q.id]!==undefined&&state.answers[q.id]!==q.answer:state.answers[q.id]===undefined))),state.batch);
  // Keep a stable queue until a filter changes; answering must not move a question away.
  let queue=[];
  function save() {
    try {localStorage.setItem(KEY,JSON.stringify(state));storageError=false;}
    catch {storageError=true;}
  }
  function resetQueue() {queue=list();if(!queue.some(q=>q.id===state.questionId))state.questionId=queue[0]?.id||1;save();}
  function render() {
    if(!active())return;
    if(studyMode==='keywords'){renderKeywords();return;}
    const q=queue.find(q=>q.id===state.questionId),index=queue.indexOf(q);
    const batch=batchQuestions(),answered=batch.filter(q=>state.answers[q.id]!==undefined).length,correct=batch.filter(q=>state.answers[q.id]===q.answer).length;
    const selected=q?state.answers[q.id]:undefined;
    root.innerHTML=`<div class="pm-app image-quiz">
      <button class="btn-quiet" data-image-mode="keywords">Học từ khóa →</button>
      <label><span class="pm-sr-only">Chọn lượt 50 câu</span><select data-image-field="batch">${Array.from({length:batchCount},(_,i)=>`<option value="${i}" ${i===state.batch?'selected':''}>Lượt ${i+1} · Câu ${i*BATCH_SIZE+1}–${Math.min((i+1)*BATCH_SIZE,bank.length)}</option>`).join('')}</select></label>
      <button class="btn-quiet" data-image-action="shuffle" ${queue.length<2?'disabled':''}>Trộn 50 câu</button>
      <label><span class="pm-sr-only">Độ dài hiển thị, xếp từ ngắn đến dài</span><select data-image-field="lengthRule" ${visualReady?'':'disabled'}>${[['skip',visualReady?`Ôn ${bank.length-thirdLengthIds.size} câu · Bỏ nhóm thứ 3`:'Đang đo độ dài hiển thị…'],['only',`Chỉ ${thirdLengthIds.size} câu · Ngắn → dài, thứ 3`],['all','Đủ 400 câu']].map(([value,label])=>`<option value="${value}" ${value===state.lengthRule?'selected':''}>${label}</option>`).join('')}</select></label>
      <div class="image-toolbar"><label><span class="pm-sr-only">Lọc câu hỏi</span><select data-image-field="filter">${[['all','Tất cả câu'],['unanswered','Chưa làm'],['wrong','Câu sai']].map(([value,label])=>`<option value="${value}" ${value===state.filter?'selected':''}>${label}</option>`).join('')}</select></label><label><span class="pm-sr-only">Chủ đề</span><select data-image-field="topic"><option value="all">Tất cả chủ đề</option>${topics.map(topic=>`<option ${topic===state.topic?'selected':''}>${e(topic)}</option>`).join('')}</select></label></div>
      <p class="image-progress">Đã làm ${answered}/${batch.length} · Đúng ${correct}<span>Đáp án tham khảo</span></p>
      ${storageError?'<p class="pm-error" role="status">Không lưu được tiến độ. Hãy giữ trang đang mở.</p>':''}
      ${q?`<label class="image-jump"><span class="pm-sr-only">Chọn câu</span><select data-image-field="question">${queue.map(item=>`<option value="${item.id}" ${item.id===q.id?'selected':''}>Câu ${item.id}</option>`).join('')}</select><span>${index+1}/${queue.length}</span></label>
      <section class="image-question" aria-label="Câu ${q.id}"><h2>${e(q.prompt)}</h2><div class="image-options">${q.options.map((option,i)=>`<button type="button" data-image-answer="${i}" aria-pressed="${selected===i}" ${selected!==undefined?'disabled':''} class="image-option ${selected!==undefined&&i===q.answer?'is-correct':''} ${selected===i&&i!==q.answer?'is-wrong':''}"><span class="image-letter">${'ABCD'[i]}</span><span>${e(option)}</span>${selected!==undefined&&i===q.answer?'<strong class="image-verdict">Đúng</strong>':selected===i?'<strong class="image-verdict">Bạn chọn</strong>':''}</button>`).join('')}</div>
      ${visualLengthDetails(q)}${selected!==undefined?`<div class="image-feedback" role="status"><strong>${selected===q.answer?'Đúng':'Chưa đúng · Đáp án '+ 'ABCD'[q.answer]}</strong><p>${e(q.explanation)}</p>${q.caution?`<p class="pm-note">${e(q.caution)}</p>`:''}<button class="btn-quiet" type="button" data-image-action="retry">Làm lại câu này</button></div>`:''}</section>
      <nav class="pm-reading-nav" aria-label="Chuyển câu"><button class="btn-quiet" type="button" data-image-move="-1" ${index===0?'disabled':''}>← Trước</button><span>${index+1}/${queue.length}</span><button class="btn-primary" type="button" data-image-move="1" ${index===queue.length-1?'disabled':''}>Tiếp →</button></nav>`:'<p class="pm-empty" role="status">Không có câu phù hợp. Chọn bộ lọc khác để tiếp tục.</p>'}
      ${(index===queue.length-1||!q)&&state.batch<batchCount-1?'<button class="btn-quiet" type="button" data-image-action="next-batch">Lượt 50 câu tiếp theo →</button>':''}
      <details class="image-reference"><summary>Về đáp án</summary><p>Đáp án do trợ lý suy luận từ nội dung câu hỏi, chưa phải đáp án chính thức của giảng viên.</p>${IMAGE_BANK.sources.map(source=>`<p><a href="${e(source.url)}" target="_blank" rel="noopener noreferrer">${e(source.title)}</a></p>`).join('')}</details>
      <details class="image-reference"><summary>Cách lọc theo độ dài</summary><p>Đo chiều ngang chữ bằng font đang hiển thị, trước khi xuống dòng; xếp từ ngắn đến dài. Chỉ lọc câu có đáp án tham khảo đứng thứ 3; chênh lệch không quá 0,5 px được tính đồng hạng. Số câu có thể đổi nếu thiết bị dùng font khác. Đây không phải quy luật chọn đáp án đúng.</p></details>
    </div>`;
  }
  function move(step) {
    const index=queue.findIndex(q=>q.id===state.questionId),next=queue[index+step];
    if(!next)return;
    state.questionId=next.id;save();render();root.querySelector('.image-question h2')?.scrollIntoView({block:'nearest'});
  }
  function answer(value) {
    const q=queue.find(q=>q.id===state.questionId);
    if(!q||state.answers[q.id]!==undefined||!Number.isInteger(value)||value<0||value>3)return;
    state.answers[q.id]=value;save();render();
    window.studyCompanion?.react({correct:value===q.answer,source:'image',complete:state.filter==='all'&&batchQuestions().every(item=>state.answers[item.id]!==undefined)});
  }
  root.addEventListener('click',event=>{
    if(!active())return;
    const button=event.target.closest('button');if(!button||button.disabled)return;
    if(button.dataset.imageMode){studyMode=button.dataset.imageMode;if(studyMode==='quiz')resetQueue();render();return;}
    if(button.dataset.keywordAction){
      const action=button.dataset.keywordAction,items=keywordList(),group=items[keywordIndex];
      if(action==='reveal')keywordReveal=true;
      if(action==='shuffle'&&!keywordReview){shuffleBatch(keywordBatch);keywordIndex=0;keywordReveal=false;}
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
    if(button.dataset.imageAction==='shuffle'){shuffleBatch(state.batch);resetQueue();state.questionId=queue[0]?.id||1;save();render();}
    if(button.dataset.imageMove)move(Number(button.dataset.imageMove));
    if(button.dataset.imageAction==='retry'){delete state.answers[state.questionId];save();render();}
    if(button.dataset.imageAction==='next-batch'&&state.batch<batchCount-1){state.batch++;resetQueue();render();}
  });
  root.addEventListener('change',event=>{
    if(!active())return;
    const field=event.target.dataset.imageField,value=event.target.value;
    if(event.target.matches('[data-keyword-batch]')){keywordBatch=Number(value);keywordIndex=0;keywordReview=false;keywordReveal=false;render();return;}
    if(field==='lengthRule'&&['all','skip','only'].includes(value)){state.lengthRule=value;resetQueue();}
    if(field==='batch'&&Number.isInteger(Number(value))&&Number(value)>=0&&Number(value)<batchCount){state.batch=Number(value);resetQueue();}
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
