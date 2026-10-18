// Progressive enhancement for the original static quiz; no build step required.
function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}
function escapeRegex(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
const STORE = 'it-english-study-v2';
let saved = {version:2, sessions:{}, history:{}, muted:true};
try {
  const data = JSON.parse(localStorage.getItem(STORE));
  if (data?.version === 2 && data.sessions && data.history) saved = data;
} catch {}
let exam = null;
let undoPair = null;
let restoring = false;
let workspace = saved.workspace || 'practice';
let currentKey = '';
let boardSize = saved.boardSize || 6;
let boardPage = saved.boardPage || 0;
function getBoardData() { return DATASET.part1Data.slice(boardPage*boardSize,(boardPage+1)*boardSize); }
// Introduce the memory mode once, preserving existing board/choice sessions.
if(!saved.memoryRevision) {
  const old=saved.sessions['practice:part1'];
  if(old && ['board','choice'].includes(old.part1SubMode)) {
    saved.part1Modes ||= {};
    saved.part1Modes[old.part1SubMode]=JSON.parse(JSON.stringify(old));
    delete saved.sessions['practice:part1'];
  }
  saved.part1Preference='memory';saved.memoryRevision=1;
}
if(validMemorySession(saved.memorySession))memorySession=saved.memorySession;
const originalBuild = buildQuestionSet;
const originalRender = renderCurrentQuestion;
const originalFeedback = showFeedback;
const shell = document.querySelector('.app-shell');
const bar = document.createElement('section');
bar.className = 'study-navigation';
bar.innerHTML = `<div class="study-tabs" aria-label="Mục đích học"><button data-workspace="practice">Luyện tập</button><button data-workspace="exam">Thi thử</button><button data-workspace="review">Cần ôn <span id="due-count">0</span></button></div><div id="study-context"></div><div class="session-tools"><span id="save-status" role="status">Tự động lưu trên thiết bị này</span><button class="btn-quiet" id="new-session">Bắt đầu mới</button></div>`;
document.querySelector('.top-bar').after(bar);
const live = document.createElement('div');
live.id = 'study-notice'; live.setAttribute('role','status'); shell.append(live);
function notice(message) { live.textContent = message; }
function persist() {
  try { localStorage.setItem(STORE, JSON.stringify(saved)); }
  catch { const message='Không lưu được trên thiết bị này; hãy giữ trang đang mở.';document.getElementById('save-status').textContent=message;notice(message); }
}
function snapshot() {
  if (restoring || !currentKey) return;
  saved.sessions[currentKey] = {activeMode,part1SubMode,questions,curIdx,correctCount,wrongCount,missedItems,isReviewingMissed,isAnswered,matchingState,exam};
  if(workspace==='practice'&&activeMode==='part1')saved.part1Preference=part1SubMode;
  if(memorySession)saved.memorySession=memorySession;
  saved.lastMode = activeMode; saved.workspace = workspace; saved.muted = audioMuted; saved.boardSize=boardSize; saved.boardPage=boardPage;
  persist(); updateNavigation();
}
function weakQuestions() {
  return Object.values(saved.history).filter(h => (h.right > 0 || h.wrong > 0) && (!h.due || h.due <= Date.now())).map(h => h.question);
}
function record(q, correct) {
  if (!q.id) return;
  const h = saved.history[q.id] || {question:q,right:0,wrong:0,streak:0};
  h.question = q; h[correct ? 'right' : 'wrong']++;
  h.streak = correct ? h.streak + 1 : 0;
  if(!correct&&h.memory)h.memory.days=[];
  h.due = Date.now() + (correct ? [1,3,7,14][Math.min(h.streak-1,3)] * 86400000 : 0);
  saved.history[q.id] = h;
}
function updateNavigation() {
  bar.querySelectorAll('[data-workspace]').forEach(b => { b.classList.toggle('active', b.dataset.workspace === workspace); b.setAttribute('aria-pressed',b.dataset.workspace === workspace); });
  document.getElementById('due-count').textContent = weakQuestions().length;
  document.querySelector('.segmented-control').hidden = workspace !== 'practice';
  document.querySelectorAll('.segmented-control .seg-item').forEach(b => {
    const active = b.dataset.mode === activeMode;
    b.classList.toggle('active',active); b.setAttribute('aria-selected',active);
  });
  document.querySelector('[data-mode="all"]').hidden = true;
  document.getElementById('study-context').innerHTML = workspace === 'exam'
    ? '<strong>Thi thử tổng hợp · 45 câu</strong><p>15 câu mỗi phần. Có thể sửa đáp án trước khi nộp; kết quả chỉ hiện khi kết thúc.</p>'
    : workspace === 'review' ? '<strong>Ôn lại câu đến lịch</strong><p>Câu từng đúng cũng cần ôn lại. Để luyện tự nhớ và mức chắc chắn cho thuật ngữ, chọn Bài 1 → Học nhớ.</p>'
    : '<strong>Học từng bước, nhớ lâu hơn</strong><p>Chọn phần bên dưới. Phiên đang học được tự động giữ lại khi đổi phần hoặc mở lại trang.</p>';
  document.getElementById('btn-shuffle').title = 'Bắt đầu phiên mới (R)';
  document.getElementById('audio-label').textContent = audioMuted ? 'Tắt âm' : 'Âm thanh';
  document.getElementById('btn-audio').setAttribute('aria-pressed',!audioMuted);
  document.getElementById('btn-audio').classList.toggle('is-active',!audioMuted);
}
function enter(mode, fresh=false) {
  snapshot();
  currentKey = workspace + ':' + mode;
  const state = fresh ? null : saved.sessions[currentKey];
  if(workspace==='practice'&&mode==='part1'&&!state)part1SubMode=saved.part1Preference||'memory';
  restoring = true;
  undoPair = null;
  exam = null; activeMode = mode;
  if(workspace==='practice'&&mode==='part1'&&(state?.part1SubMode||part1SubMode)==='memory') {
    part1SubMode='memory';
    if(fresh||!validMemorySession(memorySession))memorySession=createMemorySession();
    renderMemoryStudy();
  } else if (state && Array.isArray(state.questions) && state.matchingState && Number.isInteger(state.curIdx)) {
    ({part1SubMode,questions,curIdx,correctCount,wrongCount,missedItems,isReviewingMissed,matchingState,exam} = JSON.parse(JSON.stringify(state)));
    if (workspace === 'practice' && mode === 'part1' && part1SubMode === 'board') renderMatchingBoard();
    else {
      renderCurrentQuestion();
      if (state.isAnswered && curIdx < questions.length && !exam) {
        isAnswered = true;
        document.querySelectorAll('.choice-row,.binary-btn').forEach(b => b.disabled=true);
        const q=questions[curIdx]; originalFeedback(q.lastCorrect,q);
      }
    }
  } else if (workspace === 'review') {
    questions=shuffle(weakQuestions()); curIdx=0; correctCount=0; wrongCount=0; missedItems=[]; isReviewingMissed=true;
    renderCurrentQuestion();
  } else {
    if (workspace === 'exam') exam={answers:{},flags:{},started:Date.now(),submitted:false};
    originalBuild(mode);
  }
  restoring=false; snapshot();
}
buildQuestionSet = function(mode) {
  if (mode === 'all') workspace='exam';
  enter(mode, mode === activeMode && currentKey === workspace + ':' + mode);
};
function startFresh() {
  if(workspace==='practice'&&activeMode==='part1'&&part1SubMode==='memory') {
    if(memorySession?.stage!=='complete'&&!confirm('Bắt đầu lượt học mới? Lịch ôn và kết quả đã ghi vẫn được giữ.'))return;
    newMemoryRound();return;
  }
  if ((questions.length && curIdx < questions.length) || (matchingState.terms.length && !matchingState.isGraded)) {
    if (!confirm('Bắt đầu phiên mới? Kết quả đang làm của phiên này sẽ được thay thế.')) return;
  }
  enter(workspace === 'practice' ? activeMode : 'all',true);
}
document.getElementById('new-session').onclick=startFresh;
bar.querySelectorAll('[data-workspace]').forEach(b => b.onclick=()=>{
  if (workspace === b.dataset.workspace) return;
  snapshot(); workspace=b.dataset.workspace;
  enter(workspace === 'practice' ? 'part1' : 'all');
});
// Intercept destructive restart and mode controls before the original listeners.
document.addEventListener('click', e => {
  if (e.target.closest('#btn-shuffle')) { e.preventDefault(); e.stopImmediatePropagation(); startFresh(); }
  const tab=e.target.closest('.segmented-control [data-mode]');
  if (tab) { e.preventDefault(); e.stopImmediatePropagation(); enter(tab.dataset.mode); }
  if (e.target.closest('#btn-audio')) setTimeout(snapshot,0);
},true);
window.addEventListener('keydown',e=>{
  if(workspace==='practice'&&activeMode==='part1'&&part1SubMode==='memory'&&e.key.toLowerCase()!=='r') {handleMemoryKey(e);return;}
  if (e.key === 'Escape') {
    if (matchingState.pickerTargetTermId) closeDefPicker();
    else if (matchingState.showCheatSheet) toggleCheatSheet();
  }
  if (e.key.toLowerCase()==='r' && !e.ctrlKey && !e.metaKey && !e.altKey && !e.repeat && !e.target.matches('input,textarea,select') && !e.target.isContentEditable) {
    e.preventDefault(); e.stopImmediatePropagation(); startFresh();
  }
  if(workspace==='practice'&&activeMode==='part1'&&part1SubMode==='board'&&!e.target.matches('input,textarea,select')&&!e.target.isContentEditable) {
    if(e.key==='ArrowRight'||e.key==='ArrowLeft') {e.preventDefault();moveGuidedTerm(e.key==='ArrowRight'?1:-1);}
    e.stopImmediatePropagation();
  }
},true);
renderCurrentQuestion = function() {
  document.body.classList.remove('guided-study');
  shell.classList.remove('is-matching-mode');
  document.querySelector('.shortcuts-footer').hidden=false;
  if (workspace === 'review' && !questions.length) {
    document.getElementById('active-card-container').innerHTML='<article class="console-card"><h2>Chưa có câu cần ôn</h2><p>Câu trả lời sai sẽ xuất hiện ở đây. Những câu đã trả lời đúng sẽ quay lại khi đến lịch ôn.</p><button class="btn-primary" id="back-practice">Về luyện tập</button></article>';
    document.getElementById('back-practice').onclick=()=>bar.querySelector('[data-workspace="practice"]').click();
    correctCount=wrongCount=0; syncMetrics(); snapshot(); return;
  }
  originalRender();
  if (workspace === 'practice' && activeMode === 'part1') {
    const toggle=document.createElement('div'); toggle.className='mode-switch';
    toggle.innerHTML=part1ModeNav();
    document.getElementById('active-card-container').prepend(toggle);
  }
  if (exam && !exam.submitted && curIdx < questions.length) renderExamControls();
  if (exam?.submitted && curIdx >= questions.length) renderExamReview();
  document.querySelector('.track-line').setAttribute('aria-valuenow',parseFloat(document.getElementById('track-fill').style.width)||0);
  snapshot();
};
showFeedback = function(correct,q) {
  q.lastCorrect=correct; record(q,correct); originalFeedback(correct,q);
  document.getElementById('feedback-anchor').setAttribute('role','status'); snapshot();
};
const choiceSubmit=window.submitChoice, binarySubmit=window.submitBinary;
window.submitChoice=function(value,el) { if (exam && !exam.submitted) chooseExam(value); else choiceSubmit(value,el); };
window.submitBinary=function(value,el) { if (exam && !exam.submitted) chooseExam(value); else binarySubmit(value,el); };
function chooseExam(value) { exam.answers[curIdx]=value; renderCurrentQuestion(); }
function renderExamControls() {
  const answer=exam.answers[curIdx];
  isAnswered=false;
  document.querySelectorAll('.choice-row,.binary-btn').forEach(b=>{
    const selected=String(answer)===b.dataset.value;
    b.classList.toggle('exam-selected',selected); b.setAttribute('aria-pressed',selected);
  });
  const controls=document.getElementById('controls-row'); controls.style.display='flex';
  controls.innerHTML=`<button class="btn-quiet" onclick="examMove(-1)" ${curIdx===0?'disabled':''}>Câu trước</button><button class="btn-quiet" onclick="examFlag()" aria-pressed="${!!exam.flags[curIdx]}">${exam.flags[curIdx]?'Đã đánh dấu':'Đánh dấu xem lại'}</button><button class="btn-primary" onclick="${curIdx===questions.length-1?'submitExam()':'examMove(1)'}">${curIdx===questions.length-1?'Nộp bài':'Câu tiếp theo'}</button>`;
  const nav=document.createElement('div'); nav.className='exam-map';
  nav.innerHTML=`<p>Đã chọn ${Object.keys(exam.answers).length}/${questions.length} · Viền vàng: cần xem lại</p><div>${questions.map((q,i)=>`<button class="${i===curIdx?'current ':''}${Object.hasOwn(exam.answers,i)?'answered ':''}${exam.flags[i]?'flagged':''}" aria-label="Câu ${i+1}${Object.hasOwn(exam.answers,i)?', đã trả lời':''}" aria-current="${i===curIdx?'step':'false'}" onclick="examGo(${i})">${i+1}</button>`).join('')}</div><button class="btn-quiet" onclick="submitExam()">Nộp bài thi</button>`;
  document.getElementById('active-card-container').append(nav);
  document.getElementById('metric-cur').textContent=Object.keys(exam.answers).length;
  document.getElementById('metric-correct').textContent='—'; document.getElementById('metric-wrong').textContent='—'; document.getElementById('metric-pct').textContent='Chưa chấm';
  document.getElementById('track-fill').style.width=Object.keys(exam.answers).length/questions.length*100+'%';
}
window.examGo=i=>{curIdx=i;renderCurrentQuestion();};
window.examMove=delta=>examGo(Math.max(0,Math.min(questions.length-1,curIdx+delta)));
window.examFlag=()=>{exam.flags[curIdx]=!exam.flags[curIdx];renderCurrentQuestion();};
window.submitExam=()=>{
  const left=questions.length-Object.keys(exam.answers).length;
  if (!confirm(left?`Còn ${left} câu chưa trả lời. Nộp bài ngay?`:'Nộp bài và xem kết quả?')) return;
  correctCount=0; wrongCount=0; missedItems=[];
  questions.forEach((q,i)=>{const correct=String(exam.answers[i]??'').trim().toLowerCase()===String(q.correctAnswer).trim().toLowerCase();if(correct)correctCount++;else {wrongCount++;missedItems.push(q);} record(q,correct);});
  exam.submitted=true; curIdx=questions.length; renderCurrentQuestion();
  snapshot();
};
function renderExamReview() {
  const review=document.createElement('section'); review.className='exam-review';
  review.innerHTML='<h2>Xem lại bài thi</h2>'+questions.map((q,i)=>`<details><summary>${i+1}. ${escapeHTML(q.prompt)} <span>${String(exam.answers[i]??'')===String(q.correctAnswer)?'✓':'✕'}</span></summary><p>Bạn chọn: ${escapeHTML(exam.answers[i]??'Chưa trả lời')}</p><p>Đáp án: <strong>${escapeHTML(q.correctAnswer)}</strong></p><p>${escapeHTML(q.explanation)}</p></details>`).join('');
  document.getElementById('active-card-container').append(review);
}
window.reviewMissedQueue=()=>{
  const queue=shuffle([...missedItems]);
  snapshot();workspace='review';currentKey='review:all';activeMode='all';exam=null;
  questions=queue;curIdx=0;correctCount=0;wrongCount=0;missedItems=[];isReviewingMissed=true;
  renderCurrentQuestion();snapshot();
};
const pairOriginal=window.pairTermWithLetter;
window.pairTermWithLetter=(id,letter)=>{
  if(matchingState.isGraded)return;
  undoPair=JSON.parse(JSON.stringify(matchingState));
  const replaced=matchingState.terms.find(t=>t.id!==id && t.userLetter===letter && letter);
  pairOriginal(id,letter);
  notice(replaced?`Đã chuyển định nghĩa ${letter} từ câu ${replaced.id} sang câu ${id}. Có thể hoàn tác.`:'Đã cập nhật cặp nối.'); snapshot();
};
window.undoMatching=()=>{if(!undoPair)return;matchingState=undoPair;undoPair=null;renderMatchingBoard();snapshot();notice('Đã hoàn tác lần nối cuối.');};
renderMatchingBoard=function(){
  document.body.classList.add('guided-study');
  isAnswered=false;
  shell.classList.remove('is-matching-mode');
  renderGuidedMatching(); syncMatchingMetrics();
  document.querySelector('.shortcuts-footer').hidden=true;
  document.querySelector('.track-line').setAttribute('aria-valuenow',parseFloat(document.getElementById('track-fill').style.width)||0);
  snapshot();
};
const gradeOriginal=window.gradeMatchingBoard;
window.gradeMatchingBoard=()=>{
  if(matchingState.isGraded)return;
  const left=matchingState.terms.filter(t=>!t.userLetter).length;
  if(left&&!confirm(`Còn ${left} câu chưa nối. Chấm bài ngay?`))return;
  matchingState.searchQuery='';
  gradeOriginal();
  matchingState.terms.forEach(t=>record(getQuestionsForMode('part1').find(q=>q.id==='part1:'+t.id),!!t.isCorrect));snapshot();
};
const resetOriginal=window.resetMatchingBoard;
window.resetMatchingBoard=()=>{if(confirm('Xóa các cặp đã nối để làm lại?')){undoPair=null;resetOriginal();snapshot();}};
window.shuffleMatchingDefs=()=>{if(confirm('Trộn lại sẽ xóa các cặp đang nối. Tiếp tục?')){undoPair=null;initMatchingBoard();snapshot();}};
window.setPart1SubMode=subMode=>{
  if(subMode===part1SubMode)return;
  snapshot();
  saved.part1Modes ||= {};
  saved.part1Modes[part1SubMode]=JSON.parse(JSON.stringify(saved.sessions['practice:part1']));
  const target=saved.part1Modes[subMode];
  if(target)saved.sessions['practice:part1']=target;else delete saved.sessions['practice:part1'];
  part1SubMode=subMode;saved.part1Preference=subMode;restoring=true;
  enter('part1',!target);
};
window.addEventListener('pagehide',snapshot);
audioMuted=saved.muted;
enter(workspace==='practice'?(saved.lastMode==='all'?'part1':saved.lastMode||'part1'):'all');
