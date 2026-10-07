/**
 * particles-config.js
 * Configura particles.js en el hero y adapta colores a modo claro/oscuro.
 */

function getParticlesConfig(isDark) {
    return {
        "particles": {
            "number": {
                "value": 160,
                "density": { "enable": true, "value_area": 800 }
            },
            "color": {
                "value": isDark ? "#38bdf8" : "#0F4C81"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": isDark ? 0.35 : 0.18,
                "random": true,
                "anim": { "enable": true, "speed": 0.6, "opacity_min": 0.05, "sync": false }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": { "enable": false }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": isDark ? "#38bdf8" : "#0F4C81",
                "opacity": isDark ? 0.18 : 0.08,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1.4,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": { "enable": false }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": { "enable": true, "mode": "grab" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            },
            "modes": {
                "grab": { "distance": 160, "line_linked": { "opacity": 0.5 } },
                "push": { "particles_nb": 3 }
            }
        },
        "retina_detect": true
    };
}

function initParticles() {
    const isDark = document.documentElement.classList.contains('dark');
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', getParticlesConfig(isDark));
    }
}

// Init on load
document.addEventListener('DOMContentLoaded', () => {
    initParticles();

    // Re-init when theme changes so colors update accordingly
    const themeBtn = document.getElementById('theme-toggle');
    const themeBtnMobile = document.getElementById('theme-toggle-mobile');

    function onThemeChange() {
        // Small delay to let the class toggle apply first
        setTimeout(() => {
            if (window.pJSDom && window.pJSDom.length > 0) {
                window.pJSDom[0].pJS.fn.vendors.destroypJS();
                window.pJSDom = [];
            }
            initParticles();
        }, 50);
    }

    if (themeBtn) themeBtn.addEventListener('click', onThemeChange);
    if (themeBtnMobile) themeBtnMobile.addEventListener('click', onThemeChange);
});

