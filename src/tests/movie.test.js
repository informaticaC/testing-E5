const request = require("supertest");
const app = require("../app");
const Actor = require("../models/Actor");
const Director = require("../models/Director");
const Genre = require("../models/Genre");
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

test('POST `URL_BASE/:id/actors`, should return', async() => { 
    const bodyActorForTest ={
        firstName: "Paco",
        lastName: "Maloso",
        nationality: "afganistan",
        image: "actor photo",
        birthday: "1980-11-20"
    };

    const actor = await Actor.create(bodyActorForTest);

    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/actors`)
        .send([actor.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    actor.destroy();
 })

 test('POST `URL_BASE/:id/directors`, should return', async() => { 
    const bodyDirectorForTest ={
        firstName: "Loco",
        lastName: "Lindo",
        nationality: "Ever Green",
        image: "director photo",
        birthday: "1980-11-20"
    };

    const director = await Director.create(bodyDirectorForTest);

    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/directors`)
        .send([director.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    director.destroy();
 })

 test('POST `URL_BASE/:id/genres`, should return', async() => { 
    const bodyGenreForTest ={
        name: "de llorar"
        
    };

    const genre = await Genre.create(bodyGenreForTest);

    const res = await request(app)
        .post(`${URL_BASE}/${movieId}/genres`)
        .send([genre.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    genre.destroy();
 })

test("DELETE 'URL_BASE', should return status code 204", async()=>{ 

    const res = await request(app)
        .delete(`${URL_BASE}/${movieId}`)

    expect(res.status).toBe(204)
})
