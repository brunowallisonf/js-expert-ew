const http = require("http")
const DEFAULT_USER  = {username:"test",password:"123"}
const routes = {
    "/contact:get": (request,response) => {
        response.write("Contact us page")
        response.end()
    },
    "/login:post":async (request,response) => {
        for await (const data of request){
            const user = JSON.parse(data)
           if(user.username ===DEFAULT_USER.username && user.password===DEFAULT_USER.password){
               response.write("Login has succeeded")

           }else{
            response.writeHead(401)
            response.write("Logging fail")
           }

           response.end()
        }
        response.end()
    },
    default: (request,response) => {
        response.write("Hello world")
        response.end()
    }

}

const handler = function(request,response) {
    const {url,method} = request;
    const routeKey = `${url}:${method.toLowerCase()}`
  
    const chosen = routes[routeKey] || routes.default
    response.writeHead(200,{
        "Content-Type": "text/html"
    })
    chosen(request,response)
}

const app = http.createServer(handler).listen(3000,() => console.log("App running at",3000))


module.exports = app