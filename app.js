/*
 * Copyright (c) 2025 Presage0007
 * https://github.com/Presage0007
 * Licensed under the GPL-3.0 License.
 * For more details, see the LICENSE file.
 */

const BECH32_CHARSET = "023456789acdefghjklmnpqrstuvwxyz";
const patternInput = document.getElementById("pattern");
const patternNote = document.getElementById("pattern-note");
const modeInput = document.getElementById("mode");
const threadsInput = document.getElementById("threads");
const btnGenerate = document.getElementById("generate");
const btnStop = document.getElementById("stop");
const btnReset = document.getElementById("reset");
const statusDiv = document.getElementById("status");
const statsDiv = document.getElementById("stats");
const resultDiv = document.getElementById("result");

let workers = [];
let searchActive = false;
let totalTested = 0;
let startTime = 0;

function validatePattern(pattern) {
  if (!pattern) return { ok: false, msg: "Please enter a pattern." };
  if (pattern.length < 1 || pattern.length > 30) return { ok: false, msg: "Must be 1–30 characters." };
  for (let c of pattern) {
    if (!BECH32_CHARSET.includes(c)) return { ok: false, msg: "Invalid character: \"" + c + "\"" };
  }
  return { ok: true, msg: "Valid pattern!" };
}

patternInput.addEventListener("input", () => {
  const { ok, msg } = validatePattern(patternInput.value.trim().toLowerCase());
  patternNote.textContent = msg;
  patternNote.className = ok ? "pattern-note valid" : "pattern-note invalid";
});

function copyToClipboard(txt, btn) {
  navigator.clipboard.writeText(txt).then(() => {
    const old = btn.textContent;
    btn.textContent = "✔";
    btn.style.background = "#2dbd72";
    setTimeout(() => { btn.textContent = "Copy"; btn.style.background = ""; }, 850);
  });
}

// Format seconds as hh:mm:ss or mm:ss or s.s
function formatDuration(seconds) {
  if (seconds < 60) {
    return seconds.toFixed(1) + "s";
  }
  seconds = Math.floor(seconds);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [
    h > 0 ? String(h).padStart(2, "0") : null,
    (h > 0 || m > 0) ? String(m).padStart(2, "0") : null,
    String(s).padStart(2, "0")
  ].filter(x => x !== null).join(":");
}

btnGenerate.onclick = () => {
  const pattern = patternInput.value.trim().toLowerCase();
  const mode = modeInput.value;
  const threads = Math.max(1, Math.min(32, parseInt(threadsInput.value, 10) || 1));
  const validation = validatePattern(pattern);
  if (!validation.ok) {
    patternNote.textContent = validation.msg;
    patternNote.className = "pattern-note invalid";
    return;
  }
  resultDiv.textContent = '';
  statusDiv.textContent = 'Searching…';
  statsDiv.textContent = '';
  btnGenerate.disabled = true;
  btnStop.disabled = false;
  btnReset.disabled = false;
  searchActive = true;
  let tested = 0;
  totalTested = 0;
  startTime = Date.now();

  // Multi-core workers
  workers = [];
  for (let i = 0; i < threads; i++) {
    const worker = new Worker('./worker.js', { type: 'module' });
    worker.onmessage = (e) => {
      if (!searchActive) return;
      if (e.data.type === 'found') {
        searchActive = false;
        statusDiv.textContent = '✅ Pattern found!';
        // Copy-paste: button for each field
        resultDiv.innerHTML = `<b>Address:</b> <span style="font-family:monospace" id="addr">${e.data.address}</span>
  <button class="copy-btn" onclick="copyToClipboard('${e.data.address}', this)">Copy</button><br>
<b>PrivKey (hex):</b> <span style="font-family:monospace" id="priv">${e.data.privHex}</span>
  <button class="copy-btn" onclick="copyToClipboard('${e.data.privHex}', this)">Copy</button><br>
<b>WIF:</b> <span style="font-family:monospace" id="wif">${e.data.wif}</span>
  <button class="copy-btn" onclick="copyToClipboard('${e.data.wif}', this)">Copy</button>`;
        btnGenerate.disabled = false;
        btnStop.disabled = true;
        btnReset.disabled = false;
        workers.forEach(w => w.terminate());
        const elapsed = ((Date.now() - startTime) / 1000);
        const rate = totalTested / elapsed;
        statsDiv.textContent = `Keys tested: ${totalTested.toLocaleString()} | Time: ${formatDuration(elapsed)} | Speed: ${rate.toLocaleString(undefined,{maximumFractionDigits:0})} keys/s`;
        // Fix copy on new buttons:
        for (const btn of resultDiv.querySelectorAll('.copy-btn')) {
          btn.onclick = function() {
            copyToClipboard(this.previousElementSibling.textContent, this);
          }
        }
      } else if (e.data.type === 'progress') {
        totalTested += e.data.count;
        const elapsed = ((Date.now() - startTime) / 1000);
        const rate = totalTested / (elapsed || 1);
        statsDiv.textContent = `Keys tested: ${totalTested.toLocaleString()} | Time: ${formatDuration(elapsed)} | Speed: ${rate.toLocaleString(undefined,{maximumFractionDigits:0})} keys/s`;
      }
    };
    worker.onerror = (err) => {
      statusDiv.textContent = 'Worker error: ' + err.message;
      btnGenerate.disabled = false;
      btnStop.disabled = true;
      searchActive = false;
      workers.forEach(w => w.terminate());
    };
    worker.postMessage({ pattern, mode });
    workers.push(worker);
  }
};

btnStop.onclick = () => {
  searchActive = false;
  workers.forEach(w => w.terminate());
  btnGenerate.disabled = false;
  btnStop.disabled = true;
  statusDiv.textContent = 'Search stopped.';
};

btnReset.onclick = () => {
  searchActive = false;
  workers.forEach(w => w.terminate());
  patternInput.value = '';
  patternNote.textContent = '';
  statsDiv.textContent = '';
  statusDiv.textContent = '';
  resultDiv.textContent = '';
  btnGenerate.disabled = false;
  btnStop.disabled = true;
  btnReset.disabled = true;
};

// For copy/paste global (onclick dyn)
window.copyToClipboard = copyToClipboard;

// Automatic copyright year update
document.getElementById("copyright-year").textContent = new Date().getFullYear();
