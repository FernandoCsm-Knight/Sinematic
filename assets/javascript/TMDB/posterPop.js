
gambiarra();

let numberPosters = 0;
let posters = ``;
let page = 1;
let maxim = 6;
const selectGen = document.querySelector('#categorias-destaque');
selectGen.oninput = () => {
    findGenre(GENRES);
    
    maxim = 6;
    page = 1;
    posters = ``;
    numberPosters = 0;
}


const destaqueButton = document.querySelector('#destaqueBtn');
destaqueButton.onclick = () => {
    maxim += 6;

    findGenre(GENRES, maxim);
}


function findGenre(data, num = 6) {
    if (num >= (20 * page)) page++;

    const gener = data.find(element => element.name == (selectGen.options[selectGen.selectedIndex].value));

    gambiarra(gener, num, page);
}

function showPopular(data) {
    console.log(data);
    createPosters(data);
}

let genAnt = 0;
function cloneMovie(data, num, gen) {

    if (!movies[0] || genAnt != gen) {
        movies = data;
        maxim = 6;
    }
    else if (num >= (20 * (page - 1)) && !movies[(20 * page) - 1]) {
        movies = movies.concat(data);
    }
    genAnt = gen;

    showPopular(movies);
}


function gambiarra(genre, postersNumber = 6, pageNumber = 1) {

    let API_POPULAR;

    if (postersNumber === 6 || (!movies[(20 * page) - 1] && postersNumber >= (20 * (page - 1)))) {

        console.log('carregando...');
        if (genre) {
            API_POPULAR = `${API_DISCOVER}&with_genres=${genre.id}&page=${pageNumber}`;

            fetchMovie(API_POPULAR, cloneMovie, "results", postersNumber, genre.id);
        } else {
            API_POPULAR = `${API_DISCOVER}&page=${pageNumber}`;
            fetchMovie(API_POPULAR, cloneMovie, "results", postersNumber, 0);
        }

    } else {

        if (genre) cloneMovie(movies, postersNumber, genre.id);
        else cloneMovie(movies, postersNumber, 0);

    }
}



function createPosters(content) {

    const popularContainer = document.querySelector('.posters-div-div .posters-div');

    let i = 0;
    while (i < 6) {
        const bunner = `
            <div data-info="poster">
                <a href="assets/pages/detalhes.html?movie=${content[numberPosters].id}">
                    <img src="${imageBaseUrl + content[numberPosters].poster_path}" alt="${content[numberPosters].original_title}" class="destaques-poster-img">
                </a>
                <span class="poster-rate" style="color: ${getColor(content[numberPosters].vote_average)};">${parseFloat(content[numberPosters].vote_average) * 10 + "%"}</span>
                <span class="poster-date">
                ${formatDate(content[numberPosters].release_date)}
                </span>
                <div class="poster-genres">
                    ${getGenres(content[numberPosters].genre_ids)}
                </div>
            </div>
        `;

        posters += bunner;
        numberPosters++;
        i++;
    } popularContainer.innerHTML = posters;
}
//${`${siteUrl}/movie/${content[numberPosters].id}`}
