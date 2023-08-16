import './SudokuGrid.css';

const SudokuGrid = ({ errorsGrid, givenGrid, grid, solution, handleInputChange }) => {
  return (
    <div className="sudoku-grid">
      {grid.map((rowArray, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {rowArray.map((cellValue, colIndex) => (
            <input
              key={colIndex}
              type="text"
              className={
                `sudoku-cell 
                  ${rowIndex === 2 || rowIndex === 5 ? "t-border" : ""} 
                  ${colIndex === 2 || colIndex === 5 ? "r-border" : ""}
                  ${errorsGrid[rowIndex][colIndex] ? "cell-error" : ""}`}
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
