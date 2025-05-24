# Vanito – Nito Vanity Address Generator

<p align="center">
  <img src="logo.png" alt="Nito Logo" width="96"/>
</p>

**Vanito** is an ultra-fast, open-source vanity-address generator for the [Nito Network](https://nito.org/).  
Find beautiful, personalized Nito addresses directly in your browser—with maximum security and speed!

---

## 🚀 Features

- **Ultra-fast**: multi-threaded (Web Worker) vanity search, fully client-side  
- **Custom patterns**: match any valid Bech32 prefix or suffix (`nito1q…`)  
- **One-click copy**: securely copy the address, WIF, or raw private key  
- **Modern UI**: responsive, accessible, mobile-ready, and light/dark-mode friendly  
- **Open source**: released under the MIT license  

---

## 🌐 Live Demo

Try it instantly: **<https://vanito.org/>**

---

## 📦 Installation

1. **Clone the repository**

   ```sh
   git clone https://github.com/Presage0007/vanito.git
   cd vanito
Deploy to your web server

Upload all files (index.html / index.php, app.js, worker.js, style.css, logo.png, libs/, …) to any static host or regular web server.
(A PHP backend is optional—only needed if you serve the index.php variant.)

Open in your browser

Navigate to the deployed URL, e.g. https://yourdomain.com/vanito/.

⚙️ Usage
Enter a custom pattern (1–30 chars, charset: 023456789acdefghjklmnpqrstuvwxyz).

Choose the search mode:

Prefix – nito1q[pattern]…

Suffix – …q[pattern]

Select thread count (1–32). More threads ≈ more speed (CPU-dependent).

Click Generate and wait for a match.

When found, copy the address, WIF, or hex private key with one click.

Input is validated automatically: only Bech32-compatible characters are accepted.

🧑‍💻 Technical Details
Component	Value
Network	Nito mainnet
Address format	Bech32 (nito1q…)
Libraries	noble-secp256k1, @noble/hashes, bech32, bs58
Concurrency	Multi-threaded via Web Workers
Backend	None – 100 % static and local

🔒 Security Notice
All cryptographic operations happen entirely in your browser.
Private keys never leave your device.

For maximum safety, use only the official site—or self-host the code and audit it yourself.

📝 Customization
Network parameters: tweak NITO_NETWORK inside worker.js.

Styling: edit style.css (fully modular).

Feel free to fork and adapt the UI for your own project!

🙏 Credits & License
Created with ❤️ by Presage0007.
Released under the MIT License – free for personal & commercial use, forks, and modifications.
