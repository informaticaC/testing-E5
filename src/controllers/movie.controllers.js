const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Actor = require('../models/Actor')

const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include: [Genre, Director, Actor]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id, {include: [Genre, Director, Actor]});
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movie.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setGenre = catchError(async(req, res)=>{
    const {id} = req.params
    const movie = await Movie.findByPk(id)
    await movie.setGenres(req.body)
    const genres = await movie.getGenres()
    return res.json(genres)
})

const setDirector = catchError(async(req, res) => {
    const {id} = req.params
    const movie = await Movie.findByPk(id)
    await movie.setDirectors(req.body);
    const directors = await movie.getDirectors();
    return res.json(directors)
})

const setActor = catchError(async(req, res)=> {
    const {id}= req.params;//obtenemos el id para luego usarlo para obtener la movie, el id viene en los parámetros (/:id/...)
    const movie = await Movie.findByPk(id);// mediante el id obtengo la movie a la cual le agregaremos actors
    await movie.setActors(req.body);//agregamos los actors que vienen en el body del request(del frontend)
    const actors = await movie.getActors();// obtengo los actores recientemente agregados a la movie
    return res.json(actors);//retorno los actores recientemente agregados
})

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setGenre,
    setDirector,
    setActor
}