import init, { Role, round, stringToSelection, sampleSelection, message } from "../logic/rps.js";
import Game from "./game.js";
await init();

// GET ALL REQUIRED HTML ELEMENTS
const roundElement = document.querySelector(".round");
const scoreHumanElement = document.querySelector(".score-human");
const scoreComputerElement = document.querySelector(".score-computer");
const resultElement = document.querySelector(".result");
const gameElement = document.querySelector(`div[aria-label="game"]`);
const bodyElement = document.querySelector("body");

// CHECK IF ALL ELEMENTS EXISTS
if (!roundElement || !resultElement || !gameElement ||
    !scoreHumanElement || !scoreComputerElement ||
    !bodyElement) {
    console.error("Cannot find element");
    throw new Error("Document element was null.");
}

// FUNCTION TO UPDATE THE ROUND INFORMATION
function textUpdate() {
    roundElement.textContent = `Round ${game.round}`;
    scoreHumanElement.textContent = `Human: ${game.human}`;
    scoreComputerElement.textContent = `Computer: ${game.computer}`;
}

// INITIALISE THE GAME AND MAKE ONE UPDATE
const game = new Game();
textUpdate();

// FUNCTION TO MAKE THE END SCREEN
function displayEndScreen(winner) {
    bodyElement.removeChild(gameElement);

    const container = document.createElement("div");
    container.setAttribute("aria-label", "game");
    container.style["display"] = "flex";
    container.style["flexDirection"] = "column";
    container.style["alignItems"] = "center";
    container.style["gap"] = "32px";
    bodyElement.appendChild(container);

    const endMessage = document.createElement("p");
    endMessage.classList.add("component");
    container.appendChild(endMessage);

    if (winner === Role.Computer) {
        endMessage.innerText = "Ohh no. The computer wins.";
    } else {
        endMessage.innerText = "Yeah. The human wins.";
    }

    const reset = document.createElement("button");
    reset.textContent = "Reset";
    reset.classList.add("component");
    container.appendChild(reset);

    reset.addEventListener("click", () => {
        game.reset();
        textUpdate();
        resultElement.textContent = "Waiting for the first round."
        
        bodyElement.removeChild(container);
        bodyElement.appendChild(gameElement);
    });
}

// ADD CLICK EVENT TO THE BUTTONS
document.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", (event) => {
        const selection = stringToSelection(button.getAttribute("data-type"));
        const versus = round(selection, sampleSelection());

        const matchWinner = game.increment(versus.winner);
        if (matchWinner !== Role.None) {
            displayEndScreen(matchWinner);
        } else {
            const result = message(versus);
            resultElement.textContent = result;
            textUpdate();
        }
    });
});


