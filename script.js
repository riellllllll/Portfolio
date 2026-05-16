(function() {
    'use strict';

    // ========== DOM Elements ==========
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const themeToggle = document.getElementById('themeToggle');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    const navLinks = document.querySelectorAll('.nav-link');

    // ========== State ==========
    let lastScrollY = window.scrollY;
    let isMenuOpen = false;

    // ========== Mobile Menu Toggle ==========
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('active', isMenuOpen);
        
        // Update hamburger icon
        const svg = menuToggle.querySelector('svg');
        if (isMenuOpen) {
            svg.innerHTML = `
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            `;
        } else {
            svg.innerHTML = `
                <line x1="4" x2="20" y1="12" y2="12"></line>
                <line x1="4" x2="20" y1="6" y2="6"></line>
                <line x1="4" x2="20" y1="18" y2="18"></line>
            `;
        }
    }

    menuToggle.addEventListener('click', toggleMenu);

    // Close mobile menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (isMenuOpen) toggleMenu();
        });
    });

    // ========== Scroll Behavior ==========
    function handleScroll() {
        const currentScrollY = window.scrollY;

        // Add/remove scrolled class for shadow
        navbar.classList.toggle('scrolled', currentScrollY > 10);

        // Hide/show navbar on scroll direction
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            navbar.classList.add('hidden');
        } else {
            navbar.classList.remove('hidden');
        }

        lastScrollY = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ========== Active Link Highlighting ==========
    function updateActiveLink() {
        const sections = document.querySelectorAll('.section');
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ========== Scroll Animation Observer ==========
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Initialize scroll animations
    function initScrollAnimations() {
        const animElements =document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale, .scroll-animate-item').forEach((el, index) => {
    el.classList.add('animate');
    void el.offsetHeight;
    scrollObserver.observe(el);
});
    }

    // Run after a small delay to ensure DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }

    // ========== Theme Toggle ==========
    let isDark = true;

    function toggleTheme() {
        isDark = !isDark;
        const root = document.documentElement;

        if (isDark) {
            root.style.setProperty('--bg-primary', '#0a0a0a');
            root.style.setProperty('--bg-secondary', '#B91C1C');
            root.style.setProperty('--bg-nav', 'rgba(0, 0, 0, 0.8)');
            root.style.setProperty('--text-primary', '#ffffff');
            root.style.setProperty('--text-secondary', '#d1d5db');
            root.style.setProperty('--text-muted', '#9ca3af');
            root.style.setProperty('--border', 'rgba(255, 255, 255, 0.1)');
            root.style.setProperty('--bg-toggle', 'rgba(255, 255, 255, 0.1)');
            root.style.setProperty('--bg-toggle-hover', 'rgba(255, 255, 255, 0.2)');
            root.style.setProperty('--bg-card', '#161616');
        } else {
            root.style.setProperty('--bg-primary', '#f9fafb');
            root.style.setProperty('--bg-secondary', '#B91C1C');
            root.style.setProperty('--bg-nav', 'rgba(255, 255, 255, 0.9)');
            root.style.setProperty('--text-primary', '#111827');
            root.style.setProperty('--text-secondary', '#4b5563');
            root.style.setProperty('--text-muted', '#6b7280');
            root.style.setProperty('--border', 'rgba(0, 0, 0, 0.1)');
            root.style.setProperty('--bg-toggle', 'rgba(0, 0, 0, 0.05)');
            root.style.setProperty('--bg-toggle-hover', 'rgba(0, 0, 0, 0.1)');
            root.style.setProperty('--bg-card', '#f3f4f6');
        }

        // Update sun icon to moon and vice versa
        const sunIcon = `
            <circle cx="12" cy="12" r="4"></circle>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
        `;

        const moonIcon = `
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
        `;

        const icon = isDark ? sunIcon : moonIcon;

        [themeToggle, themeToggleMobile].forEach(btn => {
            if (btn) btn.querySelector('svg').innerHTML = icon;
        });

        // Fix contact section text color in light mode
        const contactSection = document.getElementById('contact');
        if (contactSection) {
            if (isDark) {
                contactSection.style.color = '';
            } else {
                contactSection.style.color = '#ffffff';
            }
        }
    }


    
    themeToggle.addEventListener('click', toggleTheme);
    themeToggleMobile.addEventListener('click', toggleTheme);

    // ========== Click Outside to Close Menu ==========
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !navbar.contains(e.target)) {
            toggleMenu();
        }
    });

// ========== Radar Sweep Detection ==========
(function initRadarDetection() {
    const sweep = document.querySelector('.radar-sweep');
    const nodes = document.querySelectorAll('.radar-node');
    if (!sweep || nodes.length === 0) return;

    const SWEEP_DURATION = 4000;
    const DETECT_WINDOW = 30;

    // CALIBRATION: Measure the actual offset between CSS and JS time
    // We wait 500ms for animation to definitely be running, then sync
    let startTime = null;
    let isCalibrated = false;

    function calibrate() {
        const anim = sweep.getAnimations()[0];
        if (anim && anim.currentTime > 0) {
            // Animation is running. currentTime = how long it's been running
            // So startTime = now - currentTime
            startTime = performance.now() - anim.currentTime;
            isCalibrated = true;
            console.log('Calibrated! Offset:', anim.currentTime, 'ms');
        } else {
            // Retry until animation starts
            setTimeout(calibrate, 100);
        }
    }

    // Start calibration
    setTimeout(calibrate, 500);

    function getSweepAngle() {
        if (!isCalibrated) return -1; // Don't detect until calibrated
        const elapsed = (performance.now() - startTime) % SWEEP_DURATION;
        return (elapsed / SWEEP_DURATION) * 360;
    }

    function checkDetections() {
        const sweepAngle = getSweepAngle();
        
        // Skip if not calibrated yet
        if (sweepAngle < 0) {
            requestAnimationFrame(checkDetections);
            return;
        }

        // DEBUG: Log angle to verify
        // console.log('Angle:', Math.round(sweepAngle));

        nodes.forEach(node => {
            const targetAngle = parseFloat(node.dataset.angle) || 0;
            let diff = Math.abs(sweepAngle - targetAngle);
            if (diff > 180) diff = 360 - diff;

            if (diff <= DETECT_WINDOW) {
                node.classList.add('active');
            } else {
                node.classList.remove('active');
            }
        });

        requestAnimationFrame(checkDetections);
    }

    // Start detection loop
    requestAnimationFrame(checkDetections);
})();

    // ========== Initialize ==========
    handleScroll();
    updateActiveLink();

    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

})();