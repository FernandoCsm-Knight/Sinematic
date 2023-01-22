const urlId = new URLSearchParams(window.location.search);
let movieId = urlId.get('movie');

if(!movieId) movieId = 338953;

onload = () => {
    const API_MOVIE = `${baseUrl}/movie/${movieId}?api_key=${API_KEY}`;

    fetchMovie(API_MOVIE, createPage);
}

function createPage(mData) {
    //console.log(mData);

    colocaImg(mData);
    colocaTitulos(mData);
    colocaResumo(mData);
    colocaGeneros(mData.genres);
    colocaAdulto(mData.adult);
    colocaNota(mData.vote_average);
    colocaLancamento(mData.release_date);
    colocaDuracao(mData.runtime);
    colocaStatus(mData.status);
    colocaOrcamento(mData.budget);
    colocaCompanies(mData.production_companies);

    const API_MOVIE_TRAILER = `${baseUrl}/movie/${movieId}/videos?api_key=${API_KEY}`;
    fetchMovie(API_MOVIE_TRAILER, showTrailer, "results");
}

function showTrailer(video) {
    //console.log(video);
    const divIf = document.querySelector('#movieIframe');

    const trailer = video.find(e => e.type === "Trailer");

    if(trailer) {
        divIf.innerHTML = `<iframe src="https://www.youtube.com/embed/${trailer.key}" title="${trailer.site}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    } else {
        const iframeDiv = document.querySelector('#movieIframe');
        iframeDiv.style.height = 'auto';
        divIf.innerHTML = `
            <div class="no-video"> 
                <div class="no-video-icons">
                    <i class='bx bx-film' ></i>
                    <i class='bx bxs-film' ></i>
                </div>
                <div class="no-video-text">
                    <h3>Oops...</h3>
                    <p>Sem Video</p>
                </div>
            </div>
        `;
    }
}

function colocaImg(mData) {
    if(mData.poster_path) {
        const postImg1 = document.querySelector('#posterSection .first-img');
        postImg1.src = `${imageBaseUrl}${mData.poster_path}`;
        postImg1.alt = `${mData.title}`;
    } else {
        const containerImg = document.querySelector('.poster-img');
        containerImg.innerHTML = `
            <i class='bx bxs-file-image'></i>
        `;
    }
}

function colocaTitulos(mData) {
    const movieTitle = document.querySelector('.movie-title');
    movieTitle.innerText = `${mData.title}`;
    const sitePath = mData.homepage;

    if(mData.tagline) {
        const infoTitle = document.querySelector('.information-title h2');
        infoTitle.innerText = mData.tagline;   
    }

    const titleLink = document.querySelector('.title-link');
    if(sitePath) {
        titleLink.href = `${sitePath}`;
    } else {
        titleLink.style.pointerEvents = 'none';
    }
}

function colocaResumo(over) {
    const parOver = document.querySelector('.overview');
    parOver.innerHTML = over.overview;

    
    if(over.backdrop_path) {
        const overImg = document.querySelector('#overviewImg img');
        overImg.src = `${imageBaseUrl}${over.backdrop_path}`;
    } else {
        const overIcon = document.querySelector('#overviewImg');
        overIcon.innerHTML = "<i class='bx bxs-file-image'></i>";
        overIcon.style.border = '1px solid var(--vermelho-medio)';
    }

}

function colocaGeneros(genres) {
    const movieGen = document.querySelector('.movie-genres');
    let spanGen = ``;
    if(genres.length > 0) {
        spanGen = genres.map(e => {
            return `<span>${e.name}</span>`
        }).join('');
    } else {
        spanGen = `<span><i class='bx bx-data'></i></span>`;
    } movieGen.innerHTML = spanGen;
}

function colocaAdulto(adult) {
    const movieAdult = document.querySelector('.movie-adult');
    if(adult) {
        movieAdult.classList.add('restrito');
        movieAdult.innerHTML = "<i class='bx bxs-user-x'></i>";
        movieAdult.title = 'Apenas para Adultos';
    } else {
        movieAdult.classList.add('livre');
        movieAdult.innerHTML = "<i class='bx bxs-user-check' ></i>";
        movieAdult.title = 'Livre';
    }
}

function colocaNota(nota) {
    if(nota) {
        const Nota = document.querySelector('.plus-rate > p');
        Nota.innerText = nota;
        Nota.style.color = getColor(nota);
    } else {
        const divNota = document.querySelector('.plus-rate');
        divNota.style.display = 'none';
    }
}

function colocaLancamento(date) {
    if(date) {
        const Lan = document.querySelector('.release-date > p');
        Lan.innerText = formatDate(date);
    } else {
        const divLan = document.querySelector('.release-date');
        divLan.style.display = 'none';
    }
}

function colocaDuracao(tempo) {
    if(tempo) {
        const Run = document.querySelector('.plus-runtime > p');
        Run.innerText = tempo + ' min';
    } else {
        const divRun = document.querySelector('.plus-runtime');
        divRun.style.display = 'none';
    }
}

function colocaStatus(status) {
    if(status) {
        const Rele = document.querySelector('.plus-released > p');
        if(status === 'Released') {
            Rele.innerHTML = "<i class='bx bx-film'></i>";
            Rele.title = 'Disponível';
        } else {
            Rele.innerHTML = "<i class='bx bxs-camera-movie' ></i>";
            Rele.title = 'Estreia em Breve';
        }
    } else {
        const divRele = document.querySelector('.plus-released');
        divRele.style.display = 'none';
    }
}

function colocaOrcamento(budget) {
    if(budget) {
        const Bud = document.querySelector('.plus-budget > p');
        Bud.innerText += budget + '.00';
    } else {
        const divBud = document.querySelector('.plus-budget');
        divBud.style.display = 'none';
    }
}

function colocaCompanies(companies) {
    const divMovieCom = document.querySelector('#movieCompanies');
    
    if(companies.length > 1) {
        const compImgs = companies.map(e => {
            let item = '';
            if(e.logo_path != null) {
                item = `<img src="${imageBaseUrl + e.logo_path}" title="${e.name}" alt="${e.name}">`;
            } else {
                item = `<i title="${e.name}" class='bx bxs-file-image'></i>`;
            }
            
            return item;
        }).join('');
        divMovieCom.innerHTML = compImgs;
    } else {
        const divGrid = document.querySelector('.poster-content-container');
        divGrid.style.gridTemplateRows = '1fr';
        divMovieCom.style.display = 'none';
    }
}
