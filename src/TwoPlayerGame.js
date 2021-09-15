import Square from "./Square.js";
import { useState } from "react";
import { calculateWinner, isBoardFull } from "./gameLogic.js";
import ResetButton from "./ResetButton.js";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";

export default function TwoPlayerGame() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Always starts game with X
  const nextSymbol = isXNext ? "X" : "O";
  const winner = calculateWinner(squares);
  const active = winner || isBoardFull(squares) ? false : true;
  const text = active ? "Reset" : "Play again";

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          if (squares[i] != null || winner != null) {
            return;
          }
          const nextSquares = squares.slice();
          nextSquares[i] = nextSymbol;
          setSquares(nextSquares);

          setIsXNext(!isXNext); // toggle turns
        }}
      />
    );
  }

  function currentPlayer() {
    if (!active) {
      return "";
    } else {
      return "Current player: " + nextSymbol;
    }
  }

  function getStatus() {
    if (winner) {
      return "Winner: " + winner;
    } else if (isBoardFull(squares)) {
      return "Draw!";
    } else {
      return "";
    }
  }

  function reset() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  return (
    <div className="container">
      <div className="game">
        <div className="game-info">
          {currentPlayer() === "" ? <span>&nbsp;&nbsp;</span> : currentPlayer()}
        </div>
        <div className="game-board">
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
        </div>
        <div className="game-info">
          {getStatus() === "" ? <span>&nbsp;</span> : getStatus()}
          {winner && <ConfettiExplosion />}
        </div>
        <ResetButton onClick={reset} text={text} />
      </div>
    </div>
  );
}
