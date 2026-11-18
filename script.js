(() => {
    'use strict';

    const header = document.querySelector('.site-header');
    const toggle = document.querySelector('.menu-toggle');
    const menu = document.getElementById('primary-menu');

    if (!header || !toggle || !menu) return;

    header.classList.add('has-menu-toggle');
    const mobile = window.matchMedia('(max-width: 700px)');
    const scrollTolerance = 6;
    let previousScroll = window.scrollY;
    let scrollFrame = 0;

    function updateHeader() {
        scrollFrame = 0;
        const viewport = document.documentElement;
        const scroll = Math.max(0, Math.min(window.scrollY, viewport.scrollHeight - viewport.clientHeight));
        if (scroll <= header.offsetHeight) {
            header.classList.remove('is-hidden');
        } else {
            const movement = scroll - previousScroll;
            if (Math.abs(movement) < scrollTolerance) return;
            header.classList.toggle('is-hidden', movement > 0 && !menu.classList.contains('is-open'));
        }
        previousScroll = scroll;
    }

    window.addEventListener('scroll', () => {
        if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateHeader);
    }, { passive: true });

    function setMenu(open) {
        toggle.setAttribute('aria-expanded', String(open));
        menu.classList.toggle('is-open', open);
        if (open) header.classList.remove('is-hidden');
    }

    toggle.addEventListener('click', () => {
        setMenu(toggle.getAttribute('aria-expanded') === 'false');
    });

    menu.addEventListener('click', (event) => {
        const link = event.target.closest('a');
        if (!link || !mobile.matches) return;
        setMenu(false);
        const section = document.getElementById(link.hash.slice(1));
        if (section) {
            section.tabIndex = -1;
            section.focus({ preventScroll: true });
        }
    });

    header.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || !menu.classList.contains('is-open')) return;
        setMenu(false);
        toggle.focus();
    });

    mobile.addEventListener('change', () => setMenu(false));
})();
