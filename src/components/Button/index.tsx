import React from "react";

import { CellState, CellValue } from "../../types";

import "./Button.scss";

interface BProps {
  value: CellValue;
  state: CellState;
  red?: boolean;
  row: number;
  col: number;
  onClick: (row: number, col: number) => void;
  onContext: (row: number, col: number) => void;
}

const Button: React.FC<BProps> = ({
  value,
  state,
  red,
  col,
  row,
  onClick,
  onContext,
}: BProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderedContent: any = () => {
    if (state === CellState.hidden) {
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
        state === CellState.hidden ? "button--visible" : ""
      } button-value-${value} ${red ? "button-red" : ""}
    `}
      role="button"
      tabIndex={0}
      aria-label="button"
      onClick={() => {
        onClick(row, col);
      }}
      onKeyPress={() => {}}
      onContextMenu={() => {
        onContext(row, col);
      }}
    >
      {renderedContent()}
    </div>
  );
};

export default Button;
