# Repository Guidelines

## Project Structure & Module Organization
- Root HTML pages: `index.html`, `about.html`, `music.html`, `videos.html`, `shop.html`, `contact.html`, and `404.html`.
- Styles live in `css/style.css` (design system and components) and `css/enhancements.css` (extra effects).
- Scripts are in `js/script.js` (navigation, animations, theming).
- Assets are in `images/` (photos, icons, brand kit) and root-level SVG logos (navigation, hero, favicon).
- Fonts are self-hosted in `fonts/`; legacy files are kept in `_ARCHIVE/`.

## Build, Test, and Development Commands
This is a static site with no build step or package manager.
- `python -m http.server 8000` runs a local server at `http://localhost:8000`.
- `npx serve` runs a simple static server if Node is available.
- `php -S localhost:8000` is a lightweight local server option.

## Coding Style & Naming Conventions
- HTML uses 2-space indentation and semantic elements.
- CSS uses 2-space indentation and single quotes for strings; prefer custom properties in `:root`.
- JavaScript uses 4-space indentation with single quotes and ES6+ syntax.
- File names and CSS classes are kebab-case and descriptive; avoid framework-specific patterns.

## Testing Guidelines
- No automated test framework is configured.
- Validate changes by loading pages locally and checking in DevTools responsive mode.
- For QA, use Lighthouse for performance/accessibility and confirm keyboard navigation.

## Commit & Pull Request Guidelines
- Commit messages follow a short prefix: `Add:`, `Update:`, `Fix:`, `Docs:`, `Refactor:`, or `Style:` plus a brief description.
- Pull requests should include a concise summary, list of pages/files touched, and screenshots for visual changes.
- Link related issues if applicable and call out any content or asset updates.

## Security & Configuration Tips
- The site deploys via GitHub Pages; `CNAME` defines the custom domain and `.nojekyll` disables Jekyll processing.
- Avoid adding third-party scripts unless necessary; keep assets self-hosted for performance and privacy.
