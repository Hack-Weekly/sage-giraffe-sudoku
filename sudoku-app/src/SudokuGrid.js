import React, { useState } from 'react';
import './SudokuGrid.css';
const SudokuGrid = ({ grid, solution, handleInputChange }) => {
   return (
    <div className="sudoku-grid">
      {grid.map((rowArray, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {rowArray.map((cellValue, colIndex) => {
            const isGiven = grid[rowIndex][colIndex] !== ''; // Check if the cell is part of the initial grid

            return (
              <input
                key={colIndex}
                type="text"
                className={
                  `sudoku-cell 
                  ${rowIndex === 2 || rowIndex === 5 ? "t-border" : ""} 
                  ${colIndex === 2 || colIndex === 5 ? "r-border" : ""}`}
                value={solution.length > 0 ? solution[rowIndex][colIndex] : cellValue}
                maxLength="1"
                readOnly={solution.length > 0 || isGiven}
                onChange={(e) =>
                  handleInputChange(rowIndex, colIndex, e.target.value)
                }
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SudokuGrid;






