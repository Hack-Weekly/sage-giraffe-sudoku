class Sudoku {
  constructor(N) {
    this.N = N;
    this.mat = Array(N).fill().map(() => Array(N).fill(0))
  }

  printBoard() {
    for (const row of this.mat) {
      console.log(...row)
    }
  }
}

const sudoku = new Sudoku(9)
sudoku.printBoard()