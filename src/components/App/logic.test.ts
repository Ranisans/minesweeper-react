import { CellState, Cell, CellValue } from "../../types/index";

import { MIN_BOMB_COUNT } from "../../constants/index";
import {
  GameFieldGenerator,
  openAllAdjacentEmptyCells,
  updateCellState,
  setFlagToCell,
  updateAllBombState,
} from "./logic";

const rows = 4;
const cols = 4;

describe("game field generator", () => {
  let result: Cell[][];
  beforeAll(() => {
    result = new GameFieldGenerator(rows, cols, MIN_BOMB_COUNT).generate();
  });
  it("should generate right array", () => {
    expect(result.length).toBe(rows);
    expect(result[0].length).toBe(cols);
  });
  it("should contain the correct number of bombs in the adjacent numbered cell", () => {
    const checkBombsCount = (row: number, col: number): number => {
      let bombsCount = 0;
      for (let i = row - 1; i <= row + 1 && i < result.length; i += 1) {
        if (i >= 0) {
          for (let j = col - 1; j <= col + 1 && j < result[i].length; j += 1) {
            if (j >= 0 && result[i][j].value === CellValue.bomb) {
              bombsCount += 1;
            }
          }
        }
      }
      return bombsCount;
    };
    for (let i = 0; i < rows; i += 1) {
      for (let j = 0; j < cols; j += 1) {
        if (
          result[i][j].value !== CellValue.none &&
          result[i][j].value !== CellValue.bomb
        ) {
          const bomb = checkBombsCount(i, j);
          expect(result[i][j].value).toBe(bomb);
        }
      }
    }
  });
  it("should update cell state to open", () => {
    const newCells: Cell[][] = JSON.parse(JSON.stringify(result));
    const [row, col] = [1, 1];
    updateCellState(newCells, row, col);
    expect(newCells[row][col].state).toBe(CellState.open);
  });
  it("should set flag on cell", () => {
    const newCells: Cell[][] = JSON.parse(JSON.stringify(result));
    const [row, col] = [1, 1];
    setFlagToCell(newCells, row, col);
    expect(newCells[row][col].state).toBe(CellState.flagged);
  });
  it("should open adjacent empty cells", () => {
    const adjoiningCells = [
      [-1, 0],
      [0, -1],
      [0, 1],
      [1, 0],
    ];
    const newCells: Cell[][] = JSON.parse(JSON.stringify(result));
    let row = -1;
    let column = -1;
    for (let i = 0; i < newCells.length; i += 1) {
      for (let j = 0; j < newCells[i].length; j += 1) {
        if (newCells[i][j].value === CellValue.none) {
          row = i;
          column = j;
          return;
        }
      }
    }
    if (row >= 0 && column >= 0) {
      openAllAdjacentEmptyCells(newCells, row, column);
      for (let i = 0; i < adjoiningCells.length; i += 1) {
        const [addX, addY] = adjoiningCells[i];
        if (
          row + addX >= 0 &&
          row + addX < newCells.length &&
          column + addY >= 0 &&
          column + addY < newCells[row + addX].length &&
          newCells[row + addX][column + addY].value === CellValue.none
        ) {
          expect(newCells[row + addX][column + addY].state).toBe(
            CellState.open
          );
        }
      }
    }
  });
  it("should open all bomb", () => {
    const newCells: Cell[][] = JSON.parse(JSON.stringify(result));
    updateAllBombState(newCells);
    for (let i = 0; i < newCells.length; i += 1) {
      for (let j = 0; j < newCells[i].length; j += 1) {
        if (newCells[i][j].value === CellValue.bomb) {
          expect(newCells[i][j].state).toBe(CellState.open);
        }
      }
    }
  });
});
