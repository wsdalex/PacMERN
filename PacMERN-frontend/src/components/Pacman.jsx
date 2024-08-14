
import './Pacman.css';

const Pacman = () => {
  return (
    <div className="pacman">
      <div className="pacman__eye"></div>
      <div className="pacman__mouth"></div>
    </div>
  );
};

const PacmanRow = ({ count = 4 }) => {
  return (
    <div className="pacman-row">
      {Array.from({ length: count }).map((_, index) => (
        <Pacman key={index} />
      ))}
    </div>
  );
};

export default PacmanRow;