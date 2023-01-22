const marketingDiv = document.querySelector('#APIResults');

const API_TV_TRANDING = `${baseUrl}/trending/tv/week?api_key=${API_KEY}`;

fetchMovie(API_TV_TRANDING, showTvTranding, "results");

function showTvTranding(data) {
    //console.log(data);
    const cards = data.map(e => {
        const card = {
            link_img: `${imageBaseUrl}/${e.backdrop_path}`,
            link_site: `${`${siteUrl}/tv/${e.id}`}`,
            date: `${e.first_air_date}`,
            name: `${e.name}`,
            id: `${e.id}`
        };
        return card;
    });
    plusCredits(cards);

}

function plusCredits(cards) {
    //console.log(cards);
    marketingDiv.innerHTML = ``;

    cards.forEach(e => {
        const API_TV_CREDITS = `${baseUrl}/tv/${e.id}/credits?api_key=${API_KEY}`;

        fetch(API_TV_CREDITS)
            .then(res => res.json()) 
            .then(data => colocaCards(data.crew, e))
            .catch(err => `Erro: `+err);
    });
}

function colocaCards(data, e) {

    let valorDiretor = `<i class='bx bxs-user-x'></i>`;
    let valorRoterista = `<i class='bx bxs-user-x'></i>`;

    if(data.length > 0) {
        const diretor = data.find(e => (e.job.includes("Producer") || e.job === "Series Director"));
        const roterista = data.find(e => (e.job === "Short Story" || e.known_for_department === "Writing"));

        if(diretor) valorDiretor = diretor.name;
        if(roterista) valorRoterista = roterista.name;
    }

    const card = `
        <div class="entrevista-item">
            <div class="entrevista-img">
                <img src="${imageBaseUrl}/${e.link_img}" alt="${e.name}" rel="nofollow">
            </div>
            <div class="entrevista-content">
                <h3 class="entrevista-item-title"><span class="entrevista-item-title-span">Media: </span><a
                        href="${e.link_site}" target="_blank"
                        rel="nofollow">${e.name}</a></h3>
                <div class="entrevista-item-content">
                    <p><span>Diretor: </span>${valorDiretor}</p>
                    <div class="entrevista-content-flex">
                        <p><span>Roteiro: </span>${valorRoterista}</p>
                        <p><span>Estreia: </span><time datetime="${e.date}">${formatDate(e.date)}</time></p>
                    </div>
                </div>
            </div>
        </div>
    `; 
    marketingDiv.innerHTML += card;
}
