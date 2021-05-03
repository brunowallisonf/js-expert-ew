const {describe,it} = require('mocha')
const api = require('../../src/routes')
const request = require("supertest")
const {expect} = require("chai")
const sinon = require("sinon")

const mocks = {
    validCar : require("../mocks/valid-car.json"),
    validCarCategory : require("../mocks/valid-carCategory.json"),
    validCustomer : require("../mocks/valid-customer.json"),
}
describe('API Test suite',() => {
    let sandbox = {}
    let app = {}
    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })
    afterEach( () => {
        sandbox = sandbox.restore()
    })

    before(() => {
        const apiInstance = api()
        app = {
            api: apiInstance,
            server: apiInstance.generateServer()
        }
    })
    describe(("get:/cars/available"),() => {
        it("Should return a JSON containing an available car",async () =>{
            const now = new Date(2021,3,20,0,0,0)
            sandbox.useFakeTimers(now.getTime())
            const carCategory = {
                ...mocks.validCarCategory,
                carIds: [mocks.validCar.id],
                price: 40.8,
            }
            sandbox.stub(app.api.carService.carRepository,app.api.carService.carRepository.find.name).resolves(mocks.validCar)
            sandbox.stub(app.api.carCategoryRepository,app.api.carCategoryRepository.find.name).resolves(carCategory)
            const response = await request(app.server).get("/cars/available?categoryId=1f55002e-a042-4503-870d-3acc48fe3bb8")
            const expectedResult = mocks.validCar;
            const parsedResponse = response.text;
            expect(parsedResponse).to.be.deep.equal(JSON.stringify(expectedResult))
        })
    })


    describe(("post:/cars/rent"),() => {
        it("Should return correct report when passed a valid car category, a valid customer and a valid amount of days",async () =>{
            const now = new Date(2021,3,20,0,0,0)
            sandbox.useFakeTimers(now.getTime())
            const carCategory = {
                ...mocks.validCarCategory,
                carIds: [mocks.validCar.id],
                price: 40.8,
            }
            const customer  = {...mocks.validCustomer,age: 25};

            const daysNumber = 5;
            sandbox.stub(app.api.carService.carRepository,app.api.carService.carRepository.find.name).resolves(mocks.validCar)
            sandbox.stub(app.api.customerRepository,app.api.customerRepository.find.name).resolves(customer)
            sandbox.stub(app.api.carCategoryRepository,app.api.carCategoryRepository.find.name).resolves(carCategory)

            const expectedPrice = app.api.carService.currencyFormat.format( 40.8 * 1.1 *daysNumber);
            const expectedDueDate = new Date(now)
            expectedDueDate.setDate(now.getDate()+daysNumber)

            console.log(expectedPrice)
            const expectedReturn  ={
                "customer":customer,
                "car": mocks.validCar,
                "amount": expectedPrice,
                "dueDate": "25 de abril de 2021"
            }
            const response = await request(app.server).post("/cars/rent").send({
                    "customerId":"716ae7e8-8294-4dc6-9dd3-659b99c3f124",
                    "categoryId":"1f55002e-a042-4503-870d-3acc48fe3bb8",
                    "days":5
                }
            )

            const parsedResponse = response.text;
            expect(parsedResponse).to.be.deep.equal(JSON.stringify(expectedReturn))
        })
    })



    const { expect } = require("chai")
})