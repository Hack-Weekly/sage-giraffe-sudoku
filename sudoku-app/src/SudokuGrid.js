import React, { useState } from 'react';
import './SudokuGrid.css';
const SudokuGrid = () => {
  const [grid, setGrid] = useState(Array(9).fill(Array(9).fill('')));

  const handleInputChange = (row, col, value) => {
    const newGrid = grid.map((rowArray, rowIndex) =>
      rowArray.map((cellValue, colIndex) =>
        rowIndex === row && colIndex === col ? value : cellValue
      )
    );
    setGrid(newGrid);
  };

  return (
    <div className="sudoku-grid">
      {grid.map((rowArray, rowIndex) => (
        <div key={rowIndex} className="sudoku-row">
          {rowArray.map((cellValue, colIndex) => (
            <input
              key={colIndex}
              type="text"
              className="sudoku-cell"
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