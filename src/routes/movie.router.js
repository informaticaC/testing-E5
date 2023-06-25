const { getAll,
      create, getOne, remove, update, setGenre, setDirector, setActor } = require('../controllers/movie.controllers');
const express = require('express');

const routerMovie = express.Router();

routerMovie.route('/')
    .get(getAll)
    .post(create);

routerMovie.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

routerMovie.route('/:id/genres') // --> /movies/<:id>/genres
    .post(setGenre);             // --> add genres to id's movie

routerMovie.route('/:id/directors') // --> /movies/<:id>/directors
    .post(setDirector);             // --> add directors to id's movie

routerMovie.route('/:id/actors') // --> /movies/<:id>/actors
    .post(setActor);             // --> add actors to id's movie
    
module.exports = routerMovie;