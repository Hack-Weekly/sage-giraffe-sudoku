import React, { useState } from 'react';
import './SudokuGrid.css';
const SudokuGrid = ({ grid, solution, handleInputChange }) => {
  return (
    <div className="sudoku-grid">
      {grid.map((rowArray, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {rowArray.map((cellValue, colIndex) => (
            <input
              key={colIndex}
              type="text"
              className="sudoku-cell"
              value={solution.length > 0 ? solution[rowIndex][colIndex] : cellValue}
              maxLength="1"
              readOnly={solution.length > 0}
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






