import './index.css';

const Square = (props) => {
  return (
    <span
      className={`square ${props.occupied ? 'occupied' : 'open'}`}
    >
      {props.occupied ? 1 : 0}
    </span>
  )}

export default Square;