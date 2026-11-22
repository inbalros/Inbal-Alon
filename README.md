# Inbal & Alon · "Wedding Management" 🎯

A mobile-first, Hebrew (RTL) static site that guests reach by scanning the QR code on Alon's T-shirt.
No build step, no backend. Plain HTML, CSS and JS.

## Preview
Double-click `index.html`, or serve the folder to test on a phone on the same Wi-Fi:

    npx serve .        # or: python -m http.server 8000

## Editing the text
**All copy lives in `js/content.js`**: the warning, the case file, the verdict lines, the pardon and the footer.
- `challenges`: one line per task. Add or remove lines and the counter, progress bar and completion moment adjust automatically.
- `verdicts`: the comment under the progress bar, from "nothing done" up to "almost there".

Progress is kept in memory only, by design: refreshing the page opens a fresh case file.

## Deploying (free)
Upload the whole folder (`index.html`, `css/`, `js/`) to any static host:
- **Netlify Drop**: drag the folder onto https://app.netlify.com/drop
- **GitHub Pages**, **Cloudflare Pages** or **Vercel** also work as-is.

Then generate the QR code from the final URL. Test the printed shirt with a few phones before the wedding,
and keep the URL short so the QR stays simple and easy to scan.

## Files
    index.html       page structure
    css/styles.css   all visuals (colors and fonts are at the top in :root)
    js/content.js    ← all Hebrew text and the challenge list
    js/app.js        interactions: checking tasks, progress, reset, pardon, confetti
