import React, { useState, useEffect } from "react";

import {
  GameFieldGenerator,
  updateCellState,
  setFlagToCell,
  isAllBombMarked,
} from "./logic";

import { MIN_COLS, MIN_ROWS, MIN_BOMB_COUNT } from "../../constants";
import { Cell, CellState } from "../../types";

import "./App.scss";
import Button from "../Button";

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>([]);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [bombCount, setBombCount] = useState<number>(MIN_BOMB_COUNT);

  useEffect(() => {
    const newCells = new GameFieldGenerator(
      MIN_ROWS,
      MIN_COLS,
      MIN_BOMB_COUNT
    ).generate();
    setCells(newCells);
  }, []);

  useEffect(() => {
    if (bombCount === 0) {
      if (isAllBombMarked(cells)) {
        setGameFinished(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bombCount]);

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
        if (cells[row][col].state === CellState.flagged) {
          setBombCount(bombCount + 1);
        } else {
          setBombCount(bombCount - 1);
        }
      }
    }
  };

  return (
    <div className="APP">
      <div className="header">{bombCount}</div>
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
