import React from "react";

import Button from "./index";

import { CellState, CellValue } from "../../types";

export default {
  title: "Button",
  component: Button,
};

const callback = (row: number, col: number) => {
  // eslint-disable-next-line no-console
  console.log(row, col);
};

export const Base: React.FC = () => {
  return (
    <Button
      col={0}
      row={0}
      onClick={callback}
      onContext={callback}
      data={{ state: CellState.closed, value: CellValue.eight }}
    />
  );
};

export const Visible: React.FC = () => {
  return (
    <Button
      col={0}
      row={0}
      onClick={callback}
      onContext={callback}
      data={{ state: CellState.open, value: CellValue.five }}
    />
  );
};

export const Flagged: React.FC = () => {
  return (
    <Button
      col={0}
      row={0}
      onClick={callback}
      onContext={callback}
      data={{ state: CellState.flagged, value: CellValue.four }}
    />
  );
};

export const Bomb: React.FC = () => {
  return (
    <Button
      col={0}
      row={0}
      onClick={callback}
      onContext={callback}
      data={{ state: CellState.open, value: CellValue.bomb }}
    />
  );
};

export const ExplodedBomb: React.FC = () => {
  return (
    <Button
      col={0}
      row={0}
      onClick={callback}
      onContext={callback}
      data={{ state: CellState.open, value: CellValue.bomb, red: true }}
    />
  );
};
