import { Fragment, useState } from "react";
import "./SudokuBoard.css";
import conflictCheck from "../Functions/SudokuValidation";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // This is required for dropdown functionality
import getRandomInt from "../Functions/GenRandom";

const SudokuBoard = () => {
  // Function to initialize an empty 9x9 grid
  const initializeEmptyBoard = () =>
    Array.from({ length: 9 }, () => Array(9).fill(""));

  // State to hold the board
  const [board, setBoard] = useState<string[][]>(initializeEmptyBoard());

  // State to hold conflicts
  const [conflictCells, setConflictCells] = useState<[number, number][]>([]);

  //Handler Function for Input Change
  const handleInputChange = (row: number, col: number, value: string) => {
    if (/^[1-9]?$/.test(value)) {
      const newBoard = board.map((row) => row.slice());
      newBoard[row][col] = value;
      setBoard(newBoard);
      setConflictCells(conflictCheck(newBoard));
    }
  };

  // Function to solve a puzzle
  const solve = (board: string[][]): boolean => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === "") {
          for (let num = 1; num <= 9; num++) {
            board[row][col] = getRandomInt(1, 9).toString();
            if (conflictCheck(board).length === 0) {
              if (solve(board)) {
                setBoard(board);
                return true;
              }
            }
            board[row][col] = "";
          }
          return false;
        }
      }
    }
    return true;
  };

  // Function to generate a solved Sudoku grid
  const fillBoard = (): string[][] => {
    const newBoard = initializeEmptyBoard();
    solve(newBoard);
    return newBoard;
  };

  // Function to create a new puzzle by emptying cells of a solved board
  const generatePuzzle = (holes: number): string[][] => {
    const solvedBoard = fillBoard();
    const puzzle = solvedBoard.map((row) => row.slice()); // Copy the solved board
    let removedCells = 0;

    // Randomly remove cells
    while (removedCells < holes) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);

      // Only remove cells that are not already empty
      if (puzzle[row][col] !== "") {
        puzzle[row][col] = ""; // Empty the cell
        removedCells++;
      }
    }
    setBoard(puzzle);
    return board;
  };

  // Function to provide a hint
  const provideHint = (board: string[][]) => {
    const solvedBoard = board.map((row) => row.slice());
    const currentBoard = board.map((row) => row.slice());
    if (solve(solvedBoard)) {
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (currentBoard[row][col] === "") {
            currentBoard[row][col] = solvedBoard[row][col]; // Fill one correct cell
            setBoard(currentBoard); // Update the state
            return;
          }
        }
      }
    }
  };

  return (
    <Fragment>
      <div style={{ display: "flex", gap: "10px" }}>
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
                  generatePuzzle(getRandomInt(30, 35));
                }}
              >
                Easy
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => {
                  generatePuzzle(getRandomInt(36, 49));
                }}
              >
                Medium
              </a>
            </li>
            <li>
              <a
                className="dropdown-item"
                onClick={() => {
                  // setBoard(initializeEmptyBoard);
                  generatePuzzle(getRandomInt(50, 54));
                }}
              >
                Hard
              </a>
            </li>
          </ul>
        </div>
        <div className="solver">
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => {
              const newBoard = board.map((row) => row.slice());
              solve(newBoard);
            }}
          >
            Solve
          </button>
        </div>
        <div className="inputBoard">
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => {
              const newBoard = initializeEmptyBoard();
              setBoard(newBoard);
            }}
          >
            Input Your Sudoku To solve
          </button>
        </div>
        <div className="hintBtn">
          <button
            className="btn btn-outline-dark btn-sm"
            onClick={() => {
              provideHint(board);
            }}
          >
            Hint
          </button>
        </div>
      </div>
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
    </Fragment>
  );
};

export default SudokuBoard;
