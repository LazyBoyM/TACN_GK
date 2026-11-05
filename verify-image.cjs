const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const bank=vm.runInNewContext(fs.readFileSync('image-data.js','utf8')+';IMAGE_BANK');
assert.equal(bank.questions.length,400);
const study=bank.studyQuestions;
assert.equal(study.length,147);
assert.deepEqual([...study],[...bank.questions.filter((q,i)=>bank.questions.findIndex(item=>item.explanation===q.explanation)===i)]);
for(const [i,q] of bank.questions.entries()) {
  assert.equal(q.id,i+1);assert.equal(q.options.length,4);
  assert(Number.isInteger(q.answer)&&q.answer>=0&&q.answer<4);
  assert(q.prompt&&q.explanation&&q.topic);
}
assert.equal(bank.questions[0].answer,1);
assert.equal(bank.questions[7].answer,3);
assert.equal(bank.questions[399].answer,3);
assert.equal(fs.readFileSync('index.html','utf8'),fs.readFileSync('IT_English_Quiz_Revision.html','utf8'));
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try {
    const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    const key='image-processing-quiz-v1';
    const state=()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
    await page.goto('http://127.0.0.1:4173');
    await page.locator('[data-mode="part2"]').click();
    await page.locator('#writing-answer').fill('English draft before image quiz');
    const english=await page.evaluate(()=>localStorage.getItem('it-english-study-v2'));
    await page.locator('#subject-select').selectOption('image');
    assert.equal(await page.locator('[data-image-field="lengthRule"]').inputValue(),'skip');
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForFunction(()=>!document.querySelector('[data-image-field="lengthRule"]').disabled);
    // Independent DOM measurement checks the canvas-based visual filter.
    const excluded=await page.evaluate(()=>{
      const style=getComputedStyle(document.querySelector('.image-option')),probe=document.createElement('span');
      probe.style.cssText='position:absolute;left:-10000px;white-space:pre;width:max-content';
      probe.style.font=style.font;probe.style.letterSpacing=style.letterSpacing;document.body.append(probe);
      const ids=IMAGE_BANK.questions.filter(q=>{
        const widths=q.options.map(option=>{probe.textContent=option.replace(/\s+/g,' ').trim();return probe.getBoundingClientRect().width;}),correct=widths[q.answer];
        return widths.filter(width=>width<correct-.5).length===2&&widths.filter(width=>Math.abs(width-correct)<=.5).length===1;
      }).map(q=>q.id);probe.remove();return ids;
    });
    assert(excluded.length>0&&excluded.length<400);
    assert(!excluded.includes(7),'Q7 answer A is visually second-shortest, not third');
    for(const rule of ['skip','only']) {
      await page.locator('[data-image-field="lengthRule"]').selectOption(rule);
      const allIds=[];
      for(let batch=0;batch<8;batch++) {
        await page.locator('[data-image-field="batch"]').selectOption(String(batch));
        allIds.push(...await page.locator('[data-image-field="question"] option').evaluateAll(options=>options.map(option=>Number(option.value))));
      }
      const expected=study.filter(q=>rule==='only'?excluded.includes(q.id):!excluded.includes(q.id)).map(q=>q.id);
      assert.deepEqual(allIds,Array.from(expected));
    }
    await page.reload();
    await page.locator('[data-image-field="lengthRule"]').waitFor({state:'attached'});
    assert.equal(await page.locator('[data-image-field="lengthRule"]').inputValue(),'only');
    await page.locator('[data-image-field="lengthRule"]').selectOption('all');
    assert.equal(await page.locator('[data-image-field="batch"] optgroup[label="147 câu không trùng"] option').count(),8);
    for(let batch=0;batch<8;batch++) {
      await page.locator('[data-image-field="batch"]').selectOption(String(batch));
      const ids=await page.locator('[data-image-field="question"] option').evaluateAll(options=>options.map(option=>Number(option.value)));
      assert.deepEqual(ids,Array.from(study.slice(batch*20,(batch+1)*20),q=>q.id));
    }
    await page.locator('[data-image-field="batch"]').selectOption('0');
    assert.equal(await page.locator('.image-options button').count(),4);
    assert.equal(await page.locator('.image-feedback').count(),0);
    await page.locator('[data-image-answer="0"]').click();
    assert.equal(await page.locator('.image-option.is-correct').count(),1);
    assert.equal(await page.locator('.image-option.is-wrong').count(),1);
    assert.equal((await state()).answers[1],0);
    await page.locator('[data-image-field="filter"]').selectOption('wrong');
    assert.equal(await page.locator('[data-image-field="question"] option').count(),1);
    await page.locator('[data-image-action="retry"]').click();
    await page.locator('[data-image-answer="1"]').click();
    assert.equal((await state()).answers[1],1);
    await page.locator('[data-image-field="lengthRule"]').selectOption('skip');
    assert.equal((await state()).answers[1],1);
    await page.locator('[data-image-field="lengthRule"]').selectOption('all');
    await page.reload();
    await page.locator('.pm-empty').waitFor();
    assert.equal(await page.locator('.pm-empty').count(),1);
    await page.locator('[data-image-field="filter"]').selectOption('all');
    await page.locator('[data-image-field="question"]').selectOption('2');
    await page.locator('body').click({position:{x:2,y:2}});
    await page.keyboard.press('d');assert.equal((await state()).answers[2],3);
    await page.keyboard.press('ArrowRight');assert.equal((await state()).questionId,3);
    await page.locator('[data-image-field="topic"]').selectOption('Nén ảnh');
    assert((await page.locator('[data-image-field="question"] option').count())<20);
    await page.locator('[data-image-field="topic"]').selectOption('all');
    await page.locator('[data-image-field="question"]').selectOption(String(study[19].id));
    assert(await page.locator('[data-image-move="1"]').isDisabled());
    await page.locator('[data-image-action="next-batch"]').click();
    assert.equal((await state()).batch,1);
    assert.equal((await state()).questionId,study[20].id);
    await page.locator('[data-image-field="batch"]').selectOption('7');
    await page.locator('[data-image-field="question"]').selectOption('399');
    assert(await page.locator('[data-image-move="1"]').isDisabled());
    await page.locator('[data-image-answer="2"]').click();
    await page.reload();
    await page.locator('.image-question').waitFor();
    assert.equal(await page.locator('[data-image-field="batch"]').inputValue(),'7');
    assert.equal((await state()).questionId,399);
    assert.equal((await state()).answers[1],1);
    fs.mkdirSync('.test-artifacts',{recursive:true});
    await page.screenshot({path:'.test-artifacts/image-desktop.png',fullPage:true});
    for(const width of [390,360]) {
      await page.setViewportSize({width,height:844});
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    }
    await page.screenshot({path:'.test-artifacts/image-mobile.png',fullPage:true});
    await page.locator('#subject-select').selectOption('pm');
    assert(await page.locator('.pm-reading-section').count()>0);
    await page.locator('#subject-select').selectOption('image');
    assert.equal((await state()).answers[399],2);
    // An old priority selection falls back to the matching study question.
    await page.evaluate(key=>{
      const saved=JSON.parse(localStorage.getItem(key));
      localStorage.setItem(key,JSON.stringify({...saved,batch:11}));
    },key);
    await page.reload();
    assert.equal(await page.locator('[data-image-field="batch"]').inputValue(),'7');
    assert.equal(await page.locator('[data-image-field="batch"] optgroup').count(),2);
    await page.locator('[data-image-mode="keywords"]').click();
    assert.equal(await page.locator('[data-keyword-batch] optgroup').count(),1);
    await page.locator('[data-image-mode="quiz"]').click();
    const testBatches=await page.locator('[data-image-field="batch"] optgroup[label="Tự kiểm tra 400 câu gốc"] option').evaluateAll(options=>options.map(option=>option.value));
    assert.equal(testBatches.length,8);
    for(const [index,value] of testBatches.entries()){
      await page.locator('[data-image-field="batch"]').selectOption(value);
      const ids=await page.locator('[data-image-field="question"] option').evaluateAll(options=>options.map(option=>Number(option.value)));
      assert.deepEqual(ids,Array.from({length:50},(_,i)=>index*50+i+1));
    }
    await page.locator('[data-image-field="batch"]').selectOption(testBatches[0]);
    await page.locator('[data-image-field="question"]').selectOption('1');
    assert.equal(await page.locator('.image-feedback').count(),0);
    await page.locator('[data-image-answer="0"]').click();
    await page.reload();
    assert.equal(await page.locator('[data-image-field="batch"]').inputValue(),testBatches[0]);
    assert.equal((await state()).testAnswers[1],0);
    assert.equal((await state()).answers[1],1);
    const questionOrder=()=>page.locator('[data-image-field="question"] option').evaluateAll(options=>options.map(option=>Number(option.value)));
    const displayedOptions=()=>page.locator('.image-option > span:nth-child(2)').allTextContents();
    const originalOrder=await questionOrder();
    await page.locator('[data-image-action="shuffle"]').click();
    assert.deepEqual(await questionOrder(),originalOrder);
    assert.equal(await page.locator('[data-image-field="question"]').inputValue(),'1');
    assert.equal((await state()).testAnswers[1],undefined);
    assert.equal((await state()).answers[1],1);
    const mixed=await displayedOptions(),firstQuestion=bank.questions[0];
    assert.notDeepEqual(mixed,[...firstQuestion.options]);
    assert.deepEqual([...mixed].sort(),[...firstQuestion.options].sort());
    const correctPosition=mixed.indexOf(firstQuestion.options[firstQuestion.answer]);
    const wrongPosition=(correctPosition+1)%4;
    await page.locator(`[data-image-answer="${wrongPosition}"]`).click();
    assert.equal(await page.locator('.image-feedback strong').innerText(),`Chưa đúng · Đáp án ${'ABCD'[correctPosition]}`);
    assert.equal(await page.locator('.image-option.is-correct > span:nth-child(2)').innerText(),firstQuestion.options[firstQuestion.answer]);
    await page.locator('[data-image-action="retry"]').click();
    await page.locator('body').click({position:{x:2,y:2}});
    await page.keyboard.press('abcd'[correctPosition]);
    assert.equal(await page.locator('.image-feedback strong').innerText(),'Đúng');
    assert.equal((await state()).testAnswers[1],firstQuestion.answer);
    await page.locator('[data-image-action="grade"]').click();
    assert.match(await page.locator('[data-image-result]').innerText(),/1\/50 điểm[\s\S]*Đúng 1 · Sai 0 · Chưa làm 49/);
    await page.evaluate(key=>{
      const saved=JSON.parse(localStorage.getItem(key));
      for(const q of IMAGE_BANK.questions.slice(350,399))saved.testAnswers[q.id]=q.answer;
      localStorage.setItem(key,JSON.stringify({...saved,batch:31,testBatchSize:20,questionId:400}));
    },key);
    await page.reload();
    assert.equal(await page.locator('[data-image-field="batch"]').inputValue(),testBatches.at(-1));
    assert.equal(await page.locator('[data-image-field="question"]').inputValue(),'400');
    assert.equal((await state()).testAnswers[1],firstQuestion.answer);
    await page.locator('[data-image-answer="0"]').click();
    assert.match(await page.locator('[data-image-result]').innerText(),/49\/50 điểm[\s\S]*Đúng 49 · Sai 1 · Chưa làm 0/);
    await page.locator('#subject-select').selectOption('english');
    assert.equal(await page.locator('#writing-answer').inputValue(),'English draft before image quiz');
    assert.equal(await page.evaluate(()=>localStorage.getItem('it-english-study-v2')),english);
    assert.deepEqual(errors,[]);
    console.log('PASS: 147 deduplicated questions, answers, filters, retry, persistence, keyboard, subject isolation, responsive layout');
  } finally {await browser.close();}
})();
