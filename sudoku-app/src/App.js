import './App.css';
import React, { useState, useEffect } from 'react';
import SudokuGrid from './SudokuGrid';

function App() {
  return (
    <h1 className="App">
      <Header/>
      <SudokuGrid/>
      <Buttons/>
    </h1>
  );
}

function Header() {
  return(
    <h1 class="Header">
      Sudoku App
    </h1>
  )
}

function Buttons() {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [remainingTime]);

  const startTimer = (minutes) => {
    setRemainingTime(minutes * 60); 
  };

  return (
    <div className="Buttons">
      <button className="button green" onClick={() => startTimer(20)}>Easy</button>
      <button className="button blue" onClick={() => startTimer(15)}>Medium</button>
      <button className="button red" onClick={() => startTimer(10)}>Hard</button>
      <div className="timer">Time remaining: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</div>
    </div>
  );
}

export default App;
