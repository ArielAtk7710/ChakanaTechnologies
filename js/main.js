// Tailwind configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                brandBlue: '#0F4C81',
                brandGreen: '#10B981',
                graphite: '#1E293B',
                canvasLight: '#F8FAFC'
            },
            fontFamily: {
                sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
            }
        }
    }
};

// DOM Interactivity & Event Handlers
document.addEventListener('DOMContentLoaded', () => {
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

    // Contact Form Submission Handler
    const contactForm = document.getElementById('contact-form');
    const successModal = document.getElementById('success-modal');
    const closeModal = document.getElementById('close-modal');

    if (contactForm && successModal && closeModal) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simulate sending process
            successModal.classList.remove('hidden');
            contactForm.reset();
        });

        closeModal.addEventListener('click', () => {
            successModal.classList.add('hidden');
        });
    }
});

