import Square from '../Square';
import './index.css';

const Board = (props) => {
  const {board} = props;

  return (
    <div className='board'>
      {board.map((row, rowIndex) => 
        <div
          className={`board-row ${props.isGameover ? 'blur' : ''}`}
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
      {
        props.isGameover
        ? <div className="overlay">
            <p>GAME OVER</p>
            <p>Your score is : {props.score}</p>
          </div>
        : ""
      }
    </div>
    
  );
}

export default Board;