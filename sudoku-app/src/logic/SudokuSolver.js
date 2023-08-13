/**
 * determines if the current solution is valid.
 */
function isValid(board, row, col, k) {
    for (let i = 0; i < 9; i++) {
        const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const n = 3 * Math.floor(col / 3) + i % 3;
        if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
            return false;
        }
    }
    return true;
}

/**
 * determines if the current grid is empty.
 */
const isEmpty = grid => grid === '';

/**
 * Solves the puzzle. This algorithm uses backtracking.
 * @param data 2D array representing the sudoku board.
 * @returns {boolean} returns a boolean that determines if
 * the puzzle was solved.
 */
export function sudokuSolver(data) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (!isEmpty(data[row][col])) continue;

            for (let k = 1; k <= 9; k++) {
                if (!isValid(data, row, col, k)) continue;

                data[row][col] = `${k}`;
                if (sudokuSolver(data)) {
                    return true;
                } else {
                    data[row][col] = '';
                }
            }
            return false;
        }
    }
    return true;
}

