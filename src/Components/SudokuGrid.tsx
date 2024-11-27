interface SudokuGridProps {
  board: string[][];
  isEditable: boolean[][];
  conflictCells: [number, number][];
  handleInputChange: (row: number, col: number, value: string) => void;
}

const SudokuGrid = ({
  board,
  isEditable,
  conflictCells,
  handleInputChange,
}: SudokuGridProps) => {
  return (
    <div className="sudoku-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => (
            <input
              key={colIndex}
              type="text"
              className={`sudoku-cell ${
                conflictCells.some(
                  (cell) => cell[0] === rowIndex && cell[1] === colIndex
                )
                  ? "conflict"
                  : ""
              }${!isEditable[rowIndex][colIndex] ? " generated-cell" : ""}`}
              maxLength={1}
              value={cell}
              onChange={(num) =>
                handleInputChange(rowIndex, colIndex, num.target.value)
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;
