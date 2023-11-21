import { useEffect } from 'react';
import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom'; 

import Start from './components/start';
import GameWrapper from './components/game';
import GameOver from './components/gameOver';
import Player from './components/player';

function App() {
  var player;
  
  const navigate = useNavigate();

  useEffect(() => {
    document.addEventListener('StartGame', (event) => {
      player = new Player(event.detail.name);
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
