const baseURL = "https://api.themoviedb.org/3";
const popularMoviesURL = `${baseURL}/movie/popular`;
const popularTVShowsURL = `${baseURL}/tv/popular`;
const detailsURL = `${baseURL}/movie/`;
const searchURL = `${baseURL}/search/movie`;
const accountURL = `${baseURL}/account`;
const authenticationURL = `${baseURL}/authentication`;
const favoriteMoviesURL = `${baseURL}/account/{account_id}/favorite/movies`;
const favoriteTVShowsURL = `${baseURL}/account/{account_id}/favorite/tv`;
const topMoviesURL = `${baseURL}/movie/top_rated`;
const topTVShowsURL = `${baseURL}/tv/top_rated`;
const logoURL = "https://image.tmdb.org/t/p/w500";
const popularMovies = [];
const popularTVShows = [];
const topRatedMovies = [];
const topRatedTVShows = [];


function reload() {
  const moviesContainer = document.getElementById("movies-container");
  const tvShowsContainer = document.getElementById("tv-shows-container");
  moviesContainer.innerHTML = "";
  tvShowsContainer.innerHTML = "";  
  getPopularMovies();
  getPopularTVShows();
  getTopRatedMovies();
  getTopRatedTVShows();
  banner();
}

function init(){
  fetchPopularMovies();
  fetchPopularTVShows();
  fetchTopRatedMovies();
  fetchTopRatedTVShows();
}

function banner() {
  const bannerContainer = document.getElementById("carousel-banner");

  bannerContainer.innerHTML = ` 
          <div class="carousel-item active mt-3 ">
            <div class="card mb-3 bg-dark bg-gradient text-white mx-auto" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${logoURL}${popularMovies[0].poster_path}" class="img-fluid rounded-start" alt="${popularMovies[0].title}">
                </div>
                <div class="col-md-8">
                  <div class="card-body d-flex flex-column justify-content-between h-100">
                    <h5 class="card-title">${popularMovies[0].title}</h5>
                    <p class="card-text">${popularMovies[0].overview}</p>
                    <button class="btn btn-primary w-50 align-self-end">Watch Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item mt-3">
            <div class="card mb-3 bg-dark bg-gradient text-white mx-auto" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${logoURL}${popularMovies[1].poster_path}" class="img-fluid rounded-start" alt="${popularMovies[1].title}">
                </div>
                <div class="col-md-8">
                  <div class="card-body d-flex flex-column justify-content-between h-100">
                    <h5 class="card-title">${popularMovies[1].title}</h5>
                    <p class="card-text">${popularMovies[1].overview}</p>
                    <button class="btn btn-primary w-50 align-self-end">Watch Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="carousel-item mt-3">
            <div class="card mb-3 bg-dark bg-gradient text-white mx-auto" style="max-width: 540px;">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${logoURL}${popularMovies[2].poster_path}" class="img-fluid rounded-start" alt="${popularMovies[2].title}">
                </div>
                <div class="col-md-8">
                  <div class="card-body d-flex flex-column justify-content-between h-100">
                    <h5 class="card-title">${popularMovies[2].title}</h5>
                    <p class="card-text">${popularMovies[2].overview}</p>
                    <button class="btn btn-primary w-50 align-self-end">Watch Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
}

function getPopularMovies() {
  popularMovies.forEach((movie) => {
    const movieCard = document.getElementById("movies-container");
    movieCard.innerHTML += `<div class= "container col-2 p-2">
     <div class="d-flex flex-wrap h-100 border-0 " >
      
              <img src="${logoURL}${movie.poster_path}" class="card-img-top" alt="${movie.title}">
              
              <div class="card-body align-self-end pt-1">
                  <h6 class="card-title">${movie.title}</h3>
                  <p class="card-text m-0">Release Date: ${movie.release_date}</p>
                  <p class="card-text m-0">Rating: ${movie.vote_average}</p>
              </div>
      </div>
      </div>`;
  });
}

async function fetchPopularTVShows() {
  try {
    const response = await fetch(`${popularTVShowsURL}?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    console.log("popular tv shows data;", data);
    console.log("Popular TV Shows results:", data.results);
    popularTVShows.push(...data.results);
    getPopularTVShows();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular tv shows:", error);
    return [];
  }
}

async function fetchPopularMovies() {
  try {
    const response = await fetch(`${popularMoviesURL}?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    console.log("popular movies data;", data);
    console.log("Popular Movies results:", data.results);
    popularMovies.push(...data.results);
    getPopularMovies();
    banner();
    return data.results;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}

function getPopularTVShows() {
  const tvShowsContainer = document.getElementById("tv-shows-container");
  popularTVShows.forEach((tvShow) => {
    tvShowsContainer.innerHTML += `<div class= "container col-2 p-2">
     <div class="d-flex flex-wrap h-100 border-0 " >
      
              <img src="${logoURL}${tvShow.poster_path}" class="card-img-top" alt="${tvShow.name}">
              
              <div class="card-body align-self-end pt-1">
                  <h6 class="card-title">${tvShow.name}</h3>
                  <p class="card-text m-0">Release Date: ${tvShow.first_air_date}</p>
                  <p class="card-text m-0">Rating: ${tvShow.vote_average}</p>
              </div>
      </div>
      </div>`
})
}

async function fetchTopRatedMovies() {
  try {
    const response = await fetch(`${topMoviesURL}?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    console.log("top rated movies data;", data);
    console.log("Top Rated Movies results:", data.results);
    topRatedMovies.push(...data.results);
    getTopRatedMovies();
    return data.results;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return [];
  }
}

async function fetchTopRatedTVShows() {
  try {
    const response = await fetch(`${topTVShowsURL}?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    console.log("top rated tv shows data;", data);
    console.log("Top Rated TV Shows results:", data.results);
    topRatedTVShows.push(...data.results);
    getTopRatedTVShows();
    return data.results;
  } catch (error) {
    console.error("Error fetching top rated tv shows:", error);
    return [];
  }
}

function getTopRatedMovies() {
  const topMoviesContainer = document.getElementById("top-movies-container");
  topRatedMovies.forEach((movie) => {
    topMoviesContainer.innerHTML += `<div class= "container col-2 p-2">
     <div class="d-flex flex-wrap h-100 border-0 " >
      
              <img src="${logoURL}${movie.poster_path}" class="card-img-top" alt="${movie.title}">
              
              <div class="card-body align-self-end pt-1">
                  <h6 class="card-title">${movie.title}</h3>
                  <p class="card-text m-0">Release Date: ${movie.release_date}</p>
                  <p class="card-text m-0">Rating: ${movie.vote_average}</p>
              </div>
      </div>
      </div>`
})
}

function getTopRatedTVShows() {
  const topTVShowsContainer = document.getElementById("top-tv-shows-container");
  topRatedTVShows.forEach((tvShow) => {
    topTVShowsContainer.innerHTML += `<div class= "container col-2 p-2">
     <div class="d-flex flex-wrap h-100 border-0 " >
      
              <img src="${logoURL}${tvShow.poster_path}" class="card-img-top" alt="${tvShow.name}">
              
              <div class="card-body align-self-end pt-1">
                  <h6 class="card-title">${tvShow.name}</h3>
                  <p class="card-text m-0">Release Date: ${tvShow.first_air_date}</p>
                  <p class="card-text m-0">Rating: ${tvShow.vote_average}</p>
              </div>
      </div>
      </div>`
})
}


init();
