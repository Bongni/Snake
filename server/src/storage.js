import fs from 'fs'

import Player from './player.js';

const PATH = './server/resources/players.json';

function save (name, highScore) {
    const playerList = loadPlayerList();

    if (!playerList.has(name) || playerList.get(name) < highScore) {
        playerList.set(name, highScore);
        savePlayerList(playerList);
    }
}

function load (name) {
    const playerList = loadPlayerList();
    return playerList.has(name) ? new Player(name, playerList.get(name)) : new Player(name);
}

function loadPlayerList () {
    try {
        const data = fs.readFileSync(PATH, "utf-8");

        if(data == "") {
            return new Map();
        }
        
        return new Map(Object.entries(JSON.parse(data)));
    } catch (err) {
        console.error(err);
    }
}

function savePlayerList (playerList) {
    const json = JSON.stringify(Object.fromEntries(playerList));
    writeFile(PATH, json);
}

const writeFile = async (path, content) => {
    await fs.writeFile(path, content, "utf8" , (err) => {
        if(err) console.log(err);
        console.log("Written to file.");
    });
}

export {load, save};