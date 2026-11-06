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
    191:['tham gia tích cực trong giờ giảng'],
    192:['tích lũy và cập nhật kiến thức'],
    193:['thực hiện nhiệm vụ được giao'],
    194:['tự đánh giá việc học'],
    373:['Bản đồ tự tổ chức']
  };
  const answerCues={
    1:['không rõ quy luật','phép lọc'],
    2:['Nội suy các mức xám trung gian','tăng độ mịn'],
    3:['ma trận các điểm ảnh','số hóa'],
    4:['nén cao hơn','không hoàn toàn giống ảnh gốc'],
    6:['đỏ, xanh lá và xanh dương','phối màu cộng'],
    8:['sắc độ, độ bão hòa và giá trị sáng'],
    9:['bitmap','cấu trúc điểm ảnh'],
    10:['cộng các thành phần ánh sáng','mô hình RGB'],
    11:['hấp thụ bớt thành phần ánh sáng','in ấn'],
    12:['ảnh thô','thu nhận trực tiếp','xử lý tối thiểu'],
    13:['Camera và scanner'],
    14:['tín hiệu quang liên tục','các vị trí rời rạc'],
    15:['đối tượng hình học','không bị vỡ hình'],
    16:['một cảm biến','cần nội suy'],
    17:['ba cảm biến riêng','ba thành phần màu'],
    19:['nhiều kiểu mã hóa và nhiều kiểu màu'],
    21:['giá trị trung bình của vùng lân cận','làm trơn ảnh'],
    22:['Ước lượng ảnh gốc','mô hình suy hao và nhiễu'],
    23:['hình dạng và cấu trúc quan trọng'],
    25:['giảm sai số trung bình bình phương','cả suy hao và nhiễu'],
    26:['Cộng một hằng số dương','sáng hơn'],
    27:['Phân bố lại mức xám','cải thiện độ tương phản'],
    28:['Mở rộng dải mức xám'],
    30:['trung bình trên k giá trị','mức xám gần với điểm đang xét'],
    31:['Nhiễu xung','rất sáng hoặc rất tối rải rác'],
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
    48:['Mẫu hình học','phép toán hình thái'],
    50:['Đạo hàm bậc nhất','sự thay đổi mức xám'],
    51:['sự sắp xếp và biến thiên cục bộ của mức xám'],
    52:['vùng đối tượng và nền','ngưỡng mức xám'],
    53:['Giảm dao động','histogram'],
    54:['tính đối xứng','mức xám thuộc nền'],
    55:['Ghép các vùng lân cận','tiêu chuẩn đồng nhất'],
    56:['đặc trưng texture','cấu trúc bề mặt'],
    57:['hai nhóm mức xám','nền và đối tượng'],
    58:['thông tin trong lân cận của điểm ảnh'],
    60:['Lặp việc ước lượng','cập nhật ngưỡng cho đến khi ổn định'],
    61:['thư viện mẫu chuẩn đã biết'],
    62:['vector nhiều chiều','mỗi chiều là một đặc trưng'],
    63:['K cụm','tâm gần nhất và cập nhật tâm'],
    64:['lớp chiếm đa số','K mẫu gần nhất'],
    65:['một lớp liên kết đầy đủ','tự kết hợp để hồi tưởng mẫu'],
    66:['từ tần số thấp đến cao'],
    67:['nhiều mức kích thước','low-pass','high-pass'],
    68:['không thu được hoàn toàn dữ liệu gốc','tỷ lệ nén cao hơn'],
    69:['Biến đổi ảnh sang miền khác'],
    70:['lặp ghép hai nút có xác suất nhỏ nhất'],
    71:['mở rộng từ điển các chuỗi','không cần truyền từ điển hoàn chỉnh'],
    72:['loại bỏ hoặc biểu diễn hiệu quả hơn'],
    73:['cấu trúc và mô hình ảnh ở mức cao hơn'],
    74:['thay đổi của thống kê dữ liệu'],
    75:['4096 phần tử','12 bit'],
    78:['nhóm thành lớp theo tiêu chuẩn đồng dạng','lớp chưa được định danh trước'],
    79:['thu nhận và tiền xử lý','nhận dạng và ra quyết định'],
    80:['cường độ sáng của điểm ảnh'],
    81:['nhiễu có quy luật','phép biến đổi thích hợp'],
    83:['Nhóm các mức xám gần nhau','giảm số mức biểu diễn'],
    84:['chỉ có hai mức biểu diễn'],
    86:['liên hệ với RGB','nguyên tắc bù màu'],
    87:['sắc độ, độ bão hòa và độ sáng'],
    88:['số lượng điểm ảnh','chiều không gian'],
    91:['thành phần màu còn thiếu','các pixel lân cận'],
    93:['ít nhất gấp đôi tần số cao nhất'],
    100:['Định dạng ảnh','mã hóa loạt dài'],
    102:['Sensor hoặc bàn số hóa','dữ liệu Vector'],
    103:['ma trận các điểm ảnh','thuận lợi cho hiển thị, in ấn'],
    109:['Tách các mặt phẳng bit','mức đóng góp của từng bit'],
    114:['quan hệ nghịch đảo','thang mức xám'],
    115:['Kết hợp vùng lân cận của ảnh với một mặt nạ lọc'],
    117:['biên độ tuân theo phân bố Gaussian'],
    119:['phép đảo trở nên không ổn định'],
    122:['số điểm ảnh tương ứng với từng mức xám'],
    130:['co ảnh rồi giãn ảnh'],
    132:['Làm mảnh đáp ứng gradient','chỉ giữ cực đại cục bộ'],
    136:['Toán tử đạo hàm bậc hai','chi tiết mịn và điểm cô lập'],
    143:['thay đổi đáng kể về mức xám','ranh giới giữa các vùng'],
    144:['ranh giới của các vùng sau khi phân vùng'],
    147:['trên, dưới, trái và phải'],
    148:['mở rộng vùng đối tượng'],
    154:['thông tin của toàn ảnh','histogram'],
    156:['hình học của histogram','khoảng cách đến đường nối'],
    157:['điểm hạt giống','bổ sung các điểm lân cận'],
    159:['Quy định khi nào','cùng một vùng'],
    160:['Chia ảnh thành các vùng','tính chất tương đồng'],
    163:['Hình thành vùng từ các điểm có thuộc tính gần nhau'],
    168:['Quá trình gán đối tượng vào một lớp','mẫu chuẩn'],
    169:['Tự hình thành các lớp','không có thư viện mẫu chuẩn'],
    170:['Hàm hỗ trợ quyết định đối tượng thuộc lớp nào'],
    171:['Tạo lớp mới từ phần tử xa nhất'],
    172:['chuỗi ký hiệu','quy tắc cấu trúc'],
    173:['ánh xạ các vector gần nhau vào các nơron lân cận'],
    174:['xác định mẫu hoặc tâm cụm gần nhất','không gian đặc trưng'],
    175:['giá trị đầu vào -1 và 1'],
    176:['Chia các hệ số DCT cho ma trận lượng tử','trở thành 0'],
    179:['từ mã ngắn cho ký hiệu có xác suất xuất hiện cao'],
    183:['độ dài các chuỗi bit liên tiếp','bắt đầu từ số lượng bit 0'],
    185:['chia ảnh thành các khối 8×8','biến đổi cosin'],
    188:['tính tự tương đồng','tốn thời gian mã hóa'],
    189:['lặp lại hoặc tương quan của các mẫu ảnh trong miền không gian'],
    191:['chủ động trao đổi','trên lớp'],
    192:['thường xuyên bổ sung kiến thức mới'],
    193:['hoàn thành phần việc đúng phạm vi và thời điểm'],
    194:['kiểm tra lại mức độ hiểu bài','nội dung cần bổ sung'],
    202:['Khắc phục biến dạng','điểm điều khiển'],
    207:['gán vào một lớp đã xác định','mẫu chuẩn'],
    210:['trích chọn bằng các toán tử như gradient, la bàn hoặc Laplace'],
    213:['phục hồi dữ liệu ảnh','không làm mất thông tin gốc'],
    216:['biên độ liên tục sau lấy mẫu thành các mức rời rạc'],
    233:['Mở rộng mô hình CMY','thành phần đen'],
    234:['cảm giác nhiều mức xám','thay đổi mật độ các điểm in'],
    246:['nhiều mức cường độ sáng từ tối đến sáng'],
    257:['đặc trưng phân bố mức xám','thay vì chọn hoàn toàn thủ công'],
    261:['trung vị của các giá trị','nhiễu xung'],
    272:['ảnh gốc qua hệ suy hao kết hợp với nhiễu'],
    275:['Cộng một hằng số âm','tối hơn'],
    289:['Nhóm các mức xám gần nhau','làm nổi bật vùng giá trị quan tâm'],
    296:['nhiều mặt nạ định hướng','các hướng khác nhau'],
    324:['bốn hướng chéo ngoài bốn láng giềng trực giao'],
    330:['Nhạy với bước nhảy mức xám','biên dày hơn đạo hàm bậc hai'],
    339:['Chia một vùng chưa đồng nhất thành các vùng nhỏ hơn'],
    340:['Sử dụng thông tin đường biên','ranh giới các vùng'],
    363:['phân cụm lặp','tách và gộp lớp'],
    367:['Bảo toàn tương đối quan hệ lân cận','lưới nơron'],
    368:['giá trị trung bình của các đối tượng đang được gán vào cụm'],
    370:['gán trọng số phụ thuộc khoảng cách'],
    372:['chọn nơron có vector trọng số gần đầu vào nhất','hiệu chỉnh vùng lân cận'],
    373:['Bảo toàn tương đối quan hệ lân cận','lưới nơron'],
    375:['mở rộng động','xuất hiện các chuỗi mới'],
    377:['Tỷ số giữa kích thước dữ liệu trước nén và kích thước dữ liệu sau nén'],
    379:['Biểu diễn các khối dữ liệu bằng các từ mã tương ứng'],
    380:['mã hóa tương đối trực tiếp như RLE, Huffman và LZW'],
    383:['nhiều đoạn lặp hơn','chỉ khác nhau một bit'],
    385:['kết thúc từ điển hiện tại','bắt đầu lại từ điển mới'],
    386:['Mã đặc biệt đánh dấu kết thúc thông tin'],
    392:['giảm độ phân giải hai thành phần sắc độ'],
    395:['khôi phục chính xác dữ liệu gốc'],
    399:['chuỗi ký hiệu lặp liên tiếp','độ dài loạt và ký hiệu']
  };
  const rememberKeywords={
    1:'Nhiễu ngẫu nhiên → không rõ quy luật · dùng phép lọc',
    2:'Tăng số mức xám → nội suy mức xám trung gian · tăng độ mịn',
    3:'Ảnh số → số hóa thành ma trận các điểm ảnh',
    4:'Nén không bảo toàn thông tin → nén cao hơn · khác ảnh gốc',
    6:'Ảnh màu RGB → đỏ, xanh lá, xanh dương · phối màu cộng',
    8:'Mô hình HSV → sắc độ, độ bão hòa và giá trị sáng (Value)',
    9:'BMP → định dạng bitmap lưu theo cấu trúc điểm ảnh',
    10:'Phối màu cộng → cộng ánh sáng · nguyên lý RGB',
    11:'Phối màu trừ → hấp thụ bớt ánh sáng · dùng trong in ấn',
    12:'RAW → dữ liệu ảnh thô thu trực tiếp · xử lý tối thiểu',
    13:'Thiết bị thu nhận ảnh Raster → Camera và scanner',
    14:'Lấy mẫu → biến tín hiệu liên tục thành các vị trí rời rạc',
    15:'Mô hình Vector → đối tượng hình học · phóng to không vỡ hình',
    16:'Lọc Bayer → một cảm biến với bộ lọc màu · cần nội suy',
    17:'Three-CCD → ba cảm biến riêng cho ba thành phần màu',
    19:'TIFF → hỗ trợ nhiều kiểu mã hóa và nhiều kiểu màu',
    21:'Lọc trung bình → lấy trung bình vùng lân cận · làm trơn ảnh',
    22:'Khôi phục ảnh → ước lượng ảnh gốc từ mô hình suy hao và nhiễu',
    23:'Mặt phẳng bit cao → giữ phần lớn hình dạng và cấu trúc chính',
    25:'Lọc Wiener → giảm sai số trung bình bình phương (cả suy hao & nhiễu)',
    26:'Tăng độ sáng → cộng hằng số dương vào mức xám',
    27:'Cân bằng histogram → phân bố lại mức xám · tăng tương phản',
    28:'Dãn độ tương phản → mở rộng dải mức xám',
    30:'Lọc trung bình theo k giá trị gần nhất → trung bình trên k giá trị gần điểm xét',
    31:'Nhiễu muối tiêu → nhiễu xung tạo điểm rất sáng hoặc rất tối rải rác',
    33:'Lọc đảo → bù trực tiếp hàm suy hao trong miền tần số',
    36:'Trích biên hình thái → hiệu giữa ảnh đã giãn và ảnh đã co',
    38:'Ngưỡng kép Canny → dùng hai ngưỡng phân biệt biên mạnh, biên yếu',
    39:'Trích biên trong → hiệu giữa ảnh gốc và ảnh sau phép co',
    40:'Phát hiện biên trực tiếp → dựa trên biến thiên mức xám · đạo hàm',
    41:'Prewitt → mặt nạ gradient xấp xỉ đạo hàm theo hai hướng',
    42:'Sobel → trọng số lớn hơn ở hàng hoặc cột giữa',
    43:'Canny → phát hiện biên nhiều bước · biên mảnh và liên tục',
    44:'Phép co ảnh → làm co vùng đối tượng · loại bỏ chi tiết nhỏ',
    45:'Phép đóng → thực hiện giãn ảnh rồi co ảnh',
    46:'Đạo hàm bậc hai → nổi chi tiết mịn, điểm cô lập · nhạy với nhiễu',
    48:'Phần tử cấu trúc → mẫu hình học tác động lên ảnh',
    50:'Gradient → đạo hàm bậc nhất làm nổi bật thay đổi mức xám',
    51:'Kết cấu texture → sự sắp xếp và biến thiên cục bộ của mức xám',
    52:'Phân vùng theo ngưỡng → tách đối tượng và nền bằng ngưỡng mức xám',
    53:'Làm trơn histogram → giảm dao động trên histogram trước khi chọn ngưỡng',
    54:'Đối xứng nền → dựa trên tính đối xứng của mức xám thuộc nền',
    55:'Hợp vùng → ghép các vùng lân cận thỏa tiêu chuẩn đồng nhất',
    56:'Phân vùng theo kết cấu bề mặt → dựa vào đặc trưng texture',
    57:'Histogram hai đỉnh → hai nhóm mức xám ứng với nền và đối tượng',
    58:'Phân vùng cục bộ → dựa trên thông tin trong lân cận điểm ảnh',
    60:'Thuật toán đẳng điệu → lặp ước lượng và cập nhật ngưỡng đến khi ổn định',
    61:'Học có giám sát → dùng thư viện mẫu chuẩn đã biết',
    62:'Không gian đặc trưng → vector nhiều chiều, mỗi chiều một đặc trưng',
    63:'K-means → phân vào K cụm · gán tâm gần nhất và cập nhật tâm',
    64:'K láng giềng (KNN) → gán theo lớp chiếm đa số trong K mẫu gần nhất',
    65:'Mạng Hopfield → mạng một lớp liên kết đầy đủ · tự kết hợp hồi tưởng mẫu',
    66:'Quét Zig-Zag → sắp xếp hệ số từ tần số thấp đến cao',
    67:'Kim tự tháp ảnh → nhiều mức kích thước (low-pass và high-pass)',
    68:'Nén có mất thông tin → không thu hoàn toàn dữ liệu gốc · tỷ lệ nén cao hơn',
    69:'Nén sử dụng biến đổi → biến đổi sang miền khác trước khi lượng tử/mã hóa',
    70:'Cây Huffman → lặp ghép hai nút có xác suất nhỏ nhất',
    71:'LZW → mở rộng từ điển chuỗi · không cần truyền từ điển hoàn chỉnh',
    72:'Độ dư thừa dữ liệu → phần thông tin có thể loại bỏ khi nén',
    73:'Nén thế hệ thứ hai → khai thác cấu trúc và mô hình ảnh ở mức cao hơn',
    74:'Huffman thích nghi → tự điều chỉnh theo thay đổi thống kê dữ liệu',
    75:'Giới hạn từ điển LZW → tối đa 4096 phần tử · từ mã dài 12 bit',
    78:'Lớp chưa được định danh trước → chọn Phân loại không có mẫu',
    79:'Thu nhận, biểu diễn, nhận dạng, ra quyết định → Hệ thống nhận dạng tự động',
    80:'Cường độ sáng của điểm ảnh → chọn Mức xám',
    81:'Nhiễu có quy luật, khử bằng phép biến đổi → chọn Nhiễu hệ thống',
    83:'Nhóm các mức xám gần nhau để giảm số mức → chọn Giảm số mức xám',
    84:'Ảnh chỉ có hai mức biểu diễn → chọn Ảnh nhị phân',
    86:'Liên hệ với RGB theo nguyên tắc bù màu → chọn Mô hình CMY',
    87:'Sắc độ, độ bão hòa và độ sáng (Lightness) → chọn Mô hình HSL',
    88:'Số lượng điểm ảnh theo các chiều không gian → chọn Độ phân giải ảnh',
    91:'Ước lượng thành phần màu còn thiếu từ lân cận → chọn Nội suy màu Bayer',
    93:'Tần số lấy mẫu ít nhất gấp đôi tần số cao nhất → chọn Định lý lấy mẫu',
    100:'Định dạng ảnh dùng mã hóa loạt dài (RLE) → chọn PCX',
    102:'Sensor hoặc bàn số hóa tạo dữ liệu Vector → chọn Thiết bị thu nhận ảnh Vector',
    103:'Ma trận điểm ảnh thuận lợi hiển thị, in ấn → chọn Mô hình Raster',
    109:'Tách các mặt phẳng bit của ảnh → chọn Trích chọn bit',
    114:'Biến đổi mức xám nghịch đảo thang xám → chọn Ảnh âm bản',
    115:'Kết hợp vùng lân cận với mặt nạ lọc → chọn Phép nhân chập',
    117:'Biên độ tuân theo phân bố Gaussian → chọn Nhiễu Gaussian',
    119:'Hạn chế thành phần làm phép đảo không ổn định → chọn Lọc giả đảo',
    122:'Số điểm ảnh tương ứng với từng mức xám → chọn Histogram',
    130:'Thực hiện co ảnh rồi giãn ảnh → chọn Phép mở',
    132:'Làm mảnh gradient, chỉ giữ cực đại cục bộ → chọn Ức chế cực đại không',
    136:'Toán tử đạo hàm bậc hai nhạy chi tiết mịn → chọn Laplace',
    143:'Thay đổi đáng kể mức xám, tạo ranh giới → chọn Biên ảnh',
    144:'Ranh giới của các vùng sau khi phân vùng → chọn Phát hiện biên gián tiếp',
    147:'Điểm lân cận trên, dưới, trái và phải → chọn Láng giềng 4',
    148:'Làm mở rộng vùng đối tượng → chọn Phép giãn ảnh',
    154:'Dựa trên thông tin của toàn ảnh (histogram) → chọn Phân vùng toàn thể',
    156:'Hình học histogram và khoảng cách đến đường nối → chọn Thuật toán tam giác',
    157:'Bắt đầu từ điểm hạt giống rồi thêm lân cận → chọn Phát triển vùng',
    159:'Quy định khi nào xem là cùng một vùng → chọn Tiêu chuẩn đồng nhất',
    160:'Chia ảnh thành các vùng có tính chất tương đồng → chọn Phân vùng ảnh',
    163:'Hình thành vùng từ các điểm có thuộc tính gần nhau → chọn Phân vùng theo miền đồng nhất',
    168:'Gán đối tượng vào một lớp theo quy luật, mẫu chuẩn → chọn Nhận dạng ảnh',
    169:'Tự hình thành các lớp khi không có mẫu chuẩn → chọn Học không giám sát',
    170:'Hàm quyết định đối tượng thuộc lớp nào → chọn Hàm phân lớp',
    171:'Tạo lớp mới từ phần tử xa nhất vượt ngưỡng → chọn Thuật toán khoảng cách lớn nhất',
    172:'Chuỗi ký hiệu và nhận dạng theo quy tắc cấu trúc → chọn Nhận dạng cấu trúc',
    173:'Ánh xạ vector gần nhau vào các nơron lân cận → chọn Bản đồ tự tổ chức',
    174:'Xác định mẫu hoặc tâm cụm gần nhất → chọn Khoảng cách Euclidean',
    175:'Mạng Hopfield dùng giá trị đầu vào -1 và 1 → chọn Tín hiệu lưỡng cực Hopfield',
    176:'Chia hệ số DCT cho ma trận lượng tử và làm tròn → chọn Lượng tử hóa JPEG',
    179:'Gán từ mã ngắn cho ký hiệu có xác suất cao → chọn Mã Huffman',
    183:'Độ dài chuỗi bit liên tiếp, bắt đầu từ bit 0 → chọn RLE cho ảnh nhị phân',
    185:'Chia ảnh thành các khối 8×8 trước DCT → chọn Phân khối JPEG',
    188:'Khai thác tính tự tương đồng, tốn thời gian mã hóa → chọn Nén Fractal',
    189:'Lặp lại hoặc tương quan mẫu ảnh trong miền không gian → chọn Nén không gian',
    191:'Tham gia tích cực trong giờ giảng → chủ động trao đổi và làm hoạt động trên lớp',
    192:'Tích lũy và cập nhật kiến thức → thường xuyên bổ sung kiến thức mới',
    193:'Thực hiện nhiệm vụ được giao → hoàn thành đúng phạm vi và thời điểm',
    194:'Tự đánh giá việc học → kiểm tra lại mức độ hiểu bài và nội dung cần bổ sung',
    202:'Khắc phục biến dạng bằng điểm điều khiển → chọn Nắn chỉnh biến dạng',
    207:'Phân loại có mẫu → gán vào lớp đã xác định dựa trên mẫu chuẩn',
    210:'Trích chọn bằng toán tử gradient, la bàn, Laplace → chọn Đặc điểm biên',
    213:'Nén có bảo toàn thông tin → phục hồi ảnh không làm mất thông tin gốc',
    216:'Biến biên độ liên tục sau lấy mẫu thành mức rời rạc → chọn Lượng tử hóa',
    233:'CMYK → mở rộng CMY bằng thành phần đen (K) cho in ấn',
    234:'Thay đổi mật độ các điểm in tạo cảm giác mức xám → chọn Nửa cường độ',
    246:'Ảnh có nhiều mức cường độ sáng từ tối đến sáng → chọn Ảnh mức xám',
    257:'Tìm ngưỡng tự động → dựa trên phân bố mức xám thay vì chọn thủ công',
    261:'Lọc trung vị → lấy trung vị cửa sổ lân cận · khử nhiễu xung',
    272:'Ảnh gốc qua hệ suy hao kết hợp với nhiễu → chọn Mô hình suy giảm ảnh',
    275:'Giảm độ sáng → cộng một hằng số âm vào mức xám',
    289:'Bó cụm mức xám → nhóm mức xám gần nhau · làm nổi vùng quan tâm',
    296:'Dùng nhiều mặt nạ định hướng theo các hướng → chọn Toán tử la bàn',
    324:'Bốn hướng chéo ngoài bốn láng giềng trực giao → chọn Láng giềng 8',
    330:'Nhạy bước nhảy mức xám, biên dày hơn bậc hai → chọn Đạo hàm bậc nhất',
    339:'Tách vùng → chia một vùng chưa đồng nhất thành các vùng nhỏ hơn',
    340:'Sử dụng thông tin đường biên xác định ranh giới → chọn Phân vùng dựa theo đường biên',
    363:'ISODATA → phân cụm lặp có khả năng tách và gộp lớp',
    367:'Mạng Kohonen → bảo toàn tương đối quan hệ lân cận trên lưới nơron',
    368:'Giá trị trung bình của các đối tượng trong cụm → chọn Tâm cụm K-means',
    370:'Gán trọng số phụ thuộc khoảng cách → chọn KNN có trọng số',
    372:'Chọn nơron gần đầu vào nhất rồi chỉnh vùng lân cận → chọn Học cạnh tranh Kohonen',
    373:'Bản đồ tự tổ chức → bảo toàn tương đối quan hệ lân cận trên lưới nơron',
    375:'Từ điển LZW → mở rộng động khi xuất hiện các chuỗi mới',
    377:'Tỷ lệ nén → tỷ số kích thước trước nén và sau nén',
    379:'Mã hóa khối → biểu diễn các khối dữ liệu bằng các từ mã tương ứng',
    380:'Mã hóa trực tiếp như RLE, Huffman và LZW → chọn Nén thế hệ thứ nhất',
    383:'RLE theo Gray code → tạo nhiều đoạn lặp hơn vì chỉ khác nhau 1 bit',
    385:'Clear Code của LZW → kết thúc từ điển hiện tại và bắt đầu lại từ điển mới',
    386:'Mã đặc biệt đánh dấu kết thúc thông tin → chọn EOI trong LZW',
    392:'Giảm độ phân giải hai thành phần sắc độ → chọn Giảm mẫu màu trong JPEG',
    395:'Nén không mất thông tin → khôi phục chính xác dữ liệu gốc',
    399:'Mã hóa loạt dài RLE → thay chuỗi lặp liên tiếp bằng độ dài loạt và ký hiệu'
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
    const base=imageQuestionsByExplanation.get(q.explanation)||q;
    const split=q.explanation.indexOf(':');
    const name=split>0?q.explanation.slice(0,split).trim():'';
    const answer=q.options[q.answer];
    const dCues=answerCues[base.id]||[answer];
    const answerHasDef=dCues.some(c=>answer.toLowerCase().includes(c.toLowerCase()));
    const pCues=promptCues[base.id]||(answerHasDef&&name&&q.prompt.includes(name)?[name]:dCues);
    const aCues=answerHasDef?dCues:[answer];
    const keyword=rememberKeywords[base.id]||aCues.join(' · ');
    return {prompt:highlightCues(q.prompt,pCues),answer:highlightCues(answer,aCues),keyword};
  }
  const keywordList=()=>keywordReview?keywordGroups.filter(group=>keywordProgress[group.id]?.due<=Date.now()):questionsInBatch(keywordBatch).map(q=>keywordsById.get(q.id));
  function renderKeywords() {
    const items=keywordList(),group=items[keywordIndex],hint=group&&keywordHints[group.name];
    root.innerHTML=`<div class="pm-app image-quiz"><div class="image-toolbar"><button class="btn-quiet" data-image-mode="quiz">← Trắc nghiệm</button><button class="btn-quiet" data-keyword-action="review" aria-pressed="${keywordReview}">${keywordReview?'Tất cả từ khóa':'Ôn đến hạn'}</button></div>
      <label><span class="pm-sr-only">Lượt 20 câu</span><select data-keyword-batch>${batchOptions(keywordBatch)}</select></label>
      <p class="image-progress">${keywordReview?`${items.length} câu đến hạn`:`${bank.length} câu không trùng`} · Mỗi câu một thẻ từ khóa<span>Đáp án tham khảo</span></p>
      ${group?`<section class="image-question image-keyword-card" data-keyword-id="${group.id}"><p>Câu ${group.id} · ${keywordIndex+1}/${items.length}</p><h2>${e(group.prompt)}</h2><p>Tự nhớ ý chính trước khi mở.</p>
      ${keywordReveal?`<div class="image-feedback" role="status"><strong>${e(hint?.[0]||group.meaning)}</strong>${hint?`<p>${e(hint[1])}</p>`:''}${rememberKeywords[group.id]?`<p>Từ khóa cần nhớ: <mark class="image-cue">${e(rememberKeywords[group.id])}</mark></p>`:''}<details class="image-reference"><summary>Xem đáp án và giải thích</summary><p>Đáp án tham khảo: ${e(group.answer)}</p><p>${e(group.explanation)}</p></details>${group.caution?`<p class="pm-note">${e(group.caution)}</p>`:''}</div><div class="image-toolbar"><button class="btn-quiet" data-keyword-action="again">Ôn lại · 10 phút</button><button class="btn-primary" data-keyword-action="remember">Đã nhớ · mai ôn</button></div>`:'<button class="btn-primary" data-keyword-action="reveal">Hiện từ khóa</button>'}</section>
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
      <div class="image-toolbar"><button class="btn-quiet" type="button" data-image-mode="keywords">Học từ khóa →</button></div>
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
