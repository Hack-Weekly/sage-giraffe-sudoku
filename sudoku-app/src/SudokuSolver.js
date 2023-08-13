function test1(){
    const board =
        [["5","3",".",".","7",".",".",".","."]
            ,["6",".",".","1","9","5",".",".","."]
            ,[".","9","8",".",".",".",".","6","."]
            ,["8",".",".",".","6",".",".",".","3"]
            ,["4",".",".","8",".","3",".",".","1"]
            ,["7",".",".",".","2",".",".",".","6"]
            ,[".","6",".",".",".",".","2","8","."]
            ,[".",".",".","4","1","9",".",".","5"]
            ,[".",".",".",".","8",".",".","7","9"]]
    console.log("test expected: true and it returned:" + sudokoSolver(board));
}

function test2(){
    const board =
        [["8","3",".",".","7",".",".",".","."]
            ,["6",".",".","1","9","5",".",".","."]
            ,[".","9","8",".",".",".",".","6","."]
            ,["8",".",".",".","6",".",".",".","3"]
            ,["4",".",".","8",".","3",".",".","1"]
            ,["7",".",".",".","2",".",".",".","6"]
            ,[".","6",".",".",".",".","2","8","."]
            ,[".",".",".","4","1","9",".",".","5"]
            ,[".",".",".",".","8",".",".","7","9"]]
    console.log("test expected: false and it returned:" + sudokoSolver(board));
}

function test3(){
    const board= [
        [".",".","9","7","4","8",".",".","."],
        ["7",".",".",".",".",".",".",".","."],
        [".","2",".","1",".","9",".",".","."],
        [".",".","7",".",".",".","2","4","."],
        [".","6","4",".","1",".","5","9","."],
        [".","9","8",".",".",".","3",".","."],
        [".",".",".","8",".","3",".","2","."],
        [".",".",".",".",".",".",".",".","6"],
        [".",".",".","2","7","5","9",".","."]
    ]
    console.log("test expected: true and it returned:" + sudokoSolver(board));
}
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
const isEmpty = grid => grid === '.';

/**
 * Solves the puzzle. This algorithm uses backtracking.
 * @param data 2D array representing the sudoku board.
 * @returns {boolean} returns a boolean that determines if
 * the puzzle was solved.
 */
function sudokoSolver(data) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (!isEmpty(data[row][col])) continue;

            for (let k = 1; k <= 9; k++) {
                if (!isValid(data, row, col, k)) continue;

                data[row][col] = `${k}`;
                if (sudokoSolver(data)) {
                    return true;
                } else {
                    data[row][col] = '.';
                }
            }
            return false;
        }
    }
    return true;
}

test1()
test2()
test3()