'use client';

import { useState } from 'react';

function Square({ value, onSquareClick }): JSX.Element {
  return (
    <button 
    className="border-black border w-10 h-10 font-extrabold"
    onClick={onSquareClick}
    title='TicTacToe Cell'
    >
      { value }
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array<string>(9).fill(""));

  function handleClick(i: number) {
    const nextSquares = squares.slice();

    if (squares[i] != "") {
      return;
    }
    
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
  <>
    <div className="flex h-10">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
      <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
      <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
    </div>
    <div className="flex h-10">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
      <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
      <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
    </div>
    <div className="flex h-10">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
      <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
      <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
    </div>
  </>
  );
}