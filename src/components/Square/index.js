import './index.css';

const Square = (props) => {
  return (
    <span
      className={`square ${props.occupied ? 'occupied' : 'open'}`}
    >
    </span>
  )}

export default Square;