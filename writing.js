// Part II: independent written recall, with assisted attempts kept separate.
let writingSession=null;
let writingExam=null;
let part2Mode='learn';
const WRITING_GUIDES=[
  ['thiết bị đeo','worn on the body → Wearables','Danh từ số nhiều: Wearables.'],
  ['phần mềm quảng cáo','advertisements → Adware','Giữ phần đuôi -ware.'],
  ['mã độc tống tiền','ransom is paid → Ransomware','ransom + ware; không có e sau ransom.'],
  ['bộ nhớ','CPU, memory, disk drives','Danh từ chỉ tài nguyên: memory.'],
  ['rẻ, chi phí thấp','fast, cheap and convenient','Tính từ đứng cùng fast và convenient.'],
  ['thiết bị xuất','extract the finished product → Output devices','Cần cả cụm hai từ và devices ở số nhiều.'],
  ['mã độc tống tiền','ransom is paid → Ransomware','ransom + ware; không có e sau ransom.'],
  ['sao lưu','copying data … don’t lose it → Backing up','Cụm V-ing làm chủ ngữ: Backing up.'],
  ['phần mềm','set of instructions → Software','Software không thêm s.'],
  ['cơ sở dữ liệu đa phương tiện','sound and video → multimedia database','Cần cả hai từ; database ở số ít sau a.'],
  ['mạng cục bộ','short distance → LAN','Viết tắt Local Area Network.'],
  ['phân tán','different physical locations → distributed','Chỗ trống trước database: distributed, không điền thêm database.'],
  ['các nút mạng','interconnections of the nodes','Danh từ số nhiều: nodes.'],
  ['các trường dữ liệu','name, address, phone number → fields','Sau several dùng danh từ số nhiều: fields.'],
  ['phát triển, tiến hóa','evolve into a new trend','Sau could dùng động từ nguyên mẫu: evolve.'],
  ['không dây','wireless networks','Tính từ wireless đứng trước networks.'],
  ['thư điện tử','mail immediately → email','Đáp án đề cương viết liền: email.'],
  ['các mật khẩu','birthdays or names → passwords','Danh từ số nhiều: passwords.'],
  ['các hoạt động kinh doanh','manage businesses','business + es → businesses.'],
  ['hội nghị truyền hình','messaging, voice call, e-mail, video conferencing','Cần cả cụm video conferencing.'],
  ['tệp đính kèm','open an attachment','Danh từ số ít sau an: attachment.'],
  ['cơ sở dữ liệu','distribution database','Chỉ điền database vào chỗ trống.'],
  ['việc định dạng','the formatting of your information','Đáp án đề cương là formatting, có đuôi -ing.'],
  ['các hoạt ảnh','interactive animations','Danh từ số nhiều: animations.'],
  ['tin tức','RSS feeds → news','news có s sẵn; không viết new trong câu này.'],
  ['mô hình mạng hình trục','common medium, backbone → bus topology','Chỗ trống này cần cả cụm bus topology.'],
  ['hình trục','a bus network … backbone','network đã có trong câu; chỉ điền bus.'],
  ['rộng lớn','a broad area','Tính từ: broad.'],
  ['kỹ thuật số','digital transmission','Tính từ: digital, không phải danh từ digit.'],
  ['sự hòa hợp','work in harmony','Nhớ cả cụm in harmony.'],
  ['thuộc về robot','robotic pets','Trước pets cần tính từ robotic, không phải robots.'],
  ['cho phép','a service that enables people to …','service ở số ít nên động từ là enables.'],
  ['mạng nơ-ron','a neural network retains information','Cần cả hai từ; network ở số ít sau a.'],
  ['sự tắc nghẽn','network congestion and collapse','Chính tả: congestion.'],
  ['thấp hơn','higher revenue at lower costs','Cặp so sánh higher ↔ lower.'],
  ['nhân tạo','artificial neural networks','Chỗ trống cần tính từ artificial.'],
  ['không được phép','unauthorized user','un + authorized; giữ nguyên dạng đề cương.'],
  ['được ảo hóa','cloud → virtualized environment','Tính từ virtualized, có đuôi -ized.'],
  ['các mạng máy tính','networks … difficult to set up','Danh từ số nhiều: networks.'],
  ['các máy tính','processing speeds → computers','Danh từ số nhiều: computers.'],
  ['các robot','a world … served by robots','Ở đây dùng danh từ robots; khác robotic pets.'],
  ['sự phân tích','the analysis of information','Chính tả analysis; không phải động từ analyze.'],
  ['sự truyền tải','transmission of information','transmit → transmission.'],
  ['có năng suất','make business more productive','Sau more cần tính từ productive.'],
  ['giao tiếp','communicate directly with the hardware','Sau to dùng động từ nguyên mẫu communicate.'],
  ['các thiết bị ngoại vi','CPU, main memory and peripherals','Danh từ số nhiều: peripherals.'],
  ['vòng tròn','one direction … token → ring','Chỉ điền ring vào chỗ trống.'],
  ['công cụ tìm kiếm','feeding it to a search engine','Cần cả hai từ: search engine.'],
  ['các cuộc gọi','voice calls','Danh từ số nhiều: calls.'],
  ['thuộc mạng di động tế bào','cellular networks','Chính tả cellular: có hai chữ l.'],
  ['lập trình viên','writing, testing, debugging source code → software developer','Danh từ chỉ người: software developer.'],
  ['khối số học logic','control unit and ALU → arithmetic logic unit','Viết đầy đủ: arithmetic logic unit.'],
  ['ổ cứng thể rắn','flash memory, much faster → solid-state drives','Số nhiều: solid-state drives.'],
  ['khóa chính','uniquely identifies each record → primary key','Cần cả hai từ: primary key.'],
  ['sự chuẩn hóa','eliminate redundancy, anomalies → normalization','Danh từ: normalization.'],
  ['truy xuất','retrieve specific information → SELECT','Lệnh SQL: SELECT.'],
  ['học sâu','multi-layered artificial neural networks → Deep learning','Cần cả cụm: Deep learning.'],
  ['phép thử Turing','1950, human-equivalent intelligence → Turing test','Tên riêng viết hoa: Turing test.'],
  ['hình sao','connected directly to central device → star','Chỉ điền star vào chỗ trống.'],
  ['bộ chuyển mạch','forwards data only to designated port → switch','Danh từ số ít: switch.'],
  ['bộ định tuyến','routes data packets between networks → router','Danh từ số ít: router.'],
  ['băng thông','maximum volume of data → bandwidth','Chính tả: bandwidth.'],
  ['độ trễ','time delay while packet travels → latency','Chính tả: latency.'],
  ['thuộc kỹ thuật số','binary digits rather than continuous waves → digital','Tính từ: digital.'],
  ['làm việc từ xa','elimination of daily commuting → teleworking','Danh từ: teleworking.'],
  ['ngôn ngữ định dạng web','control visual appearance, styling → CSS','Viết tắt: CSS.'],
  ['ngôn ngữ kịch bản tương tác','dynamic and interactive behaviors → JavaScript','Chính tả: JavaScript.'],
  ['sâu máy tính','spread automatically without host file → worm','Khác virus: worm.'],
  ['từ chối dịch vụ','flooding target server with bogus traffic → Denial of Service','Cần cả cụm: Denial of Service.'],
  ['bản rõ','readable text before encryption → plaintext','Viết liền: plaintext.'],
  ['bất đối xứng','public key and private key → Asymmetric','Tính từ: Asymmetric.'],
  ['thuộc sinh trắc học','retinal scans, fingerprints → Biometric','Tính từ: Biometric.'],
  ['Internet vạn vật','physical devices with sensors → Internet of Things','Cần cả cụm: Internet of Things.'],
  ['bit lượng tử','quantum computers, both states simultaneously → qubits','Danh từ số nhiều: qubits.'],
  ['phần mềm dạng dịch vụ','ready-to-use applications over web → Software as a Service','Cần cả cụm: Software as a Service.'],
  ['thuộc cơ học','no moving mechanical parts → mechanical','Tính từ: mechanical.'],
  ['triển khai','build, test, and deploy applications → deploy','Động từ nguyên mẫu: deploy.'],
  ['phần mềm dạng dịch vụ','Gmail, Google Docs → SaaS','Viết tắt: SaaS.'],
  ['mắt xích','weakest link in cybersecurity → link','Danh từ số ít: link.'],
  ['sự xác thực','multi-factor authentication → authentication','Chính tả: authentication.'],
  ['cấu hình','user accounts and access permissions → configuring','Dạng V-ing: configuring.'],
  ['xử lý sự cố','hardware and software problems → troubleshoot','Động từ: troubleshoot.'],
  ['sao lưu','files to prevent data loss → back up','Cụm động từ: back up.'],
  ['thực thi','a query to extract specific records → execute','Động từ: execute.'],
  ['mã hóa','sensitive information so third parties cannot read → encrypt','Động từ: encrypt.'],
  ['giao tiếp','directly with peripheral hardware → communicate','Động từ: communicate.'],
  ['áp dụng','styles and layout to HTML → apply','Động từ: apply.'],
  ['bóp băng thông','data transmission speeds → throttle','Động từ: throttle.'],
  ['không được phép','users from accessing databases → unauthorized','Tính từ: unauthorized.'],
  ['ánh sáng','pulses of light through strands of glass → light','Danh từ: light.']
];
function normalizeWritten(value) { return String(value??'').normalize('NFKC').trim().replace(/\s+/g,' ').toLowerCase(); }
function isWrittenQuestion(q) { return q?.id?.startsWith('part2:') || q?.type==='written'; }
function writtenCorrect(q,value) { return normalizeWritten(value)===normalizeWritten(q.correctAnswer??q.answer); }
function writingGroupKey(q) { return normalizeWritten(q.sentence||q.prompt)+'|'+normalizeWritten(q.answer??q.correctAnswer); }
function writingItems() {
  const map=new Map();
  DATASET.part2Data.forEach(q=>{const key=writingGroupKey(q);if(map.has(key))map.get(key).sourceIds.push(q.id);else map.set(key,{...q,sourceIds:[q.id]});});
  return [...map.values()];
}
function writingItem(id) { return writingItems().find(q=>q.sourceIds.includes(id)); }
function writingQuestion(item) {
  const guide = WRITING_GUIDES[item.id-1] || [item.vn, item.clue, 'Nhớ từ khóa: ' + item.clue];
  return {id:'part2:'+item.id,type:'written',phase:'Phần II · Tự điền từ',prompt:item.sentence,correctAnswer:item.answer,explanation:item.vn,clue:item.clue,tip:guide[1]};
}
function writingHistory(id) {
  const item=writingItem(id);if(!item)return null;
  return item.sourceIds.map(id=>saved.history['part2:'+id]).filter(Boolean).sort((a,b)=>(b.writing?.lastSeen||0)-(a.writing?.lastSeen||0)||(a.due||0)-(b.due||0))[0]||null;
}
function writingCounts() {
  const counts={fresh:0,learning:0,retained:0,due:0};
  writingItems().forEach(q=>{const h=writingHistory(q.id);if(!h||!(h.right+h.wrong))counts.fresh++;else if((h.writing?.days?.length||0)>=3&&h.due>Date.now())counts.retained++;else counts.learning++;if(h&&(!h.due||h.due<=Date.now()))counts.due++;});
  return counts;
}
function writingCandidates(early=false) {
  const items=writingItems(), now=Date.now();
  const due=items.filter(q=>writingHistory(q.id)&&(!writingHistory(q.id).due||writingHistory(q.id).due<=now));
  const fresh=items.filter(q=>!writingHistory(q.id)||!(writingHistory(q.id).right+writingHistory(q.id).wrong));
  const normal=[...shuffle(due),...shuffle(fresh)];
  return normal.length||!early?normal:shuffle([...items]);
}
function createWritingSession(early=false) {
  const items=writingCandidates(early).slice(0,6);
  return {version:1,baseIds:items.map(q=>q.id),queue:items.map(q=>({id:q.id,repeat:false})),index:0,stage:items.length?'answer':'complete',draft:'',hint:0,results:[],copy:'',copied:false,early};
}
function validWritingSession(s) {
  return s?.version===1&&Array.isArray(s.queue)&&s.queue.length<=40&&s.queue.every(q=>q&&writingItem(q.id))&&Array.isArray(s.baseIds)&&s.baseIds.every(writingItem)&&Array.isArray(s.results)&&s.results.every(r=>r&&writingItem(r.id)&&typeof r.correct==='boolean')&&Number.isInteger(s.index)&&s.index>=0&&s.index<=s.queue.length&&['answer','feedback','complete'].includes(s.stage)&&(s.stage==='complete'||s.index<s.queue.length)&&typeof s.draft==='string'&&[0,1,2,3].includes(s.hint)&&typeof s.copy==='string';
}
function createWritingExam() { return {version:1,ids:shuffle(DATASET.part2Data.map(q=>q.id)),index:0,stage:'active',answers:{},flags:{},results:[],started:Date.now()}; }
function validWritingExam(s) { return s?.version===1&&Array.isArray(s.ids)&&s.ids.length===DATASET.part2Data.length&&new Set(s.ids).size===s.ids.length&&s.ids.every(id=>DATASET.part2Data.some(q=>q.id===id))&&Number.isInteger(s.index)&&s.index>=0&&s.index<s.ids.length&&['active','complete'].includes(s.stage)&&s.answers&&typeof s.answers==='object'&&s.flags&&typeof s.flags==='object'&&Array.isArray(s.results); }
function writingModes() { return `<nav class="memory-modes" aria-label="Cách học Bài 2">${[['learn','Học điền từ'],['exam','Thi viết']].map(([mode,label])=>`<button type="button" data-part2-mode="${mode}" aria-pressed="${part2Mode===mode}" onclick="setPart2Mode('${mode}')">${label}</button>`).join('')}</nav>`; }
function saveWriting() { saved.writingSession=writingSession;saved.writingExam=writingExam;saved.part2Preference=part2Mode;snapshot(); }
function prepareWritingSurface() { document.body.classList.add('guided-study');shell.classList.remove('is-matching-mode');document.querySelector('.shortcuts-footer').hidden=true;isAnswered=false; }
function renderWritingStudy() {
  prepareWritingSurface();
  const s=writingSession,c=writingCounts(),e=escapeHTML;
  const top=writingModes()+`<div class="memory-heading"><h2>Nhớ từ và tự viết được</h2><p>Đọc câu, tự gõ từ còn thiếu. Chỉ mở gợi ý khi cần; câu dùng trợ giúp sẽ được ôn lại.</p></div><div class="memory-progress"><span><b>${c.fresh}</b> mẫu câu chưa học</span><span><b>${c.learning}</b> cần ôn</span><span><b>${c.retained}</b> nhớ qua nhiều buổi</span></div>`;
  const container=document.getElementById('active-card-container');
  if(s.stage==='complete') {
    const first=s.results.filter(r=>!r.repeat), independent=first.filter(r=>r.correct&&!r.assisted).length,assisted=first.filter(r=>r.correct&&r.assisted).length;
    container.innerHTML=`<section class="memory-study">${top}<section class="memory-complete"><h3>${first.length?'Xong lượt điền từ':'Đã ôn hết câu đến lịch'}</h3>${first.length?`<p>Lần đầu: <strong>${independent} tự điền đúng</strong> · ${assisted} đúng có gợi ý · ${first.filter(r=>!r.correct).length} cần sửa.</p><p>Đã kiểm tra lại ${s.results.filter(r=>r.repeat).length} lần sau các câu khác. Việc chép lại đáp án không tăng điểm ghi nhớ.</p>`:''}<p>${c.due?`Còn ${c.due} mẫu câu đến lịch ôn.`:c.fresh?`Còn ${c.fresh} mẫu câu mới.`:'Các câu đã học sẽ quay lại khi đến lịch. Bạn có thể nghỉ hoặc chọn ôn sớm.'}</p><button class="btn-primary" onclick="newWritingRound(${!c.due&&!c.fresh})">${c.due?'Ôn câu đến lịch':c.fresh?'Học thêm 6 câu':'Ôn sớm 6 câu'}</button></section>${writingOverview()}</section>`;
    saveWriting();return;
  }
  const entry=s.queue[s.index],q=writingItem(entry.id),guide=WRITING_GUIDES[q.id-1] || [q.vn, q.clue, 'Nhớ từ khóa: ' + q.clue];
  let content='';
  if(s.stage==='answer') {
    content=`<form id="writing-form" class="writing-form" onsubmit="submitWriting(event)"><label for="writing-answer">Từ hoặc cụm từ còn thiếu</label><input id="writing-answer" class="writing-input" type="text" lang="en" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" maxlength="200" placeholder="Tự gõ bằng tiếng Anh…" value="${e(s.draft)}" oninput="updateWritingDraft(this.value)" aria-describedby="writing-input-note writing-error"><p id="writing-input-note" class="memory-note">Nhấn Enter để kiểm tra. Không phân biệt hoa/thường; khoảng trắng thừa được bỏ qua.</p><p id="writing-error" role="alert"></p><div class="memory-actions"><button type="submit" class="btn-primary">Kiểm tra</button><button type="button" class="btn-quiet" onclick="writingHint()">${s.hint===0?'Gợi ý nghĩa':s.hint===1?'Gợi ý chữ đầu':'Xem đáp án'}</button></div></form>${s.hint?`<section class="writing-hint" role="status"><p><b>Ý nghĩa:</b> ${e(guide[0])}</p>${s.hint>=2?`<p><b>Chữ đầu:</b> ${e(q.answer.split(/\s+/).map(w=>w[0]+'…').join(' '))}</p>`:''}<p class="memory-note">Đã dùng gợi ý · câu này vẫn cần kiểm tra lại không có trợ giúp.</p></section>`:''}`;
  } else {
    const result=s.results.at(-1),near=classifyWritten(s.draft,q.answer);
    const title=result.revealed?'Đã xem đáp án':result.correct?(result.assisted?'Đúng với gợi ý':'Tự điền đúng rồi'):near==='form'?'Cần sửa dạng từ':near==='near'?'Gần khớp · kiểm tra cách viết':'Chưa khớp đáp án đề cương';
    const diff=writtenDiff(s.draft,q.answer);
    content=`<section class="memory-feedback ${result.correct?'is-right':'is-wrong'}" role="status"><h3>${title}</h3><p class="writing-solution"><b>${e(q.answer)}</b></p>${!result.correct&&!result.revealed?`<div class="writing-diff"><p><span>Bạn điền:</span> <code>${diff.typed||'Chưa điền'}</code></p><p><span>Cần viết:</span> <code>${diff.expected}</code></p></div>`:''}<p>${e(q.vn)}</p><p><b>Nhớ theo cụm:</b> ${e(guide[1])}</p><p><b>Để viết đúng:</b> ${e(guide[2])}</p><details class="writing-completed"><summary>Đọc lại câu đầy đủ</summary><p>${e(q.sentence).replace(/_{2,}/g,'<strong>'+e(q.answer)+'</strong>')}</p></details></section>${!result.correct?`<form class="writing-form writing-copy" onsubmit="confirmWritingCopy(event)"><label for="writing-copy">Gõ lại đúng một lần để luyện cách viết</label><input id="writing-copy" class="writing-input" lang="en" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" maxlength="200" value="${e(s.copy)}" oninput="updateWritingCopy(this.value)" aria-describedby="writing-copy-note writing-copy-status"><p id="writing-copy-note" class="memory-note">Đáp án đang hiện để bạn luyện viết. Lần này không tính là tự nhớ được.</p><p id="writing-copy-status" role="status">${s.copied?'Đã viết đúng. Hãy kiểm tra lại khi câu quay lại.':''}</p><div class="memory-actions"><button type="submit" class="btn-primary" id="writing-copy-next" ${s.copied?'':'disabled'}>${s.index===s.queue.length-1?'Xem kết quả lượt':'Câu tiếp theo'}</button><button type="button" class="btn-quiet" onclick="nextWriting(true)">Lưu để ôn sau</button></div></form>`:`<p class="memory-note">${result.assisted?'Chưa tăng mức ghi nhớ vì đã dùng trợ giúp. Bạn sẽ gặp lại câu này.':'Đã lưu lần tự điền đúng. Câu vẫn được hẹn ôn ở buổi sau.'}</p><div class="memory-actions"><button class="btn-primary" id="writing-next" onclick="nextWriting()">${s.index===s.queue.length-1?'Xem kết quả lượt':'Câu tiếp theo'}</button></div>`}`;
  }
  container.innerHTML=`<section class="memory-study writing-study">${top}<div class="memory-session-meta"><span>${s.results.filter(r=>!r.repeat).length}/${s.baseIds.length} mẫu câu đã kiểm tra lần đầu</span><span>${entry.repeat?'Ôn lại · không gợi ý sẵn':'Tự điền · không có danh sách từ'}</span></div><h3 class="writing-sentence" id="writing-sentence" tabindex="-1">${e(q.sentence)}</h3>${content}${writingOverview()}</section>`;
  saveWriting();
}
function writingOverview() {
  return `<details class="memory-overview"><summary>Theo dõi toàn bộ Bài 2</summary><p>Toàn bộ ${DATASET.part2Data.length} câu có ${writingItems().length} mẫu khác nhau; câu trùng nội dung được học chung. Thi viết vẫn giữ đủ ${DATASET.part2Data.length} câu. Chỉ tự điền đúng, không dùng gợi ý ở ít nhất 3 ngày khác nhau mới đạt “Nhớ qua nhiều buổi”.</p><ul>${writingItems().map(q=>{const h=writingHistory(q.id);return `<li><span>Câu ${q.sourceIds.join(', ')}</span><span>${!h?'Chưa học':h.due<=Date.now()?'Đến lịch ôn':(h.writing?.days?.length||0)>=3?'Nhớ qua nhiều buổi':'Đã học · chờ ôn'}</span></li>`;}).join('')}</ul></details>`;
}
function updateWritingDraft(value) { if(writingSession?.stage!=='answer')return;writingSession.draft=value;document.getElementById('writing-error').textContent='';saveWriting(); }
function writingHint() {
  const s=writingSession;if(s?.stage!=='answer')return;
  playSfx('btn');
  if(s.hint>=2){finishWritingAttempt(true);return;}
  s.hint++;renderWritingStudy();document.getElementById('writing-answer')?.focus({preventScroll:true});
}
function submitWriting(event) {
  event?.preventDefault();const s=writingSession;if(s?.stage!=='answer')return;
  if(!normalizeWritten(s.draft)){document.getElementById('writing-error').textContent='Hãy thử điền từ, hoặc mở gợi ý nếu chưa nhớ.';document.getElementById('writing-answer').focus();return;}
  finishWritingAttempt(false);
}
function finishWritingAttempt(revealed) {
  const s=writingSession;if(s?.stage!=='answer')return;
  const entry=s.queue[s.index],q=writingItem(entry.id),correct=!revealed&&writtenCorrect(q,s.draft),assisted=s.hint>0||revealed;
  recordWriting(q,s.draft,correct,assisted,revealed?'revealed':classifyWritten(s.draft,q.answer));
  s.results.push({id:entry.id,correct,assisted,revealed,repeat:entry.repeat,answer:s.draft,hints:s.hint,at:Date.now()});
  if(!correct||assisted)scheduleWritingRepeat(entry);
  s.stage='feedback';s.copy='';s.copied=false;renderWritingStudy();triggerChime(correct, document.querySelector('.memory-feedback'));
  document.getElementById(correct?'writing-next':'writing-copy')?.focus({preventScroll:true});
  document.querySelector('.memory-feedback')?.scrollIntoView({block:'nearest',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
}
function recordWriting(item,value,correct,assisted,kind,now=Date.now()) {
  const previous=writingHistory(item.id)?.writing||{attempts:0,days:[],errors:0};
  const days=correct&&!assisted?[...new Set([...(previous.days||[]),memoryDay(now)])].slice(-4):[];
  record(writingQuestion(item),correct);
  const h=saved.history['part2:'+item.id];
  h.writing={attempts:previous.attempts+1,days,errors:previous.errors+(correct?0:1),lastAnswer:value,lastAssisted:assisted,lastKind:kind,lastSeen:now};
  h.due=correct&&!assisted?now+[1,3,7,14][Math.min(days.length-1,3)]*MEMORY_DAY:now;
  item.sourceIds.filter(id=>id!==item.id).forEach(id=>{
    const old=saved.history['part2:'+id]||{right:0,wrong:0,streak:0};
    saved.history['part2:'+id]={...old,question:{...h.question,id:'part2:'+id},writing:{...h.writing,days:[...days]},due:h.due};
  });
}
function scheduleWritingRepeat(entry) {
  if(entry.repeat)return;
  const s=writingSession,between=s.queue.slice(s.index+1,s.index+4),exclude=new Set([entry.id,...between.map(q=>q.id)]),fillers=s.baseIds.filter(id=>!exclude.has(id));
  while(between.length<3&&fillers.length){const extra={id:fillers.shift(),repeat:true};s.queue.push(extra);between.push(extra);}
  if(between.length>=2)s.queue.splice(s.index+1+between.length,0,{id:entry.id,repeat:true});
}
function updateWritingCopy(value) {
  const s=writingSession;if(s?.stage!=='feedback')return;
  s.copy=value;s.copied=writtenCorrect(writingItem(s.queue[s.index].id),value);
  document.getElementById('writing-copy-next').disabled=!s.copied;
  document.getElementById('writing-copy-status').textContent=s.copied?'Đã viết đúng. Hãy kiểm tra lại khi câu quay lại.':'';saveWriting();
}
function confirmWritingCopy(event) { event?.preventDefault();if(writingSession?.copied)nextWriting(); }
function nextWriting(skipCopy=false) {
  const s=writingSession;if(s?.stage!=='feedback')return;
  if(!s.results.at(-1).correct&&!s.copied&&!skipCopy)return;
  playSfx('next');
  s.index++;s.stage=s.index>=s.queue.length?'complete':'answer';s.draft='';s.copy='';s.hint=0;s.copied=false;
  renderWritingStudy();document.getElementById('writing-answer')?.focus();
}
function newWritingRound(early=false) { writingSession=createWritingSession(early);renderWritingStudy(); }
function setPart2Mode(mode) {
  if(!['learn','exam'].includes(mode)||mode===part2Mode)return;
  playSfx('btn');
  saveWriting();part2Mode=mode;
  if(mode==='exam'){if(!validWritingExam(writingExam))writingExam=createWritingExam();renderWritingExam();}
  else{if(!validWritingSession(writingSession))writingSession=createWritingSession();renderWritingStudy();}
  saveWriting();
}
function classifyWritten(input,answer) {
  const a=normalizeWritten(input),b=normalizeWritten(answer);if(a===b)return 'correct';
  if(a&&[a+'s',a+'es'].includes(b)||b&&[b+'s',b+'es'].includes(a))return 'form';
  const distance=writtenDiff(a,b).distance;
  return a.length>=4&&distance<=Math.max(1,Math.floor(b.length*.18))?'near':'different';
}
function writtenDiff(input,answer) {
  const a=normalizeWritten(input).slice(0,200),b=normalizeWritten(answer).slice(0,200),e=escapeHTML;
  const d=Array.from({length:a.length+1},()=>Array(b.length+1).fill(0));
  for(let i=0;i<=a.length;i++)d[i][0]=i;for(let j=0;j<=b.length;j++)d[0][j]=j;
  for(let i=1;i<=a.length;i++)for(let j=1;j<=b.length;j++)d[i][j]=Math.min(d[i-1][j]+1,d[i][j-1]+1,d[i-1][j-1]+(a[i-1]===b[j-1]?0:1));
  let i=a.length,j=b.length,typed=[],expected=[];
  while(i||j){if(i&&j&&a[i-1]===b[j-1]){typed.unshift(e(a[--i]));expected.unshift(e(b[--j]));}else if(i&&j&&d[i][j]===d[i-1][j-1]+1){typed.unshift('<mark class="writing-error-char">'+e(a[--i])+'</mark>');expected.unshift('<mark class="writing-fix-char">'+e(b[--j])+'</mark>');}else if(i&&d[i][j]===d[i-1][j]+1){typed.unshift('<mark class="writing-error-char">'+e(a[--i])+'</mark>');}else{expected.unshift('<mark class="writing-fix-char">'+e(b[--j])+'</mark>');}}
  return {typed:typed.join(''),expected:expected.join(''),distance:d[a.length][b.length]};
}
function renderWritingExam() {
  prepareWritingSurface();const s=writingExam,e=escapeHTML,container=document.getElementById('active-card-container');
  const top=writingModes()+`<div class="memory-heading"><h2>Thi viết · ${s.ids.length} câu</h2><p>Không có từ cho sẵn hoặc gợi ý. Bạn có thể sửa, đánh dấu và quay lại trước khi nộp.</p></div>`;
  if(s.stage==='complete') {
    const score=s.results.filter(r=>r.correct).length;
    container.innerHTML=`<section class="memory-study">${top}<section class="memory-complete"><h3>Đúng ${score}/${s.ids.length} câu</h3><p>Chấm theo đáp án đề cương; bỏ qua hoa/thường và khoảng trắng thừa, giữ yêu cầu về chính tả và dạng từ.</p><div class="memory-actions"><button class="btn-primary" onclick="setPart2Mode('learn')">Về học điền từ</button><button class="btn-quiet" onclick="restartWritingExam()">Thi lượt mới</button></div></section><section class="exam-review"><h3>Xem lại bài viết</h3>${s.results.map((r,i)=>{const q=DATASET.part2Data.find(q=>q.id===r.id);const guide=WRITING_GUIDES[q.id-1]||[q.vn,q.clue,'Nhớ từ khóa: '+q.clue];return `<details><summary>${i+1}. ${e(q.sentence)} <span>${r.correct?'✓ Đúng':'✕ Cần sửa'}</span></summary><p>Bạn điền: ${e(r.answer||'Chưa điền')}</p><p>Đáp án: <strong>${e(q.answer)}</strong></p><p>${e(q.vn)}</p><p>${e(guide[2])}</p></details>`;}).join('')}</section></section>`;
    saveWriting();return;
  }
  const q=DATASET.part2Data.find(q=>q.id===s.ids[s.index]);
  container.innerHTML=`<section class="memory-study writing-study">${top}<p id="writing-exam-status" class="memory-note">Đã điền ${Object.keys(s.answers).length}/${s.ids.length} câu</p><div class="memory-session-meta"><span>Câu ${s.index+1}/${s.ids.length}</span><span>Chấm khi nộp bài</span></div><h3 class="writing-sentence">${e(q.sentence)}</h3><form class="writing-form" onsubmit="event.preventDefault();moveWritingExam(1)"><label for="writing-exam-answer">Điền từ hoặc cụm từ</label><input id="writing-exam-answer" class="writing-input" lang="en" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" maxlength="200" value="${e(s.answers[s.index]||'')}" oninput="updateWritingExamAnswer(this.value)"><p class="memory-note">Nhấn Enter để sang câu tiếp theo. Ở câu cuối, dùng nút Nộp bài.</p></form><div class="writing-exam-controls"><button class="btn-quiet" onclick="moveWritingExam(-1)" ${s.index===0?'disabled':''}>Câu trước</button><button id="writing-exam-flag" class="btn-quiet" onclick="flagWritingExam()" aria-pressed="${!!s.flags[s.index]}">${s.flags[s.index]?'Đã đánh dấu':'Đánh dấu'}</button>${s.index<s.ids.length-1?'<button class="btn-primary" onclick="moveWritingExam(1)">Câu tiếp theo</button>':'<button class="btn-primary" onclick="submitWritingExam()">Nộp bài</button>'}</div><details class="writing-exam-map"><summary>Xem tất cả ${s.ids.length} câu</summary><div class="exam-map"><p>Viền vàng: cần xem lại</p><div>${s.ids.map((id,i)=>`<button data-writing-index="${i}" class="${i===s.index?'current ':''}${Object.hasOwn(s.answers,i)?'answered ':''}${s.flags[i]?'flagged':''}" onclick="goWritingExam(${i})" aria-label="Câu ${i+1}" aria-current="${i===s.index?'step':'false'}">${i+1}</button>`).join('')}</div></div></details><div class="guided-finish"><span>Đáp án và điểm chỉ hiện sau khi nộp.</span><button class="btn-quiet" onclick="submitWritingExam()">Nộp bài thi viết</button></div></section>`;
  saveWriting();
}
function updateWritingExamAnswer(value) {
  if(writingExam?.stage!=='active')return;
  const s=writingExam;if(normalizeWritten(value))s.answers[s.index]=value;else delete s.answers[s.index];
  document.getElementById('writing-exam-status').textContent=`Đã điền ${Object.keys(s.answers).length}/${s.ids.length} câu`;
  document.querySelector(`[data-writing-index="${s.index}"]`)?.classList.toggle('answered',!!normalizeWritten(value));saveWriting();
}
function goWritingExam(index) { if(writingExam?.stage!=='active'||index<0||index>=writingExam.ids.length)return;writingExam.index=index;renderWritingExam();document.getElementById('writing-exam-answer')?.focus(); }
function moveWritingExam(delta) { goWritingExam(Math.max(0,Math.min(writingExam.ids.length-1,writingExam.index+delta))); }
function flagWritingExam() { const s=writingExam;if(s?.stage!=='active')return;s.flags[s.index]=!s.flags[s.index];const b=document.getElementById('writing-exam-flag');b.textContent=s.flags[s.index]?'Đã đánh dấu':'Đánh dấu';b.setAttribute('aria-pressed',!!s.flags[s.index]);document.querySelector(`[data-writing-index="${s.index}"]`)?.classList.toggle('flagged',!!s.flags[s.index]);saveWriting(); }
function submitWritingExam() {
  const s=writingExam;if(s?.stage!=='active')return;
  const left=s.ids.length-Object.keys(s.answers).length;
  if(!confirm(left?`Còn ${left} câu chưa điền. Nộp bài thi viết?`:'Nộp bài thi viết và xem kết quả?'))return;
  s.results=s.ids.map((id,i)=>{const q=DATASET.part2Data.find(q=>q.id===id),answer=s.answers[i]||'',correct=writtenCorrect(q,answer);recordWriting(writingItem(id),answer,correct,false,classifyWritten(answer,q.answer));return {id,answer,correct};});
  s.stage='complete';s.submitted=Date.now();renderWritingExam();
  const writingScore=s.results.filter(r=>r.correct).length;
  if(writingScore>=Math.round(s.ids.length*0.6)){triggerConfetti();playSfx('complete');}else playSfx('wrong');
}
function restartWritingExam() { if(writingExam?.stage==='active'&&!confirm('Bắt đầu bài thi viết mới? Bài đang làm sẽ được thay thế.'))return;writingExam=createWritingExam();renderWritingExam(); }
// Written questions also replace multiple choice in mixed exams and the review queue.
function enhanceWrittenQuiz(q) {
  document.querySelector('.shortcuts-footer').hidden=true;
  const e=escapeHTML,activeExam=exam&&!exam.submitted;
  const form=document.createElement('form');form.className='writing-form';form.id='mixed-writing-form';form.onsubmit=submitMixedWriting;
  form.innerHTML=`<label for="mixed-written-answer">Tự điền từ hoặc cụm từ</label><input id="mixed-written-answer" class="writing-input" lang="en" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" maxlength="200" value="${e(activeExam?exam.answers[curIdx]||'':q.lastWrittenAnswer||q.writingDraft||'')}" oninput="updateMixedWrittenAnswer(this.value)"><p id="mixed-writing-error" role="alert"></p><button class="btn-primary written-quiz-button" type="submit">${activeExam?(curIdx===questions.length-1?'Lưu đáp án':'Lưu và tiếp tục'):'Kiểm tra'}</button>`;
  const old=document.querySelector('.options-stack');if(old)old.replaceWith(form);else document.getElementById('feedback-anchor').before(form);
}
function updateMixedWrittenAnswer(value) {
  const q=questions[curIdx];if(!isWrittenQuestion(q))return;
  if(exam&&!exam.submitted){
    if(normalizeWritten(value))exam.answers[curIdx]=value;else delete exam.answers[curIdx];
    const count=Object.keys(exam.answers).length;
    const map=document.querySelector('.exam-map');if(map){map.querySelector('p').textContent=`Đã chọn ${count}/${questions.length} · Viền vàng: cần xem lại`;map.querySelectorAll('div>button')[curIdx]?.classList.toggle('answered',Object.hasOwn(exam.answers,curIdx));}
    document.getElementById('metric-cur').textContent=count;document.getElementById('track-fill').style.width=count/questions.length*100+'%';
    document.querySelector('.track-line').setAttribute('aria-valuenow',count/questions.length*100);
  }else q.writingDraft=value;
  snapshot();
}
function submitMixedWriting(event) {
  event?.preventDefault();const q=questions[curIdx];if(!isWrittenQuestion(q))return;
  const value=document.getElementById('mixed-written-answer').value;
  if(exam&&!exam.submitted){updateMixedWrittenAnswer(value);examMove(1);return;}
  if(isAnswered)return;
  if(!normalizeWritten(value)){document.getElementById('mixed-writing-error').textContent='Hãy điền từ trước khi kiểm tra.';return;}
  const correct=writtenCorrect(q,value);isAnswered=true;q.lastCorrect=correct;q.lastWrittenAnswer=value;
  if(correct)correctCount++;else{wrongCount++;missedItems.push(q);}
  recordWriting(writingItem(Number(q.id.split(':')[1])),value,correct,false,classifyWritten(value,q.correctAnswer));
  document.querySelectorAll('#mixed-writing-form input,#mixed-writing-form button').forEach(el=>el.disabled=true);
  originalFeedback(correct,q);triggerChime(correct, document.getElementById('mixed-written-answer'));snapshot();document.getElementById('btn-next')?.focus({preventScroll:true});
}
