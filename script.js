// Script per menu a hamburger
document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector("nav ul");

    toggleBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
});
