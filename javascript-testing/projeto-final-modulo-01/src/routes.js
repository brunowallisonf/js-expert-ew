const http = require('http')
const path = require('path')
const BaseRepository = require("./repository/base/BaseRepository")
const carCategoryDatabase = path.join(__dirname, "..","database","carCategories.json")
const carsDatabase = path.join(__dirname, "..","database","cars.json")
const customerDatabase  = path.join(__dirname, "..","database","customers.json")
const CarService = require("../src/service/CarService")

const routes = {
    "get:/cars/available":async function (req,res)  {
        const [,categoryId] = (req.url.split("?")[1].split("&").find(item =>item.includes("categoryId"))).split("=")
        const CarCategoryRepository = new BaseRepository({file: carCategoryDatabase})
        const carCategory = await CarCategoryRepository.find(categoryId)

        const carService = new CarService({cars:carsDatabase})
        const availableCar = await carService.getAvailableCar(carCategory)
        res.setHeader("Content-Type", "application/json")
        res.write(JSON.stringify(availableCar))
        return res.end()
    },
    

    "post:/cars/rent":async function (req,res)  {
        for await (test of req){}
        const data = JSON.parse(test.toString())
        const carCategoryRepository = new BaseRepository({file: carCategoryDatabase})
        const customerRepository = new BaseRepository({file: customerDatabase})
        const carCategory = await carCategoryRepository.find(data.categoryId)
        const customer = await customerRepository.find(data.customerId)
        const carService = new CarService({cars:carsDatabase})

        const result = await carService.rent(customer,carCategory,data.days)

        res.writeHead(200,{
            "Content-Type":"application/json"
        })
        res.write(JSON.stringify(result))
        return res.end()
    },

    "default": function (req,res)  {
        res.write("Default Route")
        return res.end()
    }
}

const api = http.createServer(function(req,res)  {
    const [request] = `${req.method.toLowerCase()}:${req.url}`.split("?")
    const routeMethod = routes[request] || routes["default"];
    return routeMethod(req,res)

}).listen(3000)
module.exports  = api;