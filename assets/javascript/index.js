const menuToggle1 = document.querySelector(".menu-toggle1");
const menuToggle2 = document.querySelector(".menu-toggle2");
const mobileMenu = document.querySelector(".header-div-primary-nav");

menuToggle1.addEventListener("click", () => {
    const visibiliti1 = mobileMenu.getAttribute('data-visible');
    if(visibiliti1 === "false") {
        mobileMenu.setAttribute('data-visible', true);
        menuToggle1.setAttribute('aria-expanded', true);
        menuToggle2.setAttribute('aria-expanded', true);
    }
});

menuToggle2.addEventListener("click", () => {
    const visibiliti2 = mobileMenu.getAttribute('data-visible');
    if(visibiliti2 === "true") {
        mobileMenu.setAttribute('data-visible', false);
        menuToggle1.setAttribute('aria-expanded', false);
        menuToggle2.setAttribute('aria-expanded', false);
    }
});