// Validation Function for Sudoku Rules
  const isValidInput = (
    board: string[][],
    rowNum: number,
    colNum: number,
    value: string
  ): boolean => {

    // Check that value is between 1-9 and not null
    if (!/^[1-9]$/.test(value)) {return false}
    
    // Check the row
    for (let col = 0; col < 9; col++) {
      if (board[rowNum][col] === value && col !== colNum) {
        console.log("Row error");
        return false;
      }
    }
    // Check the column
    for (let row = 0; row < 9; row++) {
      if (board[row][colNum] === value && row !== rowNum) {
        console.log("Column error");
        return false;
      }
    }
    // Check 3x3 subgrids
    // Get the starting row and column of the corresponding 3x3 subgrid
    const startRow = Math.floor(rowNum / 3) * 3;
    const startCol = Math.floor(colNum / 3) * 3;

    for (let row = startRow; row < startRow + 3; row++) {
      for (let col = startCol; col < startCol + 3; col++) {
        if (board[row][col] === value && (row !== rowNum || col !== colNum)) {
          console.log("Subgrid error");
          return false;
        }
      }
    }
    return true;
  };

 export default isValidInput;