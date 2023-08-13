import React, { useState } from 'react';
import './App.css';
import SudokuGrid from './SudokuGrid.js';
import MyComponent from './theme.js';
import Sudoku from './logic/SudokuGenerator.js';
import { removeMatDots } from './Helper.js';

function App() {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill('')));

  const handleGridChange = (row, col, value) => {
    const newGrid = grid.map((rowArray, rowIndex) =>
      rowArray.map((cellValue, colIndex) =>
        rowIndex === row && colIndex === col ? value : cellValue
      )
    );
    setGrid(newGrid);
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
  }

  return (
    <h1 className="App">
      <Header/>
      <SudokuGrid
        grid = { grid }
        handleInputChange = { (rowIndex, colIndex, value) => 
          handleGridChange(rowIndex, colIndex, value) }/>
      <Buttons
        handleDifficultySelection = { (difficulty) => 
          handleDifficultySelection(difficulty) }/>
      <MyComponent/>
    </h1>
  );
}

function Header() {
  return(
    <div class="Header">
      <h1>Sudoku App</h1>
      <button class="toggle-theme">Mode</button>
    </div>
  )
}

function Buttons({ handleDifficultySelection }) {
  return(
    <div class="Buttons">
      <button class="button green" onClick={() => handleDifficultySelection("easy")}>Easy</button>
      <button class="button blue" onClick={() => handleDifficultySelection("medium")}>Medium</button>
      <button class="button red" onClick={() => handleDifficultySelection("hard")}>Hard</button>
    </div>
  )
}


export default App;
