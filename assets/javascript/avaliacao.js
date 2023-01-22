const starsList = document.querySelectorAll('.star-list');

starsList.forEach(e => {
    const stars = e.querySelectorAll('.star');
    e.addEventListener("click", (e) => {
        const target = e.target.classList;

        if(!target.contains("ativo")) {
            stars.forEach(function(star) {
                star.classList.remove("ativo");
            });
        }
        target.add("ativo");
    })
});