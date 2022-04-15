const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".header-div-primary-nav");
const mobileMenuIcon = document.querySelector(".menu-icon");

menuToggle.addEventListener("click", () => {
    const visibiliti = mobileMenu.getAttribute('data-visible');
    if(visibiliti === "false") {
        mobileMenu.setAttribute('data-visible', true);
        menuToggle.setAttribute('aria-expanded', true);
        mobileMenuIcon.setAttribute('class', 'bx bx-x');
    } else if(visibiliti === "true") {
        mobileMenu.setAttribute('data-visible', false);
        menuToggle.setAttribute('aria-expanded', false);
        mobileMenuIcon.setAttribute('class', 'bx bx-menu');
    }
});