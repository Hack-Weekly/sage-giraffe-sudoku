import { sudokuSolver } from "./SudokuSolver.js";

export default class Sudoku {
    constructor(N, K) {
        this.N = N;
        this.K = K;
        this.SRN = Math.floor(Math.sqrt(N))
        this.mat = Array(N).fill().map(() => Array(N).fill(""))
    }

    fillValues() {
        this.fillDiagonal()
        this.solveBoard()
        this.removeKDigits()
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
                this.mat[row + i][col + j] = `${numbers[index]}`;
                index++;
            }
        }
    }

    shuffle(array) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0) {

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
        sudokuSolver(this.mat)
    }

    removeKDigits() {
        let count = this.K > (this.N * this.N) ? (this.N * this.N) : this.K;
        let nonEmptyCells = [];
        for (let i = 0; i < this.N; i++) {
            for (let j = 0; j < this.N; j++) {
                if (this.mat[i][j] !== "") {
                    nonEmptyCells.push([i, j]);
                }
            }
        }

        while (count !== 0 && nonEmptyCells.length > 0) {
            let randomIndex = Math.floor(Math.random() * nonEmptyCells.length);
            let [row, col] = nonEmptyCells[randomIndex];
            this.mat[row][col] = "";
            // swap cells then pop at end for fastest running time
            [nonEmptyCells[randomIndex], nonEmptyCells[nonEmptyCells.length - 1]] = [nonEmptyCells[nonEmptyCells.length - 1], nonEmptyCells[randomIndex]];
            nonEmptyCells.pop();
            count--;
        }
    }


    printBoard() {
        for (const row of this.mat) {
            console.log(...row)
        }
    }
}

// const sudoku = new Sudoku(9, 50)
// sudoku.fillValues()
// sudoku.printBoard()