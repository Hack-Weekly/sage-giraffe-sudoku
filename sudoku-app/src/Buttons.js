import { useEffect } from "react";

function Buttons({ startTimer, handleDifficultySelection, solveForMe, remainingTime, toggleErrors, errorsVisibility }) {
  const modes = ["easy", "medium", "hard"];

  useEffect(() => {
    let renderedMode = Math.floor(Math.random() * 3);
    handleDifficultySelection(modes[renderedMode]);
    if(renderedMode === 0){
      startTimer(20);
    }
    else if(renderedMode === 1){
      startTimer(15);
    }
    else if (renderedMode === 2){
      startTimer(10);
    }
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
        <button className="button" onClick={toggleErrors}>{errorsVisibility ? "Hide Errors" : "Show Errors"}</button>
      </div>
      <div className="timer">Time elapsed: {Math.floor(remainingTime / 60)}:{(remainingTime % 60).toString().padStart(2, '0')}</div>

    </div>
  );
}

export default Buttons