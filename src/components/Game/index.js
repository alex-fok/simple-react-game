import { useEffect, useState, useRef } from 'react';
import Board from '../Board';
import './index.css'

const REFRESH = 500;

const Game = () => {
  // initialize a width * height board
  const [boardWidth, boardHeight] = [7, 10];
  const [board, setBoard] = useState(new Array(boardHeight).fill(new Array(boardWidth).fill(0)));
  const [isGameover, endGame] = useState(false);
  const block = useRef({ position: 2, length: 3, direction: 1 }).current;
  let activeRow = useRef(boardHeight - 1);
  let intervalRef = useRef();

  useEffect(() => {
    // If the game is not over, keep re-rendering
    if (!isGameover) {
      intervalRef.current = setInterval(() => {
        updateBoard();
      }, REFRESH);
      return () => clearInterval(intervalRef.current);  
    };
  });

  const updateBoard = () => {
    const {position, length, direction} = block;
    const last = position + length;

    // Get new Board
    const newBoard = board.slice();
    newBoard[activeRow.current] = new Array(board[0].length).fill(0).fill(1, position, last);

    // Change block moving direction when in contact with boundary
    const chgDir = (direction > 0 && last === boardWidth)  || (direction < 0 && position === 0);

    // Update block variable
    Object.assign(block, {
      position: position + (chgDir ? direction * -1 : direction),
      direction: chgDir ? direction * -1 : direction,
    });
    setBoard(newBoard);
  }

  const placeBlock = event => {
    if (activeRow.current < 0) return;

    clearInterval(intervalRef);
    activeRow.current = activeRow.current - 1;
    updateBoard();
    
    if (activeRow.current < 0)
      endGame(true);
  }

  return (
      <Board
        board={board}
        placeBlock={placeBlock}
      />
  )
}

export default Game;