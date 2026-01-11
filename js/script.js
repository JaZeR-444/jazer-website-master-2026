document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // #7 - PRELOADER / LOADING ANIMATION
    // ============================================
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500);
        });
        // Fallback: hide after 1 second max (reduced to prevent appearing stuck)
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    }

    // ============================================
    // #5 - PAGE TRANSITIONS
    // ============================================
    document.body.classList.add('page-transition-fade');

    // ============================================
    // MOBILE MENU TOGGLE
    // ============================================
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.querySelector('[data-nav-overlay]');
    const siteNav = document.querySelector('.site-nav');

    function setNavState(isOpen) {
        if (!mobileMenu || !navLinks) return;
        mobileMenu.setAttribute('aria-expanded', String(isOpen));
        navLinks.classList.toggle('active', isOpen);
        document.body.classList.toggle('nav-open', isOpen);
        if (navOverlay) {
            navOverlay.classList.toggle('active', isOpen);
        }
    }

    function toggleNav() {
        if (!navLinks) return;
        const isOpen = navLinks.classList.contains('active');
        setNavState(!isOpen);
    }

    function closeNav() {
        setNavState(false);
    }

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', toggleNav);

        mobileMenu.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });

        navLinks.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeNav);
        });

        if (navOverlay) {
            navOverlay.addEventListener('click', closeNav);
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeNav();
            }
        });
    }

    if (siteNav) {
        const navScrollThreshold = 60;
        const updateNav = () => {
            siteNav.classList.toggle('is-scrolled', window.scrollY > navScrollThreshold);
        };
        window.addEventListener('scroll', updateNav);
        updateNav();
    }

    // ============================================
    // #10 - THEME COLOR CYCLING (Enhanced with localStorage)
    // ============================================
    const jazerBrandColors = [
        '#00f2ea', // jazer-cyan
        '#ff006e', // jazer-pink
        '#9333ea', // jazer-purple
        '#ff00ff', // jazer-magenta
        '#ff8800', // jazer-orange
        '#ffbe0b', // jazer-yellow
        '#22c55e'  // jazer-green
    ];
    
    // Load saved color index from localStorage
    let currentColorIndex = parseInt(localStorage.getItem('jazerColorIndex') || '0');
    if (currentColorIndex >= jazerBrandColors.length) currentColorIndex = 0;

    function hexFromRgb(r, g, b) {
        const toHex = (n) => n.toString(16).padStart(2, '0');
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    }

    function lightenHex(hex, percent) {
        const num = parseInt(hex.slice(1), 16);
        let r = (num >> 16) + Math.round(255 * percent);
        let g = ((num >> 8) & 0x00FF) + Math.round(255 * percent);
        let b = (num & 0x0000FF) + Math.round(255 * percent);
        r = Math.min(255, Math.max(0, r));
        g = Math.min(255, Math.max(0, g));
        b = Math.min(255, Math.max(0, b));
        return hexFromRgb(r, g, b);
    }

    function getSecondaryColor(primaryHex) {
        switch (primaryHex) {
            case '#9333ea': return '#8B5CF6';
            case '#ff00ff': return '#EC4899';
            case '#00f2ea': return '#06B6D4';
            case '#ff8800': return '#F59E0B';
            case '#22c55e': return '#10B981';
            case '#4facfe': return '#3B82F6';
            default: return lightenHex(primaryHex, 0.25);
        }
    }

    function applyBrandColors(primaryHex) {
        const root = document.documentElement;
        const secondaryHex = getSecondaryColor(primaryHex);
        root.style.setProperty('--primary-color', primaryHex);
        root.style.setProperty('--secondary-color', secondaryHex);
        
        // Update theme toggle icon color
        const themeToggleIcon = document.querySelector('.theme-toggle-icon');
        if (themeToggleIcon) {
            themeToggleIcon.style.background = `linear-gradient(135deg, ${primaryHex}, ${secondaryHex})`;
        }
    }

    function createColorBurst() {
        const burst = document.createElement('div');
        burst.className = 'color-burst';
        document.body.appendChild(burst);
        setTimeout(() => burst.remove(), 600);
    }

    function cycleBrandColors() {
        currentColorIndex = (currentColorIndex + 1) % jazerBrandColors.length;
        localStorage.setItem('jazerColorIndex', currentColorIndex.toString());
        const newColor = jazerBrandColors[currentColorIndex];
        createColorBurst();
        applyBrandColors(newColor);
    }

    // Initialize brand color
    applyBrandColors(jazerBrandColors[currentColorIndex]);

    // Logo click for color cycling
    const logoElement = document.querySelector('.logo');
    if (logoElement) {
        logoElement.addEventListener('click', (e) => {
            e.preventDefault();
            cycleBrandColors();
        });
    }

    // #10 - Visible theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', cycleBrandColors);
    }

    // ============================================
    // #8 - BACK TO TOP BUTTON
    // ============================================
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        const scrollThreshold = 300;

        const updateBackToTop = () => {
            const scrollY = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
            const clamped = Math.min(100, Math.max(0, progress));
            document.documentElement.style.setProperty('--scroll-progress', `${clamped}%`);
            backToTop.style.setProperty('--scroll', `${clamped}%`);

            if (scrollY > scrollThreshold) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        };

        window.addEventListener('scroll', updateBackToTop);
        updateBackToTop();

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ============================================
    // #4 - EMAIL CAPTURE FORM
    // ============================================
    const emailForms = document.querySelectorAll('.email-capture-form');
    emailForms.forEach(form => {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            const statusEl = this.querySelector('.email-capture-status') || 
                            this.parentElement.querySelector('.email-capture-status');
            const emailInput = this.querySelector('.email-capture-input');
            const submitButton = this.querySelector('button[type="submit"]');

            if (submitButton) {
                submitButton.disabled = true;
            }
            this.classList.add('is-submitting');

            if (statusEl) {
                statusEl.textContent = 'Joining the beam...';
                statusEl.className = 'email-capture-status';
            }

            try {
                const formData = new FormData(this);
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    if (statusEl) {
                        statusEl.textContent = "? You're in! Welcome to the beam.";
                        statusEl.classList.add('success');
                    }
                    if (emailInput) emailInput.value = '';
                } else {
                    throw new Error('Submission failed');
                }
            } catch (error) {
                if (statusEl) {
                    statusEl.textContent = '? Something went wrong. Please try again.';
                    statusEl.classList.add('error');
                }
            } finally {
                this.classList.remove('is-submitting');
                if (submitButton) {
                    submitButton.disabled = false;
                }
            }
        });
    });

    // ============================================
    // #2 - STICKY AUDIO PLAYER
    // ============================================
    const audioPlayer = document.querySelector('.audio-player');
    const playBtn = document.querySelector('.audio-player .play-btn');
    const closeBtn = document.querySelector('.audio-player-close');
    let isPlaying = false;

    // Show audio player when a play trigger is clicked
    const playTriggers = document.querySelectorAll('[data-audio-trigger]');
    playTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            if (audioPlayer) {
                audioPlayer.classList.add('visible');
                document.body.classList.add('has-audio-player');
            }
        });
    });

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            isPlaying = !isPlaying;
            playBtn.innerHTML = isPlaying ? '⏸' : '▶';
            // Add actual audio playback logic here when you have audio files
        });
    }

    if (closeBtn && audioPlayer) {
        closeBtn.addEventListener('click', () => {
            audioPlayer.classList.remove('visible');
            document.body.classList.remove('has-audio-player');
            isPlaying = false;
            if (playBtn) playBtn.innerHTML = '▶';
        });
    }

    // ============================================
    // #1 - SCROLL ANIMATIONS
    // ============================================
    const animatedElements = document.querySelectorAll('[data-animate]');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => {
        animationObserver.observe(el);
    });

    // ============================================
    // #6 - COUNTDOWN TIMER
    // ============================================
    const countdownEl = document.querySelector('.countdown');
    if (countdownEl) {
        // Set your release date here
        const releaseDate = new Date('2026-03-01T00:00:00').getTime();
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = releaseDate - now;
            
            if (distance < 0) {
                countdownEl.innerHTML = '<p class="gradient-text" style="font-size: 1.5rem; font-weight: 700;">🎉 It\'s Here!</p>';
                return;
            }
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const daysEl = countdownEl.querySelector('[data-countdown="days"]');
            const hoursEl = countdownEl.querySelector('[data-countdown="hours"]');
            const minutesEl = countdownEl.querySelector('[data-countdown="minutes"]');
            const secondsEl = countdownEl.querySelector('[data-countdown="seconds"]');
            
            if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
            if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
            if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
            if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    // ============================================
    // CONTACT FORM HANDLER
    // ============================================
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (form && formStatus) {
        form.addEventListener('submit', async function (e) {
            e.preventDefault();
            const submitButton = form.querySelector('button[type="submit"]');
            form.classList.add('is-submitting');
            if (submitButton) {
                submitButton.disabled = true;
            }
            formStatus.textContent = 'Sending message...';
            formStatus.className = 'form-status form-status--info';
            const formData = new FormData(form);
            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });
                if (response.ok) {
                    formStatus.textContent = "✓ Message sent successfully! I'll get back to you soon.";
                    formStatus.className = 'form-status form-status--success';
                    form.reset();
                } else {
                    let errMsg = '? Oops! Something went wrong. Please try again.';
                    try {
                        const data = await response.json();
                        if (data && data.error) errMsg = data.error;
                    } catch (_) { }
                    formStatus.textContent = errMsg;
                    formStatus.className = 'form-status form-status--error';
                }
            } catch (error) {
                formStatus.textContent = '? Network error. Please check your connection and try again.';
                formStatus.className = 'form-status form-status--error';
            } finally {
                form.classList.remove('is-submitting');
                if (submitButton) {
                    submitButton.disabled = false;
                }
            }
        });
    }

    // ============================================
    // BRAND GALLERY
    // ============================================
    function getAverageColorFromImage(img) {
        return new Promise((resolve, reject) => {
            try {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                const width = 40;
                const height = 40;
                canvas.width = width;
                canvas.height = height;
                context.drawImage(img, 0, 0, width, height);
                const data = context.getImageData(0, 0, width, height).data;
                let r = 0, g = 0, b = 0, count = 0;
                for (let i = 0; i < data.length; i += 16) {
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                    count++;
                }
                r = Math.round(r / count);
                g = Math.round(g / count);
                b = Math.round(b / count);
                resolve(hexFromRgb(r, g, b));
            } catch (err) {
                reject(err);
            }
        });
    }

    function initBrandGallery() {
        const items = document.querySelectorAll('.gallery-item');
        if (!items || items.length === 0) return;
        items.forEach(btn => {
            const img = btn.querySelector('img');
            const doInit = () => {
                btn.addEventListener('click', async () => {
                    items.forEach(b => b.classList.remove('selected'));
                    btn.classList.add('selected');
                    try {
                        const hex = await getAverageColorFromImage(img);
                        applyBrandColors(hex);
                    } catch (e) {
                        console.warn('Could not extract color', e);
                    }
                });
                btn.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        btn.click();
                    }
                });
            };
            if (img.complete && img.naturalWidth !== 0) doInit();
            else img.addEventListener('load', doInit);
        });
    }

    initBrandGallery();

    // ============================================
    // ROTATING TEASERS
    // ============================================
    const musicTeasers = [
      "Cooking something that'll melt your speakers… almost ready",
      "New drop loading… 99% (the last 1% is pure vibe check)",
      "I'm in the studio, headphones on, world off. See you soon",
      "Next track is currently doing backflips in my DAW",
      "Warning: upcoming music may cause uncontrollable head-nodding",
      "Fresh beats marinating… patience, fam",
      "Plot twist: the silence is part of the build-up",
      "Hold tight, I'm currently overclocking the future",
    ];

    const videoTeasers = [
      "Camera's charged, neon's glowing, chaos incoming",
      "Visuals so fire my editor needs sunglasses",
      "Currently turning caffeine into cinematic madness",
      "Next video is 4K, 60 fps, and 100% unhinged",
      "Rendering… please enjoy this intermission of nothingness",
      "Secret visuals dropping faster than your jaw will",
    ];

    const shopTeasers = [
      "Merch cooker currently on 400°F… almost crispy",
      "New drop loading… your wallet just felt that",
      "Designing limited heat that'll break the internet (and banks)",
      "Fresh threads & goodies incoming. Start saving those coins",
      "The cart button is getting lonely… soon it'll have friends",
      "Limited edition everything. Blink and you'll cry in the group chat",
    ];

    const universalTeasers = [
      "Good things come to those who wait… great things come to those who stay subscribed",
      "I'm not late, I'm just on artist time",
      "Currently turning vibes into actual products. Science is wild.",
      "If you're reading this, you're early. Tell your friends you were here first",
      "The void is temporary. The sauce is eternal.",
      "Something illegal (to how good it is) is being cooked",
    ];

    const teaser = document.getElementById("jazer-teaser");
    if (teaser) {
      let pool = universalTeasers;

      if (document.body.classList.contains("music-page") || window.location.pathname.includes("music")) {
        pool = [...musicTeasers, ...universalTeasers];
      } else if (document.body.classList.contains("videos-page") || window.location.pathname.includes("video")) {
        pool = [...videoTeasers, ...universalTeasers];
      } else if (document.body.classList.contains("shop-page") || window.location.pathname.includes("shop")) {
        pool = [...shopTeasers, ...universalTeasers];
      }

      let current = -1;
      const rotate = () => {
        let next;
        do { next = Math.floor(Math.random() * pool.length); }
        while (next === current && pool.length > 1);
        current = next;
        teaser.style.opacity = "0";
        setTimeout(() => {
          teaser.textContent = pool[current];
          teaser.style.opacity = "1";
        }, 300);
        setTimeout(rotate, Math.floor(Math.random() * 3000) + 4500);
      };


      rotate();
    }

    // ============================================
    // FLOATING MUSICAL NOTES
    // ============================================
    function initFloatingNotes() {
        const container = document.createElement('div');
        container.classList.add('musical-notes-container');
        document.body.appendChild(container);

        const notes = ['♪', '♫', '♩', '♬', '♭', '♮', '♯'];
        
        // Ensure access to brand colors or define a fallback palette
        const noteColors = typeof jazerBrandColors !== 'undefined' ? jazerBrandColors : [
            '#00f2ea', '#ff006e', '#9333ea', '#ff00ff', '#ff8800', '#ffbe0b', '#22c55e'
        ];
        
        function createNote() {
            const noteChar = notes[Math.floor(Math.random() * notes.length)];
            const note = document.createElement('div');
            note.classList.add('musical-note');
            note.textContent = noteChar;
            
            // Randomize properties with smaller sizes
            const left = Math.random() * 100; // 0 to 100%
            const top = Math.random() * 100; // 0 to 100% for varied starting positions
            const size = Math.random() * 1.2 + 0.4; // 0.4rem to 1.6rem (more variation)
            
            // Much slower duration: 40s to 80s for very gentle, ambient movement
            const duration = Math.random() * 40 + 40; 
            
            // Random Color
            const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];
            note.style.color = randomColor;
            note.style.textShadow = `0 0 3px ${randomColor}`;

            // Random directional animation
            const animations = [
                'floatUp',
                'floatDown',
                'floatLeft',
                'floatRight',
                'floatDiagonalUpRight',
                'floatDiagonalUpLeft',
                'floatDiagonalDownRight',
                'floatDiagonalDownLeft'
            ];
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            
            note.style.left = `${left}%`;
            note.style.top = `${top}%`;
            note.style.fontSize = `${size}rem`;
            note.style.animationName = randomAnimation;
            note.style.animationDuration = `${duration}s`;
            note.style.animationTimingFunction = 'linear'; // Smooth, constant speed
            
            container.appendChild(note);
            
            // Remove after animation finishes
            setTimeout(() => {
                note.remove();
            }, duration * 1000);
        }

        // Create initial batch
        for(let i=0; i<15; i++) {
           setTimeout(createNote, i * 300);
        }

        // Continue creating notes
        setInterval(createNote, 1500);
    }

    initFloatingNotes();

    // ============================================
    // FOOTER ENHANCEMENTS
    // ============================================

    // Easter Egg: 5 clicks on logo triggers a cool animation
    const easterEggLogo = document.getElementById('footerEasterEgg');
    let easterEggClicks = 0;
    if (easterEggLogo) {
        easterEggLogo.addEventListener('click', (e) => {
            easterEggClicks++;
            if (easterEggClicks >= 5) {
                e.preventDefault();
                const logo = easterEggLogo.querySelector('img');
                if (logo) {
                    logo.style.animation = 'none';
                    logo.offsetHeight; // Trigger reflow
                    logo.style.animation = 'easterEggSpin 1s ease-out forwards';
                    
                    // Add a fun CSS class for rainbow effect
                    logo.style.filter = 'hue-rotate(0deg)';
                    let hue = 0;
                    const rainbowInterval = setInterval(() => {
                        hue += 20;
                        logo.style.filter = `hue-rotate(${hue}deg) drop-shadow(0 0 30px rgba(255,255,255,0.8))`;
                        if (hue >= 360) {
                            clearInterval(rainbowInterval);
                            logo.style.filter = '';
                            logo.style.animation = 'subtleGlitch 5s ease-in-out infinite';
                        }
                    }, 50);
                }
                easterEggClicks = 0;
            }
            // Reset after 2 seconds of inactivity
            setTimeout(() => { easterEggClicks = 0; }, 2000);
        });
    }

    // Rotating Quote
    const quoteEl = document.querySelector('.footer-quote');
    if (quoteEl) {
        const quotes = JSON.parse(quoteEl.dataset.quotes || '[]');
        if (quotes.length > 1) {
            let currentIndex = 0;
            setInterval(() => {
                quoteEl.style.opacity = '0';
                setTimeout(() => {
                    currentIndex = (currentIndex + 1) % quotes.length;
                    quoteEl.textContent = `"${quotes[currentIndex]}"`;
                    quoteEl.style.opacity = '1';
                }, 500);
            }, 6000);
        }
    }

    // Parallax Watermark
    const parallaxWatermark = document.querySelector('[data-parallax-watermark] img');
    if (parallaxWatermark) {
        window.addEventListener('scroll', () => {
            const footer = document.querySelector('.footer-premium');
            if (footer) {
                const rect = footer.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const scrollProgress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
                    const offset = (scrollProgress - 0.5) * 30;
                    parallaxWatermark.style.transform = `translate(-50%, calc(-50% + ${offset}px)) rotate(${scrollProgress * 5}deg)`;
                }
            }
        });
    }
});

// Easter Egg Spin Animation (injected dynamically)
const easterEggStyle = document.createElement('style');
easterEggStyle.textContent = `
@keyframes easterEggSpin {
    0% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.3) rotate(180deg); }
    100% { transform: scale(1) rotate(360deg); }
}
`;
document.head.appendChild(easterEggStyle);
