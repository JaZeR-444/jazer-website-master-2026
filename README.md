# JaZeR Website (Work in Progress)

This is the private repo for the JaZeR site. It’s a static single-page app (plain HTML/CSS/JS) with a brand-forward design.

## Structure

- `index.html` — main site (moved to project root)
- `404.html` — friendly not-found page
- `css/` — styles, brand tokens in `style.css`
- `js/` — navigation, contact form handling, brand color picker
- `images/` — logo, artwork, favicon
- `robots.txt` — search engine instructions (root level)
- `sitemap.xml` — site structure for SEO (root level)
- `robots/` & `sitemap/` — original subdirectories (kept)
- `README/` — original notes (kept)
- `GITHUB_PAGES_DEPLOYMENT.md` — deployment guide
- `deploy-gh-pages.sh` — deployment helper script
- `verify-site.sh` — site structure verification

## Brand
Palette and tokens aligned to:
- Electric Purple `#8B5CF6`
- Cosmic Blue `#3B82F6`
- Neon Pink `#EC4899`
- Night Black `#0B0E12`
- Stardust White `#F8F9FF`
- Graphite `#1F2937`
- Soft Slate `#94A3B8`

## Local Preview
Open `index.html` directly in your browser, or use a simple static server (recommended for hash routing).

## Deploy to GitHub Pages

This repository is configured for GitHub Pages deployment. Follow these steps:

1. **Quick Deploy:**
   ```bash
   ./deploy-gh-pages.sh
   ```

2. **Manual Deploy:**
   - Create gh-pages branch: `git checkout -b gh-pages && git push -u origin gh-pages`
   - Enable in GitHub: Settings → Pages → Source: gh-pages branch

3. **Verify Site:**
   ```bash
   ./verify-site.sh
   ```

📖 **For detailed instructions, see [GITHUB_PAGES_DEPLOYMENT.md](GITHUB_PAGES_DEPLOYMENT.md)**

### Deployment Options
- **GitHub Pages** (default): `https://jazer-444.github.io/JaZeR-Unlimited/`
- **Custom Domain**: Configure https://jazeratx.com (see deployment guide)
- **Alternative Platforms**: Cloudflare Pages, Vercel, Netlify

Update `og:image` to a dedicated share image (1200x630) when final.

## Git Quickstart (Private Repo)
1. Create a new private repository on GitHub (no README, no .gitignore).
2. In this folder, run:

```powershell
# Initialize repo and commit
git init
git add -A
git commit -m "Initial private commit: brand + structure"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/<your-username>/<your-repo>.git

# Push main branch
git branch -M main
git push -u origin main
```

If you want, I can run the local init/commit for you now and you can paste the remote URL after.
