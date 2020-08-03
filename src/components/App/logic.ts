import { CellState, CellValue } from "../../types";

interface IProps {
  rows: number;
  cols: number;
}

class GameFieldGenerator {
  private rows: number;

  private cols: number;

  private gameField: CellValue[][];

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.gameField = new Array(rows)
      .fill(null)
      .map(() => new Array(cols).fill(null));
  }

  private generateBombs(): void {
    const cellCount = this.rows * this.cols;
    const mineCount = Math.floor(Math.sqrt(cellCount)) + 1;
    for (let i = 0; i < mineCount; i += 1) {
      const cellId = Math.floor(Math.random() * cellCount);
      const bombRow = Math.floor(cellId / this.rows);
      const bombCol = cellId % this.rows;
      if (this.gameField[bombRow][bombCol] === CellValue.bomb) {
        i -= 1;
      } else {
        this.gameField[bombRow][bombCol] = CellValue.bomb;
      }
    }
  }

  private bombsInContiguouslyCells(row: number, col: number): CellValue {
    let bombCount = 0;
    const findInRow = (rowToFind: number): number => {
      let result = 0;
      for (
        let i = col - 1;
        i <= col + 1 && i < this.gameField[0].length;
        i += 1
      ) {
        if (i >= 0) {
          if (this.gameField[rowToFind][i] === CellValue.bomb) {
            result += 1;
          }
        }
      }
      return result;
    };
    for (let i = row - 1; i < this.gameField.length && i <= row + 1; i += 1) {
      if (i >= 0) {
        bombCount += findInRow(i);
      }
    }
    return bombCount;
  }

  public generate(): CellValue[][] {
    this.generateBombs();
    for (let row = 0; row < this.rows; row += 1) {
      for (let col = 0; col < this.cols; col += 1) {
        if (this.gameField[row][col] !== CellValue.bomb) {
          this.gameField[row][col] = this.bombsInContiguouslyCells(row, col);
        }
      }
    }
    return this.gameField;
  }
}

export default GameFieldGenerator;
