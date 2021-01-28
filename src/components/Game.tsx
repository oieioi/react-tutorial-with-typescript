import React, { useState } from 'react';
import Board from './Board';

interface GameProps {
}

const Game: React.FC<GameProps> =() =>{
    const [history, setHistory] = useState<string[][]>[];
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default Game;
