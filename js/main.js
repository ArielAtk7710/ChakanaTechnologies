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
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
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
