const assert = require('assert');
function* calculation(arg1, arg2) {
    yield arg1 * arg2

}

function* main() {
    yield "hello"
    yield "-"
    yield "world"
    yield* calculation(20, 10)
}
const generator = main()
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())
// console.log(generator.next())

assert.deepStrictEqual(generator.next(), { value: "hello", done: false })
assert.deepStrictEqual(generator.next(), { value: "-", done: false })
assert.deepStrictEqual(generator.next(), { value: "world", done: false })
assert.deepStrictEqual(generator.next(), { value: 200, done: false })
assert.deepStrictEqual(generator.next(), { value: undefined, done: true })

assert.deepStrictEqual(Array.from(main()), ["hello", "-", "world", 200])

assert.deepStrictEqual([...main()], ["hello", "-", "world", 200])

// Async iterators

const { readFile, stat, readdir } = require("fs/promises")

function* promisified() {
    yield readFile(__filename)
    yield Promise.resolve("hey dude")
}

async function* systemInfo() {
    const file = await readFile(__filename)
    yield { file: file.toString() }
    const { size } = await stat(__filename)
    yield { size }
    const dir = await readdir(__dirname)
    yield { dir }
}
// console.log("promisified", [...promisified()]);

// Promise.all([...promisified()]).then(results => console.log("promisified", results));

(async () => {
    for await (const item of systemInfo()) {
        console.log(item)
    }
})()