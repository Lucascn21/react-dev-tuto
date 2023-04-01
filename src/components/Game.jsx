import React from "react";

export const Game = () => {
  const [xIsNext, setXIsNext] = useState(true);

  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
};
