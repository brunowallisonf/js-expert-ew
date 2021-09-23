"use strict"

const {watch, promises: { readFile } } = require("fs");
class File {
    watch(event, filename){
        this.showContent(filename)
    }

    async showContent(){
        console.log((await readFile(filename)).toString())
    }
}
const file = new File()


file.watch.call({showContent() { console.log("Hello fowks")}},null, "index.js")
file.watch.apply({showContent() { console.log("Hello fowks")}},[null, "index.js"])
