// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a nav link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active navigation link based on scroll position
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling for navigation links and buttons
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('.project-card, .skill-card, .about-content, .contact-card');
    
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// Typing effect for hero title (optional enhancement)
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const originalText = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    heroTitle.style.opacity = '1';
    
    let index = 0;
    const typingSpeed = 30;
    
    function typeText() {
        if (index < originalText.length) {
            if (originalText.charAt(index) === '<') {
                // Handle HTML tags
                const tagEnd = originalText.indexOf('>', index);
                heroTitle.innerHTML += originalText.substring(index, tagEnd + 1);
                index = tagEnd + 1;
            } else {
                heroTitle.innerHTML += originalText.charAt(index);
                index++;
            }
            setTimeout(typeText, typingSpeed);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeText, 500);
}

// Add parallax effect to hero image (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage && scrolled < window.innerHeight) {
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add hover effect for project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.borderColor = '#C778DD';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.borderColor = '#ABB2BF';
    });
});

// Status dot animation
const statusDot = document.querySelector('.status-dot');
if (statusDot) {
    setInterval(() => {
        statusDot.style.opacity = statusDot.style.opacity === '0' ? '1' : '0';
    }, 1000);
}

// Projects Modal Functionality
const viewAllBtn = document.getElementById('viewAllBtn');
const projectsModal = document.getElementById('projectsModal');
const projectsModalClose = document.querySelector('.projects-modal-close');

// Open projects modal
viewAllBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openProjectsModal();
});

// Close projects modal when clicking the X button
projectsModalClose.addEventListener('click', closeProjectsModal);

// Close projects modal when clicking outside the modal content
projectsModal.addEventListener('click', (e) => {
    if (e.target === projectsModal) {
        closeProjectsModal();
    }
});

// Close projects modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectsModal.classList.contains('show')) {
        closeProjectsModal();
    }
});

function openProjectsModal() {
    projectsModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Trigger reflow to ensure display change is applied
    projectsModal.offsetHeight;
    
    // Add show class for animations
    projectsModal.classList.add('show');
    
    // Reset animations for project cards
    const projectCards = projectsModal.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.animation = 'none';
        card.offsetHeight; // Trigger reflow
        card.style.animation = null;
    });
}

function closeProjectsModal() {
    projectsModal.classList.remove('show');
    
    setTimeout(() => {
        projectsModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore background scrolling
    }, 300);
}

// About Me Modal Functionality
const readMoreBtn = document.getElementById('readMoreBtn');
const aboutModal = document.getElementById('aboutModal');
const modalClose = document.querySelector('.modal-close');
const modalContactBtn = document.querySelector('.modal-contact-btn');

// Open modal
readMoreBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
});

// Close modal when clicking the X button
modalClose.addEventListener('click', closeModal);

// Close modal when clicking outside the modal content
aboutModal.addEventListener('click', (e) => {
    if (e.target === aboutModal) {
        closeModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && aboutModal.classList.contains('show')) {
        closeModal();
    }
});

// Close modal and scroll to contact when clicking "Get in Touch"
modalContactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
    setTimeout(() => {
        const contactSection = document.querySelector('#contact');
        if (contactSection) {
            const offsetTop = contactSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }, 300);
});

function openModal() {
    aboutModal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Trigger reflow to ensure display change is applied
    aboutModal.offsetHeight;
    
    // Add show class for animations
    aboutModal.classList.add('show');
    
    // Reset animations for modal content
    const modalTextElements = aboutModal.querySelectorAll('.modal-text p, .modal-stats, .modal-contact-btn');
    modalTextElements.forEach(element => {
        element.style.animation = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.animation = null;
    });
}

function closeModal() {
    aboutModal.classList.remove('show');
    
    setTimeout(() => {
        aboutModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore background scrolling
    }, 300);
}

// Console Easter Egg
console.log('%c Welcome to Elias Portfolio! ', 'background: #C778DD; color: #282C33; font-size: 20px; font-weight: bold; padding: 10px;');
console.log('%c Looking for a developer? Let\'s connect! ', 'color: #C778DD; font-size: 14px;');
