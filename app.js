let activeMode = 'part1';
    let questions = [];
    let curIdx = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let missedItems = [];
    let isReviewingMissed = false;
    let isAnswered = false;
    let audioMuted = false;

    // Web Audio Synthesizer & Sound Effects Engine
    let audioCtx = null;
    let streakCount = 0; window.streakCount = streakCount;

    function getAudioContext() {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
        }
      }
      if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      return audioCtx;
    }

    function playSfx(type) {
      if (audioMuted) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const now = ctx.currentTime;

        if (type === 'select') {
          // Satisfying tactile pop / wooden bubble tap with organic micro-pitch variation
          const pitchVariation = 0.96 + Math.random() * 0.08;
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          const gain2 = ctx.createGain();

          // Body: fast pitch-drop sine
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(780 * pitchVariation, now);
          osc1.frequency.exponentialRampToValueAtTime(210 * pitchVariation, now + 0.055);
          gain1.gain.setValueAtTime(0.12, now);
          gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

          // Click transient: triangle micro-snap
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(1400 * pitchVariation, now);
          osc2.frequency.exponentialRampToValueAtTime(400 * pitchVariation, now + 0.02);
          gain2.gain.setValueAtTime(0.06, now);
          gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.022);

          osc1.connect(gain1); gain1.connect(ctx.destination);
          osc2.connect(gain2); gain2.connect(ctx.destination);
          osc1.start(now); osc1.stop(now + 0.065);
          osc2.start(now); osc2.stop(now + 0.025);
        } else if (type === 'btn') {
          // Soft mechanical switch click (tactile key thock)
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain1 = ctx.createGain();
          const gain2 = ctx.createGain();

          // Transient micro-click
          osc1.type = 'triangle';
          osc1.frequency.setValueAtTime(1200, now);
          osc1.frequency.exponentialRampToValueAtTime(380, now + 0.015);
          gain1.gain.setValueAtTime(0.06, now);
          gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.018);

          // Warm bottom thock
          osc2.type = 'sine';
          osc2.frequency.setValueAtTime(220, now);
          osc2.frequency.exponentialRampToValueAtTime(90, now + 0.038);
          gain2.gain.setValueAtTime(0.09, now);
          gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

          osc1.connect(gain1); gain1.connect(ctx.destination);
          osc2.connect(gain2); gain2.connect(ctx.destination);
          osc1.start(now); osc1.stop(now + 0.02);
          osc2.start(now); osc2.stop(now + 0.045);
        } else if (type === 'correct') {
          // Lush, sparkling marimba-bell chime chord (F5 -> A5 -> C6 -> E6)
          const notes = [698.46, 880.00, 1046.50, 1318.51];
          notes.forEach((freq, idx) => {
            const start = now + idx * 0.048;
            // Fundamental tone
            const osc1 = ctx.createOscillator();
            const gain1 = ctx.createGain();
            osc1.type = 'sine';
            osc1.frequency.setValueAtTime(freq, start);
            gain1.gain.setValueAtTime(0, start);
            gain1.gain.linearRampToValueAtTime(0.12, start + 0.012);
            gain1.gain.exponentialRampToValueAtTime(0.001, start + 0.38);
            osc1.connect(gain1); gain1.connect(ctx.destination);
            osc1.start(start); osc1.stop(start + 0.38);

            // Shimmer overtone
            const osc2 = ctx.createOscillator();
            const gain2 = ctx.createGain();
            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(freq * 2, start);
            gain2.gain.setValueAtTime(0, start);
            gain2.gain.linearRampToValueAtTime(0.028, start + 0.01);
            gain2.gain.exponentialRampToValueAtTime(0.001, start + 0.24);
            osc2.connect(gain2); gain2.connect(ctx.destination);
            osc2.start(start); osc2.stop(start + 0.24);
          });
        } else if (type === 'wrong') {
          // Gentle warm double wooden-knock (acoustic marimba knock)
          [
            { t: 0.00, f1: 240, f2: 130, g: 0.15, d: 0.06 },
            { t: 0.075, f1: 185, f2: 95, g: 0.12, d: 0.08 }
          ].forEach(k => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            const start = now + k.t;
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(k.f1, start);
            osc.frequency.exponentialRampToValueAtTime(k.f2, start + k.d);
            gain.gain.setValueAtTime(k.g, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + k.d + 0.02);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(start); osc.stop(start + k.d + 0.02);
          });
        } else if (type === 'streak') {
          // Exciting magical powerup cascade (G5 -> C6 -> D6 -> E6 -> G6)
          const notes = [783.99, 1046.50, 1174.66, 1318.51, 1567.98];
          notes.forEach((freq, idx) => {
            const start = now + idx * 0.038;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0, start);
            gain.gain.linearRampToValueAtTime(0.12, start + 0.008);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(start); osc.stop(start + 0.35);
          });
        } else if (type === 'complete') {
          // Grand victorious fanfare chords
          const chords = [
            { t: 0.00, f: [523.25, 659.25, 783.99], d: 0.18, g: 0.08 },
            { t: 0.19, f: [587.33, 739.99, 880.00], d: 0.18, g: 0.08 },
            { t: 0.39, f: [659.25, 830.61, 987.77], d: 0.20, g: 0.09 },
            { t: 0.60, f: [523.25, 659.25, 783.99, 1046.50, 1318.51], d: 0.75, g: 0.11 }
          ];
          chords.forEach(c => {
            c.f.forEach(freq => {
              const start = now + c.t;
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.type = 'sine';
              osc.frequency.setValueAtTime(freq, start);
              gain.gain.setValueAtTime(0, start);
              gain.gain.linearRampToValueAtTime(c.g, start + 0.015);
              gain.gain.exponentialRampToValueAtTime(0.001, start + c.d);
              osc.connect(gain); gain.connect(ctx.destination);
              osc.start(start); osc.stop(start + c.d);
            });
          });
        } else if (type === 'next') {
          // Smooth card swoop
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(320, now);
          osc.frequency.exponentialRampToValueAtTime(680, now + 0.065);
          gain.gain.setValueAtTime(0.045, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
          osc.connect(gain); gain.connect(ctx.destination);
          osc.start(now); osc.stop(now + 0.075);
        } else if (type === 'flag') {
          // High crystal bell ping
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();
          osc1.type = 'sine';
          osc1.frequency.setValueAtTime(987.77, now);
          osc2.type = 'triangle';
          osc2.frequency.setValueAtTime(1975.54, now);
          gain.gain.setValueAtTime(0.12, now);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
          osc1.connect(gain); osc2.connect(gain); gain.connect(ctx.destination);
          osc1.start(now); osc1.stop(now + 0.28);
          osc2.start(now); osc2.stop(now + 0.28);
        } else if (type === 'shuffle') {
          // Playful rolling dice arpeggio
          [440, 554.37, 659.25, 880].forEach((freq, idx) => {
            const start = now + idx * 0.038;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, start);
            gain.gain.setValueAtTime(0.07, start);
            gain.gain.exponentialRampToValueAtTime(0.001, start + 0.06);
            osc.connect(gain); gain.connect(ctx.destination);
            osc.start(start); osc.stop(start + 0.06);
          });
        }
      } catch (e) {}
    }

    function triggerChime(correct) {
      playSfx(correct ? 'correct' : 'wrong');
    }

    // Lightweight Celebratory Confetti Burst (Vanilla Canvas, Self-cleaning)
    function triggerConfetti() {
      const canvas = document.createElement('canvas');
      canvas.id = 'confetti-canvas';
      canvas.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;pointer-events:none;z-index:9999;';
      document.body.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);

      const colors = ['#38bdf8', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6', '#67e8f9'];
      const particles = Array.from({ length: 65 }, () => ({
        x: window.innerWidth * (0.2 + Math.random() * 0.6),
        y: window.innerHeight * 0.45,
        vx: (Math.random() - 0.5) * 15,
        vy: (Math.random() - 0.75) * 17,
        size: 6 + Math.random() * 7,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 12,
        alpha: 1
      }));

      const start = performance.now();
      function loop(now) {
        const elapsed = (now - start) / 1000;
        if (elapsed > 2.2) {
          canvas.remove();
          return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.42; // gravity
          p.vx *= 0.985; // air drag
          p.rotation += p.vr;
          if (elapsed > 1.3) p.alpha = Math.max(0, 1 - (elapsed - 1.3) / 0.9);
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation * Math.PI / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.65);
          ctx.restore();
        });
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    }

    window.playSfx = playSfx;
    window.triggerChime = triggerChime;
    window.triggerConfetti = triggerConfetti;

    function shuffle(arr) {
      const out = [...arr];
      for (let i = out.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [out[i], out[j]] = [out[j], out[i]];
      }
      return out;
    }

    function getQuestionsForMode(mode) {
      if (mode === 'part1') {
        const allTerms = DATASET.part1Data.map(d => d.term);
        return DATASET.part1Data.map(item => {
          const distractors = shuffle(allTerms.filter(t => t !== item.term)).slice(0, 3);
          return {
            id: 'part1:' + item.id,
            type: 'choice',
            phase: 'Phần I • Thuật Ngữ & Định Nghĩa',
            prompt: item.def,
            correctAnswer: item.term,
            options: shuffle([item.term, ...distractors]),
            explanation: item.vn,
            clue: item.clue,
            tip: item.tip
          };
        });
      } else if (mode === 'part2') {
        return DATASET.part2Data.map(item => ({
          id: 'part2:' + item.id,
          type: 'written',
          phase: 'Phần II • Điền Từ Vào Chỗ Trống',
          prompt: item.sentence,
          correctAnswer: item.answer,
          explanation: item.vn,
          clue: item.clue,
          tip: 'Khi thấy xuất hiện cụm "' + item.clue + '" ➔ suy luận ngay ra "' + item.answer + '"'
        }));
      } else if (mode === 'part3') {
        return DATASET.part3Data.map(item => ({
          id: 'part3:' + item.id,
          type: 'binary',
          phase: 'Phần III • Đúng Hay Sai (True / False)',
          prompt: item.text,
          correctAnswer: item.answer,
          explanation: item.reason,
          clue: item.clue,
          tip: item.tip
        }));
      } else if (mode === 'all') {
        const p1 = shuffle(getQuestionsForMode('part1')).slice(0, 15);
        const p2 = shuffle(getQuestionsForMode('part2')).slice(0, 15);
        const p3 = shuffle(getQuestionsForMode('part3')).slice(0, 15);
        return shuffle([...p1, ...p2, ...p3]);
      }
      return [];
    }

    // -------------------------------------------------------------
    // Matching data and scoring shared by the guided Part I interface.
    // -------------------------------------------------------------
    const ALPHABET_KEYS = [];
    for (let i = 0; i < 26; i++) {
      ALPHABET_KEYS.push(String.fromCharCode(65 + i)); // A..Z
    }
    for (let i = 0; i < 26; i++) {
      ALPHABET_KEYS.push('A' + String.fromCharCode(65 + i)); // AA..AZ
    }
    for (let i = 0; i < 26; i++) {
      ALPHABET_KEYS.push('B' + String.fromCharCode(65 + i)); // BA..BZ
    }

    let part1SubMode = 'memory'; // memory | board | choice
    let matchingState = {
      isGraded: false,
      score: 0,
      searchQuery: '',
      terms: [],
      definitions: [],
      onlyWrong: false,
    };

    function initMatchingBoard() {

      matchingState.isGraded = false;
      matchingState.score = 0;
      matchingState.searchQuery = '';
      matchingState.focusTermId = null;

      // 1. Shuffled definitions with letters A..AV
      const boardData = getBoardData();
      const rawDefs = boardData.map(d => ({
        id: d.id,
        def: d.def,
        clue: d.clue,
        tip: d.tip,
        vn: d.vn,
        matchedTermId: null
      }));
      const shuffledDefs = shuffle(rawDefs);
      shuffledDefs.forEach((d, i) => {
        d.letter = ALPHABET_KEYS[i];
      });

      const defIdToLetterMap = {};
      shuffledDefs.forEach(d => {
        defIdToLetterMap[d.id] = d.letter;
      });

      // 2. Terms in original order 1..48 (or filtered wrong if onlyWrong, or shuffled when reviewing/restarting)
      const sourceList = matchingState.onlyWrong && matchingState.terms.length > 0
        ? matchingState.terms.filter(t => !t.isCorrect)
        : boardData;

      const rawTerms = matchingState.onlyWrong && sourceList.length > 0
        ? shuffle(sourceList)
        : (matchingState.keepTermOrder ? boardData : shuffle(boardData));

      matchingState.terms = rawTerms.map(d => ({
        id: d.id,
        term: d.term,
        correctDefId: d.id,
        correctLetter: defIdToLetterMap[d.id],
        userLetter: null,
        isCorrect: null,
        clue: d.clue,
        tip: d.tip,
        vn: d.vn
      }));

      matchingState.onlyWrong = false;
      matchingState.definitions = shuffledDefs;

      syncMatchingMetrics();
      renderMatchingBoard();
    }

    function syncMatchingMetrics() {
      const total = matchingState.terms.length;
      const pairedCount = matchingState.terms.filter(t => t.userLetter).length;

      document.getElementById('metric-cur').innerText = pairedCount;
      document.getElementById('metric-total').innerText = total;

      if (matchingState.isGraded) {
        document.getElementById('metric-correct').innerText = matchingState.score;
        document.getElementById('metric-wrong').innerText = total - matchingState.score;
        const pct = Math.round((matchingState.score / total) * 100);
        document.getElementById('metric-pct').innerText = pct + '%';
        document.getElementById('track-fill').style.width = '100%';
      } else {
        document.getElementById('metric-correct').innerText = '-';
        document.getElementById('metric-wrong').innerText = '-';
        const pct = total > 0 ? Math.round((pairedCount / total) * 100) : 0;
        document.getElementById('metric-pct').innerText = pct + '% (nối)';
        document.getElementById('track-fill').style.width = pct + '%';
      }

      const reviewWrap = document.getElementById('review-alert-wrap');
      if (matchingState.isGraded && matchingState.score < total) {
        reviewWrap.style.display = 'block';
        document.getElementById('wrong-badge-count').innerText = (total - matchingState.score);
      } else {
        reviewWrap.style.display = 'none';
      }
    }

    window.pairTermWithLetter = function(termId, letter) {
      if (matchingState.isGraded) return;
      getAudioContext();
      const term = matchingState.terms.find(t => t.id === termId);
      if (!term) return;

      // If letter already assigned elsewhere, unpair other term
      if (letter) {
        const otherTerm = matchingState.terms.find(t => t.id !== termId && t.userLetter === letter);
        if (otherTerm) {
          otherTerm.userLetter = null;
        }
      }

      // Unpair old definition for this term
      if (term.userLetter) {
        const oldDef = matchingState.definitions.find(d => d.letter === term.userLetter);
        if (oldDef) oldDef.matchedTermId = null;
      }

      term.userLetter = letter;
      if (letter) {
        const newDef = matchingState.definitions.find(d => d.letter === letter);
        if (newDef) newDef.matchedTermId = termId;
      }

      syncMatchingMetrics();
      renderMatchingBoard();
    };

    window.gradeMatchingBoard = function() {
      let correct = 0;
      matchingState.terms.forEach(t => {
        t.isCorrect = (t.userLetter && t.userLetter === t.correctLetter);
        if (t.isCorrect) correct++;
      });
      matchingState.isGraded = true;
      matchingState.score = correct;

      triggerChime(correct >= Math.round(matchingState.terms.length * 0.7));
      syncMatchingMetrics();
      renderMatchingBoard();

      setTimeout(() => {
        document.getElementById('matching-summary-banner')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    };

    window.reviewOnlyWrongTerms = function() {
      matchingState.onlyWrong = true;
      initMatchingBoard();
    };

    // Assigned by study.js after the shared matching logic loads.
    let renderMatchingBoard;

    function buildQuestionSet(mode) {
      activeMode = mode;

      if (mode === 'part1' && part1SubMode === 'board') {
        initMatchingBoard();
        return;
      }

      questions = shuffle(getQuestionsForMode(mode));
      curIdx = 0;
      correctCount = 0;
      wrongCount = 0;
      missedItems = [];
      isReviewingMissed = false;
      isAnswered = false;
      renderCurrentQuestion();
    }

    function syncMetrics() {
      document.getElementById('metric-cur').innerText = Math.min(curIdx + 1, questions.length);
      document.getElementById('metric-total').innerText = questions.length;
      document.getElementById('metric-correct').innerText = correctCount;
      document.getElementById('metric-wrong').innerText = wrongCount;

      const answeredTotal = correctCount + wrongCount;
      const pct = answeredTotal > 0 ? Math.round((correctCount / answeredTotal) * 100) : 0;
      document.getElementById('metric-pct').innerText = pct + '%';

      const progressPct = questions.length > 0 ? (answeredTotal / questions.length) * 100 : 0;
      document.getElementById('track-fill').style.width = progressPct + '%';

      const reviewWrap = document.getElementById('review-alert-wrap');
      if (missedItems.length > 0 && !isReviewingMissed) {
        reviewWrap.style.display = 'block';
        document.getElementById('wrong-badge-count').innerText = missedItems.length;
      } else {
        reviewWrap.style.display = 'none';
      }
    }

    function renderCurrentQuestion() {
      const container = document.getElementById('active-card-container');
      isAnswered = false;

      if (curIdx >= questions.length) {
        renderSummary(container);
        return;
      }

      syncMetrics();
      const q = questions[curIdx];

      let optionsMarkup = '';
      if (q.type === 'choice') {
        const letters = ['A', 'B', 'C', 'D'];
        optionsMarkup = `
          <div class="options-stack" role="group" aria-label="Các lựa chọn đáp án">
            ${q.options.map((opt, i) => `
              <button class="choice-row" data-value="${opt.replace(/"/g, '&quot;')}" onclick="submitChoice('${opt.replace(/'/g, "\\'")}', this)">
                <div class="choice-leading">
                  <span class="key-badge">${letters[i]}</span>
                  <span class="choice-text">${opt}</span>
                </div>
                <kbd>${i + 1}</kbd>
              </button>
            `).join('')}
          </div>
        `;
      } else if (q.type === 'binary') {
        optionsMarkup = `
          <div class="binary-stack">
            <button class="binary-btn" data-value="true" onclick="submitBinary(true, this)">
              <span class="key-badge">T</span>
              <span>TRUE (ĐÚNG)</span>
            </button>
            <button class="binary-btn" data-value="false" onclick="submitBinary(false, this)">
              <span class="key-badge">F</span>
              <span>FALSE (SAI)</span>
            </button>
          </div>
        `;
      }

      container.innerHTML = `
        <article class="console-card">
          <div class="card-meta">
            <span class="meta-phase-badge">${q.phase}</span>
            <span class="meta-counter">CÂU ${curIdx + 1} TRÊN ${questions.length}</span>
          </div>

          <!-- Pure text without hints or spoilers -->
          <div class="question-prompt">${q.prompt}</div>

          ${optionsMarkup}

          <div id="feedback-anchor"></div>

          <div class="controls-row" id="controls-row" style="display: none;">
            <div class="desktop-hint">
              <span>Nhấn</span>
              <kbd>Space</kbd>
              <span>hoặc</span>
              <kbd>Enter</kbd>
              <span>để tiếp tục</span>
            </div>
            <button class="btn-primary" id="btn-next" onclick="stepNext()">
              <span>Câu tiếp theo</span>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        </article>
      `;
    }

    window.submitChoice = function(val, clickedEl) {
      if (isAnswered) return;
      isAnswered = true;
      getAudioContext();

      const q = questions[curIdx];
      const allRows = document.querySelectorAll('.choice-row');
      allRows.forEach(row => row.disabled = true);

      const isCorrect = (val.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase());
      if (isCorrect) {
        clickedEl.classList.add('state-correct');
        correctCount++;
        streakCount++; window.streakCount = streakCount;
        if (streakCount >= 3) playSfx('streak');
        else triggerChime(true);
      } else {
        clickedEl.classList.add('state-incorrect');
        wrongCount++;
        streakCount = 0; window.streakCount = streakCount;
        missedItems.push(q);
        triggerChime(false);

        allRows.forEach(row => {
          if (row.getAttribute('data-value').trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
            row.classList.add('state-correct');
          }
        });
      }

      showFeedback(isCorrect, q);
    };

    window.submitBinary = function(val, clickedEl) {
      if (isAnswered) return;
      isAnswered = true;
      getAudioContext();

      const q = questions[curIdx];
      const allBtns = document.querySelectorAll('.binary-btn');
      allBtns.forEach(btn => btn.disabled = true);

      const isCorrect = (val === q.correctAnswer);
      if (isCorrect) {
        clickedEl.classList.add('state-correct');
        correctCount++;
        streakCount++; window.streakCount = streakCount;
        if (streakCount >= 3) playSfx('streak');
        else triggerChime(true);
      } else {
        clickedEl.classList.add('state-incorrect');
        wrongCount++;
        streakCount = 0; window.streakCount = streakCount;
        missedItems.push(q);
        triggerChime(false);

        allBtns.forEach(btn => {
          if ((btn.getAttribute('data-value') === 'true') === q.correctAnswer) {
            btn.classList.add('state-correct');
          }
        });
      }

      showFeedback(isCorrect, q);
    };

    function showFeedback(isCorrect, q) {
      syncMetrics();

      // Highlight keywords in prompt for post-answer review
      if (q.clue) {
        const promptEl = document.querySelector('.question-prompt');
        if (promptEl) {
          let updatedText = escapeHTML(q.prompt);
          const stopWords = ['and', 'the', 'for', 'which', 'that', 'with', 'from', 'into', 'such', 'this', 'have', 'also', 'some'];
          const tokens = q.clue.split(/[\s,.]+/).filter(w => w.length > 2 && !stopWords.includes(w.toLowerCase()));
          const unique = [...new Set(tokens)].map(escapeHTML).map(escapeRegex).sort((a,b) => b.length-a.length);
          if (unique.length) updatedText = updatedText.replace(new RegExp('(' + unique.join('|') + ')', 'gi'), '<mark class="prompt-highlight">$1</mark>');
          promptEl.innerHTML = updatedText;
        }
      }

      const anchor = document.getElementById('feedback-anchor');
      const answerLabel = typeof q.correctAnswer === 'boolean'
        ? (q.correctAnswer ? 'TRUE (ĐÚNG)' : 'FALSE (SAI)')
        : q.correctAnswer;

      anchor.innerHTML = `
        <div class="feedback-panel">
          <div class="feedback-status ${isCorrect ? 'is-correct' : 'is-incorrect'}">
            <span class="status-icon-pill">${isCorrect ? '✓' : '✕'}</span>
            <span>${isCorrect ? 'Chính xác!' : 'Chưa chính xác'} • Đáp án đúng: <strong style="color:var(--text-1);">${answerLabel}</strong></span>
            ${isCorrect && streakCount >= 2 ? `<span class="streak-badge">🔥 ${streakCount} COMBO!</span>` : ''}
          </div>

          ${q.clue ? `
            <div class="clue-discovery-box">
              <div class="clue-item">
                <span class="clue-label">🎯 Dấu hiệu nhận diện trong đề:</span>
                <span class="clue-val-keyword">${q.clue}</span>
              </div>
              <div class="clue-item">
                <span class="clue-label">💡 Mẹo bắt bài (Không cần dịch toàn câu):</span>
                <span class="clue-val-tip">${q.tip || q.explanation}</span>
              </div>
            </div>
          ` : ''}

          <div class="feedback-vn">
            <strong style="color:var(--accent); font-size:0.8rem; text-transform:uppercase; letter-spacing:0.04em; display:block; margin-bottom:4px;">Dịch nghĩa trọn vẹn:</strong>
            ${q.explanation}
          </div>
        </div>
      `;

      const controlsRow = document.getElementById('controls-row');
      controlsRow.style.display = 'flex';

      // Auto scroll down smoothly on mobile screens so feedback and next button are instantly in thumb reach
      if (window.innerWidth <= 640) {
        setTimeout(() => {
          controlsRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 80);
      }
    }

    window.stepNext = function() {
      if (!isAnswered) return;
      playSfx('next');
      curIdx++;
      renderCurrentQuestion();
    };

    function renderSummary(container) {
      document.getElementById('track-fill').style.width = '100%';
      const total = questions.length;
      const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
      if (pct >= 60) {
        triggerConfetti();
        playSfx('complete');
      } else {
        playSfx('wrong');
      }

      let tierClass = 'tier-high';
      let tierText = '🏆 Đạt Chuẩn Xuất Sắc';
      let tierMsg = 'Kiến thức từ vựng và thuật ngữ của bạn rất vững vàng, sẵn sàng đạt điểm tối đa!';
      if (pct < 60) {
        tierClass = 'tier-low';
        tierText = '⚠️ Cần Luyện Tập Thêm';
        tierMsg = 'Hãy ôn lại các câu đã làm sai và tận dụng mẹo "bắt bài" để phản xạ nhanh hơn.';
      } else if (pct < 85) {
        tierClass = 'tier-mid';
        tierText = '👍 Kết Quả Khá Tốt';
        tierMsg = 'Bạn đã nắm chắc phần lớn câu hỏi. Luyện thêm 1 lượt để đạt điểm tuyệt đối nhé!';
      }

      container.innerHTML = `
        <article class="console-card summary-card">
          <div class="summary-badge-score">
            <span class="summary-numeral">${pct}%</span>
          </div>

          <div style="display:flex; flex-direction:column; align-items:center; gap:8px;">
            <div class="summary-tier ${tierClass}">${tierText}</div>
            <h2 class="summary-heading">Hoàn Thành Phiên Ôn Tập</h2>
          </div>

          <p class="summary-desc">${tierMsg}</p>

          <div class="summary-stats-box">
            <div class="summary-stat-item">
              <div class="summary-stat-label">Tổng câu</div>
              <div class="summary-stat-val">${total}</div>
            </div>
            <div class="summary-stat-item">
              <div class="summary-stat-label">Đúng</div>
              <div class="summary-stat-val val-emerald">${correctCount}</div>
            </div>
            <div class="summary-stat-item">
              <div class="summary-stat-label">Sai</div>
              <div class="summary-stat-val val-rose">${wrongCount}</div>
            </div>
          </div>

          <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center; margin-top:8px; width:100%;">
            <button class="btn-primary" onclick="restartWithShuffle(activeMode)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              <span>Trộn đề & Luyện lại</span>
            </button>
            ${missedItems.length > 0 ? `
              <button class="btn-quiet" onclick="reviewMissedQueue()" style="padding:12px 20px; font-weight:600; min-height:46px;">
                <span>↺ Luyện riêng ${missedItems.length} câu làm sai</span>
              </button>
            ` : ''}
          </div>
        </article>
      `;
    }

    window.restartWithShuffle = function(mode) {
      if (typeof window.startFreshShuffle === 'function') {
        window.startFreshShuffle(mode || activeMode);
        return;
      }
      buildQuestionSet(mode || activeMode);
    };

    window.reviewMissedQueue = function() {
      isReviewingMissed = true;
      questions = shuffle([...missedItems]);
      missedItems = [];
      curIdx = 0;
      correctCount = 0;
      wrongCount = 0;
      renderCurrentQuestion();
    };

    // Keyboard Shortcuts Navigation
    window.addEventListener('keydown', (e) => {
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat || e.target.isContentEditable) return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      const key = e.key.toLowerCase();

      // Next question via Space or Enter or ArrowRight
      if ((e.key === ' ' || e.key === 'Enter' || e.key === 'ArrowRight') && isAnswered) {
        e.preventDefault();
        stepNext();
        return;
      }

      // Shuffle via R
      if (key === 'r') {
        e.preventDefault();
        buildQuestionSet(activeMode);
        return;
      }

      // If already answered, don't trigger choices
      if (isAnswered) return;

      const q = questions[curIdx];
      if (!q) return;

      if (q.type === 'choice') {
        const choiceBtns = document.querySelectorAll('.choice-row');
        if (key === '1' || key === 'a') { choiceBtns[0]?.click(); }
        else if (key === '2' || key === 'b') { choiceBtns[1]?.click(); }
        else if (key === '3' || key === 'c') { choiceBtns[2]?.click(); }
        else if (key === '4' || key === 'd') { choiceBtns[3]?.click(); }
      } else if (q.type === 'binary') {
        const tfBtns = document.querySelectorAll('.binary-btn');
        if (key === 't' || key === '1') { tfBtns[0]?.click(); }
        else if (key === 'f' || key === '2') { tfBtns[1]?.click(); }
      }
    });

    // Utility controls; study.js handles navigation and fresh sessions.
    document.getElementById('btn-review-wrong').addEventListener('click', () => {
      playSfx('btn');
      if (activeMode === 'part1' && part1SubMode === 'board') {
        reviewOnlyWrongTerms();
      } else {
        reviewMissedQueue();
      }
    });

    document.getElementById('btn-audio').addEventListener('click', () => {
      getAudioContext();
      audioMuted = !audioMuted;
      const btn = document.getElementById('btn-audio');
      btn.classList.toggle('is-active', !audioMuted);
      document.getElementById('audio-label').innerText = audioMuted ? 'Tắt âm' : 'Âm thanh';
      if (!audioMuted) playSfx('select');
    });

    // Start
    // study.js restores and initializes the app.
