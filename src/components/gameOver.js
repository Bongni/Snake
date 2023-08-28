import React from 'react';

import './gameOver.css';

const Exit = new Event('Exit');
const Restart = new Event('Restart');

const GameOver = ({player}) => {
    function handleExit () {
        document.dispatchEvent(Exit);
    }

    function handleRestart () {
        document.dispatchEvent(Restart);
    }

    return (
        <div class="gameOver">
            <h1>Game Over {player.getName()}</h1>
            <p>Final Score {player.getLastScore()}</p>
            <p>Your High Score {player.getHighScore()}</p>
            <button onClick={handleRestart}>
                Again
            </button>
            <button onClick={handleExit}>
                I go home
            </button>
        </div>
    );
}

export default GameOver;