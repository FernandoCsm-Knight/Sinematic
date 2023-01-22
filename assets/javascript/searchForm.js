const form  = document.querySelector('.header-form-search');
const searchBtn = form.querySelector('#headerSearchBtn');
const searchInput = form.querySelector('#search-bar');

form.onsubmit = (e) => {
    e.preventDefault();

    const url = `assets/pages/pesquisa.html?search=${searchInput.value}`;
    window.location.href = url;
}
