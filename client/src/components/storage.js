import React, { useState } from 'react';

import Player from './player'

async function save(player) {

}

async function load(name) {
    const json = await fetch(`api?name=${name}`)
        .then(async (res) => await res.json());
        
    return new Player(json.name, json.highScore);
}

export {save, load};