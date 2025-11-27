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
            // Una volta che un elemento è stato rivelato, smettiamo di osservarlo
            // per evitare che l'animazione si ripeta
            revealOnScroll.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach((el) => revealOnScroll.observe(el));
