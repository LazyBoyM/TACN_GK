const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const assert=require('node:assert/strict');
(async()=>{
  const browser=await chromium.launch({channel:'chrome',headless:true});
  try {
    const page=await browser.newPage({viewport:{width:390,height:844}}),errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    await page.goto('http://127.0.0.1:4173/?subject=image');
    await page.locator('[data-image-field="lengthRule"]:enabled').waitFor();
    const quiz=await page.evaluate(()=>localStorage.getItem('image-processing-quiz-v1'));
    await page.locator('[data-image-mode="keywords"]').click();
    // Every original question has its own card, including repeated concepts.
    const bank=await page.evaluate(()=>IMAGE_BANK.questions);
    assert.equal(await page.locator('[data-keyword-batch] option').count(),8);
    assert.match(await page.locator('[data-keyword-batch] option').first().innerText(),/Câu 1–50/);
    assert.match(await page.locator('[data-keyword-batch] option').last().innerText(),/Câu 351–400/);
    const cards=await page.evaluate(()=>{
      const rows=[];
      for(let batch=0;batch<8;batch++){
        const select=document.querySelector('[data-keyword-batch]');select.value=String(batch);select.dispatchEvent(new Event('change',{bubbles:true}));
        for(let index=0;index<50;index++){
          const card=document.querySelector('.image-keyword-card');
          const row={id:Number(card.dataset.keywordId),prompt:card.querySelector('h2').textContent,hidden:!document.querySelector('.image-feedback')};
          document.querySelector('[data-keyword-action="reveal"]').click();
          row.answer=document.querySelector('.image-feedback').textContent;rows.push(row);
          if(index<49)document.querySelector('[data-keyword-action="next"]').click();
        }
      }
      return rows;
    });
    assert.deepEqual(cards.map(card=>card.id),bank.map(question=>question.id));
    for(const [index,card] of cards.entries()){
      assert.equal(card.prompt,bank[index].prompt);assert(card.hidden);
      assert(card.answer.includes(bank[index].options[bank[index].answer]));
    }
    await page.locator('[data-keyword-batch]').selectOption('0');
    assert.equal(await page.locator('.image-feedback').count(),0);
    assert.match(await page.locator('.image-keyword-card h2').innerText(),/Nhiễu ngẫu nhiên/);
    await page.locator('[data-keyword-action="reveal"]').click();
    assert.match(await page.locator('.image-feedback').innerText(),/không rõ quy luật/);
    await page.locator('[data-keyword-action="again"]').click();
    assert.match(await page.locator('.image-keyword-card h2').innerText(),/Tăng số mức xám/);
    const progress=await page.evaluate(()=>JSON.parse(localStorage.getItem('image-keyword-study-v1')));
    assert(progress[1].due>Date.now()+9*60*1000);
    await page.locator('[data-keyword-action="review"]').click();
    assert.match(await page.locator('.pm-empty').innerText(),/Chưa có từ khóa đến hạn/);
    await page.locator('[data-keyword-batch]').selectOption('1');
    await page.locator('[data-keyword-action="reveal"]').click();
    await page.locator('[data-keyword-action="remember"]').click();
    assert.equal(await page.locator('.image-feedback').count(),0);
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    await page.locator('[data-image-mode="quiz"]').click();
    assert.equal(await page.evaluate(()=>localStorage.getItem('image-processing-quiz-v1')),quiz);
    await page.reload();
    assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('image-keyword-study-v1'))[1]),progress[1]);
    // A due card appears again and leaves the review queue after rating.
    await page.evaluate(()=>localStorage.setItem('image-keyword-study-v1',JSON.stringify({1:{due:0}})));
    await page.reload();
    await page.locator('[data-image-mode="keywords"]').click();
    await page.locator('[data-keyword-action="review"]').click();
    await page.locator('[data-keyword-action="reveal"]').click();
    await page.locator('[data-keyword-action="remember"]').click();
    assert.equal(await page.locator('.pm-empty').count(),1);
    // Shuffling preserves all 50 IDs, hides the answer, and leaves saved work intact.
    const savedKeywords=await page.evaluate(()=>localStorage.getItem('image-keyword-study-v1'));
    let shuffled=[];
    for(let batch=0;batch<8;batch++){
      await page.locator('[data-keyword-batch]').selectOption(String(batch));
      await page.locator('[data-keyword-action="reveal"]').click();
      await page.locator('[data-keyword-action="shuffle"]').click();
      assert.equal(await page.locator('.image-feedback').count(),0);
      shuffled=await page.evaluate(()=>{
        const ids=[];
        for(let index=0;index<50;index++){
          ids.push(Number(document.querySelector('.image-keyword-card').dataset.keywordId));
          if(index<49)document.querySelector('[data-keyword-action="next"]').click();
        }
        return ids;
      });
      const expected=Array.from({length:50},(_,index)=>batch*50+index+1);
      assert.deepEqual([...shuffled].sort((a,b)=>a-b),expected);
      assert.notDeepEqual(shuffled,expected);
    }
    assert.equal(await page.evaluate(()=>localStorage.getItem('image-keyword-study-v1')),savedKeywords);
    await page.locator('[data-image-mode="quiz"]').click();
    await page.locator('[data-image-field="lengthRule"]').selectOption('all');
    await page.locator('[data-image-field="batch"]').selectOption('7');
    const quizOrder=()=>page.locator('[data-image-field="question"] option').evaluateAll(options=>options.map(option=>Number(option.value)));
    assert.deepEqual(await quizOrder(),shuffled);
    await page.locator('[data-image-field="batch"]').selectOption('0');
    await page.locator('[data-image-field="question"]').selectOption('1');
    await page.locator('[data-image-answer="1"]').click();
    await page.locator('[data-image-field="batch"]').selectOption('7');
    await page.locator('[data-image-field="question"]').selectOption('400');
    await page.locator('[data-image-answer="0"]').click();
    await page.locator('[data-image-field="filter"]').selectOption('wrong');
    await page.locator('[data-image-action="shuffle"]').click();
    const mixed=await quizOrder();
    assert.notDeepEqual(mixed,shuffled);
    assert.deepEqual([...mixed].sort((a,b)=>a-b),Array.from({length:50},(_,index)=>351+index));
    assert.equal(await page.locator('[data-image-field="question"]').inputValue(),String(mixed[0]));
    assert.equal(await page.locator('[data-image-field="filter"]').inputValue(),'all');
    assert.equal(await page.locator('.image-feedback').count(),0);
    await page.reload();
    assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('image-processing-quiz-v1')).answers),{1:1});
    assert.deepEqual(errors,[]);
    console.log('PASS image keywords: all 400 individual cards and answers, recall, scheduling, persistence, review, mobile, quiz isolation');
  } finally {await browser.close();}
})().catch(error=>{console.error(error);process.exit(1);});
