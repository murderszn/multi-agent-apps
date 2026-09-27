const STORAGE_KEY = 'human-2-reader-v1';
const $ = (id) => document.getElementById(id);
const app = $('app');
const wordEl = $('word');
const dialog = $('chaptersDialog');
const state = { chapters: [], chapter: 0, words: [], index: 0, speed: 240, playing: false, started: false, voice: false, voiceGeneration: 0, audio: null, audioFrame: null, aiManifest: null, timer: null, chromeTimer: null, remainingMs: [] };

function formatTime(ms) {
  const seconds = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
}

function rebuildTiming() {
  state.remainingMs = new Array(state.words.length + 1).fill(0);
  for (let i = state.words.length - 1; i >= 0; i -= 1) {
    state.remainingMs[i] = state.remainingMs[i + 1] + intervalFor(state.words[i]);
  }
}

function loadSaved() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    if (Number.isInteger(saved.chapter)) state.chapter = saved.chapter;
    if (Number.isInteger(saved.index)) state.index = saved.index;
    if (Number.isFinite(saved.speed)) state.speed = Math.max(120, Math.min(900, saved.speed));
  } catch { /* A blocked or outdated store should not stop reading. */ }
}

function save() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ chapter: state.chapter, index: state.index, speed: state.speed })); }
  catch { /* Private browsing may disallow storage. */ }
}

function renderWord(text) {
  const glyphs = Array.from(text);
  const letters = glyphs.map((glyph, index) => /\p{L}/u.test(glyph) ? index : -1).filter(index => index >= 0);
  const wanted = letters.length >= 8 ? 3 : letters.length >= 4 ? 2 : letters.length >= 2 ? 1 : 0;
  let focus = null;
  for (let size = wanted; size > 0 && !focus; size -= 1) {
    for (let position = 0; position <= letters.length - size; position += 1) {
      const group = letters.slice(position, position + size);
      if (group.at(-1) - group[0] !== size - 1) continue;
      const distance = Math.abs((group[0] + group.at(-1)) / 2 - (glyphs.length - 1) / 2);
      if (!focus || distance < focus.distance) focus = { start: group[0], end: group.at(-1), distance };
    }
  }
  if (focus) {
    const middle = document.createElement('span');
    middle.className = 'focus-group';
    middle.textContent = glyphs.slice(focus.start, focus.end + 1).join('');
    wordEl.replaceChildren(
      document.createTextNode(glyphs.slice(0, focus.start).join('')),
      middle,
      document.createTextNode(glyphs.slice(focus.end + 1).join('')),
    );
  } else {
    wordEl.textContent = text;
  }
  wordEl.style.fontSize = '';
  const available = $('wordArea').clientWidth - 32;
  const width = wordEl.getBoundingClientRect().width;
  if (width > available) {
    const base = parseFloat(getComputedStyle(wordEl).fontSize);
    wordEl.style.fontSize = `${Math.max(20, Math.floor(base * available / width))}px`;
  }
}

function display() {
  const item = state.words[state.index];
  const word = item?.text || 'The end.';
  renderWord(word);
  const chapter = state.chapters[state.chapter];
  if (chapter) {
    $('partLabel').textContent = `${chapter.part} · ${chapter.partName}`;
    $('chapterTitle').textContent = chapter.title;
    document.title = `${chapter.title} · Human 2.0 Reader`;
  }
  const percent = state.words.length ? Math.round(((state.index + 1) / state.words.length) * 100) : 0;
  $('progressFill').style.width = `${percent}%`;
  $('progressText').textContent = `${(state.index + 1).toLocaleString()} / ${state.words.length.toLocaleString()}`;
  $('timeRemaining').textContent = `~${formatTime(estimatedRemaining())}`;
  $('progressTrack').setAttribute('aria-valuenow', String(percent));
  $('nextChapterButton').disabled = state.chapter >= state.chapters.length - 1;
  $('nextChapterButton').style.visibility = state.chapter >= state.chapters.length - 1 ? 'hidden' : 'visible';
  save();
}

function intervalFor(item) {
  let multiplier = 1;
  const letterCount = (item.text.match(/\p{L}/gu) || []).length;
  if (letterCount > 8) multiplier += Math.min(0.6, (letterCount - 8) * 0.1);
  if (/[.!?][”’"')\]]*$/.test(item.text)) multiplier = 2.1;
  else if (/[,;:][”’"')\]]*$/.test(item.text)) multiplier = 1.45;
  if (item.paragraphEnd) multiplier = Math.max(multiplier, 2.3);
  return Math.round((60000 / state.speed) * multiplier);
}

function voiceRate() { return Math.max(0.5, Math.min(3.5, state.speed / 240)); }

function estimatedRemaining() {
  if (!state.voice || !state.aiManifest) return state.remainingMs[state.index] || 0;
  let seconds = 0;
  for (const segment of state.aiManifest.segments) {
    if (segment.end <= state.index) continue;
    if (segment.start <= state.index) seconds += segment.duration - (segment.times[state.index - segment.start] || 0);
    else seconds += segment.duration;
  }
  return Math.max(0, seconds * 1000 / voiceRate());
}

function clearPlaybackTimer() { if (state.timer) clearTimeout(state.timer); state.timer = null; }

function stopVoice() {
  state.voiceGeneration += 1;
  if (state.audioFrame !== null) cancelAnimationFrame(state.audioFrame);
  state.audioFrame = null;
  if (state.audio) {
    state.audio.pause();
    state.audio.onended = null;
    state.audio.onerror = null;
    state.audio.onloadedmetadata = null;
  }
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
}

function speakFromCurrent() {
  if (!state.playing || !state.voice || !state.words.length) return;
  if (state.aiManifest) { speakAiFromCurrent(); return; }
  speakDeviceFromCurrent();
}

function speakAiFromCurrent() {
  stopVoice();
  clearPlaybackTimer();
  const generation = state.voiceGeneration;
  const segment = state.aiManifest.segments.find(item => item.start <= state.index && state.index < item.end);
  if (!segment) { state.aiManifest = null; updateVoiceButton(); speakDeviceFromCurrent(); return; }
  const audio = state.audio || new Audio();
  state.audio = audio;
  audio.preload = 'auto';
  audio.playbackRate = voiceRate();
  audio.src = `audio/${encodeURIComponent(state.chapters[state.chapter].id)}/${segment.file}`;
  const desiredTime = segment.times[state.index - segment.start] || 0;
  let ready = false;
  if (desiredTime) audio.currentTime = desiredTime;
  audio.onloadedmetadata = () => {
    if (generation === state.voiceGeneration) { audio.currentTime = desiredTime; ready = true; }
  };
  const tick = () => {
    if (generation !== state.voiceGeneration || !state.playing) return;
    if (!ready) { state.audioFrame = requestAnimationFrame(tick); return; }
    const times = segment.times;
    let low = 0;
    let high = times.length;
    while (low < high) {
      const middle = (low + high) >> 1;
      if (times[middle] <= audio.currentTime + 0.015) low = middle + 1;
      else high = middle;
    }
    const nextIndex = segment.start + Math.max(0, low - 1);
    if (nextIndex !== state.index) { state.index = nextIndex; display(); }
    state.audioFrame = requestAnimationFrame(tick);
  };
  audio.onended = () => {
    if (generation !== state.voiceGeneration || !state.playing) return;
    if (segment.end >= state.words.length) { state.index = state.words.length - 1; display(); pause(); return; }
    state.index = segment.end;
    display();
    speakAiFromCurrent();
  };
  const fallback = () => {
    if (generation !== state.voiceGeneration || !state.playing) return;
    state.aiManifest = null;
    updateVoiceButton();
    speakDeviceFromCurrent();
  };
  audio.onerror = fallback;
  audio.play().then(() => { if (generation === state.voiceGeneration) tick(); }).catch(fallback);
}

function speakDeviceFromCurrent() {
  if (!('speechSynthesis' in window)) { pause(); return; }
  stopVoice();
  clearPlaybackTimer();
  const generation = state.voiceGeneration;
  const start = state.index;
  let end = Math.min(start + 32, state.words.length);
  for (let i = start; i < end - 1; i += 1) {
    if (state.words[i].paragraphEnd && i >= start + 5) { end = i + 1; break; }
  }
  const offsets = [];
  let content = '';
  for (let i = start; i < end; i += 1) {
    offsets.push(content.length);
    content += (content ? ' ' : '') + state.words[i].text;
  }
  // Offsets point to the first character of each displayed word.
  for (let i = 1; i < offsets.length; i += 1) offsets[i] += 1;
  const utterance = new SpeechSynthesisUtterance(content);
  utterance.lang = 'en-US';
  utterance.rate = voiceRate();
  let boundaryCount = 0;
  utterance.onboundary = (event) => {
    if (generation !== state.voiceGeneration || !state.playing) return;
    boundaryCount += 1;
    let localIndex = 0;
    while (localIndex + 1 < offsets.length && offsets[localIndex + 1] <= event.charIndex) localIndex += 1;
    const nextIndex = start + localIndex;
    if (nextIndex > state.index) { state.index = nextIndex; display(); }
  };
  utterance.onend = () => {
    if (generation !== state.voiceGeneration || !state.playing) return;
    clearPlaybackTimer();
    if (end >= state.words.length) { state.index = state.words.length - 1; display(); pause(); return; }
    state.index = end;
    display();
    speakFromCurrent();
  };
  utterance.onerror = (event) => {
    if (generation !== state.voiceGeneration || !state.playing) return;
    if (event.error === 'canceled' || event.error === 'interrupted') return;
    state.voice = false;
    updateVoiceButton();
    scheduleNext();
  };
  window.speechSynthesis.speak(utterance);
  // Some browsers do not emit word boundaries. Keep the visual reader moving.
  const fallback = () => {
    if (generation !== state.voiceGeneration || !state.playing || boundaryCount >= 2) return;
    if (state.index < end - 1) { state.index += 1; display(); }
    state.timer = setTimeout(fallback, intervalFor(state.words[state.index]));
  };
  state.timer = setTimeout(fallback, intervalFor(state.words[state.index]));
}

function updateVoiceButton() {
  $('voiceButton').disabled = !state.aiManifest && !('speechSynthesis' in window);
  $('voiceButton').setAttribute('aria-pressed', String(state.voice));
  $('voiceButton').setAttribute('aria-label', state.voice ? 'Turn voice off' : 'Turn voice on');
  $('voiceButton').title = state.aiManifest ? 'AI-generated Grok narration' : 'Read aloud with your browser voice';
  $('voiceLabel').textContent = state.voice ? (state.aiManifest ? 'GROK AI' : 'DEVICE VOICE') : 'VOICE OFF';
}

function toggleVoice() {
  if (!state.aiManifest && !('speechSynthesis' in window)) return;
  state.voice = !state.voice;
  updateVoiceButton();
  if (state.playing) {
    clearPlaybackTimer();
    if (state.voice) speakFromCurrent();
    else { stopVoice(); scheduleNext(); }
  }
  revealChrome();
}

function scheduleNext() {
  clearPlaybackTimer();
  if (!state.playing) return;
  const item = state.words[state.index];
  if (!item) return pause();
  state.timer = setTimeout(() => {
    if (state.index >= state.words.length - 1) { pause(); revealChrome(); return; }
    state.index += 1;
    display();
    scheduleNext();
  }, intervalFor(item));
}

function revealChrome() {
  app.classList.add('show-chrome');
  if (state.chromeTimer) clearTimeout(state.chromeTimer);
  if (state.playing) state.chromeTimer = setTimeout(() => app.classList.remove('show-chrome'), 2100);
}

function pause() {
  state.playing = false;
  clearPlaybackTimer();
  stopVoice();
  app.classList.remove('playing');
  app.classList.add('show-chrome');
  $('playButton').classList.remove('is-playing');
  $('playButton').setAttribute('aria-label', 'Play');
  $('playIcon').innerHTML = '<path d="m9 5 10 7-10 7z"/>';
}

function play() {
  if (!state.words.length) return;
  if (state.index >= state.words.length - 1) state.index = 0;
  state.playing = true;
  state.started = true;
  app.classList.add('playing', 'started');
  $('playButton').classList.add('is-playing');
  $('playButton').setAttribute('aria-label', 'Pause');
  $('playIcon').innerHTML = '<path d="M8 5v14M16 5v14"/>';
  display();
  if (state.voice) speakFromCurrent();
  else scheduleNext();
  revealChrome();
}

function togglePlay() { state.playing ? pause() : play(); }

function moveWord(amount) {
  if (!state.words.length) return;
  state.index = Math.max(0, Math.min(state.words.length - 1, state.index + amount));
  display();
  if (state.playing) {
    if (state.voice) speakFromCurrent();
    else scheduleNext();
  }
  revealChrome();
}

function chooseChapter(index, reset = true) {
  const chapter = state.chapters[index];
  if (!chapter?.available) return;
  pause();
  state.chapter = index;
  state.aiManifest = null;
  state.words = chapter.words.map(([text, paragraphEnd]) => ({ text, paragraphEnd: paragraphEnd === 1 }));
  state.index = reset ? 0 : Math.max(0, Math.min(state.index, state.words.length - 1));
  rebuildTiming();
  display();
  updateVoiceButton();
  loadAiManifest(chapter, index);
  renderChapters();
  if (dialog.open) dialog.close();
}

async function loadAiManifest(chapter, index) {
  try {
    const response = await fetch(`audio/${encodeURIComponent(chapter.id)}/manifest.json`);
    if (!response.ok) return;
    const manifest = await response.json();
    if (index !== state.chapter || !manifest.complete || manifest.wordCount !== state.words.length || manifest.model !== 'x-ai/grok-tts') return;
    if (!Array.isArray(manifest.segments) || !manifest.segments.length) return;
    let covered = 0;
    for (const segment of manifest.segments) {
      if (segment.start !== covered || !Number.isFinite(segment.duration) || !Array.isArray(segment.times) || segment.times.length !== segment.end - segment.start) return;
      covered = segment.end;
    }
    if (covered !== state.words.length) return;
    state.aiManifest = manifest;
    updateVoiceButton();
    display();
    if (state.playing && state.voice) speakFromCurrent();
  } catch { /* Narration is optional; the browser voice remains available. */ }
}

function renderChapters() {
  const list = $('chapterList');
  list.replaceChildren();
  let lastPart = '';
  state.chapters.forEach((chapter, index) => {
    if (chapter.part !== lastPart) {
      const heading = document.createElement('div');
      heading.className = 'part-heading';
      heading.textContent = `${chapter.part} · ${chapter.partName}`;
      list.append(heading);
      lastPart = chapter.part;
    }
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'chapter-item' + (index === state.chapter ? ' current' : '');
    button.disabled = !chapter.available;
    if (index === state.chapter) button.setAttribute('aria-current', 'true');
    const number = document.createElement('span');
    number.className = 'chapter-number';
    number.textContent = String(chapter.number).padStart(2, '0');
    const name = document.createElement('span');
    name.className = 'chapter-name';
    name.textContent = chapter.title;
    const meta = document.createElement('span');
    meta.className = 'chapter-meta';
    meta.textContent = chapter.available ? (index === state.chapter ? 'READING' : `${Math.max(1, Math.round(chapter.wordCount / state.speed))} MIN`) : 'COMING SOON';
    button.append(number, name, meta);
    button.addEventListener('click', () => chooseChapter(index));
    list.append(button);
  });
}

function setSpeed(value) {
  state.speed = Math.max(120, Math.min(900, Number(value) || 240));
  $('speedRange').value = String(state.speed);
  $('speedRange').style.setProperty('--range-progress', `${((state.speed - 120) / 780) * 100}%`);
  $('speedOutput').innerHTML = `${state.speed} <span>WPM</span>`;
  rebuildTiming();
  if (state.words.length) display();
  save();
  renderChapters();
  if (state.playing) {
    if (state.voice && state.aiManifest && state.audio) { state.audio.playbackRate = voiceRate(); display(); }
    else if (state.voice) speakFromCurrent();
    else scheduleNext();
  }
}

function openChapters() { pause(); renderChapters(); dialog.showModal(); }

function bind() {
  $('playButton').addEventListener('click', togglePlay);
  $('wordArea').addEventListener('click', togglePlay);
  $('previousButton').addEventListener('click', () => moveWord(-1));
  $('nextButton').addEventListener('click', () => moveWord(1));
  $('speedRange').addEventListener('input', (event) => setSpeed(event.target.value));
  $('voiceButton').addEventListener('click', toggleVoice);
  $('chaptersButton').addEventListener('click', openChapters);
  $('homeButton').addEventListener('click', openChapters);
  $('closeDialog').addEventListener('click', () => dialog.close());
  $('nextChapterButton').addEventListener('click', () => chooseChapter(state.chapter + 1));
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
  document.addEventListener('keydown', (event) => {
    if (dialog.open || document.activeElement?.tagName === 'INPUT') return;
    if (event.code === 'Space' && !['BUTTON'].includes(document.activeElement?.tagName)) { event.preventDefault(); togglePlay(); }
    if (event.code === 'ArrowLeft') { event.preventDefault(); moveWord(-1); }
    if (event.code === 'ArrowRight') { event.preventDefault(); moveWord(1); }
  });
  document.addEventListener('pointermove', () => { if (state.playing) revealChrome(); }, { passive: true });
  document.addEventListener('visibilitychange', () => { if (document.hidden && state.playing) pause(); });
  window.addEventListener('resize', () => { if (state.words.length) renderWord(state.words[state.index].text); });
  document.fonts?.ready.then(() => { if (state.words.length) renderWord(state.words[state.index].text); });
}

async function init() {
  loadSaved();
  bind();
  updateVoiceButton();
  setSpeed(state.speed);
  try {
    const response = await fetch('book.json');
    if (!response.ok) throw new Error(`Book data could not load (${response.status}).`);
    const data = await response.json();
    state.chapters = data.chapters;
    const requestedChapter = new URLSearchParams(location.search).get('chapter');
    const requestedIndex = state.chapters.findIndex(chapter => chapter.id === requestedChapter && chapter.available);
    if (requestedIndex >= 0) state.chapter = requestedIndex;
    state.chapter = Math.max(0, Math.min(state.chapter, state.chapters.length - 1));
    if (!state.chapters[state.chapter]?.available) state.chapter = state.chapters.findIndex(c => c.available);
    chooseChapter(state.chapter, requestedIndex >= 0);
    if (requestedIndex >= 0) history.replaceState(null, '', location.pathname + location.hash);
  } catch (error) {
    wordEl.textContent = 'Unavailable.';
    $('chapterTitle').textContent = 'Could not load the book';
    $('partLabel').textContent = error.message;
    $('playButton').disabled = true;
  }
}

init();
