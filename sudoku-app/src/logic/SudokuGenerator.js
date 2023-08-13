import { sudokoSolver } from "./SudokuSolver.js";

class Sudoku {
  constructor(N) {
      this.N = N;
      this.SRN = Math.floor(Math.sqrt(N))
      this.mat = Array(N).fill().map(() => Array(N).fill("."))
  }

  fillValues() {
      this.fillDiagonal()
      this.solveBoard()
  }

  fillDiagonal() {
      for (let i = 0; i < this.N; i += this.SRN) {
          this.fillBox(i, i)
      }
  }

  fillBox(row, col) {
      let numbers = []
      for (let i = 1; i <= this.N; i++) {
          numbers.push(i)
      }
      numbers = this.shuffle(numbers)

      let index = 0;
      for (let i = 0; i < this.SRN; i++) {
          for (let j = 0; j < this.SRN; j++) {
              this.mat[row + i][col + j] = numbers[index];
              index++;
          }
      }
  }

  shuffle(array) {
      let currentIndex = array.length, randomIndex;

      // While there remain elements to shuffle.
      while (currentIndex != 0) {

          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;

          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
              array[randomIndex], array[currentIndex]];
      }

      return array;
  }

  solveBoard() {
      sudokoSolver(this.mat)
  }

  printBoard() {
      for (const row of this.mat) {
          console.log(...row)
      }
  }
}

const sudoku = new Sudoku(9)
sudoku.fillValues()
sudoku.printBoard()