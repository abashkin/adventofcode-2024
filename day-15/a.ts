import { runSolution } from '../utils.ts';

type Coord = {
  x: number;
  y: number;
};

class RobotMover {
  #width: number;
  #heigth: number;
  #pillars: Coord[];
  #boxes: Coord[];
  #robot: Coord;

  #movesMap: Map<string, [number, number]> = new Map([
    ['<', [0, -1]],
    ['^', [-1, 0]],
    ['>', [0, 1]],
    ['v', [1, 0]],
  ]);

  constructor(grid: string[]) {
    this.#boxes = [];
    this.#pillars = [];
    this.#robot = { x: 0, y: 0 };

    for (let i = 0; i < grid.length - 1; i++) {
      for (let j = 0; j < grid[0].length - 1; j++) {
        const mapTile = grid[i].at(j);
        if (mapTile === '#') {
          this.addPillar(j, i);
        } else if (mapTile === 'O') {
          this.addBox(j, i);
        } else if (mapTile === '@') {
          this.setRobot(j, i);
        }
      }
    }

    this.#width = grid[0].length - 1;
    this.#heigth = grid.length - 1;
  }

  addPillar(x: number, y: number): void {
    this.#pillars.push({ x, y });
  }

  addBox(x: number, y: number): void {
    this.#boxes.push({ x, y });
  }

  setRobot(x: number, y: number) {
    this.#robot.x = x;
    this.#robot.y = y;
  }

  makeMove(movements: string): void {
    let currX = this.#robot.x;
    let currY = this.#robot.y;

    for (const direction of movements) {
      console.log(direction);
      const [dy, dx] = this.#movesMap.get(direction);

      if (this.#isValidMove(currX, currY, dx, dy)) {
        console.log('valid move');
        this.#robot.x += dx;
        this.#robot.y += dy;
        currX += dx;
        currY += dy;
      }
      this.printGrid();
    }
  }

  printGrid(): void {
    const grid: string[][] = Array(this.#heigth)
      .fill(0)
      .map(() => Array(this.#width).fill(' '));

    grid[this.#robot.y][this.#robot.x] = '@';

    for (const pillar of this.#pillars) {
      grid[pillar.y][pillar.x] = '#';
    }

    for (const box of this.#boxes) {
      grid[box.y][box.x] = 'O';
    }

    const gridStr: string = grid.map((row) => row.join('')).join('\n');
    console.log(gridStr);
  }

  getBoxes(): Coord[] {
    return this.#boxes;
  }

  #isValidMove(currX: number, currY: number, dx: number, dy: number): boolean {
    const newX = currX + dx;
    const newY = currY + dy;
    if (!this.#isInBounds(newX, newY)) {
      console.log('out of bounds');
      return false;
    }
    if (this.#isPillar(newX, newY)) {
      console.log('into pillar');
      return false;
    }
    if (this.#getBox(newX, newY)) {
      if (this.#canShiftBoxes(newX, newY, dx, dy)) {
        this.#shiftBoxes(newX, newY, dx, dy);
        return true;
      }
      console.log('cant shift');
      return false;
    }
    return true;
  }
  #shiftBoxes(boxX: number, boxY: number, dx: number, dy: number): void {
    const boxesToMove = [];
    let x = boxX;
    let y = boxY;
    while (this.#getBox(x, y)) {
      boxesToMove.push({ x, y });
      x += dx;
      y += dy;
    }

    for (let i = boxesToMove.length - 1; i >= 0; i--) {
      const { x, y } = boxesToMove[i];
      this.#removeBox(x, y);
      this.addBox(x + dx, y + dy);
    }
  }
  #canShiftBoxes(boxX: number, boxY: number, dx: number, dy: number): boolean {
    let x = boxX;
    let y = boxY;
    while (this.#getBox(x, y)) {
      x += dx;
      y += dy;
      if (this.#isPillar(x, y) || !this.#isInBounds(x, y)) return false;
    }

    return true;
  }
  #isInBounds(x: number, y: number): boolean {
    return x >= 0 && x < this.#heigth && y >= 0 && y < this.#width;
  }

  #isPillar(x: number, y: number): boolean {
    return this.#pillars.some((p) => p.x === x && p.y === y);
  }

  #getBox(x: number, y: number): Coord | undefined {
    return this.#boxes.find((b) => b.x === x && b.y === y);
  }

  #removeBox(x: number, y: number): void {
    this.#boxes = this.#boxes.filter((b) => !(b.x === x && b.y === y));
  }
}

/** provide your solution as the return of this function */
export async function day15a(data: string[]) {
  console.log(data);
  const separationLine = data.indexOf('');
  const moves: string[] = data.splice(separationLine + 1);

  const grid = data.splice(0, separationLine);
  const robotMover = new RobotMover(grid);

  for (const moveLine of moves) {
    robotMover.makeMove(moveLine);
  }

  const boxes = robotMover.getBoxes();
  const gpsSum = boxes.reduce((sum, box) => {
    const gps = 1 * box.x + 100 * box.y;
    return sum + gps;
  }, 0);

  console.log(moves);
  return gpsSum;
}

await runSolution(day15a);
