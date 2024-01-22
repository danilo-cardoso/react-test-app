'use client';

import { useState } from 'react';

function Square({ value, onSquareClick, winner }): JSX.Element {
  return (
    <button 
    className={"border-black border w-24 h-24 font-extrabold text-4xl" + (winner ? ' text-red-600' : ' bg-transparent')}
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
    const winnerSquares = calculateWinner(squares);
    
    if (squares[i] != "" || winnerSquares[0] != 10) {
      return;
    }
    
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    
    onPlay(nextSquares);
  }

  const winnerSquares = calculateWinner(squares);
  let status: string;
  if (winnerSquares[0] != 10 && winnerSquares[0] != 20) {
    status = "Winner: " + squares[winnerSquares[0]];
  } else if (winnerSquares[0] == 10) {
    status = "Next player: " + (xIsNext ? 'X' : 'O');
  } else {
    status = "It's a draw";
  }

  const boardSquares = squares.map((square: string, index: number) => {
    let winner = false;

    for (let i = 0; i < winnerSquares.length; i++) {
      if (index == winnerSquares[i]) {
        winner = true;
      }
    }

    return (
      <Square key={index} value={square} onSquareClick={() => handleClick(index)} winner={winner} />
    )
  })

  return (
  <div className='flex flex-col items-center gap-2'>
    <div className=' pb-2 font-semibold'>{ status }</div>
    <div className=" grid-cols-3 grid-rows-3 inline-grid h-auto border border-black">
      { boardSquares }
    </div>
  </div>
  );
}

export default function Game() {
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const [history, setHistory] = useState([Array(9).fill("")]);

  const currentSquares: Array<string> = history[currentMove];

  function handlePlay(nextSquares: Array<string>) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  
  function jumpTo(nextMove: number) {
    setCurrentMove(nextMove);
  }
  
  const moves = history.map((squares, move) => {
    let description: string;

    if (move == currentMove) {
      move > 0 ? description = "You are at move #" + move : description = "You are at game start";
    } else {
      move > 0 ? description = "Go to move #" + move : description = "Go to game start";
    }

    return (
      <li key={ move }>
        <button className=' bg-slate-300 p-2 rounded-md' onClick={() => jumpTo(move)}>{ description }</button>
      </li>
    );
  });

  return (
    <div className='game bg-slate-200 flex justify-evenly w-1/2 rounded-lg p-6'>
      <div className='game-board'>
        <Board xIsNext={ xIsNext } squares={ currentSquares } onPlay={ handlePlay } />
      </div>
      <div className='game-info font-bold'>
        <ol className='flex flex-col justify-center items-start gap-2'>{ moves }</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares: Array<string>): Array<number> {
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
      return lines[i];
    }
  }

  for (let i = 0; i < squares.length; i++) {
    if (squares[i] == "") {
      return [10];
    }
  }

  return [20];
}