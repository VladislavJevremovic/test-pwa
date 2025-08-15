# Test PWA for GitHub Pages

This is a tiny Progressive Web App scaffold that installs on Android and iOS (via Safari's **Add to Home Screen**) and works fully on **GitHub Pages**.

## Quick start
1. **Create a new public repo** named e.g. `test-pwa`.
2. Download `test-pwa.zip` from this chat and extract it. Commit all files to the repo root.
3. Push to GitHub and enable **Settings → Pages → Build and deployment → Deploy from branch** (`main`, `/ (root)`).
4. Wait for the green check, then open: `https://USERNAME.github.io/REPO/`.
5. You should see *Install* become available on Android/Chrome; on iOS open in **Safari**, tap **Share → Add to Home Screen**.

## Notes
- `start_url` and SW `scope` are `./` so paths work under `USERNAME.github.io/REPO/`.
- `404.html` redirects unknown routes to `/` (helps single‑page apps).
- To ship updates, bump the `CACHE_VERSION` in `sw.js` (or change `%BUILD_ID%`). Users may need one reload.
- For a custom domain, add a `CNAME` file and ensure HTTPS is on.
