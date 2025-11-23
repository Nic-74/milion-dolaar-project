// --- ENHANCED NAVIGATION & UI ---
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.getElementById('navbar');

// Hamburger menu toggle
if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// --- SPA ROUTING LOGIC ---
const views = {
    'home': ['home', 'philosophy'],
    'structure': ['engineering'],
    'finance': ['finance'],
    'about': ['about', 'contact']
};

const allSections = ['home', 'philosophy', 'engineering', 'finance', 'about', 'contact'];

function showView(viewName) {
    // Hide all sections
    allSections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add('hidden-view');
    });

    // Show sections for requested view
    const sectionsToShow = views[viewName];
    if (sectionsToShow) {
        sectionsToShow.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                el.classList.remove('hidden-view');
                el.classList.remove('view-section');
                void el.offsetWidth;
                el.classList.add('view-section');
            }
        });
    }

    // Close mobile menu
    if (navLinks && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
    
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- ENHANCED LINK HANDLING ---
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const href = link.getAttribute('href');
            
            // Route to appropriate view
            if (href === '#home' || href === '#philosophy' || href === '#vision') {
                showView('home');
                if (href === '#philosophy' || href === '#vision') {
                    setTimeout(() => {
                        const philSection = document.getElementById('philosophy');
                        if(philSection) {
                            philSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 100);
                }
            } else if (href === '#engineering') {
                showView('structure');
            } else if (href === '#finance') {
                showView('finance');
            } else if (href === '#about' || href === '#contact') {
                showView('about');
                if (href === '#contact') {
                    setTimeout(() => {
                        const contactSection = document.getElementById('contact');
                        if(contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 100);
                }
            }
        });
    });

    // Show Home View by default
    showView('home');
    
    // Initial simulator calculation
    if (typeof updateSim === 'function' && sliders.charges) {
        updateSim();
    }
});

// --- ENHANCED BLUEPRINT VIEWER ---
const blueprintData = [
    { phase: 1, img: 'images/1.png', title: 'Phase 1: CAD Schematic', desc: 'Initial computer-aided design showing the core structure and dimensions.' },
    { phase: 2, img: 'images/2.png', title: 'Phase 2: Foundation & Anchors', desc: 'The concrete foundation is poured with steel anchors to secure the main frame.' },
    { phase: 3, img: 'images/3.png', title: 'Phase 3: Structural Skeleton', desc: 'The primary steel and bamboo frame is erected, forming the tree\'s skeleton.' },
    { phase: 4, img: 'images/4.png', title: 'Phase 4: Housing Panels', desc: 'Weatherproof HDPE panels are attached to protect internal components.' },
    { phase: 5, img: 'images/5.png', title: 'Phase 5: Solar & Tech Integration', desc: 'Solar panels, batteries, and the central computing unit are installed and wired.' },
    { phase: 6, img: 'images/6.png', title: 'Phase 6: Operational Deployment', desc: 'The fully assembled unit with solar array active, touchscreens calibrated, and ready for community use.' }
];

const blueprintImage = document.getElementById('blueprintMain');
const blueprintTitle = document.getElementById('blueprintTitle');
const blueprintDesc = document.getElementById('blueprintDesc');
const blueprintButtons = document.querySelectorAll('.bp-btn');
let currentPhase = 6;

function setBlueprint(phaseNum) {
    const data = blueprintData.find(item => item.phase === phaseNum);
    if (!data || !blueprintImage) return;

    currentPhase = phaseNum;

    // Update image with fade animation
    blueprintImage.classList.remove('fade-in');
    blueprintImage.style.opacity = '0.5';
    
    setTimeout(() => {
        blueprintImage.src = data.img;
        if(blueprintTitle) blueprintTitle.innerText = data.title;
        if(blueprintDesc) blueprintDesc.innerText = data.desc;
        
        blueprintImage.style.opacity = '1';
        void blueprintImage.offsetWidth;
        blueprintImage.classList.add('fade-in');
    }, 150);

    // Update button states
    blueprintButtons.forEach((button, index) => {
        if ((index + 1) === phaseNum) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

function changeBlueprint(direction) {
    currentPhase += direction;
    if (currentPhase > 6) currentPhase = 1;
    else if (currentPhase < 1) currentPhase = 6;
    setBlueprint(currentPhase);
}

// Keyboard navigation for blueprint
document.addEventListener('keydown', (e) => {
    if (document.getElementById('engineering') && 
        !document.getElementById('engineering').classList.contains('hidden-view')) {
        if (e.key === 'ArrowLeft') changeBlueprint(-1);
        if (e.key === 'ArrowRight') changeBlueprint(1);
    }
});

// --- ENHANCED ENGINEERING POPUP MODAL ---
const techGrid = document.querySelector('.tech-grid');
const techCards = document.querySelectorAll('#engineering .tech-card');

if (techCards) {
    techCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            const isCurrentlyActive = this.classList.contains('active');
            
            closeAllCards();
            
            if (!isCurrentlyActive) {
                this.classList.add('active');
                const content = this.querySelector('.collapsible-content');
                if (content) content.classList.add('active');
                if(techGrid) techGrid.classList.add('has-active');
                
                // Prevent body scroll when modal is open
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    });
}

function closeAllCards() {
    techCards.forEach(c => {
        c.classList.remove('active');
        const content = c.querySelector('.collapsible-content');
        if (content) content.classList.remove('active');
    });
    if(techGrid) techGrid.classList.remove('has-active');
    document.body.style.overflow = '';
}

// Close modal on outside click
document.addEventListener('click', (e) => {
    if (!e.target.closest('.tech-card.active')) {
        closeAllCards();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllCards();
    }
});

// --- ENHANCED FINANCIAL ENGINE (JPY) ---
const TOTAL_OPEX_JPY = 73500;

// Revenue Assumptions
const PRICE_PER_CHARGE = 20;
const PRICE_UPPER_DECK = 100;
const PRICE_WIFI_VOUCHER = 30;
const COMMISSION_PER_HIRE = 5000;

// DOM Elements
const sliders = {
    charges: document.getElementById('chargeSlider'),
    print: document.getElementById('printSlider'),
    job: document.getElementById('jobSlider'),
    wifi: document.getElementById('wifiSlider'),
};

const values = {
    charges: document.getElementById('chargeVal'),
    print: document.getElementById('printVal'),
    job: document.getElementById('jobVal'),
    wifi: document.getElementById('wifiVal'),
};

const outputs = {
    monthlyRevenue: document.getElementById('monthlyRev'),
    netProfit: document.getElementById('netProfit'),
    profitPercent: document.getElementById('profitPercent'),
    sustainabilityMsg: document.getElementById('sustainabilityMsg'),
    profitBar: document.getElementById('profitBar'),
};

function updateSim() {
    if (!sliders.charges) return;

    // Get input values
    const dailyCharges = parseInt(sliders.charges.value);
    const dailyPrintUsers = parseInt(sliders.print.value);
    const monthlyPlacements = parseInt(sliders.job.value);
    const dailyWifi = parseInt(sliders.wifi.value);

    // Update UI labels
    values.charges.innerText = dailyCharges;
    values.print.innerText = dailyPrintUsers;
    values.job.innerText = monthlyPlacements;
    values.wifi.innerText = dailyWifi;

    // Calculate monthly revenue
    const chargeRevenue = dailyCharges * PRICE_PER_CHARGE * 30;
    const printRevenue = dailyPrintUsers * PRICE_UPPER_DECK * 30;
    const wifiRevenue = dailyWifi * PRICE_WIFI_VOUCHER * 30;
    const jobRevenue = monthlyPlacements * COMMISSION_PER_HIRE;

    const totalMonthlyRevenue = chargeRevenue + printRevenue + wifiRevenue + jobRevenue;

    // Calculate net profit
    const netProfit = totalMonthlyRevenue - TOTAL_OPEX_JPY;

    // Currency formatting
    const fmt = new Intl.NumberFormat('ja-JP', {
        style: 'currency',
        currency: 'JPY',
        maximumFractionDigits: 0
    });

    // Render results with animation
    outputs.monthlyRevenue.innerText = fmt.format(totalMonthlyRevenue);
    outputs.netProfit.innerText = fmt.format(netProfit);

    // Visual feedback
    const profitPercentage = Math.max(0, (totalMonthlyRevenue / TOTAL_OPEX_JPY) * 100);
    outputs.profitPercent.innerText = `${Math.round(profitPercentage)}%`;

    if (netProfit > 0) {
        outputs.netProfit.classList.remove('profit-negative');
        outputs.netProfit.classList.add('profit-positive');
        outputs.sustainabilityMsg.innerText = "✅ Sustainable: Automated & Employer-Funded";
        outputs.sustainabilityMsg.style.color = '#4CAF50';
        outputs.profitBar.style.width = '100%';
    } else {
        outputs.netProfit.classList.remove('profit-positive');
        outputs.netProfit.classList.add('profit-negative');
        outputs.sustainabilityMsg.innerText = "⚠️ Revenue below operating costs";
        outputs.sustainabilityMsg.style.color = '#EF5350';
        outputs.profitBar.style.width = `${profitPercentage}%`;
    }
}

// --- ENHANCED ACCORDION FOR FINANCIAL TABLES ---
document.querySelectorAll('#finance .category-header.clickable').forEach(header => {
    header.addEventListener('click', () => {
        const isActive = header.classList.contains('active');
        
        // Toggle active class
        header.classList.toggle('active');

        // Get target rows
        const targetClass = header.dataset.target;
        const detailRows = document.querySelectorAll(`.capex-detail-row.${targetClass}, .opex-detail-row.${targetClass}`);

        // Animate rows
        detailRows.forEach(row => {
            if (isActive) {
                row.style.display = 'none';
            } else {
                row.style.display = 'table-row';
                row.style.animation = 'fadeIn 0.3s ease';
            }
        });
    });
});

// --- SLIDER EVENT LISTENERS ---
document.addEventListener('DOMContentLoaded', () => {
    for (const key in sliders) {
        if (sliders[key]) {
            sliders[key].addEventListener('input', updateSim);
        }
    }
    
    // Initial calculation
    if (sliders.charges) updateSim();
    
    // Add smooth scroll for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
            }
        });
    });
});

// --- FORM ENHANCEMENT ---
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation feedback
        const formData = new FormData(contactForm);
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        
        if (submitBtn) {
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission (replace with actual submission logic)
            setTimeout(() => {
                alert('Thank you for your interest! We will contact you soon.');
                contactForm.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        }
    });
}

// --- INTERSECTION OBSERVER FOR SCROLL ANIMATIONS ---
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.narrative-block, .tech-card, .philosophy-card, .partnership-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// --- PERFORMANCE: LAZY LOAD IMAGES ---
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}