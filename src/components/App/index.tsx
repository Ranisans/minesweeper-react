import React, { useState, useEffect } from "react";

import Button from "../Button";
import Display from "../Display";
import {
  GameFieldGenerator,
  updateCellState,
  setFlagToCell,
  isAllBombMarked,
} from "./logic";

import { MIN_COLS, MIN_ROWS, MIN_BOMB_COUNT } from "../../constants";
import { Cell, CellState, Face } from "../../types";

import "./App.scss";

const App: React.FC = () => {
  const [cells, setCells] = useState<Cell[][]>([]);
  const [gameFinished, setGameFinished] = useState<boolean>(false);
  const [bombCount, setBombCount] = useState<number>(MIN_BOMB_COUNT);
  const [emoticon, setEmoticon] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);

  const restart = () => {
    const newCells = new GameFieldGenerator(
      MIN_ROWS,
      MIN_COLS,
      MIN_BOMB_COUNT
    ).generate();
    setCells(newCells);
    setBombCount(MIN_BOMB_COUNT);
    setEmoticon(Face.smile);
    setGameFinished(false);
    setTime(0);
  };

  useEffect(() => {
    restart();
  }, []);

  useEffect(() => {
    if (bombCount === 0) {
      if (isAllBombMarked(cells)) {
        setGameFinished(true);
        setEmoticon(Face.won);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bombCount]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (!gameFinished && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [gameFinished, time]);

  const onClick = (row: number, col: number) => {
    if (!gameFinished) {
      if (cells[row][col].state !== CellState.open) {
        const [newCells, isEnd] = updateCellState(cells, row, col);
        setCells(newCells);
        if (isEnd) {
          setGameFinished(true);
          setEmoticon(Face.lost);
        }
      }
    }
  };

  const onContext = (row: number, col: number) => {
    if (!gameFinished) {
      if (cells[row][col].state !== CellState.open) {
        setCells(setFlagToCell(cells, row, col));
        if (cells[row][col].state === CellState.flagged) {
          setBombCount(bombCount - 1);
        } else {
          setBombCount(bombCount + 1);
        }
      }
    }
  };

  return (
    <div className="APP">
      <div className="header">
        <Display value={bombCount} />
        <div
          role="button"
          tabIndex={0}
          className="header-emoticon"
          aria-label="face"
          onKeyPress={restart}
          onClick={restart}
        >
          <span role="img" aria-label="face">
            {emoticon}
          </span>
        </div>
        <Display value={time} />
      </div>
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
