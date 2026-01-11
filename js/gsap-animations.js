/**
 * GSAP Animations for JaZeR Musician Website
 * Enhances the site with "Enterprise-Grade" motion and interactivity.
 */

document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    initHeroAnimations();
    initScrollAnimations();
    initMagneticButtons();
    initParallax();
    initHeroScrollFade();
});

/**
 * 1. Hero Section Entrance
 * Staggers the logo, typewriter text, and buttons for a theatrical reveal.
 */
function initHeroAnimations() {
    const heroTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Ensure initial state is hidden (prevent FOUC)
    gsap.set(".hero-logo, .typewriter, .cta-group, .scroll-indicator", { opacity: 0, y: 30 });

    heroTimeline
        .to(".hero-logo", { 
            duration: 1.2, 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            ease: "back.out(1.7)" 
        }, "+=0.5") // Wait for preloader
        .to(".typewriter", { 
            duration: 0.8, 
            opacity: 1, 
            y: 0, 
            stagger: 0.1 
        }, "-=0.4")
        .to(".cta-group a", { 
            duration: 0.8, 
            opacity: 1, 
            y: 0, 
            stagger: 0.2 
        }, "-=0.2")
        .to(".scroll-indicator", { 
            duration: 1, 
            opacity: 1, 
            y: 0 
        }, "-=0.4");
}

/**
 * 2. Scroll Animations (ScrollTrigger)
 * Fades elements in as they enter the viewport.
 */
function initScrollAnimations() {
    // General Fade Up for Sections
    const fadeElements = document.querySelectorAll('.section-title, .stats-grid, .email-capture, article.card');

    fadeElements.forEach(el => {
        gsap.fromTo(el, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%", // Trigger when top of element hits 85% of viewport height
                    toggleActions: "play none none reverse"
                }
            }
        );
    });

    // Stats Counter Animation
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        // Extract number (e.g., "10K+" -> 10)
        const rawText = stat.innerText;
        const number = parseFloat(rawText.replace(/[^0-9.]/g, ''));
        const suffix = rawText.replace(/[0-9.]/g, ''); // K+, +, etc.

        if (!isNaN(number)) {
            ScrollTrigger.create({
                trigger: stat,
                start: "top 80%",
                once: true,
                onEnter: () => {
                   gsap.fromTo(stat, 
                       { innerText: 0 }, 
                       { 
                           innerText: number, 
                           duration: 2, 
                           snap: { innerText: 0.1 }, 
                           onUpdate: function() {
                               stat.innerText = Math.ceil(this.targets()[0].innerText) + suffix;
                           }
                       }
                   );
                }
            });
        }
    });
}


/**
 * 3. Magnetic Buttons
 * Buttons that stick to the cursor slightly when hovered.
 */
function initMagneticButtons() {
    const buttons = document.querySelectorAll('.cta-button, .cta-secondary, .theme-toggle, .nav-cta, .email-capture-btn, .announcement-bar a');

    buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(btn, {
                duration: 0.3,
                x: x * 0.3, // Strength of magnet
                y: y * 0.3,
                ease: "power2.out"
            });
        });

        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                duration: 0.5,
                x: 0,
                y: 0,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });
}

/**
 * 4. Mouse Parallax (Background Depth)
 * Moves background blobs/particles slightly based on mouse position.
 */
function initParallax() {
    document.addEventListener("mousemove", (e) => {
        const x = (window.innerWidth - e.pageX * 2) / 100;
        const y = (window.innerHeight - e.pageY * 2) / 100;

        // Move background blobs if they exist
        gsap.to(".hero-particles", {
            x: x * 2,
            y: y * 2,
            duration: 1,
            ease: "power2.out"
        });
    });
}

/**
 * 5. Hero Scroll Fade ("Parallax Blur")
 * Blurs and fades the hero elements as user scrolls down.
 */
function initHeroScrollFade() {
    gsap.to(".hero-logo, .tagline-roles", {
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom 50%",
            scrub: true
        },
        opacity: 0,
        filter: "blur(10px)",
        y: -50,
        ease: "none"
    });
}
