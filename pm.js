// Independent, local-only progress for the software project management subject.
(() => {
  'use strict';
  const STORE_PM='software-project-management-v1';
  const SUBJECT_KEY='study-subject-v1';
  const DAY=86400000;
  const root=document.getElementById('active-card-container');
  const e=escapeHTML;
  const questions=PM_BANK.questions;
  const questionById=new Map(questions.map(q=>[q.id,q]));
  const pointById=new Map();
  for(const q of questions)for(const section of q.sections)for(const point of section.points)pointById.set(point.id,{...point,questionId:q.id,section:section.label});
  const defaults=()=>({version:1,mode:'read',topic:'all',search:'',progress:{},learn:null,review:null,exam:null,reading:{questionId:1,hiddenSections:[],readIds:[]}});
  let state=defaults();
  let active='english';
  let storageError=false;
  try {
    const raw=JSON.parse(localStorage.getItem(STORE_PM));
    if(raw?.version===1)state={...defaults(),...raw,progress:raw.progress&&typeof raw.progress==='object'?raw.progress:{}};
  } catch {}
  const allPoints=q=>q.sections.flatMap(section=>section.points);
  const getQuestion=id=>questionById.get(Number(id));
  const plainObject=value=>!!value&&typeof value==='object'&&!Array.isArray(value);
  const hasQuestionIds=session=>session&&Array.isArray(session.ids)&&session.ids.length>0&&session.ids.length<=38&&new Set(session.ids).size===session.ids.length&&session.ids.every(id=>questionById.has(id))&&Number.isInteger(session.index)&&session.index>=0&&session.index<session.ids.length;
  if(!hasQuestionIds(state.learn)||!['recall','check','done','complete'].includes(state.learn.stage)||typeof state.learn.draft!=='string'||!plainObject(state.learn.ratings)||!plainObject(state.learn.results))state.learn=null;
  if(!hasQuestionIds(state.exam)||!['active','submitted'].includes(state.exam.stage)||!plainObject(state.exam.answers)||!Object.values(state.exam.answers).every(value=>typeof value==='string')||!plainObject(state.exam.flags)||!plainObject(state.exam.checks)||!Object.values(state.exam.checks).every(value=>plainObject(value)&&plainObject(value.ratings)))state.exam=null;
  if(!state.review||!Array.isArray(state.review.queue)||state.review.queue.length>24||!state.review.queue.every(item=>item&&pointById.has(item.id))||!Number.isInteger(state.review.index)||state.review.index<0||state.review.index>state.review.queue.length||!['recall','check','complete'].includes(state.review.stage)||typeof state.review.draft!=='string'||!Array.isArray(state.review.results)||(state.review.stage!=='complete'&&state.review.index===state.review.queue.length))state.review=null;
  for(const [id,value] of Object.entries(state.progress))if(!pointById.has(id)||!value||!['remembered','missing','unsure'].includes(value.rating)||!Number.isFinite(value.due)||!Array.isArray(value.days))delete state.progress[id];
  if(!state.readingRevision){state.mode='read';state.readingRevision=1;}
  if(!plainObject(state.reading))state.reading={questionId:1,hiddenSections:[],readIds:[]};
  if(!getQuestion(state.reading.questionId))state.reading.questionId=1;
  state.reading.readIds=Array.isArray(state.reading.readIds)?[...new Set(state.reading.readIds.filter(id=>questionById.has(id)))]:[];
  const validSections=getQuestion(state.reading.questionId).sections.map(section=>section.id);
  state.reading.hiddenSections=Array.isArray(state.reading.hiddenSections)?state.reading.hiddenSections.filter(id=>validSections.includes(id)):[];
  if(!['read','learn','review','exam'].includes(state.mode))state.mode='read';
  const topics=[...new Set(questions.map(q=>q.topic))];
  if(state.topic!=='all'&&!topics.includes(state.topic))state.topic='all';
  state.search=typeof state.search==='string'?state.search.slice(0,160):'';
  const switcher=document.createElement('div');
  switcher.className='subject-switch';
  switcher.innerHTML='<label for="subject-select">Môn học</label><select id="subject-select"><option value="english">Tiếng Anh CNTT</option><option value="pm">Quản lý dự án phần mềm · 38 câu</option></select>';
  document.querySelector('.top-bar').after(switcher);
  switcher.querySelector('select').addEventListener('change',event=>selectSubject(event.target.value));
  document.getElementById('btn-audio').addEventListener('click',()=>{
    if(active!=='pm')return;
    saved.muted=audioMuted;
    document.getElementById('btn-audio').setAttribute('aria-pressed',!audioMuted);
    persist();
  });
  function save() {
    try {localStorage.setItem(STORE_PM,JSON.stringify(state));storageError=false;}
    catch {storageError=true;const error=document.getElementById('pm-save-error');if(error){error.hidden=false;error.textContent='Không lưu được trên trình duyệt này. Hãy giữ trang đang mở.';}}
  }
  function today(now=Date.now()) {return new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);}
  function progress(pointId) {return state.progress[pointId];}
  function isMissing(pointId) {const p=progress(pointId);return p&&(p.rating!=='remembered'||p.assisted);}
  function isDue(pointId) {return progress(pointId)?.due<=Date.now();}
  function isRetained(pointId) {const p=progress(pointId);return p?.rating==='remembered'&&!p.assisted&&p.days.length>=3&&!isDue(pointId);}
  function counts() {
    return {learned:questions.filter(q=>allPoints(q).every(p=>progress(p.id))).length,missing:[...pointById.keys()].filter(isMissing).length,due:[...pointById.keys()].filter(isDue).length,retained:[...pointById.keys()].filter(isRetained).length};
  }
  function recordPoint(pointId,rating,assisted=false) {
    if(!pointById.has(pointId)||!['remembered','missing','unsure'].includes(rating))return;
    const previous=progress(pointId), now=Date.now();
    const independent=rating==='remembered'&&!assisted;
    const days=independent?[...new Set([...(previous?.days||[]),today(now)])].slice(-4):[];
    state.progress[pointId]={rating,assisted,days,attempts:(previous?.attempts||0)+1,lastSeen:now,due:independent?now+[1,3,7,14][Math.min(days.length-1,3)]*DAY:now};
  }
  function questionState(q) {
    const pts=allPoints(q),done=pts.filter(p=>progress(p.id));
    const missing=pts.filter(p=>isMissing(p.id));
    if(missing.length)return `${missing.length} ý cần ôn`;
    if(!done.length)return 'Chưa học';
    if(pts.some(p=>isDue(p.id)))return 'Đến lịch ôn';
    if(pts.every(p=>isRetained(p.id)))return 'Nhớ qua nhiều buổi';
    return 'Đã học · chờ ôn';
  }
  function selectedQuestions() {return questions.filter(q=>state.topic==='all'||q.topic===state.topic);}
  function normalized(s) {return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase();}
  function filteredQuestions() {const query=normalized(state.search);return selectedQuestions().filter(q=>!query||normalized(`${q.id} ${q.title} ${q.prompt}`).includes(query));}
  function selectSubject(subject) {
    if(subject==='pm') {
      if(active==='english')snapshot();
      active='pm';document.body.dataset.subject='pm';document.body.classList.add('pm-study');document.body.classList.remove('guided-study');
      document.querySelector('.app-brand-title span')?.replaceChildren(document.createTextNode('Ôn tập'));
      render();
    } else {
      active='english';delete document.body.dataset.subject;document.body.classList.remove('pm-study');
      const title=document.querySelector('.app-brand-title span');if(title)title.textContent='IT English';
      const mode=saved.lastMode||'part1';
      enter(workspace==='practice'?(mode==='all'?'part1':mode):'all');
    }
    switcher.querySelector('select').value=active;
    try{localStorage.setItem(SUBJECT_KEY,active);}catch{}
    try {const url=new URL(location.href);url.searchParams.set('subject',active);history.replaceState(null,'',url);}catch{}
    document.getElementById('study-notice').textContent='';
  }
  function header() {
    const c=counts();
    return `<header class="pm-header"><h2>Quản lý dự án phần mềm</h2><p>38 câu tự luận · Học trước, tự kiểm tra sau.</p></header><nav class="pm-tabs" aria-label="Cách học Quản lý dự án">${[['read','Học thuộc'],['learn','Tự kiểm tra'],['review','Ôn ý thiếu'],['exam','Thi tự luận']].map(([mode,label])=>`<button class="btn-quiet" type="button" data-pm-action="mode" data-value="${mode}" aria-pressed="${state.mode===mode}">${label}${mode==='review'&&c.missing?` <span>${c.missing}</span>`:''}</button>`).join('')}</nav><p id="pm-save-error" class="pm-error" role="status" ${storageError?'':'hidden'}>Không lưu được trên trình duyệt này. Hãy giữ trang đang mở.</p>`;
  }
  function topicFilter() {return `<label>Chủ đề<select data-pm-field="topic"><option value="all">Tất cả chủ đề</option>${topics.map(topic=>`<option value="${e(topic)}" ${topic===state.topic?'selected':''}>${e(topic)}</option>`).join('')}</select></label>`;}
  function source(q) {
    return `<details class="pm-reference"><summary>Đáp án gốc · trang ${q.pages.join(', ')}</summary><div class="pm-source"><p>Trích tài liệu thick.pdf. Đây là tài liệu ôn tập, chưa xác nhận là đáp án chấm thi.</p><pre>${e(q.sourceAnswer)}</pre></div></details>`;
  }
  function note(q) {return q.sourceNote?`<aside class="pm-note"><strong>Lưu ý tài liệu</strong><p>${e(q.sourceNote)}</p><p>Danh sách đối chiếu chỉ gồm các ý có trong tài liệu; chưa dùng để kết luận đã đủ toàn bộ yêu cầu đề.</p></aside>`:'';}
  function questionHeading(q,meta='') {return `<div class="pm-meta">Câu ${q.id} · ${e(q.topic)}${meta?' · '+e(meta):''}</div><section class="pm-question"><h3 tabindex="-1">${e(q.prompt)}</h3></section>`;}
  function draftField(value,label='Tự viết dàn ý hoặc câu trả lời',field='draft',readOnly=false) {return `<label class="pm-draft">${label}<textarea data-pm-field="${field}" spellcheck="false" maxlength="30000" ${readOnly?'readonly':''} placeholder="Viết các ý bạn nhớ bằng lời của mình…">${e(value)}</textarea></label>`;}
  function outline(q) {return `<section class="pm-outline"><h4>Khung trả lời</h4><ol>${q.sections.map(section=>`<li>${e(section.label)} <span>(${section.points.length} ý)</span></li>`).join('')}</ol><p class="pm-helper">Khung được chia từ đáp án trong tài liệu.</p></section>`;}
  function readView() {
    const list=selectedQuestions(),r=state.reading;
    if(!list.some(q=>q.id===r.questionId)){r.questionId=list[0].id;r.hiddenSections=[];}
    const q=getQuestion(r.questionId),index=list.findIndex(item=>item.id===q.id);
    if(state.learn?.stage==='recall'&&state.learn.ids[state.learn.index]===q.id)state.learn.assisted=true;
    const hidden=new Set(r.hiddenSections),allHidden=q.sections.every(section=>hidden.has(section.id));
    const read=r.readIds.includes(q.id);
    return `<div class="pm-toolbar">${topicFilter()}<label for="pm-read-question">Chọn câu để học<select id="pm-read-question" data-pm-field="read-question">${list.map(item=>`<option value="${item.id}" ${item.id===q.id?'selected':''}>${item.id}. ${e(item.title)}${r.readIds.includes(item.id)?' · đã đọc':''}</option>`).join('')}</select></label></div><div class="pm-reading-meta"><span>${r.readIds.length}/38 câu đã đọc</span><span>Đọc không tính là đã thuộc</span></div>${questionHeading(q)}${outline(q)}${note(q)}<div class="pm-reading-tools"><p>Đọc từng phần, rồi che lại và thử nhắc bằng lời của mình.</p><button class="btn-quiet" data-pm-action="read-hide-all">${allHidden?'Hiện toàn bộ nội dung':'Che toàn bộ nội dung'}</button></div><div class="pm-reading-sections">${q.sections.map(section=>`<section class="pm-reading-section"><div class="pm-reading-section-header"><h4>${e(section.label)}</h4><button class="btn-quiet" data-pm-action="read-toggle" data-value="${e(section.id)}" aria-controls="pm-read-${q.id}-${e(section.id)}" aria-expanded="${!hidden.has(section.id)}">${hidden.has(section.id)?'Hiện ý':'Che ý'}<span class="pm-sr-only">: ${e(section.label)}</span></button></div><ol class="pm-reading-points" id="pm-read-${q.id}-${e(section.id)}" data-pm-section-panel="${e(section.id)}" ${hidden.has(section.id)?'hidden':''}>${section.points.map(point=>`<li>${e(point.text)}</li>`).join('')}</ol>${hidden.has(section.id)?'<p class="pm-helper">Đã che · thử nhắc lại các ý trước khi mở.</p>':''}</section>`).join('')}</div><div class="pm-actions"><button class="btn-quiet" data-pm-action="mark-read" ${read?'disabled':''}>${read?'Đã đọc câu này':'Đánh dấu đã đọc'}</button><button class="btn-primary" data-pm-action="read-test">Tự kiểm tra câu này</button></div><div class="pm-reading-nav"><button class="btn-quiet" data-pm-action="read-move" data-value="-1" ${index===0?'disabled':''}>Câu trước</button><span>${index+1}/${list.length} câu${state.topic==='all'?'':' trong chủ đề'}</span><button class="btn-quiet" data-pm-action="read-move" data-value="1" ${index===list.length-1?'disabled':''}>Câu tiếp theo</button></div>${source(q)}`;
  }
  function goRead(id) {
    if(!getQuestion(id))return;
    if(state.reading.questionId!==id)state.reading.hiddenSections=[];
    state.reading.questionId=id;state.mode='read';save();render();focusQuestion();
  }
  function toggleReadSection(sectionId) {
    const q=getQuestion(state.reading.questionId);if(!q.sections.some(section=>section.id===sectionId))return;
    const set=new Set(state.reading.hiddenSections);if(set.has(sectionId))set.delete(sectionId);else set.add(sectionId);
    state.reading.hiddenSections=[...set];save();render();
    root.querySelector(`[data-pm-action="read-toggle"][data-value="${CSS.escape(sectionId)}"]`)?.focus({preventScroll:true});
  }
  function rubric(q,ratings={},disabled=false) {
    return `<div class="pm-rubric">${q.sections.map(section=>`<fieldset><legend>${e(section.label)}</legend>${section.points.map(point=>`<div class="pm-point"><p>${e(point.text)}</p><div class="pm-ratings" role="group" aria-label="Tự đánh giá: ${e(point.text)}">${[['remembered','Nhớ được'],['missing','Thiếu ý'],['unsure','Chưa chắc']].map(([value,label])=>`<label><input type="radio" name="pm-point-${point.id}" data-pm-field="rating" data-point="${point.id}" value="${value}" ${ratings[point.id]===value?'checked':''} ${disabled?'disabled':''}>${label}</label>`).join('')}</div></div>`).join('')}</fieldset>`).join('')}</div>`;
  }
  function catalogRows() {
    const list=filteredQuestions();
    return list.length?list.map(q=>`<li><button type="button" class="pm-row" data-pm-action="question" data-id="${q.id}"><span class="pm-row-number">${q.id}</span><span class="pm-row-main"><strong>${e(q.title)}</strong><small>${e(q.topic)}${q.sourceNote?' · Cần đối chiếu tài liệu':''}</small></span><span class="pm-row-state">${e(questionState(q))}</span></button></li>`).join(''):'<li class="pm-empty">Không tìm thấy câu phù hợp.</li>';
  }
  function learnHome() {
    const c=counts();
    return `<div class="pm-stats"><span>${c.learned}/38 câu đã đối chiếu</span><span>${c.missing} ý cần ôn</span><span>${c.retained} ý nhớ qua nhiều buổi</span></div><div class="pm-toolbar">${topicFilter()}<label>Tìm câu<input type="search" data-pm-field="search" value="${e(state.search)}" placeholder="Số câu hoặc nội dung"></label></div><div class="pm-actions"><button class="btn-primary" data-pm-action="start-learn" ${filteredQuestions().length?'':'disabled'}>Học một lượt · tối đa 3 câu</button>${state.learn?'<button class="btn-quiet" data-pm-action="resume-learn">Tiếp tục lượt đang học</button>':''}</div><ul class="pm-catalog" id="pm-catalog">${catalogRows()}</ul><p class="pm-helper">Tự đánh giá theo ý, không chấm máy bằng từ khóa. Tiến độ lưu trên trình duyệt này.</p>`;
  }
  let showLearnHome=true;
  function learnView() {
    const s=state.learn,q=getQuestion(s.ids[s.index]);
    if(s.stage==='complete')return `<section class="pm-result"><h3>Xong lượt học</h3><p>Đã đối chiếu ${Object.keys(s.results).length}/${s.ids.length} câu. Các ý thiếu hoặc chưa chắc đã nằm trong phần ôn.</p><div class="pm-actions"><button class="btn-primary" data-pm-action="mode" data-value="review">Ôn ý còn thiếu</button><button class="btn-quiet" data-pm-action="learn-home">Chọn câu khác</button></div></section>`;
    const done=s.stage==='done';
    let body='';
    if(s.stage==='recall')body=`<div class="pm-actions"><button class="btn-quiet" data-pm-action="outline" aria-expanded="${s.assisted}">${s.assisted?'Đã mở khung':'Gợi ý khung ý'}</button><button class="btn-quiet" data-pm-action="read-current">Xem lại bài học</button></div>${s.assisted?outline(q):''}${draftField(s.draft)}<div class="pm-actions"><button class="btn-primary" data-pm-action="reveal">Đối chiếu các ý</button><button class="btn-quiet" data-pm-action="learn-home">Để sau</button></div><p class="pm-helper">Có thể tự nói trước khi mở đáp án. Mở khung sẽ được ghi là có trợ giúp.</p>`;
    else body=`${draftField(s.draft||'(Bạn tự trình bày ngoài ứng dụng)','Bài bạn vừa trình bày','draft',true)}<p class="pm-helper">Đánh dấu ý bạn đã tự nhớ trước khi mở đáp án. ${s.assisted?'Lượt này đã có trợ giúp từ khung.':''}</p>${rubric(q,s.ratings,done)}<p class="pm-error" id="pm-check-error" role="alert"></p>${done?`<section class="pm-result"><h4>Đã lưu tự đánh giá</h4><p>${s.results[q.id].remembered}/${allPoints(q).length} ý nhớ được${s.assisted?' · có khung trợ giúp':''}.</p></section><div class="pm-actions"><button class="btn-primary" data-pm-action="next-learn">${s.index===s.ids.length-1?'Xong lượt này':'Câu tiếp theo'}</button><button class="btn-quiet" data-pm-action="learn-home">Về danh sách</button></div>`:'<div class="pm-actions"><button class="btn-primary" data-pm-action="save-check">Lưu các ý cần ôn</button><button class="btn-quiet" data-pm-action="learn-home">Tiếp tục sau</button></div>'}${note(q)}${source(q)}`;
    return `<p class="pm-session-progress">${s.index+1}/${s.ids.length} câu trong lượt</p>${questionHeading(q)}${body}`;
  }
  function learnCandidates() {
    return filteredQuestions().map(q=>({q,priority:allPoints(q).some(p=>isDue(p.id))?0:allPoints(q).some(p=>!progress(p.id))?1:2})).sort((a,b)=>a.priority-b.priority||a.q.id-b.q.id).slice(0,3).map(item=>item.q.id);
  }
  function startLearn(ids) {
    ids=ids||learnCandidates();if(!ids.length)return;
    if(state.learn&&state.learn.stage!=='complete'&&(state.learn.draft.trim()||state.learn.stage==='check')&&!confirm('Bắt đầu lượt học khác? Dàn ý của lượt đang học sẽ được thay thế; các ý đã lưu vẫn được giữ.'))return;
    state.learn={ids,index:0,stage:'recall',draft:'',assisted:false,ratings:{},results:{}};
    state.mode='learn';
    showLearnHome=false;save();render();focusQuestion();
  }
  function completeCheck(q,ratings,assisted) {for(const point of allPoints(q))recordPoint(point.id,ratings[point.id],assisted);}
  function checkAllRated(q,ratings) {return allPoints(q).every(p=>['remembered','missing','unsure'].includes(ratings[p.id]));}
  function error(message) {const el=document.getElementById('pm-check-error');if(el){el.textContent=message;el.scrollIntoView({block:'nearest'});}}
  function saveLearnCheck() {
    const s=state.learn;if(s?.stage!=='check')return;
    const q=getQuestion(s.ids[s.index]);if(!checkAllRated(q,s.ratings)){error('Hãy chọn mức nhớ cho từng ý trước khi lưu.');return;}
    completeCheck(q,s.ratings,s.assisted);
    s.results[q.id]={ratings:{...s.ratings},remembered:Object.values(s.ratings).filter(v=>v==='remembered').length,assisted:s.assisted};s.stage='done';save();render();
  }
  function nextLearn() {
    const s=state.learn;if(s?.stage!=='done')return;
    if(s.index===s.ids.length-1)s.stage='complete';
    else{s.index++;s.stage='recall';s.draft='';s.assisted=false;s.ratings={};}
    save();render();focusQuestion();
  }
  function reviewCandidates() {
    const topicIds=new Set(selectedQuestions().map(q=>q.id));
    return [...pointById.values()].filter(p=>topicIds.has(p.questionId)&&(isMissing(p.id)||isDue(p.id))).sort((a,b)=>Number(isMissing(b.id))-Number(isMissing(a.id))+(progress(a.id).due-progress(b.id).due)/1e14);
  }
  function reviewHome() {
    const candidates=reviewCandidates(),missing=candidates.filter(p=>isMissing(p.id)).length;
    return `<section class="pm-header"><h3>Ôn đúng ý còn yếu</h3><p>${missing} ý thiếu hoặc chưa chắc · ${candidates.length-missing} ý đến lịch ôn.</p></section><div class="pm-toolbar">${topicFilter()}</div><div class="pm-actions"><button class="btn-primary" data-pm-action="start-review" ${candidates.length?'':'disabled'}>Ôn tối đa 6 ý</button>${state.review?'<button class="btn-quiet" data-pm-action="resume-review">Tiếp tục lượt ôn</button>':''}</div>${!candidates.length?'<div class="pm-empty"><p>Chưa có ý cần ôn trong chủ đề này.</p><button class="btn-quiet" data-pm-action="mode" data-value="learn">Về học khung ý</button></div>':`<ul class="pm-catalog">${candidates.map(p=>`<li class="pm-row"><span class="pm-row-number">${p.questionId}</span><span class="pm-row-main"><strong>${e(getQuestion(p.questionId).title)}</strong><small>${e(p.section)}</small></span><span class="pm-row-state">${isMissing(p.id)?'Cần ôn':'Đến lịch'}</span></li>`).join('')}</ul>`}`;
  }
  let showReviewHome=true;
  function reviewView() {
    const s=state.review;
    if(s.stage==='complete')return `<section class="pm-result"><h3>Xong lượt ôn</h3><p>${s.results.filter(r=>r.rating==='remembered').length}/${s.results.length} lần tự đánh giá nhớ được. Ý còn yếu vẫn ở hàng đợi.</p><div class="pm-actions"><button class="btn-primary" data-pm-action="review-home">Xem ý cần ôn</button><button class="btn-quiet" data-pm-action="mode" data-value="learn">Học câu khác</button></div></section>`;
    const item=s.queue[s.index],p=pointById.get(item.id),q=getQuestion(p.questionId);
    return `<p class="pm-session-progress">Ý ${s.index+1}/${s.queue.length}${item.repeat?' · kiểm tra lại':''}</p>${questionHeading(q)}<div class="pm-point-target"><strong>${e(p.section)}</strong><p>Tự nhắc lại phần này. Khi mở đáp án, tập trung đối chiếu một ý đang cần ôn.</p></div>${s.stage==='recall'?`${draftField(s.draft,'Tự nhắc lại phần này','review-draft')}<div class="pm-actions"><button class="btn-primary" data-pm-action="reveal-review">Đối chiếu ý</button><button class="btn-quiet" data-pm-action="review-home">Để sau</button></div>`:`<section class="pm-result"><h4>Ý trong tài liệu</h4><p>${e(p.text)}</p></section>${draftField(s.draft||'(Bạn tự nhắc lại ngoài ứng dụng)','Bạn vừa trình bày','review-draft',true)}<div class="pm-actions">${[['remembered','Nhớ được'],['missing','Còn thiếu'],['unsure','Chưa chắc']].map(([rating,label])=>`<button class="${rating==='remembered'?'btn-primary':'btn-quiet'}" data-pm-action="rate-review" data-value="${rating}">${label}</button>`).join('')}</div><p class="pm-helper">Tự đánh giá phần bạn đã nhớ trước khi mở đáp án.</p>`}`;
  }
  function startReview() {
    const entries=reviewCandidates().slice(0,6).map(p=>({id:p.id,repeat:false}));if(!entries.length)return;
    if(state.review&&state.review.stage!=='complete'&&(state.review.draft.trim()||state.review.stage==='check')&&!confirm('Bắt đầu lượt ôn mới? Phần bạn đang viết sẽ được thay thế; các ý đã lưu vẫn được giữ.'))return;
    state.review={queue:entries,index:0,stage:'recall',draft:'',results:[]};showReviewHome=false;save();render();focusQuestion();
  }
  function rateReview(rating) {
    const s=state.review;if(s?.stage!=='check')return;
    const entry=s.queue[s.index];recordPoint(entry.id,rating,false);s.results.push({id:entry.id,rating});
    if(rating!=='remembered'&&!entry.repeat&&s.queue.length-s.index-1>=2)s.queue.splice(Math.min(s.index+4,s.queue.length),0,{id:entry.id,repeat:true});
    s.index++;s.stage=s.index>=s.queue.length?'complete':'recall';s.draft='';save();render();focusQuestion();
  }
  function examHome() {
    const ex=state.exam;
    return `<section class="pm-header"><h3>Thi tự luận</h3><p>Tự viết, nộp bài rồi đối chiếu từng ý. Không chấm điểm máy.</p></section><div class="pm-toolbar">${topicFilter()}<label>Số câu<select id="pm-exam-count"><option value="3">3 câu</option><option value="5">5 câu</option><option value="38">Toàn bộ câu trong chủ đề</option></select></label></div><div class="pm-actions"><button class="btn-primary" data-pm-action="start-exam">Bắt đầu bài mới</button>${ex?`<button class="btn-quiet" data-pm-action="resume-exam">${ex.stage==='active'?'Tiếp tục bài đang viết':'Xem bài đã nộp'}</button>`:''}</div>${ex?`<p class="pm-helper">Bài đã lưu: ${ex.ids.length} câu · ${Object.values(ex.answers).filter(a=>a.trim()).length} câu có bài viết.</p>`:''}`;
  }
  let showExamHome=true;
  function examView() {
    const s=state.exam,q=getQuestion(s.ids[s.index]),submitted=s.stage==='submitted',check=s.checks[q.id]||{ratings:{}};
    const checked=Object.keys(s.checks).filter(id=>s.checks[id].saved).length;
    const summary=submitted?`<section class="pm-result"><h3>Đã nộp ${s.ids.length} câu</h3><p>Đã tự đối chiếu ${checked}/${s.ids.length} câu. Bài viết được giữ nguyên; chọn từng ý để lưu phần còn thiếu.</p></section>`:`<p class="pm-session-progress">Đã viết ${Object.values(s.answers).filter(a=>a.trim()).length}/${s.ids.length} câu · Không có gợi ý</p>`;
    return `${summary}${questionHeading(q,`${s.index+1}/${s.ids.length} câu`)}${draftField(s.answers[q.id]||'',submitted?'Bài đã nộp':'Bài làm của bạn','exam-draft',submitted)}${submitted?`${note(q)}<p class="pm-helper">Đây là tự đối chiếu mức đủ ý theo tài liệu, không phải điểm chấm của giảng viên.</p>${rubric(q,check.ratings,!!check.saved)}<p id="pm-check-error" class="pm-error" role="alert"></p>${check.saved?'<p class="pm-helper">Đã lưu các ý cần ôn từ câu này.</p>':'<button class="btn-primary" data-pm-action="save-exam-check">Lưu tự đánh giá câu này</button>'}${source(q)}`:''}<div class="pm-actions"><button class="btn-quiet" data-pm-action="exam-move" data-value="-1" ${s.index===0?'disabled':''}>Câu trước</button>${!submitted?`<button class="btn-quiet" data-pm-action="flag" aria-pressed="${!!s.flags[q.id]}">${s.flags[q.id]?'Đã đánh dấu':'Đánh dấu'}</button>`:''}${s.index<s.ids.length-1?'<button class="btn-primary" data-pm-action="exam-move" data-value="1">Câu tiếp theo</button>':!submitted?'<button class="btn-primary" data-pm-action="submit-exam">Nộp bài</button>':'<button class="btn-quiet" data-pm-action="exam-home">Về thi tự luận</button>'}</div><nav class="pm-exam-map" aria-label="Các câu trong bài">${s.ids.map((id,i)=>`<button class="${s.answers[id]?.trim()?'answered ':''}${s.flags[id]?'flagged ':''}${i===s.index?'current':''}" data-pm-action="exam-go" data-value="${i}" aria-label="Câu ${i+1}, đề gốc câu ${id}${s.answers[id]?.trim()?', có bài viết':''}${s.flags[id]?', đã đánh dấu':''}" aria-current="${i===s.index?'step':'false'}">${i+1}</button>`).join('')}</nav>${!submitted?'<div class="pm-actions"><button class="btn-quiet" data-pm-action="submit-exam">Nộp bài thi tự luận</button><button class="btn-quiet" data-pm-action="exam-home">Tiếp tục sau</button></div>':''}`;
  }
  function startExam() {
    if(state.exam?.stage==='active'&&!confirm('Thay bài tự luận đang viết bằng bài mới? Tiến độ học và ôn ý vẫn được giữ.'))return;
    const count=Math.min(Number(document.getElementById('pm-exam-count').value),selectedQuestions().length);
    const ids=shuffle(selectedQuestions()).slice(0,count).map(q=>q.id);
    state.exam={ids,index:0,stage:'active',answers:{},flags:{},checks:{},started:Date.now()};showExamHome=false;save();render();focusQuestion();
  }
  function submitExamPM() {
    const s=state.exam;if(s?.stage!=='active')return;
    const left=s.ids.filter(id=>!s.answers[id]?.trim()).length;
    if(!confirm(left?`Còn ${left} câu chưa viết. Nộp bài và mở đối chiếu?`:'Nộp bài và mở đối chiếu?'))return;
    s.stage='submitted';s.submitted=Date.now();save();render();focusQuestion();
  }
  function saveExamCheck() {
    const s=state.exam;if(s?.stage!=='submitted')return;
    const q=getQuestion(s.ids[s.index]),check=s.checks[q.id]||{ratings:{}};
    if(check.saved)return;
    if(!checkAllRated(q,check.ratings)){error('Hãy tự đánh giá từng ý trước khi lưu.');return;}
    completeCheck(q,check.ratings,false);s.checks[q.id]={...check,saved:true};save();render();
  }
  function render() {
    if(active!=='pm')return;
    const body=state.mode==='read'?readView():state.mode==='learn'?(showLearnHome||!state.learn?learnHome():learnView()):state.mode==='review'?(showReviewHome||!state.review?reviewHome():reviewView()):(showExamHome||!state.exam?examHome():examView());
    root.innerHTML=`<div class="pm-app">${header()}${body}</div>`;
    if(state.mode==='read')save();
  }
  function focusQuestion() {root.querySelector('.pm-question h3')?.focus({preventScroll:true});root.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
  function setMode(mode) {if(!['read','learn','review','exam'].includes(mode))return;state.mode=mode;save();render();}
  root.addEventListener('input',event=>{
    if(active!=='pm')return;
    const input=event.target,field=input.dataset.pmField;
    if(field==='search') {state.search=input.value;root.querySelector('#pm-catalog').innerHTML=catalogRows();root.querySelector('[data-pm-action="start-learn"]').disabled=!filteredQuestions().length;}
    if(field==='draft'&&state.learn?.stage==='recall')state.learn.draft=input.value;
    if(field==='review-draft'&&state.review?.stage==='recall')state.review.draft=input.value;
    if(field==='exam-draft'&&state.exam?.stage==='active')state.exam.answers[state.exam.ids[state.exam.index]]=input.value;
    save();
  });
  root.addEventListener('change',event=>{
    if(active!=='pm')return;
    const input=event.target,field=input.dataset.pmField;
    if(field==='read-question'){goRead(Number(input.value));return;}
    if(field==='topic'){state.topic=input.value;save();render();return;}
    if(field==='rating') {
      if(state.mode==='learn'&&state.learn?.stage==='check')state.learn.ratings[input.dataset.point]=input.value;
      if(state.mode==='exam'&&state.exam?.stage==='submitted'){const qid=state.exam.ids[state.exam.index];state.exam.checks[qid]||={ratings:{}};if(!state.exam.checks[qid].saved)state.exam.checks[qid].ratings[input.dataset.point]=input.value;}
      save();
    }
  });
  root.addEventListener('click',event=>{
    if(active!=='pm')return;
    const button=event.target.closest('[data-pm-action]');if(!button||button.disabled)return;
    const action=button.dataset.pmAction,value=button.dataset.value;
    if(action==='mode')setMode(value);
    if(action==='read-toggle')toggleReadSection(value);
    if(action==='read-hide-all') {
      const q=getQuestion(state.reading.questionId),allHidden=q.sections.every(section=>state.reading.hiddenSections.includes(section.id));
      state.reading.hiddenSections=allHidden?[]:q.sections.map(section=>section.id);save();render();root.querySelector('[data-pm-action="read-hide-all"]')?.focus({preventScroll:true});
    }
    if(action==='read-move') {const list=selectedQuestions(),index=list.findIndex(q=>q.id===state.reading.questionId),q=list[index+Number(value)];if(q)goRead(q.id);}
    if(action==='mark-read') {state.reading.readIds=[...new Set([...state.reading.readIds,state.reading.questionId])];save();render();}
    if(action==='read-test')startLearn([state.reading.questionId]);
    if(action==='read-current'&&state.learn)goRead(state.learn.ids[state.learn.index]);
    if(action==='start-learn')startLearn();
    if(action==='question')startLearn([Number(button.dataset.id)]);
    if(action==='resume-learn'){showLearnHome=false;render();}
    if(action==='learn-home'){showLearnHome=true;render();}
    if(action==='outline'&&state.learn?.stage==='recall'){state.learn.assisted=true;save();render();}
    if(action==='reveal'&&state.learn?.stage==='recall'){state.learn.stage='check';save();render();focusQuestion();}
    if(action==='save-check')saveLearnCheck();
    if(action==='next-learn')nextLearn();
    if(action==='start-review')startReview();
    if(action==='resume-review'){showReviewHome=false;render();}
    if(action==='review-home'){showReviewHome=true;render();}
    if(action==='reveal-review'&&state.review?.stage==='recall'){state.review.stage='check';save();render();}
    if(action==='rate-review')rateReview(value);
    if(action==='start-exam')startExam();
    if(action==='resume-exam'){showExamHome=false;render();}
    if(action==='exam-home'){showExamHome=true;render();}
    if(action==='exam-go'||action==='exam-move') {
      const ex=state.exam,index=action==='exam-go'?Number(value):ex.index+Number(value);
      if(index>=0&&index<ex.ids.length){ex.index=index;save();render();focusQuestion();}
    }
    if(action==='flag'&&state.exam?.stage==='active'){const id=state.exam.ids[state.exam.index];state.exam.flags[id]=!state.exam.flags[id];save();render();}
    if(action==='submit-exam')submitExamPM();
    if(action==='save-exam-check')saveExamCheck();
  });
  window.addEventListener('keydown',event=>{
    if(active!=='pm'||event.ctrlKey||event.metaKey||event.altKey)return;
    // Keep native form controls and links working; block only English quiz shortcuts.
    event.stopImmediatePropagation();
  },true);
  window.addEventListener('pagehide',save);
  showLearnHome=!state.learn;showReviewHome=!state.review;showExamHome=!state.exam;
  try {
    const query=new URLSearchParams(location.search).get('subject');
    const desired=['pm','english'].includes(query)?query:localStorage.getItem(SUBJECT_KEY);
    if(desired==='pm')selectSubject('pm');
  }catch{}
})();
