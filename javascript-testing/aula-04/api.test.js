const {describe,it } = require("mocha")
const request = require("supertest")
const app = require("./api");
const assert  = require("assert")

describe("API suite test",() => {
    describe("/contact",() => {
        it("Should request the contact page and return HTTP Status 200",async () =>{
            const response  = await request(app).get("/contact").expect(200)
            assert.deepStrictEqual(response.text,"Contact us page")
        })
    })

    describe("/hello",() => {
        it("Should request an inexistent route /hi and redirect to /hello",async () =>{
            const response  = await request(app).get("/hi").expect(200)
            assert.deepStrictEqual(response.text,"Hello world")
        })
    })

    describe("/login",() => {
        it("Should login successfuly  on the login rount and return HTTP status 200",async () =>{
            const response  = await request(app).post("/login").send({username:"test",password:"123"}).expect(200)
            assert.deepStrictEqual(response.text,"Login has succeeded")

        })

        it("Should unhautorize and status must be 401",async () =>{
            const response  = await request(app).post("/login").send({username:"tests",password:"123"}).expect(401)
            assert.deepStrictEqual(response.text,"Logging fail")
            
        })
    })
})