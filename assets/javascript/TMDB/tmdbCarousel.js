const API_UPCOMING = `${baseUrl}/movie/upcoming?api_key=${API_KEY}`;
const ulCarousel = document.querySelector('.carousel-list');
const lis = ulCarousel.querySelectorAll('li.carousel-slide');

fetchMovie(API_UPCOMING, inicia, "results");

function inicia(data) {
    //console.log(data);
    organizaSlides(data);
}

function findTrailer(id, idx, e) {
    const API_TRAILER = `${baseUrl}/movie/${id}/videos?api_key=${API_KEY}`;
    
    fetchMovie(API_TRAILER, filterTrailer, "results", idx, e);
}

function filterTrailer(data, idx, e) {

    const trai = data.find(res => (res.type === "Trailer"));

    const divfrm = e.querySelector('.carousel-img');
    
    let t = '';
    if(trai) {
        t = trai.key;
    } 

    if(idx === 0) {
        divfrm.innerHTML = `
            <div class="iframe-destaque">
                <iframe class="carousel-iframe" src="https://www.youtube.com/embed/${t}"
                title="${trai.site}"
                frameborder="0" 
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
            </div>
        `;
    } else {
        divfrm.innerHTML = `
            <iframe class="carousel-iframe" src="https://www.youtube.com/embed/${t}"
            title="${trai.site}"
            frameborder="0" 
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen></iframe>
        `;
    }
    
}

function primeiroSlide(idx) {
    if(idx === 0) return "current-li";
    else return '';
}

function organizaSlides(data) {
    lis.forEach((e, i)=> {
        findTrailer(data[i].id, i, e);

        const aH2 = e.querySelector('.carousel-title a');
        aH2.href = `assets/pages/detalhes.html?movie=${data[i].id}`;
        aH2.innerText = data[i].title;

        const sinopse = e.querySelector('p.sinopse');
        sinopse.innerHTML = `<strong><em>Sinópse: </em></strong>${data[i].overview.substr(0, 210)}...`

        const time = e.querySelector('.carousel-destaque-info time');
        time.dataset = `${data[i].release_date}`;
        time.innerText = `${formatDate(data[i].release_date)}`;

        const ulInfo = e.querySelector('ul.carousel-destaque-info');
        const infoLis = ulInfo.querySelectorAll('li');
        
        creditsInfo(infoLis, data[i].id, e);
    });
}

function creditsInfo(lisinfo, movieId, element) {
    const API_CREDIT = `${baseUrl}/movie/${movieId}/credits?api_key=${API_KEY}`;
    
    fetch(API_CREDIT)
        .then(res => res.json())
        .then(data => {
            const director = data.crew.find(e => e.job === "Director").name;
            
            lisinfo[0].innerHTML = `<strong>Diretor: </strong>${director}`; 

            const producer = data.crew.find(e => e.job === "Producer").name;
            
            lisinfo[1].innerHTML = `<strong>Roteiro: </strong>${producer}`; 

            const ulElenco = element.querySelector('ul.elenco-atores');
        
            if(data.cast.length >= 4) {
                let content = ``;
                for(let i = 0; i < 4; i++) {
                    content += `
                        <li>${data.cast[i].name}</li>
                        <li>|</li>
                    `;
                    if(i === 3) {
                        content += `<li>...</li>`;
                    }
                }
                
                ulElenco.innerHTML = content;
            } else {
                const pElenco = element.querySelector('p.elenco');
                pElenco.style.display = "none";
                ulElenco.style.display = "none";
            }
        })
        .catch(err => console.log('Erro: '+err));
}
