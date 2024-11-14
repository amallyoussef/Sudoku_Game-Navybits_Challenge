import React, { useState } from "react";
import "./SudokuBoard.css";

const SudokuBoard = () => {
  //Initialize a 9x9 empty grid
  const [board, setBoard] = useState<string[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(""))
  );

  //Handler Function for Input Change
  const handleInputChange = (row: number, col: number, value: string) => {
    //Validate input: only numbers between 1-9 or empty strings
    if (/^[1-9]?$/.test(value)) {
      const newBoard = [...board];
      newBoard[row][col] = value;
      setBoard(newBoard);
    }
  };

  return (
    <div className="sudoku-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {row.map((cell, colIndex) => (
            <input
              key={colIndex}
              className="sudoku-cell"
              type="text"
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
