const request = require("supertest");
const app = require("../app")

require('../models')

const URL_BASE = '/api/v1/genres'
let genreId;

beforeAll(() => {
    console.log("Iniciando todos los de Marcelito para el controlador genres")
})


test("POST -> 'URL_BASE', should return status code 201 and res.body.firstName === bodyForTest.firstName", async()=>{
    const bodyForTest ={
        "name":"de llorar"
    };

    const res = await request(app).post(URL_BASE).send(bodyForTest)

    genreId = res.body.id;
    //console.log('actorId en post:', actorId);
    
    expect(res.status).toBe(201)
    expect(res.body.name).toBe(bodyForTest.name)

});

test("GET 'URL_BASE', should return status code 200 and res.body.length === 1", async()=>{

    const res = await request(app).get(URL_BASE)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    
})

test("GET ONE 'URL_BASE', should return status code 200 and res.body.name === bodyForTest.name", async()=>{

    const res = await request(app).get(`${URL_BASE}/${genreId}`)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe("de llorar")
    
})

test("PUT 'URL_BASE', should return status code 200 and res.body.name === bodyForTest.name", async()=>{ 
    const bodyForTest = {
        "name":"comedia"
    }
    
    const res = await request(app)
        .put(`${URL_BASE}/${genreId}`)
        .send(bodyForTest);
        
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(bodyForTest.name)

})

test("DELETE 'URL_BASE', should return status code 204", async()=>{ 

    const res = await request(app)
        .delete(`${URL_BASE}/${genreId}`)

    expect(res.status).toBe(204)
})