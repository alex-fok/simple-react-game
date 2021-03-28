import { useEffect, useState } from 'react';
import Board from '../Board';
import './index.css'

const Game = () => {
  // initialize a width * height board
  const [width, height] = [7, 10];
  const [board, setBoard] = useState(new Array(height).fill(new Array(width).fill(0)));
  const [buildingBlock, setBuildingBlock] = useState({ position: 2, width: 3 })
  // const [isGameOver, endGame] = useState(false);
  // const timeout = 500;
  let blockPosition = height - 1;

  return <Board board={board} />
}

export default Game;