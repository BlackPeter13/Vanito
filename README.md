
# Vanito – Nito Vanity Address Generator

<p align="center">
  <img src="logo.png" alt="Nito Logo" width="96"/>
</p>

**Vanito** is an ultra-fast, open-source vanity address generator for the [Nito Network](https://nito.network/).  
Find beautiful, personalized Nito addresses directly in your browser, with maximum security and speed!

---

## 🚀 Features

- **Ultra-fast**: Multi-threaded (Web Worker) vanity search in your browser  
- **Custom Patterns**: Supports any valid bech32 pattern, prefix or suffix (`nito1q...`)  
- **One-Click Copy**: Copy address, WIF, and private key securely  
- **Modern UI**: Responsive, accessible, mobile-ready, and light/dark mode friendly  
- **Open Source**: 100% GPL-3.0 license  

---

## 🌐 Live Demo

**Try it instantly:**  
[https://vanito.org/](https://vanito.org/)

---

## 📦 Installation

### 1. Clone the repository

```sh
git clone https://github.com/Presage0007/Vanito.git
cd vanito
```

### 2. Deploy to your web server

Upload all files (`index.php`, `app.js`, `worker.js`, `style.css`, `logo.png`) to your static hosting or server.  
No backend required (except PHP for `index.php` if used).

### 3. Open in your browser

Go to your deployed URL (e.g., `https://yourdomain.com/vanito/`).

---

## ⚙️ Usage

- Enter your custom pattern (1–30 chars, charset: `023456789acdefghjklmnpqrstuvwxyz`)
- Choose Mode:
  - **Prefix** (`nito1q[pattern]...`)
  - **Suffix** (`nito1qxxx[pattern]`)
- Select number of threads (1–32) — higher = faster (depending on your CPU)
- Click “Generate” and wait for a match
- When found, copy the address, WIF, or hex private key
- All validation is automatic: only bech32 charset is accepted

---

## 🧑‍💻 Technical Details

- **Network**: Nito mainnet  
- **Address format**: Bech32 (`nito1q...`)  
- **Libraries**:
  - `noble-secp256k1`
  - `@noble/hashes`
  - `bech32`
  - `bs58`
- **Multi-threaded**: Uses Web Workers  
- **No dependencies/server**: 100% static and local

---

## 🔒 Security Notice

All operations are client-side. Private keys never leave your browser.  
For maximum safety, use only the official site or host the code yourself.

---

## 📝 Customization

- Network parameters (`NITO_NETWORK`) can be adjusted in `worker.js`
- Styles can be modified via `style.css`
- Fork and adapt the UI for your own project

---

## 🙏 Credits & License

Created by **Presage0007**  
**GPL-3.0 License** – free for all use, fork, and modification

---

## 🤝 Donation

If you like my work, you can donate to 
```sh
nito1q56ngvra0dg73k28xfakhtvarac2vulhpresage
```
