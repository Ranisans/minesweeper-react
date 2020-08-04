import GameFieldGenerator from "./logic";
import { CellValue } from "../../types";

const rows = 4;
const cols = 4;

describe("game field generator", () => {
  it("should generate right array", () => {
    const result = new GameFieldGenerator(rows, cols).generate();
    expect(result.length).toBe(rows);
    expect(result[0].length).toBe(cols);
  });
  it("should contain the correct number of bombs in the adjacent numbered cell", () => {
    const result = new GameFieldGenerator(rows, cols).generate();

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
});
