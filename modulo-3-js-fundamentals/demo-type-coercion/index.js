console.assert(String(123) === "123")
console.assert(123 + "" === "123")

if (null || 1) {
    console.log("Hi")
}

if (null || -1) {
    console.log("Hi")
}

if ("hello" || 0) {
    console.log("Hi")
}

console.log(1 && "hello")