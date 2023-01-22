const scrollDiv = document.querySelector('#APIResults');

let space = 10;

const resultsBtn = document.querySelectorAll('.btn-results');

if(resultsBtn.length > 0) {
    resultsBtn.forEach(e => {
        let direction = 0;
        const classes = e.classList;
        if(classes.contains('left-arrow')) {
            direction = -1;
        } else direction = 1;
        e.onclick = () => {
            scrollDiv.scrollLeft += 150 * direction;
        }
    });
}

scrollDiv.onwheel = (e) => {
    const scrollDivAria = scrollDiv.getAttribute('aria-details');
    
    if(scrollDivAria === 'scroll-h' || window.innerWidth > 550) {
        e.preventDefault();
        scrollDiv.scrollLeft += (e.deltaY);
    }
}
