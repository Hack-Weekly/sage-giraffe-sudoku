import React, { useState } from 'react';
import './App.css';
import SudokuGrid from './SudokuGrid.js';
import MyComponent from './theme.js';
import Sudoku from './logic/SudokuGenerator.js';
import { sudokuSolver, sudokuChecker } from './logic/SudokuSolver.js';
import { removeMatDots } from './Helper.js';

function App() {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill('')));
  const [solution, setSolution] = useState([]);

  const isFullyFilled = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === "") return false;
      }
    }
    return true;
  }

  const handleGridChange = (row, col, value) => {
    const newGrid = grid.map((rowArray, rowIndex) =>
      rowArray.map((cellValue, colIndex) =>
        rowIndex === row && colIndex === col ? value : cellValue
      )
    );
    setGrid(newGrid);

    if (isFullyFilled(newGrid)) {
      if (sudokuChecker(newGrid.map(row => row.slice()))) {
        alert("Sudoku solved!");
      } else {
        alert("Sudoku wrong!");
      }
    }
  };

  const handleDifficultySelection = (difficulty) => {
    let holes = 0;

    switch (difficulty) {
      case "easy":
        holes = 20;
        break;

      case "medium":
        holes = 35;
        break;

      case "hard":
        holes = 50;
        break;
    }

    const sudoku = new Sudoku(9, holes);
    sudoku.fillValues();

    setGrid(sudoku.mat);
    setSolution([]); // Clear any existing solution when a new puzzle is generated
  };

  const solveForMe = () => {
    if (grid.length === 0) {
      alert("Generate a puzzle first!");
      return;
    }

    const solutionGrid = JSON.parse(JSON.stringify(grid)); // Create a copy of the current grid
    sudokuSolver(solutionGrid); // Calculate the solution
    setSolution(solutionGrid); // Store the solution in the state
  };


  return (
    <div className="App">
      <Header />
      <SudokuGrid
        grid={grid}
        solution={solution}
        handleInputChange={(rowIndex, colIndex, value) =>
          handleGridChange(rowIndex, colIndex, value)}
      />
      <Buttons
        handleDifficultySelection={(difficulty) =>
          handleDifficultySelection(difficulty)}
        solveForMe={solveForMe}
      />
      <MyComponent />
    </div>
  );
}

function Header() {
  return (
    <div className="Header">
      <h1>Sudoku App</h1>
      <button className="toggle-theme">Mode</button>
    </div>
  )
}

function Buttons({ handleDifficultySelection, solveForMe, checkAnswer }) {
  return (
    <div className="AllButtons">
      <div className="Buttons">
        <button className="button green" onClick={() => handleDifficultySelection("easy")}>Easy</button>
        <button className="button blue" onClick={() => handleDifficultySelection("medium")}>Medium</button>
        <button className="button red" onClick={() => handleDifficultySelection("hard")}>Hard</button>
      </div>
      <div className="Buttons">
        <button className="button" onClick={solveForMe}>Solve for Me</button>
      </div>
    </div>
  );
}

export default App;
