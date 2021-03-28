import { useEffect, useState, useRef } from 'react';
import Board from '../Board';
import './index.css'

const Game = () => {
  // initialize a width * height board
  const [boardWidth, boardHeight] = [7, 10];
  const [board, setBoard] = useState(new Array(boardHeight).fill(new Array(boardWidth).fill(0)));
  const block = useRef({ position: 2, length: 3, direction: 1 }).current;
  const timeout = 500;
  let activeRow = useRef(boardHeight - 1).current;

  useEffect(() => {
    const {position, length, direction} = block;
    const last = position + length;

    // Get new Board
    const newBoard = board.slice();
    newBoard[activeRow] = new Array(board[0].length).fill(0).fill(1, position, last);

    // Change block moving direction when in contact with boundary
    const chgDir = (direction > 0 && last === boardWidth)  || (direction < 0 && position === 0);

    // Update block variable
    Object.assign(block, {
      position: position + (chgDir ? direction * -1 : direction),
      direction: chgDir ? direction * -1 : direction  
    });

    setTimeout( () => setBoard(newBoard), timeout)
  });

  return (
      <Board
        board={board}   
      />
  )
}

export default Game;