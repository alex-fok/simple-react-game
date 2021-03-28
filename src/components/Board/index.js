import Square from '../Square';
import './index.css';

const Board = (props) => {
  const {board} = props;

  return (
    <div
      className="board"
      tabIndex="0"
      onKeyDown={props.placeBlock}
    >
      {board.map((row, rowIndex) => 
        <div
          className="board-row"
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
    </div>
  );
}

export default Board;