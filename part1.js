// Focused matching: one term and its definitions share the same reading context.
function renderGuidedMatching() {
  const state = matchingState;
  if (!state.terms.some(t => t.id === state.focusTermId)) {
    state.focusTermId = (state.terms.find(t => !t.userLetter) || state.terms[0])?.id;
  }
  const term = state.terms.find(t => t.id === state.focusTermId);
  if (!term) return;
  const index = state.terms.indexOf(term);
  const paired = state.terms.filter(t => t.userLetter).length;
  const total = state.terms.length;
  const currentDef = state.definitions.find(d => d.letter === term.userLetter);
  const correctDef = state.definitions.find(d => d.letter === term.correctLetter);
  const hideUsed = state.hideUsed !== false;
  const e = escapeHTML;
  const options = state.definitions.map(d => {
    const owner = state.terms.find(t => t.id === d.matchedTermId);
    const selected = term.userLetter === d.letter;
    const correct = state.isGraded && d.letter === term.correctLetter;
    const wrong = state.isGraded && selected && !correct;
    return `<button type="button" class="guided-option ${selected ? 'is-picked' : ''} ${correct ? 'is-right' : ''} ${wrong ? 'is-wrong' : ''}" data-letter="${d.letter}" data-used="${!!owner && owner.id !== term.id}" aria-pressed="${selected}" ${state.isGraded ? 'disabled' : ''} onclick="pickGuidedDefinition('${d.letter}')">
      <span class="guided-letter">${d.letter}</span><span class="guided-definition">${e(d.def)}<span class="guided-option-state">${correct ? '✓ Đáp án đúng' : wrong ? '✕ Bạn đã chọn' : selected ? '✓ Đang chọn' : owner ? 'Đã ghép với: ' + e(owner.term) : ''}</span></span>
    </button>`;
  }).join('');
  const maxTerms = DATASET.part1Data.length;
  const batches = [6,12].map(size => `<optgroup label="Mỗi lượt ${size} câu">${Array.from({length:Math.ceil(maxTerms/size)},(_,i)=>`<option value="${size}:${i}" ${boardSize===size&&boardPage===i?'selected':''}>Câu ${i*size+1}–${Math.min((i+1)*size, maxTerms)}</option>`).join('')}</optgroup>`).join('');
  const feedback = state.isGraded ? `<section class="guided-feedback ${term.isCorrect?'is-right':'is-wrong'}" role="status"><strong>${term.isCorrect?'Đúng rồi':'Chưa đúng'}${!term.userLetter?' · Bạn chưa chọn định nghĩa':''}</strong><p><b>Đáp án:</b> ${e(correctDef?.def)}</p><details><summary>Giải thích và cách nhớ</summary><p>${e(term.vn)}</p><p><b>Dấu hiệu:</b> ${e(term.clue)}</p><p><b>Cách nhớ:</b> ${e(term.tip)}</p></details></section>` : '';
  document.getElementById('active-card-container').innerHTML = `<section class="guided-matching" aria-label="Ghép thuật ngữ từng câu">${part1ModeNav()}
    <div class="guided-intro"><div><h2>Ghép thuật ngữ với định nghĩa</h2><p>Chọn từng cặp như bài thi. Đáp án hiện sau khi chấm lượt.</p></div></div>
    <div class="guided-settings"><label for="board-batch">Lượt học</label><select id="board-batch" onchange="changeGuidedBatch(this.value)">${batches}<option value="48:0" ${boardSize===48?'selected':''}>48 câu đề cương</option><option value="${maxTerms}:0" ${boardSize===maxTerms?'selected':''}>Toàn bộ ${maxTerms} câu</option></select><span>${paired}/${total} câu đã chọn</span></div>
    ${state.isGraded?`<section id="matching-summary-banner" class="guided-result"><h3>Đúng ${state.score}/${total} câu</h3><p>Chọn từng câu bên dưới để xem lại đáp án và giải thích.</p><div>${state.score<total?'<button class="btn-primary" onclick="reviewOnlyWrongTerms()">Luyện lại câu sai</button>':''}<button class="btn-quiet" onclick="nextGuidedBatch()">${boardSize===maxTerms||boardSize===48?'Làm lượt mới':'Học lượt tiếp theo'}</button></div></section>`:''}
    <div class="guided-question" id="guided-question"><div class="guided-question-meta"><span>Câu ${index+1} / ${total}</span><span>${state.isGraded ? term.isCorrect?'✓ Đúng':'✕ Cần ôn' : currentDef?'Đã chọn '+term.userLetter:'Chưa chọn định nghĩa'}</span></div><h3 tabindex="-1" id="guided-term">${e(term.term)}</h3>${!state.isGraded?'<p>Mỗi định nghĩa dùng cho một thuật ngữ trong lượt này.</p>':''}</div>
    <div class="guided-filters"><label class="guided-search-label" for="guided-search">Tìm định nghĩa<input id="guided-search" class="def-search-input" type="search" placeholder="Nhập từ có trong định nghĩa…" value="${e(state.searchQuery)}" oninput="filterGuidedDefinitions(this.value)"></label>${!state.isGraded?`<label class="guided-hide-used"><input type="checkbox" ${hideUsed?'checked':''} onchange="setGuidedHideUsed(this.checked)"> Ẩn đáp án đã dùng</label>`:''}</div>
    <div class="guided-options" role="group" aria-labelledby="guided-term">${options}</div><p id="guided-empty" hidden>Không có định nghĩa phù hợp. Thử từ khác hoặc bỏ chọn “Ẩn đáp án đã dùng”.</p>
    ${feedback}
    <div class="guided-controls"><button class="btn-quiet" onclick="moveGuidedTerm(-1)" ${index===0?'disabled':''}>Câu trước</button><button class="btn-quiet" onclick="undoMatching()" ${!undoPair||state.isGraded?'disabled':''}>Hoàn tác</button>${index<total-1?`<button class="btn-primary" onclick="moveGuidedTerm(1)">${term.userLetter||state.isGraded?'Câu tiếp theo':'Để sau'}</button>`:state.isGraded?'<button class="btn-primary" onclick="nextGuidedBatch()">Học tiếp</button>':'<button class="btn-primary" onclick="gradeMatchingBoard()">Chấm lượt này</button>'}</div>
    <details class="guided-overview"><summary>Xem ${total} câu trong lượt · ${total-paired} câu chưa chọn</summary><div class="guided-question-map">${state.terms.map((t,i)=>`<button class="${t.id===term.id?'is-current ':''}${state.isGraded?t.isCorrect?'is-right':'is-wrong':t.userLetter?'is-answered':''}" aria-current="${t.id===term.id?'step':'false'}" onclick="goGuidedTerm(${t.id})"><span>${i+1}. ${e(t.term)}</span><span>${state.isGraded?t.isCorrect?'✓ Đúng':'✕ Sai':t.userLetter?'Đã chọn '+t.userLetter:'Chưa chọn'}</span></button>`).join('')}</div></details>
    ${!state.isGraded?`<div class="guided-finish"><span>${paired===total?'Đã chọn đủ. Bạn có thể chấm hoặc quay lại sửa.':`Bạn có thể quay lại các câu đã bỏ qua trước khi chấm.`}</span><button class="btn-quiet" onclick="gradeMatchingBoard()">Chấm lượt này (${paired}/${total})</button></div>`:''}
  </section>`;
  filterGuidedDefinitions(state.searchQuery || '');
}
function filterGuidedDefinitions(query) {
  matchingState.searchQuery = query;
  const q = query.trim().toLowerCase();
  let count=0;
  document.querySelectorAll('.guided-option').forEach(el => {
    const d=matchingState.definitions.find(d=>d.letter===el.dataset.letter);
    const used=el.dataset.used==='true' && matchingState.hideUsed!==false && !matchingState.isGraded;
    el.hidden=used || !(d.def.toLowerCase().includes(q) || d.letter.toLowerCase()===q || !q);
    if(!el.hidden)count++;
  });
  document.getElementById('guided-empty').hidden=count>0;
}
function setGuidedHideUsed(value) { matchingState.hideUsed=value;filterGuidedDefinitions(matchingState.searchQuery||'');snapshot(); }
function pickGuidedDefinition(letter) {
  if(matchingState.isGraded)return;
  const id=matchingState.focusTermId;
  const old=matchingState.terms.find(t=>t.id!==id&&t.userLetter===letter);
  if(old&&!confirm(`Định nghĩa ${letter} đang ghép với “${old.term}”. Chuyển sang câu này?`))return;
  window.pairTermWithLetter(id,letter);
  document.querySelector('.guided-controls .btn-primary')?.focus({preventScroll:true});
}
function goGuidedTerm(id) {
  if(!matchingState.terms.some(t=>t.id===id))return;
  matchingState.focusTermId=id;matchingState.searchQuery='';
  renderMatchingBoard();
  const heading=document.getElementById('guided-term');heading?.focus({preventScroll:true});
  document.getElementById('guided-question')?.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
function moveGuidedTerm(delta) {
  const index=matchingState.terms.findIndex(t=>t.id===matchingState.focusTermId);
  const term=matchingState.terms[index+delta];if(term)goGuidedTerm(term.id);
}
function changeGuidedBatch(value) {
  if(matchingState.terms.some(t=>t.userLetter)&&!matchingState.isGraded&&!confirm('Đổi lượt sẽ bắt đầu nhóm câu mới. Tiếp tục?')){renderMatchingBoard();return;}
  const [size,page]=value.split(':').map(Number);
  boardSize=size;boardPage=page;undoPair=null;initMatchingBoard();snapshot();
}
function nextGuidedBatch() {
  const maxTerms = DATASET.part1Data.length;
  if(boardSize===maxTerms || boardSize===48){undoPair=null;matchingState.keepTermOrder=false;initMatchingBoard();snapshot();return;}
  changeGuidedBatch(`${boardSize}:${(boardPage+1)%(Math.ceil(maxTerms/boardSize))}`);
}
