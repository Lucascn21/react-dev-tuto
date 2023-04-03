import { Square } from "./Square";

export const Board = ({ xIsNext, squares, onPlay, toggleMoveOrder }) => {
  function isFilled(square) {
    return square != null;
  }

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status,
    winningLine = [];

  if (winner) {
    status = "Winner: " + winner.playerSymbol;
    winningLine = winner.winningLine;
  } else if (!winner && squares.every(isFilled)) {
    status = "Draw";
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function renderRows(minRange, maxRange) {
    return (
      <div className="board-row">
        {squares.map((square, index) =>
          index < maxRange && index >= minRange ? (
            <Square
              value={squares[index]}
              onSquareClick={() => handleClick(index)}
              key={index}
              isWinningSquare={winningLine.includes(index)}
            />
          ) : null
        )}
      </div>
    );
  }
  return (
    <>
      <div className="status">{status}</div>
      {renderRows(0, 3)}
      {renderRows(3, 6)}
      {renderRows(6, 9)}
      <button
        onClick={() => {
          toggleMoveOrder();
        }}
      >
        toggle moves order
      </button>
    </>
  );
};

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { playerSymbol: squares[a], winningLine: lines[i] };
    }
  }
  return null;
}
