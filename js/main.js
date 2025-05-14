// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply theme on load
document.documentElement.setAttribute('data-theme', currentTheme);
updateThemeIcon();

// Theme toggle click handler
themeToggle?.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' 
        ? 'light' 
        : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// Update theme icon based on current theme
function updateThemeIcon() {
    const icon = themeToggle?.querySelector('i');
    if (!icon) return;

    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// --- Professional Navbar Hamburger Menu ---
const navbarToggle = document.querySelector('.navbar-toggle');
const navbarLinks = document.querySelector('.navbar-links');
const navLinks = document.querySelectorAll('.nav-link');

if (navbarToggle && navbarLinks) {
    navbarToggle.addEventListener('click', () => {
        navbarLinks.classList.toggle('open');
        navbarToggle.classList.toggle('open');
    });
    navbarLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navbarLinks.classList.remove('open');
            navbarToggle.classList.remove('open');
        });
    });
}

// Active link handling
const currentPath = window.location.pathname;
navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
    }
});

// Navbar scroll effect
const mainNavbar = document.querySelector('.main-navbar');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        mainNavbar?.classList.add('scrolled');
    } else {
        mainNavbar?.classList.remove('scrolled');
    }
});

// Scroll to Top Button with error handling
const scrollTop = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    try {
        if (window.pageYOffset > 300) {
            scrollTop?.classList.add('visible');
        } else {
            scrollTop?.classList.remove('visible');
        }
    } catch (error) {
        console.error('Error handling scroll:', error);
    }
});

scrollTop?.addEventListener('click', () => {
    try {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } catch (error) {
        console.error('Error scrolling to top:', error);
    }
});

// Newsletter Form with error handling and loading state
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = newsletterForm.querySelector('button[type="submit"]');
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        try {
            // Add loading state
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            
            const email = emailInput.value;
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for subscribing!';
            newsletterForm.appendChild(successMessage);
            
            // Clear form
            newsletterForm.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        } catch (error) {
            console.error('Error submitting newsletter:', error);
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'An error occurred. Please try again.';
            newsletterForm.appendChild(errorMessage);
            
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        } finally {
            // Remove loading state
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    });
}

// Smooth Scroll for Anchor Links with error handling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        try {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        } catch (error) {
            console.error('Error handling smooth scroll:', error);
        }
    });
});

// Intersection Observer for Animations with error handling
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        try {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        } catch (error) {
            console.error('Error handling intersection observer:', error);
        }
    });
}, observerOptions);

// Observe elements with animation classes
document.querySelectorAll('.article-card, .stat-card, .footer-section').forEach(el => {
    observer.observe(el);
});

// Add loading state to buttons with error handling
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        try {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 1000);
            }
        } catch (error) {
            console.error('Error handling button click:', error);
        }
    });
});

// Handle form validation with error handling
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', function(e) {
        try {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        } catch (error) {
            console.error('Error validating form:', error);
        }
    });
});

// Add error class removal on input with error handling
document.querySelectorAll('input, textarea').forEach(field => {
    field.addEventListener('input', function() {
        try {
            this.classList.remove('error');
        } catch (error) {
            console.error('Error handling input:', error);
        }
    });
});

// Handle image loading errors with error handling
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', function() {
        try {
            this.src = 'images/placeholder.jpg';
            this.alt = 'Image not available';
        } catch (error) {
            console.error('Error handling image load:', error);
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formData = new FormData(contactForm);
        
        try {
            // Add loading state
            submitButton.disabled = true;
            submitButton.classList.add('loading');
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
            contactForm.appendChild(successMessage);
            
            // Clear form
            contactForm.reset();
            
            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        } catch (error) {
            console.error('Error submitting contact form:', error);
            // Show error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = 'An error occurred. Please try again.';
            contactForm.appendChild(errorMessage);
            
            setTimeout(() => {
                errorMessage.remove();
            }, 3000);
        } finally {
            // Remove loading state
            submitButton.disabled = false;
            submitButton.classList.remove('loading');
        }
    });
} 