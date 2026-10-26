// Learning state is separate from exam/matching state so changing modes is reversible.
let memorySession = null;
const MEMORY_DAY = 86400000;
const MEMORY_GROUPS = [[16,23,37,39],[3,19,20,21],[4,5,6,7,35],[15,38,41,44],[13,27,34,43,45,46,48],[12,17,22,25,28,42,47],[1,2,18,24,26,29,33,36,40],[8,9,10,11,14,30],[49,50],[51,52,53,54],[55,56,57,58],[59,60],[61,62,63],[64,65],[66,67,68]];
function memoryItem(id) { return DATASET.part1Data.find(q=>q.id===id); }
function memoryDay(now=Date.now()) { return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit'}).format(now); }
function memoryHistory(id) { return saved.history['part1:'+id]; }
function memoryStatus(id,now=Date.now()) {
  const h=memoryHistory(id);
  if(!h || !(h.right+h.wrong)) return 'new';
  if((h.memory?.days?.length||0)>=3 && h.due>now) return 'retained';
  return 'learning';
}
function memoryCounts() {
  const counts={new:0,learning:0,retained:0,due:0};
  DATASET.part1Data.forEach(q=>{
    counts[memoryStatus(q.id)]++;
    const h=memoryHistory(q.id);if(h && h.due<=Date.now()) counts.due++;
  });
  return counts;
}
function memoryCandidates(early=false) {
  const now=Date.now();
  const due=DATASET.part1Data.filter(q=>memoryHistory(q.id)?.due<=now);
  const fresh=DATASET.part1Data.filter(q=>memoryStatus(q.id)==='new');
  const normal=[...shuffle(due),...shuffle(fresh)];
  if(normal.length || !early)return normal;
  return shuffle([...DATASET.part1Data]);
}
function makeMemoryEntry(id,reverse,repeat=false) {
  const group=MEMORY_GROUPS.find(g=>g.includes(id))||[];
  // CPU and processor are synonymous: do not present them as competing answers.
  const compatible=q=>q.id!==id && !([18,36].includes(id)&&[18,36].includes(q.id));
  const related=shuffle(DATASET.part1Data.filter(q=>group.includes(q.id)&&compatible(q)));
  const rest=shuffle(DATASET.part1Data.filter(q=>!group.includes(q.id)&&compatible(q)));
  return {id,reverse,repeat,options:shuffle([id,...[...related,...rest].slice(0,3).map(q=>q.id)])};
}
function validMemorySession(s) {
  return s?.version===1 && Array.isArray(s.queue) && s.queue.length<=40 && s.queue.every(q=>q&&memoryItem(q.id)&&Array.isArray(q.options)&&q.options.length===4&&new Set(q.options).size===4&&q.options.includes(q.id)&&q.options.every(memoryItem)) && Array.isArray(s.baseIds)&&s.baseIds.every(memoryItem) && Array.isArray(s.results)&&s.results.every(r=>r&&memoryItem(r.id)&&typeof r.correct==='boolean') && Number.isInteger(s.index)&&s.index>=0&&s.index<=s.queue.length && ['recall','choose','confidence','feedback','complete'].includes(s.stage) && (s.stage==='complete'||s.index<s.queue.length);
}
function createMemorySession(early=false) {
  const items=memoryCandidates(early).slice(0,6);
  return {version:1,baseIds:items.map(q=>q.id),queue:items.map((q,i)=>makeMemoryEntry(q.id,memoryHistory(q.id)?.memory ? !memoryHistory(q.id).memory.lastReverse : i%2===1)),index:0,stage:items.length?'recall':'complete',answerId:null,confidence:null,helped:false,results:[],started:Date.now(),early};
}
function part1ModeNav() {
  return `<nav class="memory-modes" aria-label="Cách học Bài 1">${[['memory','Học nhớ'],['board','Ghép đề thi'],['choice','4 đáp án']].map(([mode,label])=>`<button type="button" data-part1-mode="${mode}" aria-pressed="${part1SubMode===mode}" onclick="setPart1SubMode('${mode}')">${label}</button>`).join('')}</nav>`;
}
function saveMemoryProgress() { saved.memorySession=memorySession;snapshot(); }
function renderMemoryStudy() {
  document.body.classList.add('guided-study');shell.classList.remove('is-matching-mode');
  document.querySelector('.shortcuts-footer').hidden=true;isAnswered=false;
  const container=document.getElementById('active-card-container');
  const s=memorySession, counts=memoryCounts(), e=escapeHTML;
  const top=part1ModeNav()+`<div class="memory-heading"><h2>Nhớ được trước khi nhìn đáp án</h2><p>Tự nhẩm trước, kiểm tra sau. Một lượt gồm tối đa 6 thuật ngữ; câu yếu sẽ quay lại.</p></div><div class="memory-progress" aria-label="Tiến trình ${DATASET.part1Data.length} thuật ngữ"><span><b>${counts.new}</b> chưa học</span><span><b>${counts.learning}</b> cần ôn</span><span><b>${counts.retained}</b> nhớ qua nhiều buổi</span></div>`;
  if(s.stage==='complete') {
    const first=s.results.filter(r=>!r.repeat);
    const secure=first.filter(r=>r.correct&&r.confidence==='sure'&&!r.helped).length;
    const unsure=first.filter(r=>r.correct&&(r.confidence==='unsure'||r.helped)).length;
    const wrong=first.filter(r=>!r.correct).length;
    const nextDates=DATASET.part1Data.map(q=>memoryHistory(q.id)?.due).filter(d=>d>Date.now());
    const nextDate=nextDates.length?new Intl.DateTimeFormat('vi-VN',{timeZone:'Asia/Ho_Chi_Minh',day:'numeric',month:'numeric',hour:'2-digit',minute:'2-digit'}).format(Math.min(...nextDates)):null;
    container.innerHTML=`<section class="memory-study">${top}<section class="memory-complete"><h3>${first.length?'Xong lượt học':'Bạn đã ôn hết câu đến lịch'}</h3>${first.length?`<p>Lần gặp đầu: <strong>${secure} đúng và chắc</strong> · ${unsure} đúng nhưng cần ôn · ${wrong} chưa đúng.</p><p>Đã kiểm tra lại ${s.results.filter(r=>r.repeat).length} lần sau các câu khác. Kết quả lần đầu được giữ riêng.</p>`:''}<p>${counts.due?`Còn ${counts.due} thuật ngữ đến lịch ôn.`:counts.new?`Còn ${counts.new} thuật ngữ mới để học.`:nextDate?'Lượt ôn tiếp theo từ '+nextDate+'.':'Bạn có thể quay lại ôn ở buổi sau.'}</p><button class="btn-primary" onclick="newMemoryRound(${!counts.due&&!counts.new})">${counts.due?'Ôn câu đến lịch':counts.new?'Học thêm 6 thuật ngữ':'Ôn sớm 6 thuật ngữ'}</button><p class="memory-note">“Nhớ qua nhiều buổi” cần trả lời đúng và chắc trong ít nhất 3 ngày khác nhau. Trả lời lại ngay trong buổi không tăng số ngày.</p></section>${memoryOverview()}</section>`;
    saveMemoryProgress();return;
  }
  const entry=s.queue[s.index], item=memoryItem(entry.id);
  const answered=s.results.filter(r=>!r.repeat).length;
  const prompt=entry.reverse?item.def:item.term;
  let content='';
  if(s.stage==='recall') content=`<div class="memory-recall"><p>${entry.reverse?'Tự nhớ tên thuật ngữ tương ứng.':'Tự nhẩm ý nghĩa hoặc một cụm tiếng Anh diễn tả thuật ngữ này.'}</p><div class="memory-actions"><button class="btn-primary" onclick="revealMemory(false)">Hiện lựa chọn</button><button class="btn-quiet" onclick="revealMemory(true)">Chưa nhớ</button></div><p class="memory-note">Không cần gõ hay dịch nguyên câu. Hãy thử nhớ một ý chính trước khi mở lựa chọn.</p></div>`;
  if(s.stage==='choose'||s.stage==='confidence') content=`<div class="memory-options" role="group" aria-labelledby="memory-prompt">${entry.options.map((id,i)=>`<button type="button" class="guided-option ${s.answerId===id?'is-picked':''}" data-memory-id="${id}" aria-pressed="${s.answerId===id}" ${s.stage==='confidence'?'disabled':''} onclick="chooseMemory(${id})"><span class="guided-letter">${i+1}</span><span>${e(entry.reverse?memoryItem(id).term:memoryItem(id).def)}</span></button>`).join('')}</div>${s.stage==='confidence'?`<div class="memory-confidence"><h3>Bạn chắc đến mức nào?</h3><p>Chọn “Chưa chắc” nếu bạn đoán hoặc chỉ nhận ra khi nhìn lựa chọn.</p><div class="memory-actions"><button class="btn-primary" onclick="rateMemory('sure')">Chắc</button><button class="btn-quiet" onclick="rateMemory('unsure')">Chưa chắc</button><button class="btn-quiet" onclick="changeMemoryAnswer()">Đổi lựa chọn</button></div></div>`:'<p class="memory-note">Các lựa chọn độc lập ở mỗi câu, không loại trừ theo những câu đã làm.</p>'}`;
  if(s.stage==='feedback') {
    const correct=s.answerId===entry.id;
    const secure=correct&&s.confidence==='sure'&&!s.helped;
    const selected=memoryItem(s.answerId);
    const contrast=correct?entry.options.map(memoryItem).find(q=>q.id!==item.id):selected;
    content=`<section class="memory-feedback ${correct?'is-right':'is-wrong'}" role="status"><h3>${correct?'Đúng rồi':'Chưa đúng'}${correct&&!secure?' · Mình sẽ cho ôn lại':''}</h3><p class="memory-answer"><strong>${e(item.term)}</strong><span>${e(item.def)}</span></p><p>${e(item.vn)}</p><p><b>Cách nhớ:</b> ${e(item.tip||item.clue)}</p>${contrast?`<details class="memory-contrast"><summary>${correct?'Phân biệt với '+e(contrast.term):'Vì sao lựa chọn của bạn khác?'}</summary><p><strong>${e(contrast.term)}:</strong> ${e(contrast.def)}</p><p>${e(contrast.vn)}</p></details>`:''}<p class="memory-note">${secure?'Đã lưu. Lần ôn tiếp theo dựa trên số ngày bạn nhớ đúng.':'Câu này vẫn ở nhóm cần ôn. Bạn sẽ gặp lại sau các câu khác hoặc trong lượt ôn kế tiếp.'}</p></section><div class="memory-actions"><button class="btn-primary" id="memory-next" onclick="nextMemory()">${s.index===s.queue.length-1?'Xem kết quả lượt':'Câu tiếp theo'}</button></div>`;
  }
  container.innerHTML=`<section class="memory-study">${top}<div class="memory-session-meta"><span>${answered}/${s.baseIds.length} thuật ngữ đã kiểm tra lần đầu</span><span>${entry.repeat?'Ôn lại':'Lần đầu'} · ${entry.reverse?'Định nghĩa → thuật ngữ':'Thuật ngữ → định nghĩa'}</span></div><section class="memory-question"><h3 id="memory-prompt" tabindex="-1" class="${entry.reverse?'is-definition':''}">${e(prompt)}</h3></section>${content}${memoryOverview()}</section>`;
  saveMemoryProgress();
}
function memoryOverview() {
  const labels={new:'Chưa học',learning:'Cần ôn',retained:'Nhớ qua nhiều buổi'};
  return `<details class="memory-overview"><summary>Tiến trình của cả ${DATASET.part1Data.length} thuật ngữ</summary><p>Ngày ôn được lưu trên trình duyệt này. Thuật ngữ từng làm đúng cũng quay lại khi đến lịch.</p><ul>${DATASET.part1Data.map(q=>{const h=memoryHistory(q.id),status=memoryStatus(q.id);return `<li><span>${escapeHTML(q.term)}</span><span>${labels[status]}${h?.due<=Date.now()?' · đến lịch':''}</span></li>`;}).join('')}</ul></details>`;
}
function revealMemory(helped) {
  if(memorySession?.stage!=='recall')return;
  memorySession.helped=helped;memorySession.stage='choose';renderMemoryStudy();
  document.querySelector('.memory-options button')?.focus();
}
function chooseMemory(id) {
  const s=memorySession;if(s?.stage!=='choose'||!s.queue[s.index].options.includes(id))return;
  s.answerId=id;s.stage='confidence';renderMemoryStudy();
  document.querySelector('.memory-confidence .btn-primary')?.focus({preventScroll:true});
  scrollMemorySection('.memory-confidence');
}
function changeMemoryAnswer() { if(memorySession?.stage!=='confidence')return;memorySession.stage='choose';memorySession.answerId=null;renderMemoryStudy(); }
function recordMemory(entry,correct,confidence,helped,now=Date.now()) {
  const q=getQuestionsForMode('part1').find(q=>q.id==='part1:'+entry.id);
  record(q,correct);
  const h=memoryHistory(entry.id), previous=h.memory||{attempts:0,days:[],lapses:0};
  const secure=correct&&confidence==='sure'&&!helped;
  let days=previous.days||[];
  if(secure)days=[...new Set([...days,memoryDay(now)])].slice(-4);else days=[];
  h.memory={attempts:previous.attempts+1,days,lapses:previous.lapses+(correct?0:1),lastConfidence:confidence,lastHelped:helped,lastReverse:entry.reverse,lastSeen:now};
  h.due=secure?now+[1,3,7,14][Math.min(days.length-1,3)]*MEMORY_DAY:now;
}
function scheduleMemoryRepeat(entry) {
  const s=memorySession;
  if(entry.repeat)return;
  const upcoming=s.queue.slice(s.index+1,s.index+4);
  const exclude=new Set([entry.id,...upcoming.map(q=>q.id)]);
  const fillers=s.baseIds.filter(id=>!exclude.has(id));
  while(upcoming.length<3&&fillers.length) {
    const id=fillers.shift();const extra=makeMemoryEntry(id,!entry.reverse,true);
    s.queue.push(extra);upcoming.push(extra);
  }
  // Never immediately show the just-revealed answer as a new test.
  if(upcoming.length>=2)s.queue.splice(s.index+1+upcoming.length,0,makeMemoryEntry(entry.id,!entry.reverse,true));
}
function rateMemory(confidence) {
  const s=memorySession;if(s?.stage!=='confidence'||!['sure','unsure'].includes(confidence))return;
  const entry=s.queue[s.index],correct=s.answerId===entry.id;
  s.confidence=confidence;
  recordMemory(entry,correct,confidence,s.helped);
  s.results.push({id:entry.id,correct,confidence,helped:s.helped,repeat:entry.repeat,reverse:entry.reverse,at:Date.now()});
  if(!correct||confidence==='unsure'||s.helped)scheduleMemoryRepeat(entry);
  s.stage='feedback';renderMemoryStudy();triggerChime(correct, document.querySelector('.memory-feedback'));
  document.getElementById('memory-next')?.focus({preventScroll:true});
  scrollMemorySection('.memory-feedback');
}
function scrollMemorySection(selector) { document.querySelector(selector)?.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'}); }
function nextMemory() {
  const s=memorySession;if(s?.stage!=='feedback')return;
  s.index++;s.stage=s.index>=s.queue.length?'complete':'recall';s.answerId=null;s.confidence=null;s.helped=false;
  renderMemoryStudy();document.getElementById('memory-prompt')?.focus({preventScroll:true});
  document.getElementById('active-card-container').scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
function newMemoryRound(early=false) { memorySession=createMemorySession(early);renderMemoryStudy(); }
function handleMemoryKey(e) {
  if(e.ctrlKey||e.metaKey||e.altKey||e.target.matches('input,textarea,select')||e.target.isContentEditable)return;
  if(e.repeat){e.preventDefault();e.stopImmediatePropagation();return;}
  e.stopImmediatePropagation();
  const s=memorySession;if(!s)return;
  if(s.stage==='choose'&&/^[1-4]$/.test(e.key)){e.preventDefault();chooseMemory(s.queue[s.index].options[Number(e.key)-1]);}
  if(e.target.closest('button,summary,a'))return;
  if(e.key==='Enter'||e.key===' '){
    if(s.stage==='recall'){e.preventDefault();revealMemory(false);}
    else if(s.stage==='feedback'){e.preventDefault();nextMemory();}
  }
}
