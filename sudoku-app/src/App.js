import React, { useState } from 'react';
import './App.css';
import SudokuGrid from './SudokuGrid.js';
import Theme from './theme.js';
import Sudoku from './logic/SudokuGenerator.js';
import { sudokuSolver, sudokuChecker } from './logic/SudokuSolver.js';
import { useEffect } from 'react';
import { removeMatDots } from './Helper.js';


function App() {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill('')));
  const [givenGrid, setGivenGrid] = useState(Array(9).fill(Array(9).fill('')));
  const [solution, setSolution] = useState([]);
  const [remainingTime, setRemainingTime] = useState(0);
  const [timerId, setTimerId] = useState(null)

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);
      setTimerId(timer)
      return () => clearInterval(timer);
    }
  }, [remainingTime]);


  const isFullyFilled = (grid) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (grid[row][col] === "") return false;
      }
    }
    return true;
  }

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

    if (isFullyFilled(newGrid)) {
      if (sudokuChecker(newGrid.map(row => row.slice()))) {
        alert("Sudoku solved!");
        stopTimer()
      } else {
        alert("Sudoku wrong!");
      }
    }
  };

  const handleDifficultySelection = (difficulty) => {
    let holes = 0;

    switch (difficulty) {
      case "easy":
        holes = 1;
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

    setGivenGrid(sudoku.mat);
    setGrid(sudoku.mat);
    setSolution([]);
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

  const startTimer = (minutes) => {
    setRemainingTime(minutes * 60);
  };

  const stopTimer = () => {
    clearInterval(timerId);
  };

  return (
    <div className="App">
      <Header />
      <SudokuGrid
        givenGrid={givenGrid}
        grid={grid}
        solution={solution}
        handleInputChange={(rowIndex, colIndex, value) =>
          handleGridChange(rowIndex, colIndex, value)}
      />
      <Buttons
        handleDifficultySelection={(difficulty) =>
          handleDifficultySelection(difficulty)}
        solveForMe={solveForMe}
        startTimer={startTimer}
        remainingTime={remainingTime}
      />
      <Theme />
    </div>
  );
}

function Header() {
  return (
    <div className="Header">
      <h1>Sudoku App</h1>
      <button className="toggle-theme"></button>
    </div>
  )
}

const modes = ["easy", "medium", "hard"];
function Buttons({ startTimer, handleDifficultySelection, solveForMe, remainingTime }) {
  useEffect(() => {
    handleDifficultySelection(modes[Math.floor(Math.random() * 3)]);
  }, []);

  return (
    <div className="AllButtons">
      <div className="Buttons">
        <button className="button green" onClick={() => { startTimer(20); handleDifficultySelection("easy"); }}>Easy</button>
        <button className="button blue" onClick={() => { startTimer(15); handleDifficultySelection("medium"); }}>Medium</button>
        <button className="button red" onClick={() => { startTimer(10); handleDifficultySelection("hard"); }}>Hard</button>
      </div>
      <div className="Buttons">
        <button className="button" onClick={solveForMe}>Solve for Me</button>
      </div>
      <div className="timer">Time remaining: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</div>

    </div>
  );
}

export default App;