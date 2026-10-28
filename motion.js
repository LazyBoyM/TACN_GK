// Animate only new question/feedback nodes, never keystrokes or saved-status updates.
(() => {
  const root=document.getElementById('active-card-container');
  if(!root)return;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const targets='.memory-question,.writing-sentence,.guided-question,.memory-options,.guided-options,.memory-confidence,.memory-feedback,.feedback-panel,.writing-hint,.summary-card,.memory-complete,.pm-question,.pm-result';
  new MutationObserver(records=>{
    if(reduced.matches)return;
    const added=new Set();
    for(const record of records)for(const node of record.addedNodes){
      if(!(node instanceof Element))continue;
      if(node.matches(targets))added.add(node);
      node.querySelectorAll(targets).forEach(el=>added.add(el));
    }
    for(const el of added) {
      el.classList.add('lesson-enter');
      el.addEventListener('animationend',()=>el.classList.remove('lesson-enter'),{once:true});
    }
  }).observe(root,{childList:true,subtree:true});
})();
