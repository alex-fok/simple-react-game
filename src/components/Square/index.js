import './index.css';

const Square = ({ occupied }) => {
  return (
    <span
      className={`square ${occupied ? 'occupied' : 'open'}`}
    >
    </span>
  )}

export default Square;