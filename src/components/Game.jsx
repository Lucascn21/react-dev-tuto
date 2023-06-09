import { useState } from "react";
import { Board } from "./Board";

export const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  let moves = history.map((squares, move) => {
    let description;
    if (move > 0 && move < history.length - 1) {
      description = "Go to move #" + move;
    } else if (move === currentMove) {
      description = "You are at move #" + Number(currentMove + 1);
    } else {
      description = "Go to game start";
    }

    return (
      <li key={move}>
        {move === currentMove ? (
          <p>{description}</p>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  if (!isAscending) {
    moves.reverse();
  }
  const toggleMoveOrder = () => {
    setIsAscending(!isAscending);
  };
  return (
    <div className="game">
      <div className="game-board">
        <Board
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
          toggleMoveOrder={toggleMoveOrder}
        />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
