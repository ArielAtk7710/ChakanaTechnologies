// Tailwind configuration
tailwind.config = {
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                brandBlue: '#0F4C81',
                brandGreen: '#10B981',
                graphite: '#1E293B',
                canvasLight: '#F8FAFC',
                darkBg: '#0B1120',
                darkCard: '#111827',
                darkBorder: '#1F2937'
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
            }
        }
    }
};

// Apply theme before render to avoid flash
(function() {
    const savedTheme = localStorage.getItem('theme');
    // Default: dark mode unless user explicitly chose light
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }
})();

// DOM Interactivity & Event Handlers
document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Functionality
    const themeToggleBtn = document.getElementById('theme-toggle');
    const mobileThemeToggleBtn = document.getElementById('theme-toggle-mobile');
    const themeIcon = document.getElementById('theme-icon');
    const mobileThemeIcon = document.getElementById('theme-icon-mobile');

    function updateThemeIcons(isDark) {
        const iconClass = isDark ? 'fa-solid fa-sun text-amber-400' : 'fa-solid fa-moon text-slate-600';
        if (themeIcon) {
            themeIcon.className = iconClass;
        }
        if (mobileThemeIcon) {
            mobileThemeIcon.className = iconClass;
        }
    }

    function toggleTheme() {
        const isDark = document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeIcons(isDark);
    }

    // Set initial icon state
    updateThemeIcons(document.documentElement.classList.contains('dark'));

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }

    // Contact Form Submission & Phone Validation Handler
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.getElementById('close-modal');
    const phoneInput = document.getElementById('phone');
    const countryCodeSelect = document.getElementById('country-code');
    const phoneMsg = document.getElementById('phone-validation-msg');

    // Filter non-digit characters in real-time
    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            phoneInput.value = phoneInput.value.replace(/\D/g, '');
            if (phoneMsg) phoneMsg.classList.add('hidden');
        });
    }

    function validatePhone() {
        if (!phoneInput || !countryCodeSelect) return true;
        const code = countryCodeSelect.value;
        const phone = phoneInput.value.trim();

        // Specific rules per country or general fallback
        let isValid = true;
        let hint = 'Ingresa un número de celular válido.';

        if (code === '+591') {
            // Bolivia: 8 digits, typically starts with 6 or 7
            isValid = /^[67]\d{7}$/.test(phone);
            hint = 'Para Bolivia 🇧🇴 el celular debe tener 8 dígitos (iniciando en 6 o 7).';
        } else if (code === '+54') {
            // Argentina: 10 digits
            isValid = /^\d{10}$/.test(phone);
            hint = 'Para Argentina 🇦🇷 debe tener 10 dígitos (código de área + número).';
        } else if (code === '+56') {
            // Chile: 9 digits
            isValid = /^[9]\d{8}$/.test(phone);
            hint = 'Para Chile 🇨🇱 debe tener 9 dígitos.';
        } else if (code === '+51') {
            // Peru: 9 digits
            isValid = /^[9]\d{8}$/.test(phone);
            hint = 'Para Perú 🇵🇪 debe tener 9 dígitos (iniciando en 9).';
        } else {
            // Standard length fallback (7 to 12 digits)
            isValid = /^\d{7,12}$/.test(phone);
            hint = 'El número debe contener entre 7 y 12 dígitos.';
        }

        if (!isValid && phoneMsg) {
            phoneMsg.textContent = hint;
            phoneMsg.classList.remove('hidden');
            phoneInput.focus();
        } else if (phoneMsg) {
            phoneMsg.classList.add('hidden');
        }

        return isValid;
    }

    if (countryCodeSelect && phoneInput) {
        countryCodeSelect.addEventListener('change', () => {
            if (phoneInput.value) validatePhone();
        });
    }

    if (contactForm && successModal && closeModal) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Validate phone before continuing
            if (!validatePhone()) {
                return;
            }

            // Simulate sending process
            successModal.classList.remove('hidden');
            contactForm.reset();
        });

        closeModal.addEventListener('click', () => {
            successModal.classList.add('hidden');
        });
    }
});

// ─── FactorEscalaTop Image Carousel ────────────────────────────────────────
let fetIndex = 0;
const FET_TOTAL = 12;

function fetSlide(dir) {
    fetIndex = (fetIndex + dir + FET_TOTAL) % FET_TOTAL;
    const slider = document.getElementById('fet-slider');
    if (slider) slider.style.transform = `translateX(-${fetIndex * 100}%)`;
}

document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => fetSlide(1), 3000);
});

// ─── Image Modal ────────────────────────────────────────────────────────────
const MODAL_IMAGES = {
    fet:   ['productos/FactorEscalaTop/f01.jpeg',
            'productos/FactorEscalaTop/f02.jpeg','productos/FactorEscalaTop/f03.jpeg',
            'productos/FactorEscalaTop/f04.jpeg','productos/FactorEscalaTop/f05.jpeg',
            'productos/FactorEscalaTop/f06.jpg', 'productos/FactorEscalaTop/f07.jpg',
            'productos/FactorEscalaTop/f08.jpg', 'productos/FactorEscalaTop/f09.jpeg',
            'productos/FactorEscalaTop/f10.jpeg','productos/FactorEscalaTop/f11.jpeg',
            'productos/FactorEscalaTop/f12.jpeg'],
    kali:  ['productos/KaliStore/k01.jpeg'],
    synap: ['productos/SynapSys.edu/S01.png']
};

let modalIdx = 0;
let modalImgs = [];

function openImgModal(key, title) {
    modalImgs = MODAL_IMAGES[key] || [];
    modalIdx = key === 'fet' ? fetIndex : 0; // sync with current carousel slide
    const modal = document.getElementById('img-modal');
    const slider = document.getElementById('modal-slider');
    const dots = document.getElementById('modal-dots');
    const titleEl = document.getElementById('modal-title');

    // Build slides
    slider.innerHTML = modalImgs.map(src =>
        `<img src="${src}" class="min-w-full max-h-[80vh] object-contain" alt="Producto">`
    ).join('');

    // Build dots
    dots.innerHTML = modalImgs.map((_, i) =>
        `<button onclick="goModalSlide(${i})" class="modal-dot w-2 h-2 rounded-full bg-white/30 hover:bg-white transition-colors"></button>`
    ).join('');

    titleEl.textContent = `${title}  —  ${modalIdx + 1} / ${modalImgs.length}`;
    updateModalSlider();

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
}

function closeImgModal() {
    const modal = document.getElementById('img-modal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
}

function updateModalSlider() {
    const slider = document.getElementById('modal-slider');
    const dots = document.querySelectorAll('.modal-dot');
    const titleEl = document.getElementById('modal-title');
    if (slider) slider.style.transform = `translateX(-${modalIdx * 100}%)`;
    dots.forEach((d, i) => {
        d.classList.toggle('bg-white', i === modalIdx);
        d.classList.toggle('bg-white/30', i !== modalIdx);
    });
    if (titleEl) {
        const base = titleEl.textContent.split('—')[0].trim();
        titleEl.textContent = `${base}  —  ${modalIdx + 1} / ${modalImgs.length}`;
    }
}

function modalSlide(dir) {
    modalIdx = (modalIdx + dir + modalImgs.length) % modalImgs.length;
    updateModalSlider();
}

function goModalSlide(i) {
    modalIdx = i;
    updateModalSlider();
}

// Close on backdrop click or Escape key
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('img-modal').addEventListener('click', function(e) {
        if (e.target === this) closeImgModal();
    });
    document.addEventListener('keydown', e => {
        const modal = document.getElementById('img-modal');
        if (modal.classList.contains('hidden')) return;
        if (e.key === 'Escape') closeImgModal();
        if (e.key === 'ArrowRight') modalSlide(1);
        if (e.key === 'ArrowLeft') modalSlide(-1);
    });
});

// ─── Visit Counter ─────────────────────────────────────────────────────────
(function () {
    const KEY_COUNT = 'cht_visit_count';
    const KEY_LAST  = 'cht_visit_last';

    // Initialise: random start between 1200–1400 if first visit
    let count = parseInt(localStorage.getItem(KEY_COUNT), 10);
    if (isNaN(count)) {
        count = Math.floor(Math.random() * 201) + 1200; // 1200–1400
    }

    // Count current session visit
    if (!sessionStorage.getItem('cht_visited')) {
        count += 1;
        sessionStorage.setItem('cht_visited', '1');
    }

    localStorage.setItem(KEY_COUNT, count);

    // Animated count-up to current value on load
    function animateCount(el, target) {
        const start = Math.max(0, target - 30);
        let current = start;
        const step = Math.ceil((target - start) / 40);
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            el.textContent = current.toLocaleString('es-BO');
            if (current >= target) clearInterval(timer);
        }, 30);
    }

    // Auto-increment every 5–10 minutes (random interval)
    function scheduleIncrement(el) {
        const minMs = 5  * 60 * 1000;  // 5 min
        const maxMs = 10 * 60 * 1000;  // 10 min
        const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;

        setTimeout(() => {
            count += 1;
            localStorage.setItem(KEY_COUNT, count);
            // Smooth count-up by 1
            let prev = count - 1;
            const el2 = document.getElementById('visit-counter');
            if (!el2) return;
            const roll = setInterval(() => {
                prev++;
                el2.textContent = prev.toLocaleString('es-BO');
                if (prev >= count) clearInterval(roll);
            }, 80);
            scheduleIncrement(el2); // schedule next
        }, delay);
    }

    // Wait for DOM then render
    document.addEventListener('DOMContentLoaded', () => {
        const elFooter = document.getElementById('visit-counter');
        const elMain   = document.getElementById('visit-counter-main');

        if (elFooter) animateCount(elFooter, count);
        if (elMain)   animateCount(elMain,   count);

        // Auto-increment: update both counters
        function scheduleIncrementAll() {
            const minMs = 5  * 60 * 1000;
            const maxMs = 10 * 60 * 1000;
            const delay = Math.floor(Math.random() * (maxMs - minMs + 1)) + minMs;
            setTimeout(() => {
                count += 1;
                localStorage.setItem(KEY_COUNT, count);
                [document.getElementById('visit-counter'),
                 document.getElementById('visit-counter-main')].forEach(el => {
                    if (!el) return;
                    let prev = count - 1;
                    const roll = setInterval(() => {
                        prev++;
                        el.textContent = prev.toLocaleString('es-BO');
                        if (prev >= count) clearInterval(roll);
                    }, 80);
                });
                scheduleIncrementAll();
            }, delay);
        }
        scheduleIncrementAll();
    });
})();
