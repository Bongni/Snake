import fs from 'fs'

import Player from './player.js';

const PATH = './server/resources/players';

function save (player) {
    const playerList = loadPlayerList();

    if (!playerList.has(player.getName()) || playerList.get(player.getName()) < player.getHighScore()) {
        playerList.set(player.getName(), player.getHighScore());
        savePlayerList(playerList);
    }
}

function load (name) {
    const playerList = loadPlayerList();

    return playerList.has(name) ? new Player(name, playerList.get(name)) : new Player(name);
}

function savePlayerList (playerList) {
    const json = JSON.stringify(playerList);

    writeFile(PATH, json);
}

function loadPlayerList () {
    return fs.readFile(PATH, "utf-8", (err, data) => {
        if(err) {console.log(err)}
        
        if(data == "") {
            return new Map();
        }
    
        console.log("Content: " + data);
    
        return JSON.parse(data);
    });
}

const writeFile = async (path, content) => {
    await fs.writeFile(path, content, "utf8" , (err) => {
        if(err) console.log(err);
        console.log("Written to file.");
    });
}

export {load, save};