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
      state={CellState.open}
      value={CellValue.eight}
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
      state={CellState.hidden}
      value={CellValue.five}
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
      state={CellState.flagged}
      value={CellValue.four}
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
      state={CellState.hidden}
      value={CellValue.bomb}
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
      state={CellState.hidden}
      value={CellValue.bomb}
      red
    />
  );
};
