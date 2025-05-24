```markdown
## 📦 Installation (continued)

### Deploy to your web server

Upload all files (`index.html` / `index.php`, `app.js`, `worker.js`, `style.css`, `logo.png`, `libs/`, …) to any static host or regular web server.  
*(A PHP backend is optional—only needed if you serve the `index.php` variant.)*

### Open in your browser

Navigate to your deployed URL, e.g.  
`https://yourdomain.com/vanito/`

---

## ⚙️ Usage

1. **Enter a custom pattern**  
   - 1–30 characters  
   - Charset: `023456789acdefghjklmnpqrstuvwxyz`

2. **Choose the search mode**
   - **Prefix** – `nito1q[pattern]…`
   - **Suffix** – `…q[pattern]`

3. **Select thread count** (1–32)  
   More threads ≈ faster (depends on your CPU)

4. Click **Generate** and wait for a match

5. When found, copy the:
   - Bech32 address
   - WIF (Wallet Import Format)
   - Hex private key

> **Note**: Input is validated automatically. Only valid Bech32 characters are accepted.

---

## 🧑‍💻 Technical Details

| Component      | Value                                |
|----------------|--------------------------------------|
| **Network**    | Nito mainnet                         |
| **Address fmt**| Bech32 (`nito1q…`)                   |
| **Libraries**  | `noble-secp256k1`, `@noble/hashes`, `bech32`, `bs58` |
| **Concurrency**| Multi-threaded via Web Workers       |
| **Backend**    | None – 100 % static and local        |

---

## 🔒 Security Notice

All cryptographic operations are performed **entirely in your browser**.  
**Private keys never leave your device.**

For maximum safety:
- Use only the **official site**, or  
- **Self-host** the source code and review it yourself

---

## 📝 Customization

- Adjust network parameters via `NITO_NETWORK` in `worker.js`
- Modify visual style by editing `style.css`

Fork freely and adapt the UI for your own project!

---

## 🙏 Credits & License

Created with ❤️ by **Presage0007**  
Released under the **MIT License**  
→ Free for personal or commercial use, forks, and modifications
```
