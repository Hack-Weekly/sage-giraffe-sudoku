import './SudokuGrid.css';

const SudokuGrid = ({ errorsGrid, givenGrid, grid, solution, handleInputChange, errorsVisibility }) => {
  return (
    <div className="sudoku-grid">
      {grid.map((rowArray, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {rowArray.map((cellValue, colIndex) => (
            <input
              key={colIndex}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              className={
                `sudoku-cell 
                  ${rowIndex === 3 || rowIndex === 6 ? "t-border" : ""} 
                  ${colIndex === 2 || colIndex === 5 ? "r-border" : ""}
                  ${errorsVisibility && errorsGrid[rowIndex][colIndex] ? "cell-error" : ""}`}
              value={solution.length > 0 ? solution[rowIndex][colIndex] : cellValue}
              maxLength="1"
              readOnly={givenGrid[rowIndex][colIndex] !== ""}
              onChange={(e) =>
                handleInputChange(rowIndex, colIndex, e.target.value)
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};


export default SudokuGrid;
