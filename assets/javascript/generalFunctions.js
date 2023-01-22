function getColor(rate) {
    let cor = "white";
    if (rate >= 7.5) {
        cor = "rgb(10, 255, 10)";
    } else if (rate >= 6 && rate < 7.5) {
        cor = "rgb(255, 210, 0)";
    } else if (rate < 6) {
        cor = "rgb(255, 15, 10)";
    } return cor;
}

function getGenres(genres) {
    let spans = ``;

    if(genres.length > 0) {
        genres.forEach(element => {
            const name = genre(element);
            spans += `<span>${name}</span>`;
        });
    } else {
        spans = `<span><i class='bx bx-data'></i></span>`;
    }

    return spans;
}

function genre(id) {
    const g = GENRES.find(e => e.id === id);
    return g.name;
}

function formatDate(date) { 
    let resposta = `<i class='bx bx-data'></i>`;
    if(date) {
        const newData = date.split('-');
        const aux = newData[0];
        newData[0] = newData[2];
        newData[2] = aux;
        resposta = newData.join('/');
    } 
    
    return resposta;
}
