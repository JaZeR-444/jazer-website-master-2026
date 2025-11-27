# 🎶 JaZeR — Official Website 🎤🎧

> 🎵 Welcome home. This is **JaZeR** — singer, maker-of-moments, and your friendly internet stage.  
> This repo powers the official site for the JaZeR project and brand.

[🌐 Live Site → jazer-music.com](https://jazer-music.com) • [📫 Contact](https://jazer-music.com/contact.html)

---

## ✨ Highlights (TL;DR)

- 🎨 Strong JaZeR brand + stage presence  
- 📱 Mobile-first layout and navigation for fans on the go  
- ♿ Accessibility improvements (contrast, keyboard nav, ARIA hints)  
- ⚡ Performance tweaks: local fonts, optimized assets, lighter DOM  
- 🧭 Clean HTML structure — easy to maintain and extend  
- 🎵 Polished music, video, and shop pages for a smoother fan experience  

---

## 🧱 Tech Stack

This is a **static, multi-page site**:

- HTML5  
- Vanilla CSS (custom design system + tokens)  
- Vanilla JS for interactivity  
- Self-hosted web fonts (DM Sans, Nunito, Outfit)  
- Hosted on **GitHub Pages** with a custom domain  

No build step required — just static files.

---

## 🗂️ Project Structure

    JaZeR-Unlimited/
    ├── index.html          # Home page
    ├── music.html          # Music releases
    ├── videos.html         # Video content
    ├── about.html          # Artist story & mission
    ├── shop.html           # Merchandise
    ├── contact.html        # Contact form
    ├── 404.html            # Custom error page
    ├── css/
    │   └── style.css       # Main stylesheet + brand tokens
    ├── js/
    │   └── script.js       # Interactive features
    ├── images/             # Logos, artwork, brand assets
    ├── fonts/              # Local font files (DM Sans, Nunito, Outfit)
    └── _ARCHIVE/           # Archived / legacy reference files

---

## 🎨 Brand & Design

Core palette:

- **JaZeR Blue (Light):** `#4FACFE`  
- **JaZeR Blue (Mid):** `#00F2FE`  
- **JaZeR Purple:** `#9333EA`  
- **JaZeR Pink:** `#FF006E`  
- **Background:** `#0a0a0f`  
- **Text Light:** `#f8f9ff`  

> 🎚️ Design note: Colors, fonts, and brand tokens live in `css/style.css`.  
> Update them there for site-wide changes (buttons, gradients, hover states, etc.).

---

## 🎛️ Features & Interactions

- 🧭 Multi-page navigation with clean, readable URLs  
- 🎨 Interactive brand touches (visual treatments, gallery-driven visuals)  
- 🎼 Self-hosted fonts for consistent typography across devices  
- 🪄 Custom 404 page and simple contact flow  
- 🌙 Dark, glassy UI with accessible contrast + keyboard support  

---

## 🚀 Local Development

1. **Clone the repo**

       git clone https://github.com/JaZeR-444/JaZeR-Unlimited.git
       cd JaZeR-Unlimited

2. **Start a local server** (pick one)

       # Python
       python -m http.server 8000

       # Node (serve)
       npx serve

       # Or use the VS Code "Live Server" extension

3. **Open in browser**

       http://localhost:8000

> ⚠️ Fonts are local.  
> If typography looks off, make sure the `fonts/` directory is present and correctly referenced in `css/style.css`.

---

## 🛰️ Deployment & Hosting

The site is currently deployed with **GitHub Pages**:

- **Branch:** `main`  
- **Domain:** `jazer-music.com`  
- **HTTPS:** enforced via GitHub Pages settings  

To redeploy, push changes to `main`. GitHub Pages handles the rest.

---

## 🤝 Contributing / Maintenance

This is primarily a **personal artist site** for the JaZeR brand.

If you’re helping maintain the codebase:

- Open issues or PRs for:
  - Bug fixes (layout, responsiveness, accessibility)
  - Performance improvements
  - UI/UX tweaks that match the existing JaZeR aesthetic
- Discuss larger changes (new pages, redesigns) before implementation.

Possible future additions:

- `CONTRIBUTING.md` with simple guidelines  
- `CHANGELOG.md` with dated release notes  

For collaboration ideas or non-code feedback, use the site’s contact page at `jazer-music.com/contact.html`.

---

## ⚖️ License / Legal

**Copyright**

- © 2025–present **JaZeR**. All rights reserved.  
- Unless explicitly stated otherwise, all original materials in this repo are owned by JaZeR, including (without limitation):
  - Website layout and page structure  
  - Custom CSS, animations, and design tokens  
  - Copywriting, taglines, and descriptive text  
  - Logos, icons, and visual branding elements  
  - Artwork, cover images, and promotional graphics  

**Brand & Identity**

- The name **“JaZeR”**, the associated visual identity (logos, marks, color treatments, and brand system), and the overall look and feel of the site are part of the JaZeR brand.  
- You may **not**:
  - Use the JaZeR name, logo, or brand styling in a way that suggests endorsement, partnership, or official affiliation  
  - Repackage, resell, or redistribute JaZeR brand assets as your own  
  - Train commercial models or tools specifically on JaZeR-branded content for the purpose of cloning or imitating the brand  

**Content (Music, Media, and Text)**

- Any music, audio files, lyrics, videos, and media referenced or embedded via this site remain fully owned and controlled by JaZeR and/or relevant rights holders.  
- These materials are provided for listening/viewing only. They may **not** be:
  - Reused, sampled, remixed, or distributed  
  - Uploaded to other platforms  
  - Used in commercial projects  
  without prior **written permission** from JaZeR.

**Code Usage**

- The source code in this repository is published primarily for transparency, hosting, and portfolio purposes.  
- Unless a separate `LICENSE` file is added that states otherwise, the default is **“All rights reserved”**:
  - You may view and learn from the structure and implementation.  
  - You may **not** copy the site wholesale, rebrand it, or deploy a derivative that closely mimics the JaZeR experience without permission.  
  - You may **not** claim the design, structure, or branding as your own work.  

**Third-Party Assets**

- Any third-party libraries, fonts, or services used in this project remain under their respective licenses.  
- Review those tools’ official documentation and licenses if you plan to reuse them independently of this project.

**Privacy & Data**

- This repository does **not** process sensitive user data directly; it contains static site code only.  
- Any data submitted through the live site’s contact forms or integrations is handled by the services configured there and is subject to their respective policies.

**Disclaimer**

- This section is intended to clarify how the JaZeR brand and content may be used.  
- It does **not** constitute formal legal advice. For specific questions, consult a qualified attorney.  

If you are unsure whether a use is allowed, reach out via the contact form on `jazer-music.com` before proceeding.

---

## 🎵 Final Note

> This is JaZeR. Welcome home.  
> Keep the beat, keep the lights warm, and bring the volume. 🎚️🎧✨
