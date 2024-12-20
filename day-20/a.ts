import { setDefaultResultOrder } from 'dns';
import { runSolution } from '../utils.ts';

type Point = [number, number];

class Grid {
  #grid: string[][];
  #gridWidth: number;
  #gridHeight: number;
  #path: string[];
  #cheats: { start: string; end: string }[];

  constructor(data: string[]) {
    this.#grid = data.map((row) => Array.from(row));
    this.#gridWidth = data[0].length;
    this.#gridHeight = data.length;
    const { start, end } = this.#getStartEndPoints();
    this.#cheats = [];

    this.#path = this.#buildPath(start, end);
  }

  #getStartEndPoints(): { start: Point; end: Point } {
    let start: Point = null;
    let end: Point = null;

    for (let i = 0; i < this.#gridHeight; i++) {
      for (let j = 0; j < this.#gridWidth; j++) {
        if (this.#grid[i][j] === 'S') {
          start = [j, i];
        } else if (this.#grid[i][j] === 'E') {
          end = [j, i];
        }
      }
    }
    return { start, end };
  }

  #buildPath(start: Point, end: Point): string[] {
    const queue: { point: Point; path: string[] }[] = [
      {
        point: start,
        path: [`${start[0]},${start[1]}`],
      },
    ];
    const visited: boolean[][] = Array.from({ length: this.#gridHeight }, () =>
      Array(this.#gridWidth).fill(false)
    );
    const directions: { dir: [number, number]; name: string }[] = [
      { dir: [-1, 0], name: 'left' }, //left
      { dir: [0, -1], name: 'up' }, //up
      { dir: [1, 0], name: 'right' }, //right
      { dir: [0, 1], name: 'down' }, //down
    ];

    visited[start[0]][start[1]] = true;

    while (queue.length) {
      const { point, path } = queue.shift()!;

      //if end
      if (point[0] === end[0] && point[1] === end[1]) {
        return path;
      }

      for (const { dir, name } of directions) {
        const [dx, dy] = dir;
        const [x, y] = point;
        let newX = point[0] + dx;
        let newY = point[1] + dy;
        if (this.#grid[newY][newX] === '#') {
          const nnx = newX + dx;
          const nny = newY + dy;
          if (
            nnx >= 0 &&
            nnx < this.#gridWidth &&
            nny >= 0 &&
            nny < this.#gridHeight &&
            this.#grid[nny][nnx] !== '#' &&
            !visited[nnx][nny]
          ) {
            this.#cheats.push({ start: `${x},${y}`, end: `${nnx},${nny}` });
          }
        } else if (!visited[newX][newY] && this.#isValidMove(newX, newY)) {
          visited[newX][newY] = true;
          path.push(`${newX},${newY}`);
          queue.push({ point: [newX, newY], path });
        }
      }
    }
  }

  #isValidMove(x: number, y: number): boolean {
    return x >= 0 || x < this.#gridWidth || y >= 0 || y < this.#gridHeight;
  }

  getPath(): string[] {
    return this.#path;
  }

  getCheats(): { start: string; end: string }[] {
    return this.#cheats;
  }
}

/** provide your solution as the return of this function */
export async function day20a(data: string[]) {
  const grid = new Grid(data);
  const path = grid.getPath();
  const pathLenght = path.length;
  const cheats = grid.getCheats();

  let count = 0;
  for (let i = 0; i < pathLenght - 76; i++) {
    for (let j = i + 76; j < pathLenght; j++) {
      const p1 = path.at(i);
      const p2 = path.at(j);
      if (isIn20Ms(p1, p2)) {
        count++;
      }
    }
  }

  console.log(count++);

  let totalLongerThan100 = 0;

  // for (const cheat of cheats) {
  //   const { start, end } = cheat;
  //   const cheatLen = path.indexOf(end) - path.indexOf(start) - 2;
  //   if (cheatLen >= 100) {
  //     totalLongerThan100++;
  //   }
  // }

  return totalLongerThan100;
}

await runSolution(day20a);

function isIn20Ms(p1: string, p2: string) {
  console.log('P1, P2: ', p1, p2);
  const [x1, y1] = p1.split(',').map(Number);
  const [x2, y2] = p1.split(',').map(Number);

  return Math.abs(x2 - x1) + Math.abs(y2 - y1) < 21;
}
