const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");
const Actor = require("./Actor")

// n --> m relation, MoviesGenres: table pivot between Movie and Genre
Movie.belongsToMany(Genre, {through: 'MoviesGenres'});
Genre.belongsToMany(Movie, {through: 'MoviesGenres'});

// n --> m relation, MoviesDirectors: table pivot between Movie and Director
Movie.belongsToMany(Director, {through: 'MoviesDirectors'})
Director.belongsToMany(Movie, {through: 'MoviesDirectors'})

// n --> m relation, MoviesActors: table pivot between Movie and Actor
Movie.belongsToMany(Actor, {through: 'MoviesActors'})
Actor.belongsToMany(Movie, {through: 'MoviesActors'})

