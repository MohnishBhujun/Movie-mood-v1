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
const mood = {
    happy: [movieGenres.Comedy, movieGenres.Romance, movieGenres.Animation, movieGenres.Family],
    bored: [movieGenres.Comedy, movieGenres.Documentary, movieGenres.Drama, movieGenres.History, movieGenres.War],
    scared: [movieGenres.Horror, movieGenres.Mystery, movieGenres.Thriller],
    sad: [movieGenres.Drama, movieGenres.Romance, movieGenres.Documentary],
    funny: [movieGenres.Comedy, movieGenres.Animation, movieGenres.Family],
    adventurous: [movieGenres.Action, movieGenres.Adventure, movieGenres.Fantasy, movieGenres.Western],
};