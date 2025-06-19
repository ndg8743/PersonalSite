// Enhanced Page Navigation System
function showPage(pageId) {
    console.log('Navigating to:', pageId);
    
    // Hide all pages with fade out
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.opacity = '0';
        page.style.transform = 'translateY(20px)';
        setTimeout(() => {
            page.classList.remove('active');
            page.style.display = 'none';
        }, 300);
    });
    
    // Show target page with fade in
    setTimeout(() => {
        const targetPage = document.getElementById(pageId);
        if (targetPage) {
            targetPage.style.display = 'block';
            setTimeout(() => {
                targetPage.classList.add('active');
                targetPage.style.opacity = '1';
                targetPage.style.transform = 'translateY(0)';
                
                // Trigger page-specific animations
                triggerPageAnimations(pageId);
            }, 50);
        }
    }, 300);
    
    // Update navigation active state
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageId) {
            link.classList.add('active');
        }
    });
}

// Trigger animations when page loads
function triggerPageAnimations(pageId) {
    const page = document.getElementById(pageId);
    if (!page) return;
    
    // Reset and trigger float-in animations
    const floatElements = page.querySelectorAll('.float-in');
    floatElements.forEach((element, index) => {
        element.classList.remove('visible');
        element.style.opacity = '0';
        element.style.transform = 'translateY(60px) scale(0.95)';
        
        setTimeout(() => {
            element.classList.add('visible');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0) scale(1)';
        }, index * 150 + 500);
    });
    
    // Reset and trigger fade-in animations
    const fadeElements = page.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        element.classList.remove('visible');
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            element.classList.add('visible');
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100 + 200);
    });
}

// Enhanced animations and effects
function initEnhancedFeatures() {
    console.log('Initializing enhanced navigation features...');
    
    // Set up page transitions
    initPageTransitions();
    
    // Set up navigation click handlers
    initNavigationHandlers();
    
    // Typing effect for stats
    animateNumbers();
    
    // Particle effects on hover
    addParticleEffects();
    
    // Dynamic background effects
    addDynamicEffects();
    
    // Interactive elements
    addInteractiveEffects();
    
    // Show initial page
    setTimeout(() => {
        showPage('home-page');
    }, 1000);
}

function initPageTransitions() {
    // Add CSS for smooth page transitions
    const style = document.createElement('style');
    style.textContent = `
        .page {
            transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }
        
        .page.active {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

function initNavigationHandlers() {
    // Set up click handlers for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            if (pageId) {
                showPage(pageId);
            }
        });
    });
    
    // Set up logo click handler
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', (e) => {
            e.preventDefault();
            showPage('home-page');
        });
    }
}

function animateNumbers() {
    const numberElements = document.querySelectorAll('.stat-number');
    numberElements.forEach(el => {
        const finalValue = el.textContent;
        if (finalValue.includes('+')) {
            const num = parseInt(finalValue.replace(/[^0-9]/g, ''));
            animateCountUp(el, 0, num, finalValue.replace(/[0-9]/g, ''));
        }
    });
}

function animateCountUp(element, start, end, suffix) {
    const duration = 2000;
    const increment = (end - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        element.textContent = Math.floor(current).toLocaleString() + suffix;
    }, 16);
}

function addParticleEffects() {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', createParticles);
    });
}

function createParticles(event) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    
    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: #a855f7;
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
            animation: particleFloat 1s ease-out forwards;
        `;
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }
}

function addDynamicEffects() {
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes particleFloat {
            0% { opacity: 1; transform: translateY(0) scale(1); }
            100% { opacity: 0; transform: translateY(-50px) scale(0); }
        }
        
        .tech-badge {
            transition: all 0.3s ease;
        }
        
        .tech-badge:hover {
            transform: scale(1.1);
            background: #a855f7;
            color: white;
        }
        
        .feature-card {
            cursor: pointer;
        }
        
        .timeline-item {
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .timeline-item:hover .timeline-content {
            transform: scale(1.05);
            box-shadow: 0 5px 20px rgba(168, 85, 247, 0.3);
        }
    `;
    document.head.appendChild(style);
}

function addInteractiveEffects() {
    // Add click effects to tech badges
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('tech-badge')) {
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = 'scale(1.1)';
            }, 100);
        }
    });
    
    // Add form validation and submission
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const button = e.target.querySelector('button');
    const originalText = button.textContent;
    
    button.textContent = 'Sending...';
    button.style.background = '#10b981';
    
    // Simulate form submission
    setTimeout(() => {
        button.textContent = 'Message Sent!';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '#a855f7';
            e.target.reset();
        }, 2000);
    }, 1500);
}

// Make functions globally available
window.showPage = showPage;
window.triggerPageAnimations = triggerPageAnimations;
window.initEnhancedFeatures = initEnhancedFeatures;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('Navigation system loading...');
    setTimeout(initEnhancedFeatures, 1000);
});

// Also initialize scroll animations for float-in elements
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe all animation elements
    document.querySelectorAll('.float-in, .fade-in, .slide-in-left, .slide-in-right').forEach(el => {
        observer.observe(el);
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initScrollAnimations, 1500);
});
