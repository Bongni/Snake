import logo from './logo.svg';
import './App.css';

import Game from './components/game';

function App() {
  const game = new Game();

  return (
    <div className="App">
      <body>
        {game.render()}
      </body>
    </div>
  );
}

export default App;
