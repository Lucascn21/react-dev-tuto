export const Square = ({ value, onSquareClick, isWinningSquare }) => {
  return (
    <button
      className={isWinningSquare ? "square winningSquare" : "square"}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
};
