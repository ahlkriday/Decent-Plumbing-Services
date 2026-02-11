// ==================== NAVIGATION MENU ====================
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Show menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Hide menu
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Hide menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
});

// ==================== ACTIVE LINK ON SCROLL ====================
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        const navLink = document.querySelector('.nav__link[href*=' + sectionId + ']');
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', scrollActive);

// ==================== SCROLL TO TOP BUTTON ====================
const scrollTopBtn = document.getElementById('scroll-top');

function scrollTop() {
    const scrollTop = window.pageYOffset;
    
    if (scrollTop > 400) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', scrollTop);

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ==================== HEADER SHADOW ON SCROLL ====================
const header = document.getElementById('header');

function scrollHeader() {
    const scrollY = window.pageYOffset;
    
    if (scrollY >= 50) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
}

window.addEventListener('scroll', scrollHeader);

// ==================== SMOOTH SCROLL FOR ANCHOR LINKS ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ==================== FORM SUBMISSION ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        
        // Show success message
        alert('Thank you for your message! We will get back to you soon.');
        
        // Reset form
        contactForm.reset();
        
        // In a real implementation, you would send this data to a server
        // Example:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     body: formData
        // })
        // .then(response => response.json())
        // .then(data => {
        //     alert('Thank you! We will contact you soon.');
        //     contactForm.reset();
        // })
        // .catch(error => {
        //     alert('Sorry, there was an error. Please call us directly.');
        // });
    });
}

// ==================== SERVICE CARDS ANIMATION ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe feature items
const featureItems = document.querySelectorAll('.feature-item');
featureItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// ==================== PHONE NUMBER CLICK TRACKING ====================
const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

phoneLinks.forEach(link => {
    link.addEventListener('click', function() {
        // Track phone click (for analytics)
        console.log('Phone number clicked:', this.getAttribute('href'));
        // In production, you might want to send this to your analytics
        // Example: gtag('event', 'phone_click', { phone_number: this.getAttribute('href') });
    });
});

// ==================== EMERGENCY BANNER ANIMATION ====================
const emergencyIcon = document.querySelector('.emergency-icon');

if (emergencyIcon) {
    // The animation is handled by CSS, but we can add additional interactivity here if needed
    setInterval(() => {
        emergencyIcon.style.transform = 'scale(1.2)';
        setTimeout(() => {
            emergencyIcon.style.transform = 'scale(1)';
        }, 500);
    }, 3000);
}

// ==================== FORM VALIDATION ====================
const formInputs = document.querySelectorAll('.form-input');

formInputs.forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value.trim() === '' && this.hasAttribute('required')) {
            this.style.borderColor = '#ef4444';
        } else {
            this.style.borderColor = 'var(--border-color)';
        }
    });
    
    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
});

// ==================== STATS COUNTER ANIMATION ====================
const stats = document.querySelectorAll('.stat-number');

function animateValue(element, start, end, duration) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = end + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const text = entry.target.textContent;
            const hasPlus = text.includes('+');
            const number = parseInt(text.replace(/\D/g, ''));
            
            entry.target.classList.add('counted');
            entry.target.textContent = '0';
            
            setTimeout(() => {
                animateValue(entry.target, 0, number, 2000);
            }, 200);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    statsObserver.observe(stat);
});

// ==================== CONSOLE MESSAGE ====================
console.log('%c Decent Plumbing Services ', 'background: #0066cc; color: white; font-size: 20px; padding: 10px;');
console.log('%c Website loaded successfully! ', 'background: #ff6b35; color: white; font-size: 14px; padding: 5px;');
console.log('Need help? Call us at 9819622496');
