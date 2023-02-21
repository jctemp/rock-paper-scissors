import { stringToSelection, sampleSelection, round, message } from "../pkg/rps.js";

function game() {
    for (let index = 0; index < 3; index++) {
        console.log(`Round ${index + 1}`);
        console.log();

        let input;
        do {
            input = prompt("Your selection [rock, paper, scissors]: ");
        } while (input == null)

        try {
            let versus = round(stringToSelection(input), sampleSelection());
            console.log(message(versus));
        } catch (error) {
            console.log(`Your input '${input}' is invalid. See options: [rock, paper, scissors]`)
            index--;
        }
    }

}

export default game;