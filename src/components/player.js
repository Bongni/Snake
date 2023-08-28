export default class Player {
    #name;
    #lastScore;
    #highScore;

    constructor () {
        this.#name = "";
        this.#lastScore = 0;
        this.#highScore = 0;
    }

    getName () {
        return this.#name;
    }

    setName (name) {
        this.#name = name;
    }

    getLastScore () {
        return this.#lastScore
    }

    setLastScore (score) {
        this.#lastScore = score;
    }

    getHighScore () {
        return this.#highScore;
    }

    setHighScore (score) {
        if(score > this.#highScore)
            this.#highScore = score;
    }
}