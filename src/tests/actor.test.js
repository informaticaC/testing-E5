const request = require("supertest");
const app = require("../app")
const Actor = require('../models/Actor');
require('../models')

const URL_BASE = '/api/v1/actors'
let actorId;

beforeAll(() => {
    console.log("Iniciando todos los de Marcelito para el modelo Actor")
})


test("POST -> 'URL_BASE', should return status code 201 and res.body.firstName === bodyForTest.firstName", async()=>{
    const bodyForTest ={
        "firstName": "Paco",
        "lastName": "Maloso",
        "nationality": "afganistan",
        "image": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/42/Sylvester_Stallone.jpg/1200px-Sylvester_Stallone.jpg",
        "birthday": "1980-11-20"
    };

    const res = await request(app).post(URL_BASE).send(bodyForTest)

    actorId = res.body.id;
    //console.log('actorId en post:', actorId);
    
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(bodyForTest.firstName)

});

test("GET 'URL_BASE', should return status code 200 and res.body.length === 1", async()=>{

    const res = await request(app).get(URL_BASE)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    
})

test("GET ONE 'URL_BASE', should return status code 200 and res.body.firstName === 'Paco' ", async()=>{

    const res = await request(app).get(`${URL_BASE}/${actorId}`)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Paco")
})

test("PUT 'URL_BASE', should return status code 200 and res.body.firstName === bodyForTest.firstName", async()=>{ 
    const bodyForTest = {
        firstName: "Peter"
    }

    console.log('actorId:', actorId)

    const res = await request(app)
        .put(`${URL_BASE}/${actorId}`)
        .send(bodyForTest);
        
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(bodyForTest.firstName)

})

test("DELETE 'URL_BASE', should return status code 204", async()=>{ 

    const res = await request(app)
        .delete(`${URL_BASE}/${actorId}`)

    expect(res.status).toBe(204)
})



// routerActor.route('/')
//     .get(getAll)
//     .post(create); test listo

// routerActor.route('/:id')
//     .get(getOne)
//     .delete(remove)
//     .put(update);