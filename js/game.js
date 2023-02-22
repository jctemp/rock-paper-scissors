import { Role } from "../pkg/rps.js";

class Game {
    round = 1;
    human = 0;
    computer = 0;

    increment(value) {
        if (value == Role.Human)
            this.human += 1;
        else if (value == Role.Computer)
            this.computer += 1;
        this.round += 1;

        return this.checkMatchWinner();
    }

    checkMatchWinner() {
        if (this.human == 5) return Role.Human;
        if (this.computer == 5) return Role.Computer;
        return Role.None;
    }

    reset() {
        this.round = 1;
        this.human = 0;
        this.computer = 0;
    }
}

export default Game;