const API_KEY = '4bbb8ceb5a053933e9b70030fc01fa63';
const baseUrl = 'https://api.themoviedb.org/3';
const siteUrl = 'https://www.themoviedb.org';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
var movies = [];

const API_DISCOVER = `${baseUrl}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

const API_GENRE = `${baseUrl}/genre/movie/list?api_key=${API_KEY}`;

const GENRES = [{ id: 28, name: "Action" }, { id: 12, name: "Adventure" }, { id: 16, name: "Animation" }, { id: 35, name: "Comedy" }, { id: 80, name: "Crime" }, { id: 99, name: "Documentary" }, { id: 18, name: "Drama" }, { id: 10751, name: "Family" }, { id: 14, name: "Fantasy" }, { id: 36, name: "History" }, { id: 27, name: "Horror" }, { id: 10402, name: "Music" }, { id: 9648, name: "Mystery" }, { id: 10749, name: "Romance" }, { id: 878, name: "Science Fiction" }, { id: 10770, name: "TV Movie" }, { id: 53, name: "Thriller" }, { id: 10752, name: "War" }, { id: 37, name: "Western" }];