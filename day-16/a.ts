import { runSolution } from '../utils.ts';

class Maze {
  #maze: string[][];
  #rows: number;
  #cols: number;
  #start: [number, number];
  #end: [number, number];

  constructor(data: string[]) {
    this.#maze = [];
    data.forEach((row, indx) => {
      this.#maze[indx] = row.split('');
    });
    this.#rows = data.length;
    this.#cols = data[0].length;
    this.#start = this.#findPoint('S');
    this.#end = this.#findPoint('E');
  }

  #findPoint(point: string): [number, number] {
    for (let i = 0; i < this.#rows; i++) {
      for (let j = 0; j < this.#cols; j++) {
        if (this.#maze[i][j] === point) return [i, j];
      }
    }
  }

  #isValidMove(x: number, y: number): boolean {
    const key = `${x},${y}`;
    return (
      x >= 0 &&
      x < this.#rows &&
      y >= 0 &&
      y < this.#cols &&
      this.#maze[x][y] !== '#'
    );
  }

  solve(): { moves: number; turns: number }[] {
    const solutions: {
      moves: number;
      turns: number;
      directions: string;
    }[] = [];
    const queue: {
      x: number;
      y: number;
      path: string[];
      directions: string[];
    }[] = [];
    const visited = new Set<string>();

    visited.add(`${this.#start[0]},${this.#start[1]},start`);
    queue.push({
      x: this.#start[0],
      y: this.#start[1],
      path: [],
      directions: [],
    });

    while (queue.length > 0) {
      const { x, y, path, directions } = queue.shift();
      if (x === this.#end[0] && y === this.#end[1]) {
        const solutionPath = [...path, `(${x},${y})`];
        const solutionDirections = directions.join('');
        solutions.push(
          this.#calculateMovesAndTurns(solutionPath, solutionDirections)
        );
        continue;
      }

      const directionList = [
        { dx: -1, dy: 0, name: '^' },
        { dx: 1, dy: 0, name: 'v' },
        { dx: 0, dy: -1, name: '<' },
        { dx: 0, dy: 1, name: '>' },
      ];

      for (const { dx, dy, name } of directionList) {
        const newX = x + dx;
        const newY = y + dy;
        const key = `${newX},${newY},${name}`;

        if (this.#isValidMove(newX, newY) && !visited.has(key)) {
          visited.add(key);
          queue.push({
            x: newX,
            y: newY,
            path: [...path, `(${x},${y})`],
            directions: [...directions, name],
          });
        }
      }
    }

    return solutions;
  }

  #calculateMovesAndTurns(
    solution: string[],
    directions: string
  ): {
    moves: number;
    turns: number;
    directions: string;
  } {
    let moves = 0;
    let turns = 0;
    let previousDirection: string | null = null;

    for (let i = 1; i < solution.length; i++) {
      const [x1, y1] = this.#parseCoordinates(solution[i - 1]);
      const [x2, y2] = this.#parseCoordinates(solution[i]);
      moves++;

      const currentDirection = this.#getDirection(x1, y1, x2, y2);
      if (previousDirection && currentDirection !== previousDirection) {
        turns++;
      }
      previousDirection = currentDirection;
    }

    if (directions.at(0) !== '>') {
      turns++;
    }

    return { moves, turns, directions };
  }

  #parseCoordinates(coord: string): [number, number] {
    const [x, y] = coord.replace(/[()]/g, '').split(',').map(Number);
    return [x, y];
  }

  #getDirection(x1: number, y1: number, x2: number, y2: number): string {
    if (x1 === x2) return 'horizontal';
    if (y1 === y2) return 'vertical';
  }
}

/** provide your solution as the return of this function */
export async function day16a(data: string[]) {
  const maze = new Maze(data);
  const s = maze
    .solve()
    .map((s) => s.turns * 1000 + s.moves)
    .sort((a, b) => a - b);
  console.log(s);
  return 0;
}

await runSolution(day16a);
