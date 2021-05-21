import readline from "readline";
import Draftlog from "draftlog";
import chalk from "chalk";
import chalkTable from "chalk-table"

import Person from "./person.js"
export default class TerminalController {
    constructor(){
        this.print = {}
        this.data = {}
    }
    initializeTerminal(database,language){
        Draftlog(console).addLineListener(process.stdin)
        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        this.initalizeTable(database,language)
    }
    initalizeTable(database, language){
        this.data = database.map(item => new Person(item).formatted(language))
        const table = chalkTable(this.getTableOptions(),this.data)
        this.print = console.draft(table);
    }
    question(msg = "") {
       return new Promise((resolve)=> {
           return this.terminal.question(msg,resolve)
       })
    }
    closeTerminal(){
        this.terminal.close;
    }
    getTableOptions(){ 
        return {
            leftPad: 2,
            columns: [
                {field: "id",name: chalk.cyan("ID")},
                {field: "vehicles",name: chalk.magenta("Vehicles")},
                {field: "kmTraveled",name: chalk.magenta("KM Traveled")},
                {field: "from",name: chalk.cyan("From")},
                {field: "to",name: chalk.blue("To")},
            ]
        }
    }
  
}