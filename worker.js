/*
 * Copyright (c) 2025 Presage0007
 * https://github.com/Presage0007
 * Licensed under the GPL-3.0 License.
 * For more details, see the LICENSE file.
 */

import { getPublicKey, utils as secpUtils } from "https://esm.sh/noble-secp256k1";
import { sha256 } from "https://esm.sh/@noble/hashes/sha256";
import { ripemd160 } from "https://esm.sh/@noble/hashes/ripemd160";
import { bech32 } from "https://esm.sh/bech32";
import bs58 from "https://esm.sh/bs58";

// NITO config: update here if the spec changes (pubKeyHash/scriptHash not used for Bech32 segwit)
const NITO_NETWORK = {
  messagePrefix: '\x18Nito Signed Message:\n',
  bech32:        'nito',
  pubKeyHash:    0x6f,
  scriptHash:    0xc4,
  wif:           0x80,
  bip32: {
    public:  0xCF873504,
    private: 0x94833504
  }
};
const BECH32_CHARSET = "023456789acdefghjklmnpqrstuvwxyz";

function bytesToHex(arr) {
  return Array.from(arr).map(x => x.toString(16).padStart(2, '0')).join('');
}
function randomPrivKey() {
  return secpUtils.randomPrivateKey();
}
function privKeyToNitoAddress(privKey) {
  // Standard bech32 : witver=0, witprog=hash160(compressed pubkey)
  const pubkey = getPublicKey(privKey, true); // compressed
  const pubkeyHash = ripemd160(sha256(pubkey));
  // "0" (version segwit 0), then pubkeyHash (20 bytes)
  const words = bech32.toWords(pubkeyHash);
  // For Nito, some networks require "0" (witver) first: this is standard BTC
  return bech32.encode(NITO_NETWORK.bech32, [0, ...words]);
}
function privKeyToWIF(privKey) {
  const prefix = NITO_NETWORK.wif;
  let extended = new Uint8Array(34);
  extended[0] = prefix;
  extended.set(privKey, 1);
  extended[33] = 0x01; // compressed
  const checksum = sha256(sha256(extended)).slice(0, 4);
  let wifArr = new Uint8Array(extended.length + 4);
  wifArr.set(extended, 0);
  wifArr.set(checksum, extended.length);
  return bs58.encode(wifArr);
}
function getBech32Body(address) {
  // "nito1q" + body (bech32)
  const prefix = "nito1q";
  return address.startsWith(prefix) ? address.slice(prefix.length) : "";
}

self.onmessage = function(ev) {
  const pattern = (ev.data.pattern || "").toLowerCase();
  const mode = ev.data.mode || "prefix";
  const batch = 10000;
  if (!pattern.length || pattern.length > 30 || [...pattern].some(c => !BECH32_CHARSET.includes(c))) {
    postMessage({ type: "error", error: "Invalid pattern" });
    return;
  }
  while (true) {
    for (let i = 0; i < batch; i++) {
      const priv = randomPrivKey();
      const addr = privKeyToNitoAddress(priv);
      const body = getBech32Body(addr);
      let matched = false;
      if (mode === "prefix") {
        matched = body.startsWith(pattern);
      } else if (mode === "suffix") {
        matched = body.endsWith(pattern);
      }
      if (matched) {
        self.postMessage({
          type: "found",
          address: addr,
          privHex: bytesToHex(priv),
          wif: privKeyToWIF(priv)
        });
        return;
      }
    }
    self.postMessage({ type: "progress", count: batch });
  }
};
