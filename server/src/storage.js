import RNFS from 'react-native-fs';

import Player from './player';

const PATH = '../resources/players';

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

    writeFile(PATH, json, (err) => {
        if (err) throw err;
        else
            console.log("The file was updated.");
    });
}

function loadPlayerList () {
    const content = readFile(PATH, (err, input) => {
        if (err) throw err;
            console.log(input.toString());
    });

    if(content == "") {
        return new Map();
    }

    return JSON.parse(content);
}

const writeFile = async (path, content) => {
    try {
        await RNFS.writeFile(path, content, "utf8");
        console.log("Written to file.");
    } catch (error) {
        console.log(error);
    }
}

const readFile = async (path) => {
    return await RNFS.readFile(path);
}

export {load, save};