const {describe,it} = require('mocha')
const app = require('../../src/routes')
const request = require("supertest")
const {expect} = require("chai")
const sinon = require("sinon")
describe('API Test suite',() => {
    let sandbox = {}
    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })
    it("Should return correct report when passed a valid car category, a valid customer and a valid amount of days",async () =>{
        const now = new Date(2021,3,20,0,0,0)
        sandbox.useFakeTimers(now.getTime())
        const response = await request(app).post("/cars/rent").send({
            "customerId":"716ae7e8-8294-4dc6-9dd3-659b99c3f124",
            "categoryId":"1f55002e-a042-4503-870d-3acc48fe3bb8",
            "days":4
        }
        )
        const parsedResponse = JSON.parse(response.text)
        console.log(parsedResponse)
        expect(parsedResponse.amount).to.be.equal("R$ 451,41")
        expect(parsedResponse.dueDate).to.be.equal("24 de abril de 2021")
    })

    const { expect } = require("chai")
})