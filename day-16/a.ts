import { runSolution } from '../utils.ts';

class Grid {
  #grid: string[][];
  #rows: number;
  #cols: number;
  #start: [number, number];
  #end: [number, number];

  constructor(data: string[]) {
    this.#grid = [];
    data.forEach((row, indx) => {
      this.#grid[indx] = row.split('');
    });
    this.#rows = data.length;
    this.#cols = data[0].length;
    this.#start = this.#findPoint('S');
    this.#end = this.#findPoint('E');

    console.log(this.#start);
  }

  #findPoint(point: string): [number, number] {
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#cols; j++) {
        if (this.#grid[i][j] === point) return [j, i];
      }
    }
  }

  solve(): { path: string[]; cost: number } | null {
    const directions: { dir: string; move: [number, number] }[] = [
      { dir: 'up', move: [0, -1] }, // Move up (y-1)
      { dir: 'down', move: [0, 1] }, // Move down (y+1)
      { dir: 'left', move: [-1, 0] }, // Move left (x-1)
      { dir: 'right', move: [1, 0] }, // Move right (x+1)
    ];

    const [sx, sy] = this.#start;
    const [ex, ey] = this.#end;
    const queue = [
      {
        point: this.#start,
        cost: 0,
        path: [`${sx},${sy}`],
        direction: 'right',
      },
    ];

    const visited = new Map<string, number>();
    while (queue.length > 0) {
      queue.sort((a, b) => a.cost - b.cost);
      const { point, cost, path, direction } = queue.shift()!;
      const [x, y] = point;

      if (x === ex && y === ey) {
        return { path, cost };
      }

      const key = `${x},${y}`;
      if (visited.has(key) && visited.get(key)! <= cost) continue;
      visited.set(key, cost);

      for (const { dir, move } of directions) {
        const [dx, dy] = move;
        const newX = x + dx;
        const newY = y + dy;

        if (
          newX >= 0 &&
          newX < this.#cols &&
          newY >= 0 &&
          newY < this.#rows &&
          this.#grid[newY][newX] !== '#' //consider this line
        ) {
          const newPath = [...path, `${newX},${newY}`];
          const newTurns = direction && direction !== dir ? 1 : 0;
          const newCost = cost + 1 + newTurns * 1000;

          queue.push({
            point: [newX, newY],
            cost: newCost,
            path: newPath,
            direction: dir,
          });
        }
      }
    }

    return { path: [], cost: Infinity };
  }
}

/** provide your solution as the return of this function */
export async function day16a(data: string[]) {
  const grid = new Grid(data);
  const s = grid.solve();
  console.log(s);
  return 0;
}

await runSolution(day16a);
