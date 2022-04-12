const track = document.querySelector(".carousel-list");
const slides = Array.from(track.children);
const buttomLeft = document.querySelector(".carousel-button-left");
const buttomRight = document.querySelector(".carousel-button-right");
const carouselNav = document.querySelector(".carousel-nav");
const dots = Array.from(carouselNav.children);

const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;


const setSlidePosition = (slide, index) => {
    slide.style.left = 110 * index + "%";
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = "translateX(-" + targetSlide.style.left + ")";
    currentSlide.classList.remove("current-li");
    targetSlide.classList.add("current-li");
}

const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
}

const hideShowArrows = (targetIndex, buttomLeft, buttomRight, slides) => {
    if(targetIndex === 0) {
        buttomLeft.classList.add("sr-only");
        buttomRight.classList.remove("sr-only");
    } else if(targetIndex === slides.length - 1) {
        buttomLeft.classList.remove("sr-only");
        buttomRight.classList.add("sr-only");
    } else {
        buttomLeft.classList.remove("sr-only");
        buttomRight.classList.remove("sr-only");
    }
}

//quando clicar vai mover para o slide anterior
buttomLeft.addEventListener("click", () => {
    const currentSlide = track.querySelector(".current-li");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = carouselNav.querySelector(".current-slide");
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    //move para o slide anterior
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(prevIndex, buttomLeft, buttomRight, slides);
});


//quando clicar vai mover para o próximo slide
buttomRight.addEventListener("click", () => {
    const currentSlide = track.querySelector(".current-li");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = carouselNav.querySelector(".current-slide");
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    //move para o próximo slide
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(nextIndex, buttomLeft, buttomRight, slides);
});

//quando clicar os indicadores irão mudar também.
carouselNav.addEventListener("click", (e) => {
    //qual indicador foi clicado?
    const targetDot = e.target.closest("button");

    if(!targetDot) return;
    const currentSlide = track.querySelector(".current-li");
    const currentDot = carouselNav.querySelector(".current-slide");
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);

    hideShowArrows(targetIndex, buttomLeft, buttomRight, slides);
});