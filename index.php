<!--
  Copyright (c) 2025 Presage0007
  Licensed under the MIT License.
  For more details, see the LICENSE file.
-->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Vanito - Nito Vanity Address Generator</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="Fast open-source Nito vanity address generator, personalized addresses, private key, WIF, multi-threaded." />
  <meta name="keywords" content="nito, vanity address, bitcoin, generator, wif, bech32, ripemd160, secp256k1, fast, secure, private key" />
  <meta name="author" content="Nito Tools">
  <link rel="icon" type="image/png" href="logo.png">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main class="container">
    <div class="logo-wrap">
      <img src="logo.png" alt="Nito Logo" class="logo" />
    </div>
    <h1><span class="highlight">Nito</span> Vanity Address Generator</h1>

    <form id="vanity-form">
      <div class="form-row">
        <div class="form-group wide">
          <label for="pattern">
            Custom pattern<br>
            <small>(1–30 characters, bech32 charset: 023456789acdefghjklmnpqrstuvwxyz)</small>
          </label>
          <input id="pattern" type="text" maxlength="30" placeholder="e.g.: superman" />
          <div id="pattern-note" class="pattern-note"></div>
        </div>
      </div>
      <div class="form-row half">
        <div class="form-group half">
          <label for="mode">Mode</label>
          <select id="mode">
            <option value="prefix">Prefix (after “nito1q”)</option>
            <option value="suffix">Suffix</option>
          </select>
        </div>
        <div class="form-group half">
          <label for="threads">Threads (1-32)</label>
          <input id="threads" type="number" min="1" max="32" value="4" />
        </div>
      </div>
      <div class="buttons">
        <button id="generate" type="button">Generate</button>
        <button id="stop" type="button" disabled>Stop</button>
        <button id="reset" type="button" disabled>Reset</button>
      </div>
    </form>

    <div id="status" class="status"></div>
    <div id="stats" class="stats"></div>
    <div id="result" class="result"></div>
    <div class="copyright-footer" id="copyright-footer">&copy; <span id="copyright-year"></span> <a href="https://github.com/Presage0007" target="_blank" rel="noopener">Presage0007</a> – Open Source on GitHub</div>
  </main>
  <script type="module" src="app.js"></script>
</body>
</html>