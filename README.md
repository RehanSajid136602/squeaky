# Squeaky.

> **Paste messy text. One click. Clean text out.**

A zero-dependency, single-file web utility built during a **30-minute mini-hackathon**. Squeaky runs 100% locally in your browser to turn messy PDF copy-pastes, forwarded emails, and log dumps into clean text, Markdown lists, or extracted links/emails.

🔗 **Live Demo (GitHub Pages):** https://RehanSajid136602.github.io/squeaky/

---

## ✨ Features

- **Clean text (`Ctrl/Cmd + Enter`)** — Fixes hard-wrapped PDF/email line breaks, rejoins hyphenated word splits (`exam-\nple` → `example`), replaces smart quotes/dashes with clean ASCII, and strips zero-width/invisible characters.
- **→ Markdown list** — Converts messy Unicode bullets (`•`, `·`, `▪`, `◦`), `*`, `+`, and numbered lists (`1)`, `1.`) into clean Markdown (`-` / `1.`).
- **Grab emails** — Extracts and deduplicates all email addresses in one click.
- **Grab links** — Extracts and deduplicates all `http(s)://` and `www.` URLs.
- **Live text stats** — Real-time word count, character count, line count, and estimated reading time.
- **Undo & Copy** — Built-in 20-step undo history and one-click clipboard copy.
- **100% Private** — Single `index.html` file. No servers, no tracking, no dependencies.

## 🚀 Run Locally

Just clone the repo and open `index.html` in any browser:

```bash
git clone https://github.com/RehanSajid136602/squeaky.git
cd squeaky
```

Or double-click `index.html` — no build tools or `npm install` needed.

### Run the tests

The pure text logic lives in an isolated `#core` block inside `index.html`, so it can be checked without a browser:

```bash
node test.mjs
```

Expected output: `11 passed, 0 failed`.

## 🛠️ Built With

- Plain HTML, CSS, and Vanilla JavaScript (single file)
- Pure, DOM-free core text functions isolated in `#core` for easy unit testing
- A dependency-free `node test.mjs` harness that extracts and exercises that core

## 📄 License

MIT — free to use, fork, and customize.
