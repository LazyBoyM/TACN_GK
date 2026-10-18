const {chromium}=require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const assert=require('assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'chrome'});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('dialog',d=>d.accept());
 await page.goto('http://127.0.0.1:4173/');
 assert.equal(await page.evaluate(()=>part1SubMode),'memory');
 assert.equal(await page.locator('.memory-options').count(),0);
 assert.equal(await page.locator('.memory-feedback').count(),0);
 assert.equal(await page.evaluate(()=>memoryCounts().new),48);
 const first=await page.evaluate(()=>memorySession.queue[0]);
 await page.getByRole('button',{name:'Hiện lựa chọn',exact:true}).click();
 assert.equal(await page.locator('.memory-options button').count(),4);
 const wrong=first.options.find(id=>id!==first.id);
 await page.locator(`[data-memory-id="${wrong}"]`).click();
 assert.equal(await page.locator('.memory-feedback').count(),0);
 assert.equal(await page.evaluate(()=>Object.keys(saved.history).length),0);
 await page.reload();
 assert.equal(await page.evaluate(()=>memorySession.stage),'confidence');
 assert.equal(await page.evaluate(()=>memorySession.answerId),wrong);
 await page.getByRole('button',{name:'Chắc',exact:true}).click();
 assert.equal(await page.evaluate(id=>memoryHistory(id).wrong,first.id),1);
 assert.equal(await page.evaluate(()=>memorySession.queue[4].id),first.id);
 assert.notEqual(await page.evaluate(()=>memorySession.queue[4].reverse),first.reverse);
 assert((await page.locator('.memory-feedback').innerText()).includes('Chưa đúng'));
 await page.evaluate(()=>rateMemory('sure')); // duplicate activation must not double-record
 assert.equal(await page.evaluate(id=>memoryHistory(id).wrong,first.id),1);
 await page.reload();assert.equal(await page.evaluate(()=>memorySession.stage),'feedback');
 await page.locator('#memory-next').click();
 for(let i=0;i<3;i++) {
   const id=await page.evaluate(()=>memorySession.queue[memorySession.index].id);
   await page.getByRole('button',{name:'Hiện lựa chọn',exact:true}).click();
   await page.locator(`[data-memory-id="${id}"]`).click();
   await page.getByRole('button',{name:'Chắc',exact:true}).click();
   await page.locator('#memory-next').click();
 }
 assert.equal(await page.evaluate(()=>memorySession.queue[memorySession.index].id),first.id);
 assert.equal(await page.locator('.memory-options').count(),0);
 await page.getByRole('button',{name:'Hiện lựa chọn',exact:true}).click();
 await page.locator(`[data-memory-id="${first.id}"]`).click();
 await page.getByRole('button',{name:'Chưa chắc',exact:true}).click();
 assert.equal(await page.evaluate(id=>memoryHistory(id).memory.days.length,first.id),0);
 assert(await page.evaluate(id=>memoryHistory(id).due<=Date.now(),first.id));
 assert(await page.evaluate(id=>weakQuestions().some(q=>q.id==='part1:'+id),first.id));
 const index=await page.evaluate(()=>memorySession.index);
 await page.locator('[data-part1-mode="board"]').click();
 await page.locator('.guided-option').first().click();
 await page.locator('[data-part1-mode="memory"]').click();
 assert.equal(await page.evaluate(()=>memorySession.index),index);
 assert.equal(await page.evaluate(()=>memorySession.stage),'feedback');
 await page.evaluate(()=>{
   const now=Date.now(),entry=makeMemoryEntry(16,false);
   recordMemory(entry,true,'sure',false,now);
   recordMemory(entry,true,'sure',false,now);
   recordMemory(entry,true,'sure',false,now);
 });
 assert.equal(await page.evaluate(()=>memoryHistory(16).memory.days.length),1);
 assert.equal(await page.evaluate(()=>memoryStatus(16)),'learning');
 await page.evaluate(()=>{
   const now=Date.now(),entry=makeMemoryEntry(23,false);
   recordMemory(entry,true,'sure',false,now-2*MEMORY_DAY);
   recordMemory(entry,true,'sure',false,now-MEMORY_DAY);
   recordMemory(entry,true,'sure',false,now);
 });
 assert.equal(await page.evaluate(()=>memoryStatus(23)),'retained');
 assert.equal(await page.evaluate(()=>memoryHistory(23).memory.days.length),3);
 // Correct answers with help remain due, including items that have never been wrong.
 await page.evaluate(()=>recordMemory(makeMemoryEntry(39,true),true,'sure',true));
 assert.equal(await page.evaluate(()=>memoryHistory(39).wrong),0);
 assert(await page.evaluate(()=>weakQuestions().some(q=>q.id==='part1:39')));
 // Finish the current session and ensure finite reinforcement plus a stable first-pass score.
 let turns=0;
 while(await page.evaluate(()=>memorySession.stage!=='complete')) {
   if(++turns>40)throw Error('Learning session did not terminate');
   await page.evaluate(()=>{
     if(memorySession.stage==='feedback')nextMemory();
     if(memorySession.stage==='recall')revealMemory(false);
     if(memorySession.stage==='choose')chooseMemory(memorySession.queue[memorySession.index].id);
     if(memorySession.stage==='confidence')rateMemory('sure');
   });
 }
 assert.equal(await page.evaluate(()=>memorySession.results.filter(r=>!r.repeat).length),6);
 await page.reload();assert.equal(await page.evaluate(()=>memorySession.stage),'complete');
 assert((await page.locator('.memory-complete').innerText()).includes('Lần gặp đầu'));
 // Review candidates contain due items and exclude future-due items unless explicitly early.
 assert(await page.evaluate(()=>memoryCandidates().every(q=>!memoryHistory(q.id)||memoryHistory(q.id).due<=Date.now())));
 await page.evaluate(()=>newMemoryRound());
 await page.screenshot({path:'memory-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});
 await page.screenshot({path:'memory-mobile.png',fullPage:true});
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.getByRole('button',{name:'Hiện lựa chọn',exact:true}).click();
 assert.equal(await page.locator('.memory-options button').count(),4);
 const answer=await page.evaluate(()=>memorySession.queue[memorySession.index].id);
 await page.locator(`[data-memory-id="${answer}"]`).click();
 await page.getByRole('button',{name:'Chưa chắc',exact:true}).click();
 assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:'memory-mobile-feedback.png',fullPage:true});
 // Even an entirely unsuccessful round must terminate and retain all weak cards.
 const stress=await browser.newPage();stress.on('pageerror',e=>errors.push(e.message));
 await stress.goto('http://127.0.0.1:4173');
 const stressResult=await stress.evaluate(()=>{
   let turns=0;
   while(memorySession.stage!=='complete'&&turns++<40) {
     if(memorySession.stage==='recall')revealMemory(true);
     if(memorySession.stage==='choose')chooseMemory(memorySession.queue[memorySession.index].options.find(id=>id!==memorySession.queue[memorySession.index].id));
     if(memorySession.stage==='confidence')rateMemory('unsure');
     if(memorySession.stage==='feedback')nextMemory();
   }
   return {turns,stage:memorySession.stage,due:memoryCounts().due,first:memorySession.results.filter(r=>!r.repeat).length};
 });
 assert.equal(stressResult.stage,'complete');assert(stressResult.turns<=30);assert.equal(stressResult.first,6);assert.equal(stressResult.due,6);
 await stress.evaluate(()=>{
   DATASET.part1Data.forEach(q=>recordMemory(makeMemoryEntry(q.id,false),true,'sure',false));
   newMemoryRound();
 });
 assert.equal(await stress.evaluate(()=>memorySession.stage),'complete');
 assert.equal(await stress.evaluate(()=>memorySession.queue.length),0);
 await stress.getByRole('button',{name:'Ôn sớm 6 thuật ngữ',exact:true}).click();
 assert.equal(await stress.evaluate(()=>memorySession.queue.length),6);
 assert(await stress.evaluate(()=>memorySession.early));
 // Upgrade a saved matching session from the previous version without discarding its pairs.
 const migration=await browser.newPage();migration.on('pageerror',e=>errors.push(e.message));
 await migration.goto('http://127.0.0.1:4173');
 await migration.locator('[data-part1-mode="board"]').click();
 await migration.locator('.guided-option').first().click();
 await migration.evaluate(()=>{delete saved.memoryRevision;persist();});
 await migration.reload();assert.equal(await migration.evaluate(()=>part1SubMode),'memory');
 await migration.locator('[data-part1-mode="board"]').click();
 assert.equal(await migration.evaluate(()=>matchingState.terms.filter(t=>t.userLetter).length),1);
 assert.deepEqual(errors,[]);
 console.log('PASS: hidden answers, confidence, wrong/unsure/helped scheduling, spaced reverse retry, duplicate protection, reload and mode persistence, calendar-day mastery, finite completion, 48-item tracking, mobile and migration.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
