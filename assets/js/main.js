// API key (Yes I know this is unsecure)
const apiKey = "eaea323db76508a71d993148477ad36f";

// Object to store the movie genres
const movieGenres = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  ScienceFiction: 878,
  TVMovie: 10770,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

// Mood object to store moods and genres associated with it
const moodsToGenres = {
  happy: [
    movieGenres.Comedy,
    movieGenres.Romance,
    movieGenres.Animation,
    movieGenres.Family,
  ],
  bored: [
    movieGenres.Comedy,
    movieGenres.Documentary,
    movieGenres.Drama,
    movieGenres.History,
    movieGenres.War,
  ],
  scared: [movieGenres.Horror, movieGenres.Mystery, movieGenres.Thriller],
  sad: [movieGenres.Drama, movieGenres.Romance, movieGenres.Documentary],
  funny: [movieGenres.Comedy, movieGenres.Animation, movieGenres.Family],
  adventurous: [
    movieGenres.Action,
    movieGenres.Adventure,
    movieGenres.Fantasy,
    movieGenres.Western,
  ],
};

//Functions
// Function to create search parameters for AJAX call
function createSearchParameters() {
  // Get the mood from the mood dropdown
  const mood = $("#mood").val();
  // Get rating range from the rating dropdown
  const rating = $("#rating").val();
  // Get start year and end year from text boxes
  const startYear = $("#startYear").val();
  const endYear = $("#endYear").val();

  // Debug zone
  console.log(mood, rating, startYear, endYear);
}

// Settings for the AJAX call
var settings = {
  async: true,
  crossDomain: true,
  // URL for the AJAX call, url is set by the 
  url: "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=53%7C36%7C878",
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWVhMzIzZGI3NjUwOGE3MWQ5OTMxNDg0NzdhZDM2ZiIsInN1YiI6IjY1OTc1OGY4ZWY5ZDcyMWQyZTEyYjVlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zyau9BDNn_4vkghL57r3ZBpL5ovsUC3SMb7KJKKb3wc",
  },
};

// On click function for the submit button
$(".randomise").on("click", function () {
    $.ajax(settings).done(function (response) {
        // Get movies from response
        const movies = response.results;
        // Get random movie from movies array
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        // Get movie title
        const movieTitle = randomMovie.title;
        // Get movie overview
        const movieOverview = randomMovie.overview;
        // Get movie poster
        const moviePoster = randomMovie.poster_path;
        // Get movie release date
        const movieReleaseDate = randomMovie.release_date;
        // Get movie genre
        const movieGenre = randomMovie.genre_ids;
        console.log(movieTitle, movieOverview, moviePoster, movieReleaseDate, movieGenre);
    });
});

// Global debug zone
$(".feeling-lucky").on("click", function () {
    createSearchParameters();
});