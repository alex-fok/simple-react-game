import { useEffect, useState, useRef, useCallback } from 'react';
import Board from '../Board';
import './index.css'

const REFRESH = 500;

const Game = () => {
  // initialize a width * height board
  const [boardWidth, boardHeight] = [7, 10];
  const [board, setBoard] = useState(new Array(boardHeight).fill(new Array(boardWidth).fill(0)));
  const [isGameover, setGameover] = useState(false);
  const [score, setScore] = useState(0);
  const block = useRef({ position: 2, length: 3, direction: 1 }).current;
  let activeRow = useRef(boardHeight - 1);
  let intervalRef = useRef();
  
  const updateBoard = useCallback(() => {
    const {position, length, direction} = block;
    const last = position + length;

    // Get new Board
    const newBoard = board.slice();
    newBoard[activeRow.current] = new Array(board[0].length).fill(0).fill(1, position, last);

    // Change block moving direction when in contact with boundary
    const chgDir = (direction > 0 && last === boardWidth)  || (direction < 0 && position === 0);

    // Update block variable
    block.position = position + (chgDir ? direction * -1 : direction);
    block.direction = chgDir ? direction * -1 : direction;

    setBoard(newBoard);
  }, [block, board, boardWidth]);

  const placeBlock = useCallback(event => {
    if (activeRow.current < 0 || event.code !== 'Space') return;
    
    clearInterval(intervalRef);
    activeRow.current = activeRow.current - 1;
    setScore(score + 1);
    updateBoard();
    
    if (activeRow.current < 0)
      setGameover(true);
  }, [score, updateBoard]);

  useEffect(() => {
    // If the game is not over, keep updating board
    if (!isGameover) {
      intervalRef.current = setInterval(() => {
        updateBoard();
      }, REFRESH);
      return () => clearInterval(intervalRef.current);  
    };
  }, [isGameover, updateBoard]);

  useEffect(() => {
    window.addEventListener("keydown", placeBlock);
    return () => window.removeEventListener("keydown", placeBlock)
  }, [placeBlock]);

  return (
    <div className="game">
      <Board board={board} isGameover={isGameover} score={score}/>
      <h4>Press Space to place block</h4>
    </div>
  )
}

export default Game;