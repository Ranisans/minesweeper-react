import React, { useState, useEffect } from "react";

import { GameFieldGenerator, updateCellState, setFlagToCell } from "./logic";

import { MIN_COLS, MIN_ROWS } from "../../constants";
import { Cell, CellState } from "../../types";

import "./App.scss";
import Button from "../Button";

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>([]);
  const [gameFinished, setGameFinished] = useState<boolean>(false);

  useEffect(() => {
    const newCells = new GameFieldGenerator(MIN_ROWS, MIN_COLS).generate();
    setCells(newCells);
  }, []);

  const onClick = (row: number, col: number) => {
    if (!gameFinished) {
      if (cells[row][col].state !== CellState.open) {
        const [newCells, isEnd] = updateCellState(cells, row, col);
        setCells(newCells);
        if (isEnd) {
          setGameFinished(true);
        }
      }
    }
  };

  const onContext = (row: number, col: number) => {
    if (!gameFinished) {
      if (cells[row][col].state !== CellState.open) {
        setCells(setFlagToCell(cells, row, col));
      }
    }
  };

  return (
    <div className="APP">
      <div className="header">Header</div>
      <div className="game_field">
        {cells.map((row, rowIndex) =>
          row.map((col, colIndex) => (
            <Button
              data={col}
              row={rowIndex}
              col={colIndex}
              onClick={onClick}
              onContext={onContext}
              // eslint-disable-next-line react/no-array-index-key
              key={`key-${rowIndex}-${colIndex}`}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default App;
