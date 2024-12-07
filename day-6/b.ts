import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day6b(data: string[]) {
  const rows = data.length;
  const cols = data[0].length;

  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  let startRow, startCol, direction;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if ('^>v<'.includes(data[row][col])) {
        startRow = row;
        startCol = col;
        direction = '^>v<'.indexOf(data[row][col]);
        break;
      }
    }
  }
  const simulateWithObstacle = (obstacleRow, obstacleCol) => {
    let guardRow = startRow,
      guardCol = startCol,
      guardDir = direction;
    const visited = new Set();
    visited.add(`${guardRow},${guardCol},${guardDir}`);

    while (true) {
      const [drow, dcol] = directions[guardDir];
      const nextRow = guardRow + drow;
      const nextCol = guardCol + dcol;

      const nextStepOutsideGrid =
        nextRow < 0 || nextRow >= rows || nextCol < 0 || nextCol >= cols;

      if (nextStepOutsideGrid) {
        return false;
      }

      const nextCell =
        nextRow === obstacleRow && nextCol === obstacleCol
          ? '#'
          : data[nextRow][nextCol];
      const obstacleAhead = nextCell === '#';
      if (obstacleAhead) {
        guardDir = (guardDir + 1) % 4;
      } else {
        guardRow = nextRow;
        guardCol = nextCol;
      }

      const state = `${guardRow},${guardCol},${guardDir}`;
      const loop = visited.has(state);
      if (loop) {
        return true;
      }
      visited.add(state);
    }
  };

  let loopsCount = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isObstacleOrStartPosition =
        data[row][col] === '#' || (row === startRow && col === startCol);
      if (isObstacleOrStartPosition) {
        continue;
      }

      if (simulateWithObstacle(row, col)) {
        loopsCount++;
      }
    }
  }

  return loopsCount;
}

await runSolution(day6b);
