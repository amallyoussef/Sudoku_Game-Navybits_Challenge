const conflictCheck = (board: string[][]): [number, number][]=>{
    let conflicts: [number, number][] = [];

    // Helper function to check and add conflicts
    const addConflict = (row: number, col: number) => {
    if (!conflicts.some(cell => cell[0] === row && cell[1] === col)) {
      conflicts.push([row, col]);
        }
    };
    
    // Check rows and columns
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const value = board[row][col];
            if (!/^[1-9]$/.test(value)) continue; // Ignore empty cells

            // Row check
            for (let c = 0; c < 9; c++) {
                if (c !== col && board[row][c] === value) {
                    addConflict(row, col);
                    addConflict(row, c);
                }
            }

            // Column check
            for (let r = 0; r < 9; r++) {
                if (r !== row && board[r][col] === value) {
                    addConflict(row, col);
                    addConflict(r, col);
                }
            }

            // 3x3 subgrid check
            const startRow = Math.floor(row / 3) * 3;
            const startCol = Math.floor(col / 3) * 3;
            for (let r = startRow; r < startRow + 3; r++) {
                for (let c = startCol; c < startCol + 3; c++) {
                if ((r !== row || c !== col) && board[r][c] === value) {
                    addConflict(row, col);
                    addConflict(r, c);
                }
            }
        }
    }
    }
    return conflicts;
}
export default conflictCheck;