import { Fragment, useState } from "react";
import "./SudokuBoard.css";
import conflictCheck from "../Validation/SudokuValidation";

const SudokuBoard = () => {
  //Initialize a 9x9 empty grid
  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(""))
  );
  const [conflictCells, setConflictCells] = useState<[number, number][]>([]);

  //Handler Function for Input Change
  const handleInputChange = (row: number, col: number, value: string) => {
    if (/^[1-9]?$/.test(value)) {
      const newBoard = [...board];
      newBoard[row][col] = value;
      setBoard(newBoard);
      setConflictCells(conflictCheck(newBoard));
      console.log(conflictCells);
    }
  };

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
              }`}
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

export default SudokuBoard;
