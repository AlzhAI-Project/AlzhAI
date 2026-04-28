// Mobile Menu
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('nav ul');
const menuIcon = menuToggle.querySelectorAll('span');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Simple Hamburger Animation
    if(navMenu.classList.contains('active')) {
        menuIcon[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        menuIcon[1].style.opacity = '0';
        menuIcon[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        menuIcon[0].style.transform = 'none';
        menuIcon[1].style.opacity = '1';
        menuIcon[2].style.transform = 'none';
    }
});

// Scroll Animation (Reveal on Scroll)
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealOnScroll.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach((el) => revealOnScroll.observe(el));

/* =========================================
   INIZIALIZZAZIONE SMOOTH SCROLL (LENIS)
   ========================================= */
const lenis = new Lenis({
    duration: 1.5, 
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
    smooth: true,
    mouseMultiplier: 1, 
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

/* =========================================
   FIX INFALLIBILE: ANCORE INVISIBILI
   ========================================= */
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
    const targetId = anchor.getAttribute('href');
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
        // 1. Creiamo un "faro" invisibile nella pagina
        // Questo elemento NON è sticky, quindi la sua posizione fisica è assoluta e invariabile
        const anchorPoint = document.createElement('div');
        anchorPoint.style.display = 'block';
        anchorPoint.style.height = '0';
        anchorPoint.style.width = '0';
        anchorPoint.style.visibility = 'hidden';
        
        // Lo inseriamo nel codice HTML esattamente un millimetro prima della sezione reale
        targetSection.parentNode.insertBefore(anchorPoint, targetSection);

        // 2. Comportamento al click sulla navbar
        anchor.addEventListener('click', function(e) {
            e.preventDefault(); 
            
            // Chiudi il menu a tendina se si è su smartphone
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if(menuIcon && menuIcon.length >= 3) {
                    menuIcon[0].style.transform = 'none';
                    menuIcon[1].style.opacity = '1';
                    menuIcon[2].style.transform = 'none';
                }
            }

            // 3. Diciamo a Lenis di scorrere verso il faro invisibile, 
            // ignorando completamente la sezione sticky buggata!
            // L'offset -80 serve a lasciare lo spazio per la barra bianca del menu (header).
            lenis.scrollTo(anchorPoint, {
                offset: -80, 
                duration: 1.5
            });
        });
    }
});
