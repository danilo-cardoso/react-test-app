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

function Board({ xIsNext, squares, onPlay }) {

  function handleClick(i: number) {
    const nextSquares = squares.slice();

    if (squares[i] != "" || calculateWinner(squares) != "") {
      return;
    }
    
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    
    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);
  let status: string;
  if (winner != "" && winner != "draw") {
    status = "Winner: " + winner;
  } else if (winner == "draw") {
    status = "It's a " + winner;
  } else {
    status = "Next player: " + (xIsNext ? 'X' : 'O');
  }

  return (
  <>
    <div className=' pb-2 font-semibold'>{ status }</div>
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

export default function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill("")]);

  const currentSquares = history[history.length - 1];

  function handlePlay(nextSquares: Array<string>) {
    setHistory([...history, nextSquares]);
    setXIsNext(!xIsNext);
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={ xIsNext } squares={ currentSquares } onPlay={ handlePlay } />
      </div>
      <div className='game-info'>
        <ol>{ /*to do*/ }</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: Array<string>): string {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] != "" && squares[a] == squares[b] && squares[a] == squares[c]) {
      return squares[a];
    }
  }

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == "") {
      return "";
    }
  }

  return "draw";
}