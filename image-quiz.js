// Independent progress for the image processing question bank.
(() => {
  'use strict';
  const KEY='image-processing-quiz-v1';
  const root=document.getElementById('active-card-container');
  const e=escapeHTML,bank=IMAGE_BANK.questions;
  const BATCH_SIZE=50,batchCount=Math.ceil(bank.length/BATCH_SIZE);
  const thirdLengthIds=new Set(bank.filter(q=>{
    const lengths=q.options.map(option=>[...option].length),correctLength=lengths[q.answer];
    return lengths.filter(length=>length>correctLength).length===2&&lengths.filter(length=>length===correctLength).length===1;
  }).map(q=>q.id));
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
  const active=()=>document.body.dataset.subject==='image';
  const batchQuestions=()=>bank.slice(state.batch*BATCH_SIZE,(state.batch+1)*BATCH_SIZE).filter(q=>state.lengthRule==='all'||(state.lengthRule==='skip'?!thirdLengthIds.has(q.id):thirdLengthIds.has(q.id)));
  const list=()=>batchQuestions().filter(q=>(state.topic==='all'||q.topic===state.topic)&&(state.filter==='all'||(state.filter==='wrong'?state.answers[q.id]!==undefined&&state.answers[q.id]!==q.answer:state.answers[q.id]===undefined)));
  // Keep a stable queue until a filter changes; answering must not move a question away.
  let queue=[];
  function save() {
    try {localStorage.setItem(KEY,JSON.stringify(state));storageError=false;}
    catch {storageError=true;}
  }
  function resetQueue() {queue=list();if(!queue.some(q=>q.id===state.questionId))state.questionId=queue[0]?.id||1;save();}
  function render() {
    if(!active())return;
    const q=queue.find(q=>q.id===state.questionId),index=queue.indexOf(q);
    const batch=batchQuestions(),answered=batch.filter(q=>state.answers[q.id]!==undefined).length,correct=batch.filter(q=>state.answers[q.id]===q.answer).length;
    const selected=q?state.answers[q.id]:undefined;
    root.innerHTML=`<div class="pm-app image-quiz">
      <label><span class="pm-sr-only">Chọn lượt 50 câu</span><select data-image-field="batch">${Array.from({length:batchCount},(_,i)=>`<option value="${i}" ${i===state.batch?'selected':''}>Lượt ${i+1} · Câu ${i*BATCH_SIZE+1}–${Math.min((i+1)*BATCH_SIZE,bank.length)}</option>`).join('')}</select></label>
      <label><span class="pm-sr-only">Lọc theo độ dài đáp án đúng, tính theo ký tự từ dài đến ngắn</span><select data-image-field="lengthRule">${[['skip',`Ôn ${bank.length-thirdLengthIds.size} câu · Bỏ ${thirdLengthIds.size} câu dài thứ 3`],['only',`Xem riêng ${thirdLengthIds.size} câu dài thứ 3`],['all','Đủ 400 câu']].map(([value,label])=>`<option value="${value}" ${value===state.lengthRule?'selected':''}>${label}</option>`).join('')}</select></label>
      <div class="image-toolbar"><label><span class="pm-sr-only">Lọc câu hỏi</span><select data-image-field="filter">${[['all','Tất cả câu'],['unanswered','Chưa làm'],['wrong','Câu sai']].map(([value,label])=>`<option value="${value}" ${value===state.filter?'selected':''}>${label}</option>`).join('')}</select></label><label><span class="pm-sr-only">Chủ đề</span><select data-image-field="topic"><option value="all">Tất cả chủ đề</option>${topics.map(topic=>`<option ${topic===state.topic?'selected':''}>${e(topic)}</option>`).join('')}</select></label></div>
      <p class="image-progress">Đã làm ${answered}/${batch.length} · Đúng ${correct}<span>Đáp án tham khảo</span></p>
      ${storageError?'<p class="pm-error" role="status">Không lưu được tiến độ. Hãy giữ trang đang mở.</p>':''}
      ${q?`<label class="image-jump"><span class="pm-sr-only">Chọn câu</span><select data-image-field="question">${queue.map(item=>`<option value="${item.id}" ${item.id===q.id?'selected':''}>Câu ${item.id}</option>`).join('')}</select><span>${index+1}/${queue.length}</span></label>
      <section class="image-question" aria-label="Câu ${q.id}"><h2>${e(q.prompt)}</h2><div class="image-options">${q.options.map((option,i)=>`<button type="button" data-image-answer="${i}" aria-pressed="${selected===i}" ${selected!==undefined?'disabled':''} class="image-option ${selected!==undefined&&i===q.answer?'is-correct':''} ${selected===i&&i!==q.answer?'is-wrong':''}"><span class="image-letter">${'ABCD'[i]}</span><span>${e(option)}</span>${selected!==undefined&&i===q.answer?'<strong class="image-verdict">Đúng</strong>':selected===i?'<strong class="image-verdict">Bạn chọn</strong>':''}</button>`).join('')}</div>
      ${selected!==undefined?`<div class="image-feedback" role="status"><strong>${selected===q.answer?'Đúng':'Chưa đúng · Đáp án '+ 'ABCD'[q.answer]}</strong><p>${e(q.explanation)}</p>${q.caution?`<p class="pm-note">${e(q.caution)}</p>`:''}<button class="btn-quiet" type="button" data-image-action="retry">Làm lại câu này</button></div>`:''}</section>
      <nav class="pm-reading-nav" aria-label="Chuyển câu"><button class="btn-quiet" type="button" data-image-move="-1" ${index===0?'disabled':''}>← Trước</button><span>${index+1}/${queue.length}</span><button class="btn-primary" type="button" data-image-move="1" ${index===queue.length-1?'disabled':''}>Tiếp →</button></nav>`:'<p class="pm-empty" role="status">Không có câu phù hợp. Chọn bộ lọc khác để tiếp tục.</p>'}
      ${(index===queue.length-1||!q)&&state.batch<batchCount-1?'<button class="btn-quiet" type="button" data-image-action="next-batch">Lượt 50 câu tiếp theo →</button>':''}
      <details class="image-reference"><summary>Về đáp án</summary><p>Đáp án do trợ lý suy luận từ nội dung câu hỏi, chưa phải đáp án chính thức của giảng viên.</p>${IMAGE_BANK.sources.map(source=>`<p><a href="${e(source.url)}" target="_blank" rel="noopener noreferrer">${e(source.title)}</a></p>`).join('')}</details>
      <details class="image-reference"><summary>Cách lọc 99 câu</summary><p>Đếm ký tự của từng lựa chọn, gồm dấu cách, rồi xếp từ dài đến ngắn. Lọc những câu có đáp án tham khảo đứng thứ 3 và không đồng hạng. Đây là đặc điểm của bộ đáp án hiện tại, không phải quy luật chọn đáp án đúng.</p></details>
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
    if(button.dataset.imageAnswer!==undefined)answer(Number(button.dataset.imageAnswer));
    if(button.dataset.imageMove)move(Number(button.dataset.imageMove));
    if(button.dataset.imageAction==='retry'){delete state.answers[state.questionId];save();render();}
    if(button.dataset.imageAction==='next-batch'&&state.batch<batchCount-1){state.batch++;resetQueue();render();}
  });
  root.addEventListener('change',event=>{
    if(!active())return;
    const field=event.target.dataset.imageField,value=event.target.value;
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
    if(event.target.matches('input,textarea,select,button,a,summary')||event.target.isContentEditable)return;
    if(/^[1-4a-d]$/i.test(event.key)){event.preventDefault();answer(/^[1-4]$/.test(event.key)?Number(event.key)-1:event.key.toUpperCase().charCodeAt(0)-65);}
    if(event.key==='ArrowLeft'||event.key==='ArrowRight'){event.preventDefault();move(event.key==='ArrowLeft'?-1:1);}
  },true);
  window.ImageQuiz={open(){
    // Commit focus changes before replacing a previous subject's active form.
    if(root.contains(document.activeElement))document.activeElement.blur();
    resetQueue();render();
  }};
})();
