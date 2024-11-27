import { useState } from "react";
import SudokuGrid from "./SudokuGrid";
import SudokuControls from "./SudokuControls";
import CustomAlert from "./CustomAlert";
import conflictCheck from "../Functions/SudokuValidation";
import getRandomInt from "../Functions/GenRandom";
import shuffleArray from "../Functions/ShuffleArray";
import "./SudokuBoard.css";
import "./CustomAlert.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // This is required for dropdown functionality

const SudokuBoard = () => {
  // Function to initialize an empty 9x9 grid
  const initializeEmptyBoard = () =>
    Array.from({ length: 9 }, () => Array(9).fill(""));

  //Function to set all cells as editable
  const initializeEditableBoard = () =>
    Array.from({ length: 9 }, () => Array(9).fill(true));

  // State to hold the board
  const [board, setBoard] = useState<string[][]>(initializeEmptyBoard());

  // State to hold conflicts
  const [conflictCells, setConflictCells] = useState<[number, number][]>([]);

  // State to track editable cells
  const [isEditable, setIsEditable] = useState<boolean[][]>(
    initializeEditableBoard()
  );
  // Alert State
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  //Handler Function for Input Change
  const handleInputChange = (row: number, col: number, value: string) => {
    if (isEditable[row][col] && /^[1-9]?$/.test(value)) {
      const newBoard = board.map((row) => row.slice());
      newBoard[row][col] = value;
      setBoard(newBoard);
      setConflictCells(conflictCheck(newBoard));
    }
  };

  // Function to solve a puzzle
  const solve = (board: string[][]): boolean => {
    const candidates = shuffleArray(Array.from({ length: 9 }, (_, i) => i + 1));
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === "") {
          for (let num of candidates) {
            board[row][col] = num.toString();
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
    const editable = initializeEditableBoard();
    // Randomly remove cells
    while (removedCells < holes) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      // Only remove cells that are not already empty
      if (puzzle[row][col] !== "") {
        puzzle[row][col] = ""; // Empty the cell
        editable[row][col] = true;
        removedCells++;
      }
    }
    // Mark generated cells as non-editable
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] !== "") {
          editable[row][col] = false; // Non-editable for generated numbers
        }
      }
    }
    setBoard(puzzle);
    setIsEditable(editable);
    return board;
  };

  // Function to provide a hint
  const provideHint = (board: string[][]) => {
    const solvedBoard = board.map((row) => row.slice());
    const currentBoard = board.map((row) => row.slice());
    if (solve(solvedBoard)) {
      const emptyCells: [number, number][] = [];
      for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
          if (currentBoard[row][col] === "") {
            emptyCells.push([row, col]);
          }
        }
      }
      if (emptyCells.length === 0) {
        setAlertMessage("No empty cells to fill. Puzzle is already complete.");
        return;
      }
      const [row, col] = emptyCells[getRandomInt(0, emptyCells.length - 1)];
      currentBoard[row][col] = solvedBoard[row][col];
      setBoard(currentBoard);
      console.log("Hint provided at row ", row, ",col ", col);
      return;
    } else {
      setAlertMessage("Failed to solve the board for hint generation");
      return;
    }
  };
  const handleNewGame = (difficulty: string) => {
    const holes =
      difficulty === "easy"
        ? getRandomInt(30, 35)
        : difficulty === "medium"
        ? getRandomInt(36, 49)
        : getRandomInt(50, 54);
    generatePuzzle(holes);
  };

  return (
    <>
      <SudokuControls
        onNewGame={handleNewGame}
        onSolve={() => solve([...board])}
        onInputPuzzle={() => {
          setIsEditable(initializeEditableBoard);
          setBoard(initializeEmptyBoard());
        }}
        onHint={() => provideHint(board)}
      />
      <SudokuGrid
        board={board}
        isEditable={isEditable}
        conflictCells={conflictCells}
        handleInputChange={handleInputChange}
      />
      {alertMessage && (
        <CustomAlert
          message={alertMessage}
          onClose={() => setAlertMessage(null)}
        />
      )}
    </>
  );
};

export default SudokuBoard;
