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
  // Get min rating and max rating from the rating array and move the decimal to the left
  const minRating = ratingArray[0] / 10;
  const maxRating = ratingArray[1] / 10;
  // Get start year and end year from text boxes
  const startYear = $("#startYear").val();
  const endYear = $("#endYear").val();

  var criteriaArray = [genreString, minRating, maxRating, startYear, endYear];
  // console.log(minRating, maxRating);

  return criteriaArray;
}

// Function to create random search parameters for AJAX call
function createRandomSearchParameters() {
  // Get a random mood from the mood object
  const mood = Object.keys(moodsToGenres)[
    Math.floor(Math.random() * Object.keys(moodsToGenres).length)
  ];
  // Get the genre array from the mood object
  const genreArray = moodsToGenres[mood];
  // Join the genre array into a string
  const genreString = genreArray.join("%7C");
  // Get a random rating option from the rating select and check if it is not NaN
  var rating = $("#rating option")
    .eq(Math.floor(Math.random() * $("#rating option").length))
    .val();
  if (rating == "NaN") {
    rating = "51-75";
  }
  // Split rating into an array
  const ratingArray = rating.split("-");
  // Get min rating and max rating from the rating array and move the decimal to the left
  const minRating = ratingArray[0] / 10;
  const maxRating = ratingArray[1] / 10;
  // Get a random start year between 1900 and 2023
  const startYear = Math.floor(Math.random() * (2023 - 1900) + 1900);
  // Get a random end year that starts between startYear and 2023
  const endYear = Math.floor(Math.random() * (2023 - startYear) + startYear);

  // console.log(mood, genreString, minRating, maxRating, startYear, endYear);
  var criteriaArray = [genreString, minRating, maxRating, startYear, endYear];

  return criteriaArray;
}
  

// Function to create the movie cards
function getRandomMovies(responseData) {
  var randomMovies = [];
  var movieIndices = [];

  while (randomMovies.length < 6) {
    var randomIndex = Math.floor(Math.random() * responseData.length);
    
    // Check if the movie index has already been added
    if (!movieIndices.includes(randomIndex)) {
      randomMovies.push(responseData[randomIndex]);
      movieIndices.push(randomIndex);
    }
  }

  return randomMovies;
}

// Function to display the movie cards
function displayMovieCards(randomMovies) {
  $('.movie-container').empty();

  randomMovies.forEach(function (movie) {
    var movieCard = $('<div>').addClass('relative flex w-96 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md movie-card').data("movie-id", movie.id);
    var movieImageContainer = $('<div>').addClass('relative mx-4 mt-4 h-80 overflow-hidden rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg');
    var movieImage = $('<img>').attr('src', 'https://image.tmdb.org/t/p/w500' + movie.poster_path).attr('alt', 'movie-poster');
    var movieInfoContainer = $('<div>').addClass('p-6 text-center');
    var movieTitle = $('<h4>').addClass('mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased movie-title').text(movie.title);
    var movieYear = $('<p>').addClass('block bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased movie-year').text(movie.release_date.substring(0, 4));

    movieImageContainer.append(movieImage);
    movieInfoContainer.append(movieTitle, movieYear);
    movieCard.append(movieImageContainer, movieInfoContainer);

    $('.movie-container').append(movieCard);
  });
}

// Function to make AJAX call
function getMovies(random) {
  // Create search parameters
  if (random != "random") {
    var searchParameters = createSearchParameters();
  } else {
    var searchParameters = createRandomSearchParameters();
  }

  // Create the query URL
  const queryURL =
    "https://api.themoviedb.org/3/discover/movie?api_key=" +
    apiKey +
    "&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=" +
    searchParameters[0] +
    "&vote_average.gte=" +
    searchParameters[1] +
    "&vote_average.lte=" +
    searchParameters[2] +
    "&primary_release_date.gte=" +
    searchParameters[3] +
    "-01-01&primary_release_date.lte=" +
    searchParameters[4] +
    "-12-31";

  // Make AJAX call
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // Get the response data
    const responseData = response.results;

    // Get 6 random movies from the response data
    const randomMovies = getRandomMovies(responseData);

    // Display the movie cards
    displayMovieCards(randomMovies);
  });
}

// Event Listeners
// Event listener for the submit button
$(".submit").on("click", function (event) {
  event.preventDefault();
  console.log("Clicked");
  getMovies();
});

// Event listener for the random button
$(".randomise").on("click", function (event) {
  event.preventDefault();
  console.log("Clicked");
  getMovies("random");
});

$(".rewind").on("click", function (event) {
  event.preventDefault();
  $('.movie-container').empty();
});

// The below code was all done by Mohnish Bhujun
// I've only re-added it here because I had accidentally deleted it. The commit SHA is: e69a02dcf06528b57ee746233e0bb942ff03376c
$(document).ready(function () {
  //Getting the modal element
  var modal = $("#myModal");

  //Getting the <span> element that closes the modal
  var span = $(".close");

// When the user clicks on a movie card, open the modal and fetch the movie details
$(document).on("click", ".movie-card", function () {
  var movieId = $(this).data("movie-id");
  var moviePoster = $(this).find("img").attr("src"); // Corrected selector to find the movie image

  // Make AJAX call to fetch the movie details
  $.ajax({
    url: "https://api.themoviedb.org/3/movie/" + movieId,
    method: "GET",
    data: {
      api_key: "eaea323db76508a71d993148477ad36f"
    }
  }).then(function (response) {
    var movieTitle = response.title;
    var movieOverview = response.overview;

    // Set the title and content of the modal
    $("#modalTitle").text(movieTitle);
    $("#modalContent").text("Overview: " + movieOverview);

    // Set the poster path for the modal
    $("#modalPoster").attr("src", moviePoster);

    // Open the modal
    $("#myModal").css("display", "block");
  });
});

  //When the user clicks on <span> (x), close the modal
  span.click(function () {
    modal.css("display", "none");
  });

  //When the user clicks anywhere outside of the modal, close it
  $(window).click(function (event) {
    if (event.target == modal[0]) {
      modal.css("display", "none");
    }
  });
});