import { useEffect } from 'react';
import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom'; 

import Player from './components/player';
import Start from './components/start';
import GameWrapper from './components/game';
import GameOver from './components/gameOver';

function App() {
  const player = new Player();

  
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener('StartGame', (event) => {
      player.setName(event.detail.name);
      navigate("/game", getState());
    });
  
    document.addEventListener('GameOver', (event) => {
      player.setLastScore(event.detail.score);
      player.setHighScore(event.detail.score);
      navigate("/gameOver", getState());
    });
  
    document.addEventListener('Restart', () => {
      navigate("/game", getState());
    })
  
    document.addEventListener('Exit', () => {
      navigate("/");
    })
  }, []);

  function getState () {
    const name = player.getName();
    const lastScore = player.getLastScore();
    const highScore = player.getHighScore();

    return { state: { name, lastScore, highScore } };
  }

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Start />} />
        <Route exact path="/game" element={<GameWrapper />} />
        <Route exact path="/gameOver" element={<GameOver />} />
      </Routes>
    </div>
  );
}

export default App;
