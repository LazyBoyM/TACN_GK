// Animate complete question changes, never typed input or progress updates.
(() => {
  const root=document.getElementById('active-card-container');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const desktop=matchMedia('(min-width: 761px)');
  const subjectSelect=document.getElementById('subject-select');
  function syncSubjectControl() {
    subjectSelect.tabIndex=desktop.matches?-1:0;
    if(desktop.matches)subjectSelect.setAttribute('aria-hidden','true');
    else subjectSelect.removeAttribute('aria-hidden');
  }
  syncSubjectControl();
  desktop.addEventListener('change',syncSubjectControl);
  const selector='.image-question,.pm-flashcard,.pm-unified-card,.memory-study,.guided-matching,.console-card,.pm-result';
  new MutationObserver(records=>{
    if(reduced.matches)return;
    for(const record of records)for(const node of record.addedNodes) {
      if(!(node instanceof Element))continue;
      const targets=node.matches(selector)?[node]:[...node.querySelectorAll(selector)];
      // One entrance per surface avoids nested competing motion.
      for(const target of targets.filter(el=>el.isConnected&&!el.parentElement?.closest(selector))) {
        target.classList.add('studio-enter');
        target.addEventListener('animationend',()=>target.classList.remove('studio-enter'),{once:true});
      }
    }
  }).observe(root,{childList:true,subtree:true});
})();
