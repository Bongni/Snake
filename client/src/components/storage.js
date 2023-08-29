import React, { useState } from 'react';

import Player from './player'

function save(player) {

}

function load(name) {
    const json = fetch(`api?name=${name}`)
        .then((res) => res.json());

    return new Player(json.name, json.highScore);
}

export {save, load};