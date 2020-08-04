import React from "react";

import { CellState, CellValue, Cell } from "../../types";

import "./Button.scss";

interface BProps {
  data: Cell;
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
  onContext: (row: number, col: number) => void;
}

const Button: React.FC<BProps> = ({
  data,
  col,
  row,
  onClick,
  onContext,
}: BProps) => {
  const { state, value, red } = data;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderedContent: any = () => {
    if (state === CellState.open) {
      if (value === CellValue.bomb) {
        return (
          <span role="img" aria-label="bomb">
            💣
          </span>
        );
      }
      if (value === CellValue.none) {
        return null;
      }
      return value;
    }
    if (state === CellState.flagged) {
      return (
        <span role="img" aria-label="bomb">
          🚩
        </span>
      );
    }
    return null;
  };

  return (
    <div
      className={`button ${
        state === CellState.open ? "button--visible" : ""
      } button-value-${value} ${red ? "button-red" : ""}
    `}
      style={{ gridRow: row + 1, gridColumn: col + 1 }}
      role="button"
      tabIndex={0}
      aria-label="button"
      onClick={() => {
        onClick(row, col);
      }}
      onKeyPress={() => {}}
      onContextMenu={(e) => {
        e.preventDefault();
        onContext(row, col);
      }}
    >
      {renderedContent()}
    </div>
  );
};

export default Button;
