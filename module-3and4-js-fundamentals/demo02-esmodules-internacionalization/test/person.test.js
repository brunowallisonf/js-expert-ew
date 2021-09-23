import mocha from "mocha";
const {describe,it} = mocha;
import chai from "chai"
import {expect} from "chai";
import Person from "./../src/person.js";
describe("Person",() => {
    it("Should return a person instance from a string",() => {
        const person = Person.generateIntanceFromString("1 Bike,Moto 200000 2000-01-01 2002-02-02");
        const expected = {
            from: "2000-01-01",
            to: "2002-02-02",
            vehicles: ["Bike","Moto"],
            kmTraveled: "200000",
            id: "1",
        }

        expect(person).to.be.deep.equal(expected);
    })
    it("Should format values",() => {
        const person  = new Person({
            from: "2000-01-01",
            to: "2002-02-02",
            vehicles: ["Bike","Moto"],
            kmTraveled: "200000",
            id: "1",
        })
        const result = person.formatted("pt-BR");
        const expected = {
            id: 1,
            vehicles: 'Bike e Moto',
            kmTraveled: '200.000 km',
            from: '01 de janeiro de 2000',
            to: '02 de fevereiro de 2002'
          }
        expect(result).to.be.deep.equal(expected)
    })

})