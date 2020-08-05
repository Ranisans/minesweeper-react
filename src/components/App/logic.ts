import { CellState, CellValue, Cell } from "../../types";

export class GameFieldGenerator {
  private rows: number;

  private cols: number;

  private bombCount: number;

  private gameField: Cell[][];

  constructor(rows: number, cols: number, bombCount: number) {
    this.rows = rows;
    this.cols = cols;
    this.bombCount = bombCount;
    this.gameField = new Array(rows)
      .fill(null)
      .map(() =>
        new Array(cols)
          .fill(null)
          .map(() => ({ value: 0, state: CellState.closed }))
      );
  }

  private generateBombs(): void {
    const cellCount = this.rows * this.cols;
    for (let i = 0; i < this.bombCount; i += 1) {
      const cellId = Math.floor(Math.random() * cellCount);
      const bombRow = Math.floor(cellId / this.rows);
      const bombCol = cellId % this.rows;
      if (this.gameField[bombRow][bombCol].value === CellValue.bomb) {
        i -= 1;
      } else {
        this.gameField[bombRow][bombCol].value = CellValue.bomb;
        this.increaseNumberOfBombsInAdjacentCells(bombRow, bombCol);
      }
    }
  }

  private increaseNumberOfBombsInAdjacentCells(row: number, col: number) {
    for (let i = row - 1; i <= row + 1 && i < this.gameField.length; i += 1) {
      if (i >= 0) {
        for (
          let j = col - 1;
          j <= col + 1 && j < this.gameField[i].length;
          j += 1
        ) {
          if (j >= 0 && this.gameField[i][j].value !== CellValue.bomb) {
            this.gameField[i][j].value += 1;
          }
        }
      }
    }
  }

  public generate(): Cell[][] {
    this.generateBombs();

    return this.gameField;
  }
}

export const updateAllBombState = (cells: Cell[][]): void => {
  for (let i = 0; i < cells.length; i += 1) {
    for (let j = 0; j < cells[i].length; j += 1) {
      if (cells[i][j].value === CellValue.bomb) {
        // eslint-disable-next-line no-param-reassign
        cells[i][j].state = CellState.open;
      }
    }
  }
};

interface Position {
  row: number;
  col: number;
}

export const openAllAdjacentEmptyCells = (
  cells: Cell[][],
  row: number,
  col: number
): void => {
  const query: Position[] = [];
  query.push({ row, col });

  for (let pos = 0; pos < query.length; pos += 1) {
    const { row: x, col: y } = query[pos];
    // eslint-disable-next-line no-param-reassign
    cells[x][y].state = CellState.open;
    for (let i = x - 1; i <= x + 1 && i < cells.length; i += 1) {
      if (i >= 0) {
        for (let j = y - 1; j <= y + 1 && j < cells[i].length; j += 1) {
          if (j >= 0) {
            if (cells[i][j].state !== CellState.open) {
              if (cells[i][j].value === CellValue.none) {
                query.push({ row: i, col: j });
              } else {
                // eslint-disable-next-line no-param-reassign
                cells[i][j].state = CellState.open;
              }
            }
          }
        }
      }
    }
  }
};

export const updateCellState = (
  cells: Cell[][],
  row: number,
  col: number
): [Cell[][], boolean] => {
  let isEnd = false;
  const newCells = [...cells];

  const selectedCell = newCells[row][col];
  if (selectedCell.value === CellValue.none) {
    openAllAdjacentEmptyCells(newCells, row, col);
  } else if (selectedCell.value === CellValue.bomb) {
    selectedCell.red = true;
    isEnd = true;
    updateAllBombState(cells);
    selectedCell.state = CellState.open;
  } else {
    selectedCell.state = CellState.open;
  }
  return [newCells, isEnd];
};

export const setFlagToCell = (
  cells: Cell[][],
  row: number,
  col: number
): Cell[][] => {
  const newCells = [...cells];
  newCells[row][col].state =
    newCells[row][col].state === CellState.flagged
      ? CellState.closed
      : CellState.flagged;
  return newCells;
};

export const isAllBombMarked = (cells: Cell[][]): boolean => {
  for (let i = 0; i < cells.length; i += 1) {
    for (let j = 0; j < cells[i].length; j += 1) {
      if (
        cells[i][j].value === CellValue.bomb &&
        cells[i][j].state !== CellState.flagged
      ) {
        return false;
      }
    }
  }
  return true;
};
