import Square from '../Square';
import './index.css';

const Board = ({ board, isGameover, score }) => {

  return (
    <div className='board'>
      { board.map((row, rowIndex) => 
        <div
          className={`board-row ${isGameover ? 'blur' : ''}`}
          key={`row-${rowIndex}`}
        >
          { row.map((stat, colIndex) => {
            const index = rowIndex * (row.length) + colIndex;
            return stat === 0 
              ? <Square key={`col-${index}`}/>
              : <Square key={`col-${index}`} occupied={true} />
          })}
        </div>
      )}
      { isGameover
        ? <div className="overlay">
            <p>GAME OVER</p>
            <p>Your score is : {score}</p>
          </div>
        : ""
      }
    </div>
    
  );
}

export default Board;