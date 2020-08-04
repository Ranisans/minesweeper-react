import { CellState, CellValue, Cell } from "../../types";

class GameFieldGenerator {
  private rows: number;

  private cols: number;

  private gameField: Cell[][];

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.gameField = new Array(rows)
      .fill(null)
      .map(() =>
        new Array(cols)
          .fill(null)
          .map(() => ({ value: 0, state: CellState.hidden }))
      );
  }

  private generateBombs(): void {
    const cellCount = this.rows * this.cols;
    const mineCount = Math.floor(Math.sqrt(cellCount)) + 1;
    for (let i = 0; i < mineCount; i += 1) {
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

export default GameFieldGenerator;
