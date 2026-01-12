# Repository Guidelines

## Project Structure & Module Organization
- Root HTML pages live at the repository root: `index.html`, `about.html`, `music.html`, `videos.html`, `shop.html`, `contact.html`, and `404.html`.
- Styles are split between `css/style.css` (design system and components) and `css/enhancements.css` (extra effects).
- Scripts are in `js/script.js` for navigation, animations, and theming.
- Assets are in `images/` (photos, icons, brand kit). Root-level SVG logos power navigation, hero, and favicon.
- Fonts are self-hosted in `fonts/`. Legacy materials are archived in `_ARCHIVE/`.

## Build, Test, and Development Commands
This is a static site with no build step or package manager.
- `python -m http.server 8000` starts a local server at `http://localhost:8000`.
- `npx serve` runs a simple static server if Node.js is available.
- `php -S localhost:8000` provides another lightweight local server option.

## Coding Style & Naming Conventions
- HTML uses 2-space indentation and semantic elements.
- CSS uses 2-space indentation, single quotes for strings, and favors custom properties in `:root`.
- JavaScript uses 4-space indentation, single quotes, and ES6+ syntax.
- File names and CSS classes use kebab-case and descriptive names.

## Testing Guidelines
- No automated test framework is configured.
- Validate changes by loading pages locally and checking layout in responsive DevTools.
- For QA, run Lighthouse audits and confirm keyboard navigation.

## Commit & Pull Request Guidelines
- Commit messages use a short prefix: `Add:`, `Update:`, `Fix:`, `Docs:`, `Refactor:`, or `Style:` followed by a brief description.
- Pull requests should include a concise summary, list of pages/files touched, and screenshots for visual changes.
- Link related issues when applicable and call out asset updates.

## Security & Configuration Tips
- The site deploys via GitHub Pages. `CNAME` defines the custom domain and `.nojekyll` disables Jekyll processing.
- Avoid adding third-party scripts unless necessary; keep assets self-hosted for performance and privacy.
