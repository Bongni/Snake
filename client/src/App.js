import { useEffect, useState } from 'react';
import './App.css';

import { Routes, Route, useNavigate } from 'react-router-dom'; 

import Start from './components/start';
import GameWrapper from './components/game';
import GameOver from './components/gameOver';
import Player from './components/player';

function App() {
  
  const navigate = useNavigate();
  const [player, setPlayer] = useState(new Player(""));

  useEffect(() => {
    document.addEventListener('StartGame', (event) => {
      const encodedName = encodeURIComponent(event.detail.name);

      fetch(`http://localhost:3001/get?name=${encodedName}`)
        .then((res) => res.json())
        .then((data) => {
          player.setName(data.name);
          player.setHighScore(data.highScore);

          navigate("/game", getState(player));
        })
        .catch(err => console.log(err.message));
    });
  
    document.addEventListener('GameOver', (event) => {
      player.setLastScore(event.detail.score);
      player.setHighScore(event.detail.score);
      navigate("/gameOver", getState());
    });
  
    document.addEventListener('Restart', () => {
      navigate("/game", getState());
    });
  
    document.addEventListener('Exit', () => {
      fetch(`http://localhost:3001/post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: player.getName(),
          highScore: player.getHighScore()
        })
      }).then(() => {
          player.reset();
          navigate("/");
        })
        .catch((err) => console.log(err.message));
    });
  }, []);

  function getState () {
    return { state: { 
      name: player.getName(),
      lastScore: player.getLastScore(),
      highScore: player.getHighScore() 
    } };
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
