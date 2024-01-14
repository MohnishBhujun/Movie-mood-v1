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
  // Get the genre array from the mood object
  const genreArray = moodsToGenres[mood];
  // Join the genre array into a string
  const genreString = genreArray.join("%7C");
  // Get rating range from the rating dropdown
  const rating = $("#rating").val();
  // Split rating into an array
  const ratingArray = rating.split("-");
  // Get the minimum rating
  const minRating = ratingArray[0];
  // Get the maximum rating
  const maxRating = ratingArray[1];
  // Get start year and end year from text boxes
  const startYear = $("#startYear").val();
  const endYear = $("#endYear").val();

  var criteriaArray = [genreString, minRating, maxRating, startYear, endYear];
  // console.log(criteriaArray);

  return criteriaArray;
}

// Function to create the movie cards
function getRandomMovies(responseData) {
  // Pick 6 random movies from the response data
  var randomMovies = [];
  for (var i = 0; i < 6; i++) {
    var randomIndex = Math.floor(Math.random() * responseData.length);
    randomMovies.push(responseData[randomIndex]);
  }

  // console.log(randomMovies);
  return randomMovies;
}

// Function to display the movie cards
function displayMovieCards(randomMovies) {
  $('.movie-container').empty();
  randomMovies.forEach(function(movie) {
    var movieCard = $('<div>').addClass('relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md');
    var movieImageContainer = $('<div>').addClass('relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg');
    var movieImage = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w500' + movie.poster_path).attr('alt', 'movie-poster');
    var movieInfoContainer = $('<div>').addClass('p-6 text-center');
    var movieTitle = $('<h4>').addClass('mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased').text(movie.title);
    var movieYear = $('<p>').addClass('block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased').text(movie.release_date.substring(0, 4));

    movieImageContainer.append(movieImage);
    movieInfoContainer.append(movieTitle, movieYear);
    movieCard.append(movieImageContainer, movieInfoContainer);

    // Append the movie card to a container element on your page
    $('.movie-container').append(movieCard);
  });
}

// Function to create the AJAX call
function ajaxCall(criterias) {
  const settings = {
    async: true,
    crossDomain: true,
    url: `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&release_date.gte=${criterias[3]}&release_date.lte=${criterias[4]}&sort_by=vote_average.desc&vote_average.gte=${criterias[1]}&vote_average.lte=${criterias[2]}&with_genres=${criterias[0]}`,
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYWVhMzIzZGI3NjUwOGE3MWQ5OTMxNDg0NzdhZDM2ZiIsInN1YiI6IjY1OTc1OGY4ZWY5ZDcyMWQyZTEyYjVlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zyau9BDNn_4vkghL57r3ZBpL5ovsUC3SMb7KJKKb3wc",
    },
  };

  $.ajax(settings).done(function (response) {
    let randomMovies = getRandomMovies(response.results);
    displayMovieCards(randomMovies);
  });
}

$(".submit").on("click", function (event) {
  event.preventDefault();
  var criterias = createSearchParameters();
  ajaxCall(criterias);
});