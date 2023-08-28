import { useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'; 
import './App.css';

import Game from './components/game';
import Player from './components/player';
import Start from './components/start';
import GameOver from './components/gameOver';

function App() {
  const player = new Player();
  const game = new Game(player);

  const bodyRef = useRef(null);

  const navigate = useNavigate();

  document.addEventListener('StartGame', () => {
    navigate("/game");
  });

  document.addEventListener('GameOver', () => {
    navigate("/gameOver");
  });

  document.addEventListener('Restart', () => {
    navigate("/game");
  })

  document.addEventListener('Exit', () => {
    navigate("/");
  })

  return (
    <div className="App">
      <body ref={bodyRef}>
          <Routes>
            <Route exact path="/" element={<Start player={player} />} />
            <Route exact path="/game" element={game.render()} />
            <Route exact path="/gameOver" element={<GameOver player={player} />} />
          </Routes>
      </body>
    </div>
  );
}

export default App;
