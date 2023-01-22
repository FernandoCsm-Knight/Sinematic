const novidadesContainer = document.querySelector('.container-materias');

const API_TRANDING = `${baseUrl}/trending/movie/week?api_key=${API_KEY}`;

fetchMovie(API_TRANDING, showTranding, "results");

function showTranding(data) {
    let novidade = ``;
    for(let i = 0; i < 3; i++) {
        novidade = `
        <div class="materia-item">
            <div class="materias-item-img">
                <img src="${imageBaseUrl}/${data[i].backdrop_path}" alt="Imagem da Matéria">
                </div>
                <div class="materia-content">
                <h3><a href="assets/pages/detalhes.html?movie=${data[i].id}"
                        target="_blank" rel="nofollow">${data[i].title}</a></h3>
                <p>${data[i].overview.substr(0, 225)}...</p>
                <div class="materia-tags-container">
                    ${addTag(data[i].genre_ids)}
                </div>
            </div>
        </div>`;

        if(i === 0) {
            novidadesContainer.innerHTML = novidade;
        } else {
            novidadesContainer.innerHTML += novidade;
        }
    }
}

function addTag(tags) {
    const a = tags.map(e => {
        const tag = `                    
        <div class="tags-item">
            <a href="#titulo-destaques">${genre(e)}</a>
        </div>`;
        return tag;
    });

    return a.join('');
}
