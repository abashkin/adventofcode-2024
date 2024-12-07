import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day6a(data: string[]) {
  console.log(data);
  const guard = '^';
  let direction = 'up';
  let row = getStartingRow(data, guard);
  let col = data[row].indexOf(guard);
  let moves = new Map();

  while (!isExit(data, row, col)) {
    moves.set(`${row}:${col}`, 'X');
    const moveResult = move(data, row, col, direction);
    row = moveResult.row;
    col = moveResult.col;
    direction = moveResult.direction;
  }

  return moves.size;
}

await runSolution(day6a);

function move(
  data: string[],
  row: number,
  col: number,
  direction: string
): {
  row: number;
  col: number;
  direction: string;
} {
  if (isObstructionAhead(data, row, col, direction)) {
    return {
      row,
      col,
      direction: makeTurn(direction),
    };
  } else {
    const { nextRow, nextCol } = getNextCoordsByDirection(row, col, direction);
    return {
      row: nextRow,
      col: nextCol,
      direction,
    };
  }
}

function isExit(data: string[], row: number, col: number): boolean {
  const maxRows = data.length;
  const maxCols = data[0].length;
  return row < 0 || row >= maxRows || col < 0 || col > maxCols;
}
function getStartingRow(data: string[], guard): number {
  const guardRow = data.find((row) => row.includes(guard));
  return data.indexOf(guardRow);
}
function isObstructionAhead(
  data: string[],
  row: number,
  col: number,
  direction: string
) {
  const obstruction = '#';
  const coords = getNextCoordsByDirection(row, col, direction);
  return data[coords.nextRow]?.at(coords.nextCol) === obstruction;
}
function getNextCoordsByDirection(
  row: number,
  col: number,
  direction: string
): { nextRow: number; nextCol: number } {
  switch (direction) {
    case 'up':
      return { nextRow: row - 1, nextCol: col };
    case 'right':
      return { nextRow: row, nextCol: col + 1 };
    case 'down':
      return { nextRow: row + 1, nextCol: col };
    case 'left':
      return { nextRow: row, nextCol: col - 1 };
    default:
      break;
  }
}
function makeTurn(direction: string): string {
  if (direction === 'up') {
    return 'right';
  } else if (direction === 'right') {
    return 'down';
  } else if (direction === 'down') {
    return 'left';
  } else return 'up';
}
