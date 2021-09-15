import Square from "./Square.js";
import { useEffect, useState } from "react";
import { calculateWinner, isBoardFull } from "./gameLogic.js";
import ResetButton from "./ResetButton.js";
import "./styles.css";
import ConfettiExplosion from "@reonomy/react-confetti-explosion";

export default function Game() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [counter, setCounter] = useState(0);
  const [internalCounter, setInternalCounter] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const winner = calculateWinner(squares);
  const active = winner || isBoardFull(squares) ? false : true;
  const text = active ? "Reset" : "Play again";
  const nextSquares = squares.slice();

  useEffect(() => {
    const delay = Math.random() * 1500;
    if (active && currentPlayer === "O") {
      setTimeout(() => randomMove(), delay);
    }
  }, [internalCounter]);

  function randomMove() {
    const rand = Math.floor(Math.random() * 9);
    if (squares[rand] == null) {
      nextSquares[rand] = "O";
      setSquares(nextSquares);
      setCounter(counter + 1);
      setCurrentPlayer("X");
    } else {
      randomMove();
    }
  }

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => {
          // lock the square
          if (squares[i] != null || !active || currentPlayer !== "X") {
            return;
          }
          nextSquares[i] = "X";
          setSquares(nextSquares);
          setCurrentPlayer("O");

          setInternalCounter(internalCounter + 1);
        }}
      />
    );
  }

  function updateTurns() {
    if (!active) {
      return "";
    } else {
      return "Turn: " + counter;
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
    setCounter(0);
    setCurrentPlayer("X");
  }

  return (
    <div className="container">
      <div className="game">
        <div className="game-info">
          {updateTurns() === "" ? <span>&nbsp;&nbsp;</span> : updateTurns()}
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
