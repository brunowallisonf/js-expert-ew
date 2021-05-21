import database from "../database.json";
import Person from "./person.js";
import TerminalController from "./terminalController.js"

const DEFAULT_LANG = "pt-BR"

const STOP_TERM = ":q";

const terminalController = new TerminalController();
terminalController.initializeTerminal(database,DEFAULT_LANG)

async function mainLoop() { 
    try{
        console.log("here")
        const answer = await terminalController.question("What??");
        if(answer===STOP_TERM){
            terminalController.closeTerminal()
            console.log("Process Finished! ")
            return 0;
        }
        const person = Person.generateIntanceFromString(answer)
        console.log("Person", person.formatted(DEFAULT_LANG))
        return mainLoop();
    }catch(error){
        console.log(error)
        return mainLoop();
    }
}

await mainLoop();