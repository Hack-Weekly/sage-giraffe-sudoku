import React, { useState, useEffect } from 'react';
import './App.css';
import SudokuGrid from './SudokuGrid.js';
import Theme from './Theme.js';
import Sudoku from './logic/SudokuGenerator.js';
import Header from './Header.js';
import Buttons from './Buttons.js';
import { sudokuSolver, sudokuChecker, generateErrorGrid } from './logic/SudokuSolver.js';

function App() {
  const [grid, setGrid] = useState(new Array(9).fill().map(() => new Array(9).fill('')));
  const [givenGrid, setGivenGrid] = useState(new Array(9).fill().map(() => new Array(9).fill('')));
  const [errorsGrid, setErrorsGrid] = useState(new Array(9).fill().map(() => new Array(9).fill(false)));
  const [errorsVisibility, setErrorsVisibility] = useState(false);
  const [solution, setSolution] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (startTime !== null) {
      const timer = setInterval(() => {
        const currentTime = Date.now();
        const elapsedSeconds = Math.floor((currentTime - startTime) / 1000);
        setElapsedTime(elapsedSeconds);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [startTime]);

  const startTimer = () => {
    setStartTime(Date.now());
  };

  const stopTimer = () => {
    setStartTime(null);
  };

  const handleGridChange = (row, col, value) => {
    if (!/^[1-9\b]*$/.test(value)) {
      return
    }

    const newGrid = grid.map((rowArray, rowIndex) =>
      rowArray.map((cellValue, colIndex) =>
        rowIndex === row && colIndex === col ? value : cellValue
      )
    );
    setGrid(newGrid);

    setErrorsGrid(generateErrorGrid(newGrid))

    if (isFullyFilled(newGrid)) {
      if (sudokuChecker(newGrid.map(row => row.slice()))) {
      const totalSeconds = elapsedTime;
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;
      const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      alert(`Sudoku solved in ${formattedTime}`);
      stopTimer();
      } else {
        alert("Sudoku wrong!");
      }
    }
  };


  const isFullyFilled = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === "") return false;
      }
    }
    return true;
  }

  

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
      default:
        break;
    }

    const sudoku = new Sudoku(9, holes);
    sudoku.fillValues();

    setGivenGrid(sudoku.mat);
    setGrid(sudoku.mat);
    setSolution([]);
    setErrorsGrid(new Array(9).fill().map(() => new Array(9).fill(false)));
  };

  const solveForMe = () => {
    if (grid.length === 0) {
      alert("Generate a puzzle first!");
      return;
    }
    const solutionGrid = JSON.parse(JSON.stringify(grid));
    sudokuSolver(solutionGrid);
    setSolution(solutionGrid);
    stopTimer()
  };

  const toggleErrors = () => {
    setErrorsVisibility(!errorsVisibility)
  }

  

  return (
    <div className="App">
      <Header />
      <SudokuGrid
        errorsGrid={errorsGrid}
        givenGrid={givenGrid}
        grid={grid}
        solution={solution}
        handleInputChange={(rowIndex, colIndex, value) =>
          handleGridChange(rowIndex, colIndex, value)}
        errorsVisibility={errorsVisibility}
      />
      <Buttons
        handleDifficultySelection={(difficulty) =>
          handleDifficultySelection(difficulty)}
        solveForMe={solveForMe}
        startTimer={startTimer}
        remainingTime={elapsedTime}
        toggleErrors={toggleErrors}
        errorsVisibility={errorsVisibility}
      />
      <Theme />
    </div>
  );
}

export default App;