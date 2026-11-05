// Presentation only: reactions never change answers, scores or study progress.
(() => {
  'use strict';
  const KEY='study-companion-enabled-v1';
  const root=document.getElementById('active-card-container');
  const desktop=matchMedia('(min-width: 761px) and (min-height: 800px)');
  let enabled=true;
  try {enabled=localStorage.getItem(KEY)!=='off';}catch{}
  let voiceEnabled=true,lastAudioAt=0,playbackAttempt=0;
  try {voiceEnabled=localStorage.getItem('study-companion-voice-v1')!=='off';}catch{}
  const audio=new Audio();audio.preload='none';audio.volume=.55;
  const cues={
    welcome:['ganbatte','Ganbatte! · Cố lên!'],
    correct:['yatta','Yatta! · Làm được rồi!'],
    wrong:['daijoubu','Daijōbu! · Không sao đâu!'],
    complete:['otsukare','Otsukaresama! · Bạn đã cố gắng rồi!'],
    streak:['sugoi','Sugoi! · Giỏi lắm!']
  };
  let timer,frame,streak=0,lastSource='',lastLine='';
  const lines={
    welcome:['Mình học cùng bạn nhé! Từng câu một thôi.','Sẵn sàng chưa? Miku ở đây cổ vũ bạn!','Hôm nay mình nhớ thêm một chút nhé!'],
    correct:['Đúng rồi! Giữ nhịp này nhé!','Chuẩn luôn! Bạn nắm được ý này rồi.','Thêm một câu đúng! Tiếp tục nào!'],
    wrong:['Không sao đâu! Mình xem lại lời giải nhé.','Sai một câu cũng là thêm một cơ hội nhớ bài.','Đọc lại ý chính rồi thử thêm lần nữa nhé!'],
    helped:['Có gợi ý cũng được. Lần sau mình thử tự nhớ nhé!','Giờ che đáp án và nhắc lại một lần nhé!'],
    selfGood:['Bạn đã tự nhớ được các ý rồi. Tốt lắm!','Dàn ý vững hơn rồi đấy. Mình tiếp tục nhé!'],
    selfReview:['Mình ôn lại những ý còn thiếu nhé.','Chưa chắc ý nào thì mình luyện lại ý đó thôi.'],
    complete:['Xong lượt rồi! Nghỉ mắt một chút nhé.','Hoàn thành rồi! Những ý còn khó, mình ôn tiếp sau nhé.'],
    flash:['Thử nhẩm dàn ý trước khi lật thẻ nhé!','Nhớ được khung ý là mình đã có điểm tựa rồi.']
  };
  const panel=document.createElement('aside');
  panel.className='study-companion';panel.hidden=true;panel.setAttribute('aria-label','Bạn đồng hành Miku');
  panel.innerHTML='<div class="companion-bubble"><div class="companion-heading"><strong>Miku</strong><button type="button" class="companion-dismiss" aria-label="Ẩn lời nhắn"><svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 6 12 12M18 6 6 18"/></svg></button></div><p class="companion-speech" role="status" aria-live="polite" aria-atomic="true"></p></div><button type="button" class="companion-character" aria-label="Chạm Miku để nhận lời cổ vũ"><span class="companion-art" aria-hidden="true"></span></button>';
  document.body.append(panel);
  const speech=panel.querySelector('.companion-speech');
  const bubble=panel.querySelector('.companion-bubble');
  const dismiss=panel.querySelector('.companion-dismiss');
  const voiceToggle=document.createElement('button');
  voiceToggle.type='button';voiceToggle.id='companion-voice';voiceToggle.className='companion-dismiss';
  voiceToggle.innerHTML='<svg aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m11 5-6 4H2v6h3l6 4V5Z"/><path d="M15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/></svg>';
  panel.querySelector('.companion-heading').insertBefore(voiceToggle,dismiss);
  const phrase=document.createElement('p');phrase.className='companion-phrase';phrase.hidden=true;
  speech.after(phrase);
  const audioNote=document.createElement('p');audioNote.className='companion-audio-note';audioNote.hidden=true;audioNote.setAttribute('role','status');
  phrase.after(audioNote);
  const toggle=document.createElement('button');
  toggle.type='button';toggle.id='companion-toggle';toggle.className='btn-quiet';
  toggle.innerHTML='<svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11.5a8 8 0 0 1-8 8H5l-3 3v-11a8 8 0 0 1 8-8h2a8 8 0 0 1 8 8Z"/><path d="M8 10h.01M14 10h.01M8 14q3 2 6 0"/></svg><span>Miku</span>';
  document.querySelector('.top-actions').append(toggle);
  function syncToggle() {
    toggle.setAttribute('aria-pressed',String(enabled));
    toggle.setAttribute('aria-label',enabled?'Tắt bạn đồng hành Miku':'Bật bạn đồng hành Miku');
    toggle.title=enabled?'Tắt bạn đồng hành Miku':'Bật bạn đồng hành Miku';
    voiceToggle.setAttribute('aria-pressed',String(voiceEnabled));
    voiceToggle.setAttribute('aria-label',voiceEnabled?'Tắt giọng Nhật tổng hợp':'Bật giọng Nhật tổng hợp');
    voiceToggle.title='Giọng Nhật tổng hợp · '+(voiceEnabled?'đang bật':'đang tắt');
  }
  function hide(full=false) {
    clearTimeout(timer);cancelAnimationFrame(frame);playbackAttempt++;audio.pause();panel.classList.remove('companion-enter');
    if(full||!enabled){panel.hidden=true;return;}
    bubble.hidden=true;panel.classList.add('is-idle');panel.dataset.mood='welcome';panel.hidden=false;place();
  }
  function playVoice(cue,force=false) {
    if(!voiceEnabled||!enabled||document.hidden||(!force&&Date.now()-lastAudioAt<2200))return;
    audio.pause();audio.src='assets/'+cues[cue][0]+'.mp3';
    audioNote.hidden=true;phrase.textContent=cues[cue][1];phrase.hidden=false;
    lastAudioAt=Date.now();
    const attempt=++playbackAttempt;
    audio.play().catch(()=>{
      if(attempt!==playbackAttempt||!voiceEnabled||!enabled||panel.hidden)return;
      audioNote.textContent='Bấm loa để thử bật giọng nói.';audioNote.hidden=false;
    });
  }
  function place(atStart=false) {
    if(desktop.matches)document.body.append(panel);
    else if(panel.classList.contains('is-idle'))document.querySelector('.study-page-heading').append(panel);
    else if(atStart)document.querySelector('.study-page-heading').after(panel);
    else {
      // Inline on phones: never cover an answer, input or navigation button.
      const anchor=root.querySelector('.image-feedback,.memory-feedback,.feedback-panel,.pm-result,.memory-complete,.summary-card')||root.querySelector('.pm-flashcard,.image-question,.memory-question,.writing-sentence,.pm-question')||root.firstElementChild;
      if(anchor)anchor.after(panel);else document.body.append(panel);
    }
  }
  function pick(group) {
    const options=lines[group].filter(line=>line!==lastLine);
    return options[Math.floor(Math.random()*options.length)]||lines[group][0];
  }
  function speak(text,mood='welcome',cue=mood,quiet=false,atStart=false) {
    if(!enabled)return;
    hide(true);
    frame=requestAnimationFrame(()=>{
      if(!enabled||document.hidden)return;
      panel.classList.remove('is-idle');bubble.hidden=false;
      place(atStart);panel.dataset.mood=mood;speech.textContent=text;lastLine=text;
      panel.hidden=false;panel.classList.add('companion-enter');
      phrase.hidden=true;audioNote.hidden=true;panel.dataset.cue=cue;if(!quiet)playVoice(cue);
      timer=setTimeout(hide,9000);
    });
  }
  function react({kind='answer',correct=false,assisted=false,source='',complete=false}={}) {
    if(!enabled)return;
    if(source&&source!==lastSource){streak=0;lastSource=source;}
    if(kind==='welcome'||kind==='flash'){speak(pick(kind),'welcome','welcome',false,kind==='welcome');return;}
    if(kind==='complete'||complete){speak(pick('complete'),'correct','complete');return;}
    if(kind==='self-check') {
      streak=0;speak(pick(assisted?'helped':correct?'selfGood':'selfReview'),assisted?'welcome':correct?'correct':'wrong');return;
    }
    streak=correct&&!assisted?streak+1:0;
    if(assisted){speak(pick('helped'),'welcome');return;}
    if(correct&&[3,5,10,20].includes(streak))speak(`${streak} câu đúng liên tiếp! Bạn đang vào guồng rồi!`,'correct','streak');
    else speak(pick(correct?'correct':'wrong'),correct?'correct':'wrong');
  }
  toggle.addEventListener('click',()=>{
    enabled=!enabled;syncToggle();
    try {localStorage.setItem(KEY,enabled?'on':'off');}catch{}
    if(enabled)react({kind:'welcome'});else hide(true);
  });
  voiceToggle.addEventListener('click',()=>{
    // A blocked autoplay can be retried by an explicit user gesture.
    if(!audioNote.hidden){playVoice(panel.dataset.cue||'welcome',true);return;}
    voiceEnabled=!voiceEnabled;syncToggle();
    try {localStorage.setItem('study-companion-voice-v1',voiceEnabled?'on':'off');}catch{}
    if(voiceEnabled)playVoice(panel.dataset.cue||'welcome',true);
    else {audio.pause();phrase.hidden=true;audioNote.hidden=true;}
  });
  dismiss.addEventListener('click',()=>hide());
  panel.querySelector('.companion-character').addEventListener('click',()=>react({kind:root.querySelector('.pm-flashcard')?'flash':'welcome'}));
  panel.addEventListener('pointerenter',()=>clearTimeout(timer));
  panel.addEventListener('pointerleave',()=>{timer=setTimeout(hide,9000);});
  panel.addEventListener('focusin',()=>clearTimeout(timer));
  panel.addEventListener('focusout',event=>{if(!panel.contains(event.relatedTarget))timer=setTimeout(hide,9000);});
  function subjectChanged() {streak=0;lastSource='';hide();}
  document.getElementById('subject-select').addEventListener('change',subjectChanged);
  document.querySelectorAll('[data-subject-target]').forEach(button=>button.addEventListener('click',subjectChanged));
  desktop.addEventListener('change',()=>{if(!panel.hidden)place();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)hide(true);else if(enabled)hide();});
  document.addEventListener('keydown',event=>{if(event.key==='Escape')hide();});
  syncToggle();
  window.studyCompanion={react,dismiss:hide};
  // Show the companion on arrival without requesting autoplay permission.
  if(enabled)speak(pick('welcome'),'welcome','welcome',true,true);
})();
