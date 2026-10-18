let activeMode = 'part1';
    let questions = [];
    let curIdx = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let missedItems = [];
    let isReviewingMissed = false;
    let isAnswered = false;
    let audioMuted = false;

    // Web Audio Synthesizer
    let audioCtx = null;
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

    function triggerChime(correct) {
      if (audioMuted) return;
      try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        if (correct) {
          osc.type = 'sine';
          osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
          osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.12); // G5
          gain.gain.setValueAtTime(0.18, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
          osc.start();
          osc.stop(ctx.currentTime + 0.28);
        } else {
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(260, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.15);
          gain.gain.setValueAtTime(0.22, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
          osc.start();
          osc.stop(ctx.currentTime + 0.28);
        }
      } catch (e) {}
    }

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
          id: 'part2:' + item.id,
          type: 'choice',
          phase: 'Phần II • Điền Từ Vào Chỗ Trống',
          prompt: item.sentence,
          correctAnswer: item.answer,
          options: shuffle(item.options),
          explanation: item.vn,
          clue: item.clue,
          tip: 'Khi thấy xuất hiện cụm "' + item.clue + '" ➔ suy luận ngay ra "' + item.answer + '"'
        }));
      } else if (mode === 'part3') {
        return DATASET.part3Data.map(item => ({
          id: 'part3:' + item.id,
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
    // PART 1 MATCHING BOARD SYSTEM (48 CÂU TOÀN BỘ TRÊN 1 TRANG)
    // -------------------------------------------------------------
    const ALPHABET_KEYS = [];
    for (let i = 0; i < 26; i++) {
      ALPHABET_KEYS.push(String.fromCharCode(65 + i)); // A..Z
    }
    for (let i = 0; i < 26; i++) {
      ALPHABET_KEYS.push('A' + String.fromCharCode(65 + i)); // AA..AZ
    }

    let part1SubMode = 'board'; // 'board' (Bảng Nối) | 'choice' (4 đáp án)
    let matchingState = {
      isGraded: false,
      score: 0,
      selectedTermId: null,
      searchQuery: '',
      mobileViewTab: 'terms', // 'terms' | 'defs'
      terms: [],
      definitions: [],
      showCheatSheet: false,
      onlyWrong: false,
      pickerTargetTermId: null
    };

    function initMatchingBoard() {
      const appShell = document.querySelector('.app-shell');
      if (appShell) appShell.classList.add('is-matching-mode');

      matchingState.isGraded = false;
      matchingState.score = 0;
      matchingState.selectedTermId = null;
      matchingState.searchQuery = '';
      matchingState.mobileViewTab = 'terms';
      matchingState.showCheatSheet = false;
      matchingState.pickerTargetTermId = null;

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

      // 2. Terms in original order 1..48 (or filtered wrong if onlyWrong)
      const sourceList = matchingState.onlyWrong && matchingState.terms.length > 0
        ? matchingState.terms.filter(t => !t.isCorrect)
        : boardData;

      matchingState.terms = (matchingState.onlyWrong && sourceList.length > 0 ? sourceList : boardData).map(d => ({
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

      // Advance to next unpaired term
      const nextUnpaired = matchingState.terms.find(t => !t.userLetter && t.id !== termId);
      matchingState.selectedTermId = nextUnpaired ? nextUnpaired.id : null;

      syncMatchingMetrics();
      renderMatchingBoard();
    };

    window.unpairTerm = function(termId, e) {
      if (e) e.stopPropagation();
      window.pairTermWithLetter(termId, null);
    };

    window.selectTermRow = function(termId) {
      if (matchingState.isGraded) return;
      if (matchingState.selectedTermId === termId) {
        matchingState.selectedTermId = null;
      } else {
        matchingState.selectedTermId = termId;
      }
      renderMatchingBoard();
    };

    window.clickDefCard = function(letter) {
      if (matchingState.isGraded) return;
      if (matchingState.selectedTermId) {
        window.pairTermWithLetter(matchingState.selectedTermId, letter);
      } else {
        const def = matchingState.definitions.find(d => d.letter === letter);
        if (def && def.matchedTermId) {
          window.pairTermWithLetter(def.matchedTermId, null);
        } else {
          const firstUnpaired = matchingState.terms.find(t => !t.userLetter);
          if (firstUnpaired) {
            window.pairTermWithLetter(firstUnpaired.id, letter);
          }
        }
      }
    };

    window.gradeMatchingBoard = function() {
      let correct = 0;
      matchingState.terms.forEach(t => {
        t.isCorrect = (t.userLetter && t.userLetter === t.correctLetter);
        if (t.isCorrect) correct++;
      });
      matchingState.isGraded = true;
      matchingState.score = correct;
      matchingState.selectedTermId = null;

      triggerChime(correct >= Math.round(matchingState.terms.length * 0.7));
      syncMatchingMetrics();
      renderMatchingBoard();

      setTimeout(() => {
        document.getElementById('matching-summary-banner')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    };

    window.resetMatchingBoard = function() {
      matchingState.isGraded = false;
      matchingState.score = 0;
      matchingState.selectedTermId = null;
      matchingState.terms.forEach(t => {
        t.userLetter = null;
        t.isCorrect = null;
      });
      matchingState.definitions.forEach(d => {
        d.matchedTermId = null;
      });
      syncMatchingMetrics();
      renderMatchingBoard();
    };

    window.shuffleMatchingDefs = function() {
      initMatchingBoard();
    };

    window.reviewOnlyWrongTerms = function() {
      matchingState.onlyWrong = true;
      initMatchingBoard();
    };

    window.openDefPickerForTerm = function(termId, e) {
      if (e) e.stopPropagation();
      matchingState.pickerTargetTermId = termId;
      matchingState.searchQuery = '';
      renderMatchingBoard();
    };

    window.closeDefPicker = function() {
      matchingState.pickerTargetTermId = null;
      renderMatchingBoard();
    };

    window.handleDefSearch = function(query) {
      matchingState.searchQuery = query;
      const q = query.trim().toLowerCase();
      document.querySelectorAll('.def-item').forEach(el => {
        const d = matchingState.definitions.find(d => d.letter === el.dataset.letter || el.getAttribute('onclick')?.includes("'" + d.letter + "'"));
        if (d) el.hidden = !(!q || d.letter.toLowerCase().includes(q) || d.def.toLowerCase().includes(q));
      });
    };

    window.setMobileTab = function(tab) {
      matchingState.mobileViewTab = tab;
      renderMatchingBoard();
    };

    window.toggleCheatSheet = function() {
      matchingState.showCheatSheet = !matchingState.showCheatSheet;
      renderMatchingBoard();
    };

    window.setPart1SubMode = function(subMode) {
      part1SubMode = subMode;
      const appShell = document.querySelector('.app-shell');
      if (subMode === 'board') {
        if (appShell) appShell.classList.add('is-matching-mode');
        initMatchingBoard();
      } else {
        if (appShell) appShell.classList.remove('is-matching-mode');
        // Initialized by study.js after restoring the saved session.
      }
    };

    function renderMatchingBoard() {
      const container = document.getElementById('active-card-container');
      if (!container) return;

      const total = matchingState.terms.length;
      const pairedCount = matchingState.terms.filter(t => t.userLetter).length;

      const getDefByLetter = (ltr) => matchingState.definitions.find(d => d.letter === ltr);
      const getTermById = (tId) => matchingState.terms.find(t => t.id === tId);
      const selectedTerm = matchingState.selectedTermId ? getTermById(matchingState.selectedTermId) : null;

      const q = (matchingState.searchQuery || '').trim().toLowerCase();
      const visibleDefs = matchingState.definitions.filter(d => {
        if (!q) return true;
        return d.letter.toLowerCase().includes(q) || d.def.toLowerCase().includes(q);
      });

      // Summary Banner
      let summaryBannerHtml = '';
      if (matchingState.isGraded) {
        const pct = Math.round((matchingState.score / total) * 100);
        let msg = '🏆 Xuất sắc! Bạn nắm rất vững toàn bộ thuật ngữ & định nghĩa.';
        if (pct < 60) {
          msg = '⚠️ Cần luyện thêm! Hãy xem kỹ mẹo bắt bài (Tip) bên dưới để ghi nhớ nhanh.';
        } else if (pct < 85) {
          msg = '👍 Kết quả khá tốt! Xem lại các câu sai bên dưới và ghi nhớ mẹo bắt bài.';
        }

        summaryBannerHtml = `
          <section class="matching-summary-banner" id="matching-summary-banner">
            <div class="banner-score-box">
              <div class="banner-circle-score">${pct}%</div>
              <div>
                <div style="font-size:0.8rem; font-weight:700; color:var(--accent); text-transform:uppercase; letter-spacing:0.04em;">Kết Quả Chấm Điểm</div>
                <div style="font-size:1.25rem; font-weight:800; color:#ffffff; margin:2px 0;">Đúng ${matchingState.score} / ${total} câu</div>
                <div style="font-size:0.86rem; color:var(--text-2); max-width:520px;">${msg}</div>
              </div>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap; align-items:center;">
              ${matchingState.score < total ? `
                <button class="btn-primary" onclick="reviewOnlyWrongTerms()" style="padding:10px 18px; font-size:0.86rem;">
                  ↺ Luyện riêng ${total - matchingState.score} câu sai
                </button>
              ` : ''}
              <button class="btn-quiet" onclick="initMatchingBoard()" style="padding:10px 16px; font-size:0.86rem;">
                🔀 Làm lượt mới (Trộn lại)
              </button>
            </div>
          </section>
        `;
      }

      // Column A HTML
      const termsListHtml = matchingState.terms.map(t => {
        const isSel = (matchingState.selectedTermId === t.id);
        const hasPair = !!t.userLetter;
        const pairedDef = hasPair ? getDefByLetter(t.userLetter) : null;
        const correctDef = getDefByLetter(t.correctLetter);

        let statusClass = '';
        if (matchingState.isGraded) {
          statusClass = t.isCorrect ? 'is-correct' : 'is-wrong';
        } else if (isSel) {
          statusClass = 'is-selected';
        } else if (hasPair) {
          statusClass = 'is-paired';
        }

        let badgeHtml = '';
        let previewHtml = '';
        let explanationHtml = '';

        if (matchingState.isGraded) {
          if (t.isCorrect) {
            badgeHtml = `<span class="term-pair-badge badge-correct">✓ [ ${t.userLetter} ] Đúng</span>`;
            previewHtml = `<div class="term-paired-def-preview" style="border-color:var(--emerald);"><span>${pairedDef ? pairedDef.def : ''}</span></div>`;
          } else {
            badgeHtml = `<span class="term-pair-badge badge-wrong">✕ [ ${t.userLetter || 'Chưa làm'} ]</span>`;
            previewHtml = `
              <div style="font-size:0.82rem; color:var(--emerald-light); font-weight:600; padding:4px 0;">
                Đáp án đúng: <strong>[ ${t.correctLetter} ]</strong> ${correctDef ? correctDef.def : ''}
              </div>
            `;
            explanationHtml = `
              <div class="term-explanation-pane">
                <div>🎯 <strong style="color:var(--accent); font-size:0.76rem; text-transform:uppercase;">Dấu hiệu:</strong> <span class="clue-val-keyword">${t.clue}</span></div>
                <div>💡 <strong style="color:#fbbf24; font-size:0.76rem; text-transform:uppercase;">Mẹo bắt bài:</strong> <span style="color:var(--text-2);">${t.tip}</span></div>
                <div style="color:var(--text-2); border-top:1px solid var(--border-subtle); padding-top:4px;">🇻🇳 <strong>Dịch nghĩa:</strong> ${t.vn}</div>
              </div>
            `;
          }
        } else {
          if (hasPair) {
            badgeHtml = `<span class="term-pair-badge connected">Đã nối [ ${t.userLetter} ]</span>`;
            previewHtml = `
              <div class="term-paired-def-preview">
                <span style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:85%;">${pairedDef ? pairedDef.def : ''}</span>
                <div style="display:flex; gap:4px; flex-shrink:0;">
                  <button class="btn-unpair" onclick="openDefPickerForTerm(${t.id}, event)" title="Đổi định nghĩa">Đổi</button>
                  <button class="btn-unpair" onclick="unpairTerm(${t.id}, event)" title="Hủy nối">✕</button>
                </div>
              </div>
            `;
          } else {
            badgeHtml = `<button class="term-pair-badge empty" onclick="openDefPickerForTerm(${t.id}, event)"><span>+ Nối định nghĩa</span> ▾</button>`;
          }
        }

        return `
          <div class="term-item ${statusClass}" data-term-id="${t.id}">
            <div class="term-header-line" onclick="selectTermRow(${t.id})">
              <div class="term-left">
                <span class="term-num-badge">${t.id}</span>
                <span class="term-name-text">${t.term}</span>
              </div>
              ${badgeHtml}
            </div>
            ${previewHtml}
            ${explanationHtml}
          </div>
        `;
      }).join('');

      // Column B HTML
      const defsListHtml = visibleDefs.map(d => {
        const isPaired = !!d.matchedTermId;
        const pairedTerm = isPaired ? getTermById(d.matchedTermId) : null;
        const isTarget = selectedTerm && selectedTerm.userLetter === d.letter;

        let defClass = '';
        if (isTarget) defClass = 'is-active-target';
        else if (isPaired) defClass = 'is-paired';

        return `
          <div class="def-item ${defClass}" onclick="clickDefCard('${d.letter}')" data-letter="${d.letter}">
            <span class="def-letter-tag">${d.letter}</span>
            <div class="def-content">
              <div class="def-text-body">${d.def}</div>
              ${isPaired ? `
                <div class="def-connected-info">
                  <span>🔗 Đã nối: câu ${pairedTerm ? pairedTerm.id + '. ' + pairedTerm.term : ''}</span>
                  ${!matchingState.isGraded ? `<button class="btn-unpair" onclick="unpairTerm(${d.matchedTermId}, event)" title="Hủy nối">✕ Gỡ</button>` : ''}
                </div>
              ` : `
                <div style="font-size:0.74rem; color:var(--text-3);">Bấm để ghép nối với Cột A</div>
              `}
            </div>
          </div>
        `;
      }).join('');

      // Modal Sheet for mobile definition picker
      let pickerModalHtml = '';
      if (matchingState.pickerTargetTermId) {
        const targetTerm = getTermById(matchingState.pickerTargetTermId);
        pickerModalHtml = `
          <div class="modal-overlay" onclick="closeDefPicker()">
            <div class="modal-sheet" onclick="event.stopPropagation()">
              <div class="modal-header">
                <div>
                  <div style="font-size:0.75rem; color:var(--accent); font-weight:700; text-transform:uppercase;">Nối Định Nghĩa Cho Câu ${targetTerm.id}</div>
                  <div style="font-size:1.05rem; font-weight:700; color:var(--text-1);">${targetTerm.term}</div>
                </div>
                <button class="btn-unpair" onclick="closeDefPicker()" style="font-size:1.2rem; padding:4px 10px;">✕</button>
              </div>
              <div style="padding:10px 18px 4px 18px;">
                <input type="text" class="def-search-input" placeholder="🔍 Nhập từ khóa để lọc nhanh..." value="${escapeHTML(matchingState.searchQuery)}" oninput="handleDefSearch(this.value)" style="width:100%; font-size:0.9rem; padding:8px 12px;">
              </div>
              <div class="modal-body">
                ${visibleDefs.map(d => {
                  const isPaired = !!d.matchedTermId;
                  const pairedTerm = isPaired ? getTermById(d.matchedTermId) : null;
                  const isCurrent = targetTerm.userLetter === d.letter;
                  return `
                    <div class="def-item ${isCurrent ? 'is-active-target' : (isPaired ? 'is-paired' : '')}" onclick="pairTermWithLetter(${targetTerm.id}, '${d.letter}'); closeDefPicker();">
                      <span class="def-letter-tag">${d.letter}</span>
                      <div class="def-content">
                        <div class="def-text-body">${d.def}</div>
                        ${isPaired ? `<div class="def-connected-info">Đã dùng cho: câu ${pairedTerm ? pairedTerm.id + '. ' + pairedTerm.term : ''}</div>` : ''}
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>
        `;
      }

      // Modal for Cheat Sheet
      let cheatSheetModalHtml = '';
      if (matchingState.showCheatSheet) {
        cheatSheetModalHtml = `
          <div class="modal-overlay" onclick="toggleCheatSheet()">
            <div class="modal-sheet" onclick="event.stopPropagation()" style="max-height:90vh; max-width:880px;">
              <div class="modal-header">
                <div>
                  <div style="font-size:0.75rem; color:var(--accent); font-weight:700; text-transform:uppercase;">Bảng Tra Cứu Toàn Bộ 48 Cặp</div>
                  <div style="font-size:1.05rem; font-weight:700; color:var(--text-1);">Thuật Ngữ • Dấu Hiệu Nhận Diện • Mẹo Bắt Bài</div>
                </div>
                <button class="btn-unpair" onclick="toggleCheatSheet()" style="font-size:1.2rem; padding:4px 10px;">✕</button>
              </div>
              <div class="modal-body">
                ${DATASET.part1Data.map(d => `
                  <div style="background:var(--surface-2); border:1px solid var(--border-subtle); border-radius:var(--radius-md); padding:12px 14px; display:flex; flex-direction:column; gap:6px;">
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                      <strong style="font-size:0.95rem; color:var(--accent);">${d.id}. ${d.term}</strong>
                    </div>
                    <div style="font-size:0.88rem; color:var(--text-1); line-height:1.45;">${d.def}</div>
                    <div class="term-explanation-pane">
                      <div>🎯 <strong style="color:var(--accent); font-size:0.75rem;">Dấu hiệu:</strong> <span class="clue-val-keyword">${d.clue}</span></div>
                      <div>💡 <strong style="color:#fbbf24; font-size:0.75rem;">Mẹo bắt bài:</strong> <span style="color:var(--text-2);">${d.tip}</span></div>
                      <div style="color:var(--text-2); border-top:1px solid var(--border-subtle); padding-top:4px;">🇻🇳 <strong>Dịch:</strong> ${d.vn}</div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        `;
      }

      const showTermsOnMobile = matchingState.mobileViewTab === 'terms';
      const gridMobileClass = showTermsOnMobile ? 'mobile-show-terms' : 'mobile-show-defs';

      container.innerHTML = `
        <div class="matching-board-wrap">
          
          <!-- Top Action Toolbar -->
          <div class="matching-toolbar">
            <div class="matching-toolbar-left">
              <div class="matching-badge-status">
                <span>Đã nối:</span>
                <span style="color:#ffffff;">${pairedCount} / ${total} câu</span>
              </div>

              <div class="sub-mode-toggle">
                <button class="sub-mode-btn ${part1SubMode === 'board' ? 'active' : ''}" onclick="setPart1SubMode('board')">📋 Bảng Nối (Đề thi)</button>
                <button class="sub-mode-btn ${part1SubMode === 'choice' ? 'active' : ''}" onclick="setPart1SubMode('choice')">🔀 4 Đáp án</button>
              </div>
            </div>

            <div class="matching-actions">
              <button class="btn-primary" onclick="gradeMatchingBoard()" style="padding:8px 18px; font-size:0.86rem; min-height:36px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Chấm điểm (Nộp bài)</span>
              </button>
              <button class="btn-quiet" onclick="shuffleMatchingDefs()" title="Xáo trộn lại thứ tự định nghĩa">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="16 3 21 3 21 8"></polyline>
                  <line x1="4" y1="20" x2="21" y2="3"></line>
                </svg>
                <span>Trộn lại</span>
              </button>
              <button class="btn-quiet" onclick="resetMatchingBoard()" title="Làm lại từ đầu">
                <span>↺ Làm lại</span>
              </button>
              <button class="btn-quiet" onclick="toggleCheatSheet()" title="Xem đáp án & mẹo bắt bài">
                <span>💡 Đáp án</span>
              </button>
            </div>
          </div>

          ${summaryBannerHtml}

          <!-- Mobile Tab View Switcher (Screen <= 860px) -->
          <div class="mobile-view-tabs">
            <button class="seg-item ${showTermsOnMobile ? 'active' : ''}" onclick="setMobileTab('terms')">
              <span>Cột A: Thuật ngữ (${pairedCount}/${total})</span>
            </button>
            <button class="seg-item ${!showTermsOnMobile ? 'active' : ''}" onclick="setMobileTab('defs')">
              <span>Cột B: Định nghĩa (${matchingState.definitions.length})</span>
            </button>
          </div>

          <!-- Main Two-Column Matching Grid -->
          <div class="matching-grid ${gridMobileClass}">
            
            <!-- Column A: 48 Terms -->
            <section class="matching-col col-terms">
              <div class="matching-col-header">
                <div class="matching-col-title">
                  <span>Cột A • Thuật Ngữ (Terms)</span>
                  <span class="badge-count">${total}</span>
                </div>
                <span style="font-size:0.75rem; color:var(--text-3); font-family:'IBM Plex Mono', monospace;">1 ➔ 48</span>
              </div>

              ${selectedTerm ? `
                <div class="selection-hint-banner">
                  <span>👉 Đang chọn: <strong>${selectedTerm.id}. ${selectedTerm.term}</strong> ➔ Hãy bấm 1 định nghĩa ở Cột B để nối</span>
                  <button class="btn-unpair" onclick="selectTermRow(${selectedTerm.id})">✕ Hủy</button>
                </div>
              ` : ''}

              <div style="display:flex; flex-direction:column; gap:8px;">
                ${termsListHtml}
              </div>
            </section>

            <!-- Column B: 48 Definitions -->
            <section class="matching-col col-defs">
              <div class="matching-col-header">
                <div class="matching-col-title">
                  <span>Cột B • Định Nghĩa (Definitions)</span>
                  <span class="badge-count">${visibleDefs.length}</span>
                </div>
                <input type="text" class="def-search-input" placeholder="🔍 Lọc từ khóa..." value="${escapeHTML(matchingState.searchQuery)}" oninput="handleDefSearch(this.value)">
              </div>

              <div style="font-size:0.76rem; color:var(--text-3); padding-bottom:4px;">
                * Bấm vào 1 định nghĩa để ghép nối với Cột A (hoặc dùng nút "+ Nối" trên Cột A).
              </div>

              <div style="display:flex; flex-direction:column; gap:8px;">
                ${defsListHtml}
              </div>
            </section>

          </div>

          ${pickerModalHtml}
          ${cheatSheetModalHtml}

        </div>
      `;
    }

    function buildQuestionSet(mode) {
      activeMode = mode;
      const appShell = document.querySelector('.app-shell');

      if (mode === 'part1' && part1SubMode === 'board') {
        if (appShell) appShell.classList.add('is-matching-mode');
        initMatchingBoard();
        return;
      }

      if (appShell) appShell.classList.remove('is-matching-mode');
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
        triggerChime(true);
      } else {
        clickedEl.classList.add('state-incorrect');
        wrongCount++;
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
        triggerChime(true);
      } else {
        clickedEl.classList.add('state-incorrect');
        wrongCount++;
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
      if (!isAnswered) return;
      curIdx++;
      renderCurrentQuestion();
    };

    function renderSummary(container) {
      document.getElementById('track-fill').style.width = '100%';
      const total = questions.length;
      const pct = total > 0 ? Math.round((correctCount / total) * 100) : 0;
      
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
            <button class="btn-primary" onclick="buildQuestionSet(activeMode)">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
              <span>Luyện lại phần này</span>
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

      // Next question via Space or Enter
      if ((e.key === ' ' || e.key === 'Enter') && isAnswered) {
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

    // Navigation Tabs
    document.querySelectorAll('.seg-item').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.seg-item').forEach(b => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');
        activeMode = btn.getAttribute('data-mode');
        buildQuestionSet(activeMode);
      });
    });

    // Top buttons
    document.getElementById('btn-shuffle').addEventListener('click', () => {
      if (activeMode === 'part1' && part1SubMode === 'board') {
        shuffleMatchingDefs();
      } else {
        buildQuestionSet(activeMode);
      }
    });

    document.getElementById('btn-review-wrong').addEventListener('click', () => {
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
    });

    // Start
    // study.js restores and initializes the app.
