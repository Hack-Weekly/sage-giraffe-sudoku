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
function sudokuSolver(data) {
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


function sudokuChecker(board) {
    const AVAILABLE_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let set = new Set();

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (parseInt(board[row][col] == NaN |
                !AVAILABLE_NUMBERS.includes(parseInt(board[row][col]))) |
                isEmpty(board[row][col])) return false;

            if (set.has(
                "row" + row + "" + board[row][col],
                "col" + col + "" + board[row][col],
                "grid" + Math.ceil((row + 1) / 3.0) + Math.ceil((col + 1) / 3.0) + board[row][col])) return false;
            else {
                set.add(
                    "row" + row + "" + board[row][col],
                    "col" + col + "" + board[row][col],
                    "grid" + Math.ceil((row + 1) / 3.0) + Math.ceil((col + 1) / 3.0) + board[row][col]);
            }
        }
    }

    return true;
}

/**
 * Generate error grid that maps to grid data
 * @param {string[][]} data 2D array of number strings in sudoku board
 * @returns {boolean[][]} 2D array of boolean with true as invalid cells and false as valid cells
 */
function generateErrorGrid(data) {
    const errors = new Array(9).fill().map(() => new Array(9).fill(0));

    // Adapted from isValid function above
    const isValid = (row, col, k) => {
        for (let i = 0; i < 9; i++) {
            const m = 3 * Math.floor(row / 3) + Math.floor(i / 3);
            const n = 3 * Math.floor(col / 3) + i % 3;
            // Ignore the same (row, col) to not mark it as invalid
            if ((data[row][i] == k && i !== col) || (data[i][col] == k && i !== row) || (data[m][n] == k && (m !== row || n !== col))) {
                return false;
            }
        }
        return true;
    }
    
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (isEmpty(data[row][col])) continue;
            if (!isValid(row, col, data[row][col])) {
                errors[row][col] = true;
            }
        }
    }
    return errors;
}

export { sudokuSolver, isValid, sudokuChecker, generateErrorGrid }
