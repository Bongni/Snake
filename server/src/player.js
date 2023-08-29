export default class Player {
    #name;
    #lastScore;
    #highScore;

    constructor (name, highScore = 0, lastScore = 0) {
        this.#name = name;
        this.#highScore = highScore;
        this.#lastScore = lastScore;
    }

    getName () {
        return this.#name;
    }

    setName (name) {
        this.#name = name;
    }

    getHighScore () {
        return this.#highScore;
    }

    setHighScore (score) {
        if(score > this.#highScore)
            this.#highScore = score;
    }

    getLastScore () {
        return this.#lastScore
    }

    setLastScore (score) {
        this.#lastScore = score;
    }
}