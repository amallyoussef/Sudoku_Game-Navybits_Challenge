interface SudokuControlsProps {
  onNewGame: (difficulty: string) => void;
  onSolve: () => void;
  onInputPuzzle: () => void;
  onHint: () => void;
}

const SudokuControls = ({
  onNewGame,
  onSolve,
  onInputPuzzle,
  onHint,
}: SudokuControlsProps) => {
  return (
    <div className="button-container">
      <div className="newGameDropDown">
        <button
          id="newGameBtn"
          type="button"
          className="btn btn-outline-dark btn-sm dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          New Game
        </button>
        <ul className="dropdown-menu">
          <li>
            <a
              className="dropdown-item"
              onClick={() => {
                onNewGame("easy");
              }}
            >
              Easy
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => {
                onNewGame("medium");
              }}
            >
              Medium
            </a>
          </li>
          <li>
            <a
              className="dropdown-item"
              onClick={() => {
                onNewGame("hard");
              }}
            >
              Hard
            </a>
          </li>
        </ul>
      </div>
      <div className="solver">
        <button className="btn btn-outline-dark btn-sm" onClick={onSolve}>
          Solve
        </button>
      </div>
      <div className="inputBoard">
        <button className="btn btn-outline-dark btn-sm" onClick={onInputPuzzle}>
          Input Your Sudoku To solve
        </button>
      </div>
      <div className="hintBtn">
        <button className="btn btn-outline-dark btn-sm" onClick={onHint}>
          Hint
        </button>
      </div>
    </div>
  );
};

export default SudokuControls;
