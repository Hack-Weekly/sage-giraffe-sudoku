import React, { useState } from 'react';
import './SudokuGrid.css';
const SudokuGrid = ({ grid, handleInputChange }) => {
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
                ${rowIndex == 3 || rowIndex == 6 ? "t-border" : ""} 
                ${colIndex + 1 == 3 || colIndex + 1 == 6 ? "r-border" : ""}`}
              value={cellValue}
              maxLength="1"
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