const request = require("supertest");
const app = require("../app")
require('../models')

const URL_BASE = '/api/v1/movies'
let movieId;

beforeAll(() => {
    console.log("Iniciando todos los tests de Marcelito para movie")
})


test("POST -> 'URL_BASE', should return status code 201 and res.body.firstName === bodyForTest.firstName", async()=>{
    const bodyForTest ={
        name: "Terminator",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/John_Rambo.jpg/320px-John_Rambo.jpg",
        synopsis: "Muy buena, muchos tiros",
        releaseYear: "1980-01-01"
    };

    const res = await request(app).post(URL_BASE).send(bodyForTest)

    movieId = res.body.id;
        
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(bodyForTest.name)

});

test("GET 'URL_BASE', should return status code 200 and res.body.length === 1", async()=>{

    const res = await request(app).get(URL_BASE)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    expect(res.body[0].genres).toBeDefined()   
    expect(res.body[0].directors).toBeDefined()
    expect(res.body[0].actors).toBeDefined()
})

test("GET ONE 'URL_BASE', should return status code 200 and res.body.name === bodyForTest.name", async()=>{

    const res = await request(app).get(`${URL_BASE}/${movieId}`)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe("Terminator")
   
})

test("PUT 'URL_BASE', should return status code 200 and res.body.name === bodyForTest.name", async()=>{ 
    const bodyForTest = {
        name: "Terminator"
    }

    const res = await request(app)
        .put(`${URL_BASE}/${movieId}`)
        .send(bodyForTest);
        
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(bodyForTest.firstName)

})

test("DELETE 'URL_BASE', should return status code 204", async()=>{ 

    const res = await request(app)
        .delete(`${URL_BASE}/${movieId}`)

    expect(res.status).toBe(204)
})


// routerMovie.route('/')
//     .get(getAll)
//     .post(create);

// routerMovie.route('/:id')
//     .get(getOne)
//     .delete(remove)
//     .put(update);

// routerMovie.route('/:id/genres') // --> /movies/<:id>/genres
//     .post(setGenre);             // --> add genres to id's movie

// routerMovie.route('/:id/directors') // --> /movies/<:id>/directors
//     .post(setDirector);             // --> add directors to id's movie

// routerMovie.route('/:id/actors') // --> /movies/<:id>/actors
//     .post(setActor);             // --> add actors to id's movie