const r = document.querySelectorAll('.rotation-div--container i');

let deg = 0;
let pos = 0
onwheel = (e) => {
    const y = e.deltaY;
    deg += y/2;
    r.forEach(e => e.style.transform = `rotate(${deg}deg)`);
}

const searchResultsContainer = document.querySelector('#APIResults');

if(searchResultsContainer && window.innerWidth < 768) {
    searchResultsContainer.onscroll = () => {
        deg += 3;

        r.forEach(e => e.style.transform = `rotate(${deg}deg)`);
        if(windowPos != 0) {
            pos = windowPos;
        }
    }
}

onscroll = () => {
    const windowPos = window.scrollY;
    const diference = windowPos - pos;
    if(diference >= 0) {
        deg += 3;
    } else {
        deg -= 3;
    }

    r.forEach(e => e.style.transform = `rotate(${deg}deg)`);
    if(windowPos != 0) {
        pos = windowPos;
    }
}
