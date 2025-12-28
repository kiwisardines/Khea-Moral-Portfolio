// Main JavaScript for interactions and UX enhancements

// Smooth active link highlighting and navbar behavior
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');
const navbarToggle = document.querySelector('.navbar__toggle');
const navbarLinks = document.querySelector('.navbar__links');

// Toggle mobile navigation
if (navbarToggle && navbarLinks) {
    navbarToggle.addEventListener('click', () => {
        navbarLinks.classList.toggle('navbar__links--open');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navbarLinks.classList.remove('navbar__links--open');
        });
    });
}

// Highlight active navigation link based on scroll position
const setActiveNavLink = () => {
    let currentId = '';

    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const offsetTop = window.scrollY + rect.top;
        const height = section.offsetHeight;

        if (window.scrollY >= offsetTop - 160 && window.scrollY < offsetTop + height - 160) {
            currentId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
};

window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);

// Scroll reveal animations using Intersection Observer
const animatedElements = document.querySelectorAll('.fade-in-up, .slide-in-left, .slide-in-right, .slide-in-up');

if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = el.dataset.delay || '0';
                    el.style.transitionDelay = `${delay}s`;
                    el.classList.add('is-visible');
                    observer.unobserve(el);
                }
            });
        },
        {
            threshold: 0.18,
        }
    );

    animatedElements.forEach(el => observer.observe(el));
} else {
    // Fallback for older browsers: make everything visible
    animatedElements.forEach(el => el.classList.add('is-visible'));
}

// Contact form simple validation and message (front-end only)
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('form-success');

if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nameInput = contactForm.querySelector('#name');
        const emailInput = contactForm.querySelector('#email');
        const messageInput = contactForm.querySelector('#message');

        const fields = [nameInput, emailInput, messageInput];
        let isValid = true;

        fields.forEach(field => {
            const errorEl = field.parentElement.querySelector('.form-error');
            if (!field.value.trim()) {
                errorEl.textContent = 'This field is required.';
                isValid = false;
            } else if (field === emailInput && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim())) {
                errorEl.textContent = 'Please enter a valid email address.';
                isValid = false;
            } else {
                errorEl.textContent = '';
            }
        });

        if (!isValid) {
            successMessage.textContent = '';
            return;
        }

        contactForm.reset();
        successMessage.textContent = 'Thank you for reaching out! Your message has been received.';
    });
}

// Set dynamic year in footer
const yearSpan = document.getElementById('year');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
