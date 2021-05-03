const http = require('http')
const path = require('path')
const BaseRepository = require("./repository/base/BaseRepository")
const carCategoryDatabase = path.join(__dirname, "..","database","carCategories.json")
const carsDatabase = path.join(__dirname, "..","database","cars.json")
const customerDatabase  = path.join(__dirname, "..","database","customers.json")
const CarService = require("../src/service/CarService")

const buildDependencies = () => {
    const carService = new CarService({cars: carsDatabase});
    const carCategoryRepository = new BaseRepository({file: carCategoryDatabase})
    const customerRepository = new BaseRepository({file: customerDatabase})
    return {
        carService,
        carCategoryRepository,
        customerRepository
    }
}
class Api{
    constructor(deps = buildDependencies()) {
        this.carService = deps.carService;
        this.carCategoryRepository = deps.carCategoryRepository;
        this.customerRepository = deps.customerRepository;
    }

    generateServer () {
            const api = http.createServer(async function(req,res)  {
                const routes = this.generateRoutes();
                const [request] = `${req.method.toLowerCase()}:${req.url}`.split("?")
                const routeMethod = routes[request] || routes["default"];
                return await routeMethod.bind(this)(req,res)
            }.bind(this)).listen(3000)
            return api;
    };
        generateRoutes (){
          return  {
                "get:/cars/available":async function (req,res)  {
                const [,categoryId] = (req.url.split("?")[1].split("&").find(item =>item.includes("categoryId"))).split("=")
                const carCategory = await this.carCategoryRepository.find(categoryId)
                const availableCar = await this.carService.getAvailableCar(carCategory)
                res.setHeader("Content-Type", "application/json")
                res.write(JSON.stringify(availableCar))
                return res.end()
            },


                "post:/cars/rent":async function (req,res)  {
                for await (const test of req) {
                    const data = JSON.parse(test.toString())
                    const carCategory = await this.carCategoryRepository.find(data.categoryId)
                    const customer = await this.customerRepository.find(data.customerId)
                    const result = await this.carService.rent(customer, carCategory, data.days)
                    res.writeHead(200, {
                        "Content-Type": "application/json"
                    })
                    res.write(JSON.stringify(result))
                    return res.end()
                }
            },

                "default": function (req,res)  {
                res.write("Default Route")
                return res.end()
            }
            }
        };


}



module.exports  = () => new Api();