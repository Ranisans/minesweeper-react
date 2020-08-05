import { CellState, Cell, CellValue } from "../../types/index";

import { MIN_BOMB_COUNT } from "../../constants/index";
import {
  GameFieldGenerator,
  openAllAdjacentEmptyCells,
  updateCellState,
  setFlagToCell,
  updateAllBombState,
  isAllBombMarked,
} from "./logic";

const rows = 9;
const cols = 9;

describe("game field generator", () => {
  let cells: Cell[][];
  beforeAll(() => {
    cells = new GameFieldGenerator(rows, cols, MIN_BOMB_COUNT).generate();
  });
  it("should generate right array", () => {
    expect(cells.length).toBe(rows);
    expect(cells[0].length).toBe(cols);
  });
  it("should contain the correct number of bombs in the adjacent numbered cell", () => {
    const checkBombsCount = (row: number, col: number): number => {
      let bombsCount = 0;
      for (let i = row - 1; i <= row + 1 && i < cells.length; i += 1) {
        if (i >= 0) {
          for (let j = col - 1; j <= col + 1 && j < cells[i].length; j += 1) {
            if (j >= 0 && cells[i][j].value === CellValue.bomb) {
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
          cells[i][j].value !== CellValue.none &&
          cells[i][j].value !== CellValue.bomb
        ) {
          const bomb = checkBombsCount(i, j);
          expect(cells[i][j].value).toBe(bomb);
        }
      }
    }
  });
  it("should update cell state to open", () => {
    const newCells: Cell[][] = JSON.parse(JSON.stringify(cells));
    const [row, col] = [1, 1];
    updateCellState(newCells, row, col);
    expect(newCells[row][col].state).toBe(CellState.open);
  });
  it("should set flag on cell", () => {
    const newCells: Cell[][] = JSON.parse(JSON.stringify(cells));
    const [row, col] = [1, 1];
    setFlagToCell(newCells, row, col);
    expect(newCells[row][col].state).toBe(CellState.flagged);
  });
  it("should open adjacent empty cells", () => {
    const newCells: Cell[][] = JSON.parse(JSON.stringify(cells));
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
      for (let i = row - 1; i <= row + 1 && row < newCells.length; i += 1) {
        if (i >= 0) {
          for (
            let j = column - 1;
            j <= column + 1 && newCells[i].length;
            j += 1
          ) {
            if (j >= 0) {
              expect(newCells[i][j].state).toBe(CellState.open);
            }
          }
        }
      }
    }
  });
  it("should open all bomb", () => {
    const newCells: Cell[][] = JSON.parse(JSON.stringify(cells));
    updateAllBombState(newCells);
    for (let i = 0; i < newCells.length; i += 1) {
      for (let j = 0; j < newCells[i].length; j += 1) {
        if (newCells[i][j].value === CellValue.bomb) {
          expect(newCells[i][j].state).toBe(CellState.open);
        }
      }
    }
  });
  it("should return false if all bombs aren't marked", () => {
    const result = isAllBombMarked(cells);
    expect(result).toBe(false);
  });
  it("should return true if all bombs are marked", () => {
    const newCells: Cell[][] = JSON.parse(JSON.stringify(cells));
    updateAllBombState(newCells);
    const result = isAllBombMarked(newCells);
    expect(result).toBe(true);
  });
});
