const options = {
    method: "GET",
    mode: "cors",
    cache: "default"
}

function fetchMovie(url, func, str, num, genre) {
    if (str) {
        fetch(url, options)
            .then(res => res.json())
            .then(data => func(data[str], num, genre))
            .catch(err => console.log('Erro: ' + err));
    } else {
        fetch(url, options)
            .then(res => res.json())
            .then(data => func(data, num, genre))
            .catch(err => console.log('Erro: ' + err));
    }
}
