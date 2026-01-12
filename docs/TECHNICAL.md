# 🏗️ Technical Architecture

Deep-dive technical documentation for the JaZeR website.

---

## Astro Migration Note

This repo now builds with Astro and outputs a static `dist/` folder for deployment. The page routes live in `src/pages/`, and shared layout/components are in `src/layouts/` and `src/components/`.

### 404 Handling for Static Hosts

- Astro generates `dist/404.html` from `src/pages/404.astro`.
- GitHub Pages serves `404.html` automatically once deployed.
- Netlify serves `404.html` by default; no extra redirect rules are required for this site.
- If your host requires explicit routing, map unknown routes to `/404.html` (not `/index.html`).

---

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Component Structure](#component-structure)
- [Styling System](#styling-system)
- [JavaScript Modules](#javascript-modules)
- [Performance Optimizations](#performance-optimizations)
- [Build & Deployment](#build--deployment)

---

## Architecture Overview

### Technology Decisions

**Why Astro + Vanilla Principles?**

The JaZeR website uses **Astro** combined with a **vanilla philosophy** (standard CSS3, vanilla JavaScript) for several strategic reasons:

```
✓ Zero JS by Default          → Ships only what's needed for maximum speed
✓ Component-Based Structure   → Better maintainability and reusability
✓ Maximum Performance         → 100/100 Lighthouse scores through SSG
✓ Universal Compatibility     → Works everywhere, no polyfills needed
✓ Long-term Stability         → Standard web APIs over complex frameworks
✓ Complete Control            → Full transparency of every line of code
✓ Easy Debugging              → Native browser DevTools, no source maps
✓ Scalable Content            → Built-in support for Markdown and collections
```

**When This Approach Works Best:**

- ✅ Content-focused websites (blogs, portfolios, artist pages)
- ✅ Projects prioritizing performance and user experience
- ✅ Sites with minimal but high-impact interactivity
- ✅ Fast-loading, SEO-optimized static pages
- ✅ Static hosting scenarios (GitHub Pages, Netlify, Cloudflare)

**When to Consider Heavy Frameworks:**

- ❌ Highly dynamic, state-heavy web applications (dashboards, editors)
- ❌ Real-time collaboration features
- ❌ Complex client-side routing needs
- ❌ Massive teams requiring strict framework conventions

---

## Component Structure

### Page Architecture

Every page follows a consistent three-tier structure:

```
┌─────────────────────────────────────────────┐
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │   <header role="banner">              │ │
│  │   └── <nav role="navigation">         │ │
│  │       ├── Logo (link to home)         │ │
│  │       ├── Mobile menu toggle          │ │
│  │       └── <ul> Navigation links       │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │   <main id="main-content">            │ │
│  │   ├── Hero section (page-specific)    │ │
│  │   ├── Content sections                │ │
│  │   └── Interactive elements            │ │
│  └───────────────────────────────────────┘ │
│                                             │
│  ┌───────────────────────────────────────┐ │
│  │   <footer role="contentinfo">         │ │
│  │   ├── Social media links              │ │
│  │   ├── Sitemap navigation              │ │
│  │   └── Copyright notice                │ │
│  └───────────────────────────────────────┘ │
│                                             │
└─────────────────────────────────────────────┘
```

### Reusable Components

**Navigation Component**
```html
<!-- Consistent across all 7 pages -->
<nav role="navigation" aria-label="Main navigation">
  <a href="index.html" class="nav-logo" aria-label="JaZeR home">
    <img src="Vibrant JAZER Bubble Logo (300 x 100 px).svg" 
         alt="JaZeR" 
         width="300" 
         height="100" />
  </a>
  
  <button class="mobile-menu-toggle" 
          aria-label="Toggle menu" 
          aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
  
  <ul class="nav-links">
    <li><a href="index.html">Home</a></li>
    <li><a href="music.html">Music</a></li>
    <li><a href="videos.html">Videos</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="shop.html">Shop</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
```

**Card Component Pattern**
```html
<article class="card">
  <div class="card-image">
    <img src="..." alt="..." loading="lazy" />
  </div>
  <div class="card-content">
    <h3 class="card-title">Title</h3>
    <p class="card-description">Description...</p>
    <a href="..." class="card-link">Learn More</a>
  </div>
</article>
```

**Button Patterns**
```html
<!-- Primary CTA -->
<button class="btn btn-primary">Primary Action</button>

<!-- Secondary -->
<button class="btn btn-secondary">Secondary Action</button>

<!-- Ghost/Outline -->
<button class="btn btn-ghost">Ghost Button</button>

<!-- Link styled as button -->
<a href="..." class="btn btn-primary">Link Button</a>
```

---

## Styling System

### CSS Architecture

**File Structure:**
```
css/
├── style.css              # Main stylesheet (~80% of styles)
│   ├── Design tokens      # CSS custom properties
│   ├── Reset & base       # Normalize, box-sizing
│   ├── Layout             # Grid, Flexbox, containers
│   ├── Components         # Buttons, cards, forms
│   ├── Utilities          # Margin, padding helpers
│   └── Responsive         # Media queries
│
├── enhancements.css       # Visual polish (~15% of styles)
│   ├── Animations         # Keyframes, transitions
│   ├── Glassmorphism      # Frosted glass effects
│   ├── Gradients          # Color transitions
│   └── Shadows            # Depth effects
│
├── music-enhancements.css # Music page specific
└── pages-enhancements.css # Other page-specific styles
```

### Design Tokens (CSS Custom Properties)

Located at the top of `css/style.css`:

```css
:root {
  /* Brand Colors */
  --jazer-blue-light: #4FACFE;
  --jazer-blue-mid: #00F2FE;
  --jazer-purple: #9333EA;
  --jazer-pink: #FF006E;
  --jazer-orange: #FF9500;
  --jazer-green: #00FF88;
  
  /* Neutral Colors */
  --bg-dark: #0a0a0f;
  --bg-card: rgba(255, 255, 255, 0.05);
  --text-light: #f8f9ff;
  --text-muted: #a0a0b0;
  
  /* Typography */
  --font-body: 'DM Sans', -apple-system, sans-serif;
  --font-heading: 'Outfit', -apple-system, sans-serif;
  --font-brand: 'Nunito', -apple-system, sans-serif;
  
  /* Spacing Scale (8px base) */
  --space-xs: 0.5rem;   /* 8px */
  --space-sm: 1rem;     /* 16px */
  --space-md: 1.5rem;   /* 24px */
  --space-lg: 2rem;     /* 32px */
  --space-xl: 3rem;     /* 48px */
  --space-2xl: 4rem;    /* 64px */
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.2);
  --shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 0 20px rgba(79, 172, 254, 0.4);
  
  /* Transitions */
  --transition-fast: 0.15s ease;
  --transition-base: 0.3s ease;
  --transition-slow: 0.5s ease;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
```

### Responsive Breakpoints

```css
/* Mobile-first approach */

/* Base styles (0-767px) - Mobile */
.container {
  width: 100%;
  padding: 0 var(--space-md);
}

/* Tablet (768px+) */
@media (min-width: 768px) {
  .container {
    max-width: 720px;
    margin: 0 auto;
  }
}

/* Desktop (1024px+) */
@media (min-width: 1024px) {
  .container {
    max-width: 960px;
  }
}

/* Large Desktop (1280px+) */
@media (min-width: 1280px) {
  .container {
    max-width: 1200px;
  }
}
```

### Naming Conventions

**Class Naming Philosophy**: Semantic and descriptive, no specific methodology (BEM, SMACSS, etc.)

```css
/* Component-based naming */
.nav-links { }              /* Component */
.nav-logo { }               /* Component element */
.card-title { }             /* Component element */
.btn-primary { }            /* Component modifier */

/* State classes */
.is-active { }              /* Active state */
.is-open { }                /* Open state */
.is-loading { }             /* Loading state */

/* Utility classes (sparingly) */
.text-center { }            /* Text alignment */
.mt-lg { }                  /* Margin top large */
.hidden { }                 /* Visibility */
```

---

## JavaScript Modules

### Core Functionality

**File**: `js/script.js` (~150 lines, ~5KB minified)

**Module 1: Mobile Navigation**
```javascript
// Mobile menu toggle with ARIA and scroll lock
const initMobileMenu = () => {
  const toggle = document.querySelector('.mobile-menu-toggle');
  const nav = document.querySelector('.nav-links');
  const body = document.body;
  
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isOpen);
    nav.classList.toggle('active');
    body.classList.toggle('menu-open');
  });
  
  // Close on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('active')) {
      nav.classList.remove('active');
      body.classList.remove('menu-open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
};
```

**Module 2: Dynamic Color Cycling**
```javascript
// Rotate through brand colors every 5 seconds
const initColorCycling = () => {
  const colors = [
    '#9333EA',  // Purple
    '#FF006E',  // Magenta
    '#00F2FE',  // Cyan
    '#FF9500',  // Orange
    '#00FF88',  // Green
    '#4FACFE'   // Blue
  ];
  
  let index = 0;
  
  setInterval(() => {
    document.documentElement.style.setProperty(
      '--accent-color',
      colors[index]
    );
    index = (index + 1) % colors.length;
  }, 5000);
};
```

**Module 3: Smooth Scrolling**
```javascript
// Enhanced smooth scrolling for anchor links
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};
```

**Module 4: Form Validation**
```javascript
// Client-side form validation
const initFormValidation = () => {
  const form = document.querySelector('#contact-form');
  
  if (!form) return;
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();
    
    // Validation
    if (!name || !email || !message) {
      showError('All fields are required');
      return;
    }
    
    if (!isValidEmail(email)) {
      showError('Please enter a valid email address');
      return;
    }
    
    // Submit via FormSubmit or similar service
    form.submit();
  });
};

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
```

**Module 5: Intersection Observer (Scroll Animations)**
```javascript
// Trigger animations on scroll into view
const initScrollAnimations = () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  document.querySelectorAll('.card, .section').forEach(el => {
    observer.observe(el);
  });
};
```

**Initialization**
```javascript
// Initialize all modules on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initColorCycling();
  initSmoothScroll();
  initFormValidation();
  initScrollAnimations();
});
```

---

## Performance Optimizations

### Asset Optimization

**Fonts**
```
✓ WOFF2 format (best compression)
✓ font-display: swap (prevent FOIT)
✓ Preload critical fonts
✓ Self-hosted (no external requests)
✓ Subset to used characters (future improvement)

Total font size: ~100KB (3 families, 9 weights)
```

**Images**
```
✓ SVG for logos and icons (scalable, <10KB each)
✓ JPG for photos (80% quality, optimized)
✓ PNG for screenshots (with transparency)
✓ WebP for modern browsers (future improvement)
✓ Lazy loading (loading="lazy")
✓ Proper dimensions (width/height attributes)

Average image size: ~50KB
Total image payload: <500KB
```

**CSS**
```
✓ CSS custom properties (reduce redundancy)
✓ Mobile-first media queries
✓ Efficient selectors (avoid deep nesting)
✓ GPU-accelerated properties (transform, opacity)
✓ Minification for production (future)

Unminified: ~35KB
Gzipped: ~8KB
```

**JavaScript**
```
✓ Vanilla JS (no framework overhead)
✓ Event delegation pattern
✓ Debounced scroll handlers
✓ Minimal DOM manipulation
✓ Deferred non-critical scripts

Unminified: ~5KB
Gzipped: ~2KB
```

### Rendering Optimizations

**Critical Rendering Path**
```
1. HTML parsed (lightweight, semantic)
2. CSS loaded and parsed (inline critical CSS future improvement)
3. Fonts loaded with swap behavior
4. JavaScript executes after DOM ready
5. Images lazy-load below fold
```

**Layout Stability**
```css
/* Prevent layout shifts with proper sizing */
img {
  width: auto;
  height: auto;
  max-width: 100%;
  /* Always include width/height attributes in HTML */
}

/* Reserve space for dynamic content */
.card {
  min-height: 300px;
}
```

**Animation Performance**
```css
/* GPU-accelerated transforms */
.card:hover {
  transform: translateY(-8px);  /* ✓ GPU */
  /* Avoid: top: -8px; */        /* ✗ CPU */
}

/* Optimize with will-change (sparingly) */
.card {
  will-change: transform;
}
```

### Network Optimizations

**HTTP/2**
- ✓ Enabled by default on GitHub Pages
- ✓ Multiplexing allows parallel requests
- ✓ Header compression reduces overhead

**Caching Strategy**
```
Static assets (CSS, JS, images):
  Cache-Control: max-age=31536000 (1 year)
  
HTML pages:
  Cache-Control: max-age=3600 (1 hour)
  
Fonts:
  Cache-Control: max-age=31536000 (1 year)
```

**CDN Distribution**
- GitHub Pages uses global CDN
- Assets served from nearest edge location
- Reduced latency worldwide

---

## Build & Deployment

### Development Workflow

**Local Development**
```bash
# No build step required
python -m http.server 8000

# Or use VS Code Live Server for auto-reload
```

**Git Workflow**
```bash
# Feature branch
git checkout -b feature/new-feature

# Make changes
# ...

# Commit with semantic message
git commit -m "Add: feature description"

# Push to GitHub
git push origin feature/new-feature

# Open Pull Request
# Merge to main

# Automatic deployment triggered
```

### Deployment Pipeline

**GitHub Actions** (automatic on push to `main`):

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

**Deployment Steps**:
1. Push to `main` branch
2. GitHub Actions triggered
3. Files copied to `gh-pages` branch
4. GitHub Pages serves updated content
5. CDN cache updated
6. Live in ~1-2 minutes

**Custom Domain Setup**:
- CNAME file in repository
- DNS A records point to GitHub Pages IPs
- HTTPS certificate automatically provisioned

---

## Testing Strategy

### Manual Testing

**Browser Testing**
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 13+)
- Chrome Mobile (Android 8+)

**Device Testing**
- Desktop: 1920x1080, 1366x768
- Tablet: 768x1024, 1024x768
- Mobile: 375x667 (iPhone SE), 414x896 (iPhone 11)

**Accessibility Testing**
- Keyboard navigation (Tab, Enter, Esc)
- Screen reader (NVDA, VoiceOver)
- Color contrast (WCAG AA)
- Focus indicators
- ARIA attributes

### Automated Testing

**Lighthouse CI** (future improvement)
```bash
npm install -g @lhci/cli

lhci autorun \
  --collect.url=https://jazer-444.github.io/TEST-Website-Import/ \
  --assert.assertions=lighthouse:performance:95
```

**HTML Validation**
```bash
# W3C Validator
https://validator.w3.org/

# CLI tool
npm install -g html-validator-cli
html-validator --file=index.html
```

**Accessibility Audits**
```bash
# axe-core CLI
npm install -g @axe-core/cli
axe https://jazer-444.github.io/TEST-Website-Import/
```

---

## Security Considerations

**Content Security Policy** (future enhancement)
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               img-src 'self' data:; 
               style-src 'self' 'unsafe-inline';">
```

**Subresource Integrity** (for any CDN resources)
```html
<link rel="stylesheet" 
      href="https://cdn.example.com/style.css"
      integrity="sha384-..."
      crossorigin="anonymous">
```

**HTTPS Enforcement**
- Enabled by default on GitHub Pages
- All HTTP requests redirected to HTTPS
- Let's Encrypt certificate auto-renewed

---

## Future Improvements

### Performance
- [ ] Critical CSS inlining
- [ ] WebP image format with fallbacks
- [ ] Brotli compression
- [ ] Service Worker for offline support
- [ ] Resource hints (preconnect, dns-prefetch)

### Features
- [ ] Progressive Web App (PWA)
- [ ] Dark/light mode toggle
- [ ] Analytics integration
- [ ] Newsletter signup
- [ ] Blog/news section

### Developer Experience
- [ ] CSS/JS minification pipeline
- [ ] Automated screenshot generation
- [ ] Lighthouse CI in GitHub Actions
- [ ] Automated accessibility testing
- [ ] Visual regression testing

---

For questions or suggestions about the technical architecture, please [open an issue](https://github.com/JaZeR-444/jazer-website-master-2026/issues) or [start a discussion](https://github.com/JaZeR-444/jazer-website-master-2026/discussions).
