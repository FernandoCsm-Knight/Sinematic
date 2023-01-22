const urlParams = new URLSearchParams(window.location.search);
const pesquisa = urlParams.get('search');

const API_SEARCH = `${baseUrl}
/search/movie?api_key=${API_KEY}&query=${pesquisa.replace(/ /g, '+')}`;

const primaryForm = document.querySelector('#primarySearchForm');
const primaryFormInput = primaryForm.querySelector('#primarySearchInput');
const divResults = document.querySelector('#APIResults');

primaryForm.onsubmit = (e) => {
    e.preventDefault();
    window.location.search = `search=${primaryFormInput.value.trim().replace(/ /g, '+')}`;
}

fetchMovie(API_SEARCH, showSearch, "results");

function showSearch(data) {
    //console.log(data);

    let POS = 0;
    if(data.length > 0 && data.find(e => e.poster_path)) {
        const searchResults = data.map((e, idx) => {
            divResults.style.justifyContent = "auto";

            let result = ``;
            if(e.poster_path) {
                result = `
                    <div data-info="result">
                        <a href="detalhes.html?movie=${e.id}" target="_blank">
                            <img src="${imageBaseUrl + e.poster_path}" alt="${e.original_title}" class="results-poster">
                        </a>
                        <span class="results-rate" style="color: ${getColor(e.vote_average)};">${parseFloat(e.vote_average) * 10 + "%"}</span>
                        <span class="results-date">
                        ${formatDate(e.release_date)}
                        </span>
                        <div class="results-genre">
                            ${getGenres(e.genre_ids)}
                        </div>
                        <div class="results-overview">
                            <p>${e.overview.substr(0, 90) + '...'}</p>
                        </div>
                    </div>
                `; 
                POS++;
            } return result;
        });
        divResults.innerHTML = searchResults.join('');
    } else {
        divResults.style.justifyContent = "center";

        divResults.innerHTML = `
            <div class="no-results">
                <div class="no-results--icon">
                    <i class='bx bx-wind'></i>
                </div>
                <h3>Oops...</h3>
                <p>Nada Envontrado</p>
            </div>
        `;

        const iconRes = document.querySelector('.no-results--icon i');
        iconRes.onclick = () => {
            iconRes.classList.add('fade-right');
        }
    }
}
