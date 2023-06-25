const request = require("supertest");
const app = require("../app")
require('../models')

const URL_BASE = '/api/v1/directors'
let directorId;

beforeAll(() => {
    console.log("Iniciando todos los tests de Marcelito para director")
})


test("POST -> 'URL_BASE', should return status code 201 and res.body.firstName === bodyForTest.firstName", async()=>{
    const bodyForTest ={
        "firstName": "Sandwich",
        "lastName": "Demilanesa",
        "nationality": "Deporhay",
        "image": "otro muy bien 10",
        "birthday": "1980-11-20"
    };

    const res = await request(app).post(URL_BASE).send(bodyForTest)

    directorId = res.body.id;
        
    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(bodyForTest.firstName)

});

test("GET 'URL_BASE', should return status code 200 and res.body.length === 1", async()=>{

    const res = await request(app).get(URL_BASE)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    
})

test("GET ONE 'URL_BASE', should return status code 200 and res.body.firstName === bodyForTest.firstName", async()=>{

    const res = await request(app).get(`${URL_BASE}/${directorId}`)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe("Sandwich")
    
})

test("PUT 'URL_BASE', should return status code 200 and res.body.firstName === bodyForTest.firstName", async()=>{ 
    const bodyForTest = {
        firstName: "Asimetrico"
    }

    const res = await request(app)
        .put(`${URL_BASE}/${directorId}`)
        .send(bodyForTest);
        
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(bodyForTest.firstName)

})

test("DELETE 'URL_BASE', should return status code 204", async()=>{ 

    const res = await request(app)
        .delete(`${URL_BASE}/${directorId}`)

    expect(res.status).toBe(204)
})
