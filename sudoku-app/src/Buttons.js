import { useEffect } from "react";

function Buttons({ startTimer, handleDifficultySelection, solveForMe, elapsedTime, toggleErrors, errorsVisibility }) {
  const modes = ["easy", "medium", "hard"];

  useEffect(() => {
    let renderedMode = Math.floor(Math.random() * 3);
    handleDifficultySelection(modes[renderedMode]);
    startTimer();
  }, []);

  return (
    <div className="AllButtons">
      <div className="Buttons">
        <button className="button green" onClick={() => handleDifficultySelection("easy")}>Easy</button>
        <button className="button blue" onClick={() => handleDifficultySelection("medium")}>Medium</button>
        <button className="button red" onClick={() => handleDifficultySelection("hard")}>Hard</button>
      </div>
      <div className="Buttons">
        <button className="button" onClick={solveForMe}>Solve for Me</button>
        <button className="button" onClick={toggleErrors}>{errorsVisibility ? "Hide Errors" : "Show Errors"}</button>
      </div>
      <div className="timer">Time elapsed: {Math.floor(elapsedTime / 60)}:{(elapsedTime % 60).toString().padStart(2, '0')}</div>

    </div>
  );
}

export default Buttons