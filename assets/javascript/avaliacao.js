const stars = document.querySelectorAll(".star");

document.addEventListener("click", (e) => {
    const target = e.target.classList;

    if(!target.contains("ativo")) {
        stars.forEach(function(star) {
            star.classList.remove("ativo");
        });
    }
    target.add("ativo");
})