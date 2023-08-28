import React from 'react';
import './gameOver.css';

import { useLocation } from 'react-router-dom';

const Exit = new Event('Exit');
const Restart = new Event('Restart');

const GameOver = () => {
    const player = useLocation().state;

    function handleExit () {
        document.dispatchEvent(Exit);
    }

    function handleRestart () {
        document.dispatchEvent(Restart);
    }

    return (
        <div className="gameOver">
            <h1>Game Over {player.name}</h1>
            <p>Final Score {player.lastScore}</p>
            <p>Your High Score {player.highScore}</p>
            <div className="buttons">
                <button onClick={handleRestart}>
                    Again
                </button>
                <button onClick={handleExit}>
                    I go home
                </button>
            </div>
        </div>
    );
}

export default GameOver;