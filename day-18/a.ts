import { runSolution } from '../utils.ts';

type Coord = {
  x: number;
  y: number;
};

class PriorityQueue {
  private elements: [number, Coord][];
  constructor() {
    this.elements = [];
  }
  enqueue(element: [number, Coord]) {
    this.elements.push(element);
    this.elements.sort((a, b) => a[0] - b[0]);
  }
  dequeue(): [number, Coord] | undefined {
    if (this.isEmpty()) return undefined;
    return this.elements.shift();
  }
  isEmpty(): boolean {
    return this.elements.length === 0;
  }
}

class Grid {
  #walls: Coord[];
  #start: Coord;
  #end: Coord;
  #gridLength: number;
  #gridHeight: number;
  constructor(length: number, height: number, bytesToFall: Coord[]) {
    this.#start = { x: 0, y: 0 };
    this.#end = { x: length, y: height };
    this.#walls = bytesToFall;
    this.#gridLength = length;
    this.#gridHeight = height;
  }

  //Dijkstra
  findShortestPath(): Coord[] | null {
    const shortestDistances = {};
    const walls = new Set(this.#walls.map(({ x, y }) => `${x},${y}`));
    const queue = new PriorityQueue();
    const directions: [number, number][] = [
      [-1, 0], //left
      [0, -1], //up
      [1, 0], //right
      [0, 1], //down
    ];

    let id = 0;
    for (let i = 0; i <= this.#gridLength; i++) {
      for (let j = 0; j <= this.#gridHeight; j++) {
        shortestDistances[`${i},${j}`] = Infinity;
      }
    }

    const startKey = `${this.#start.x},${this.#start.y}`;
    shortestDistances[startKey] = 0;
    queue.enqueue([0, this.#start]);

    while (!queue.isEmpty()) {
      const [currDistance, currNode] = queue.dequeue()!;
      const currNodeKey = `${currNode.x},${currNode.y}`;

      //if end
      if (currNode.x === this.#end.x && currNode.y === this.#end.y) {
        return shortestDistances[currNodeKey];
      }

      if (
        walls.has(currNodeKey) ||
        currDistance > shortestDistances[currNodeKey]
      )
        continue;

      for (const [dx, dy] of directions) {
        let newX = currNode.x + dx;
        let newY = currNode.y + dy;

        if (!this.#isInvalidMove(newX, newY) && !walls.has(`${newX},${newY}`)) {
          const newDistance = currDistance + 1;

          if (newDistance < shortestDistances[`${newX},${newY}`]) {
            shortestDistances[`${newX},${newY}`] = newDistance;
            queue.enqueue([newDistance, { x: newX, y: newY }]);
          }
        }
      }
    }

    return null;
  }

  addWall(wall: Coord): void {
    this.#walls.push(wall);
  }

  #isInvalidMove(x: number, y: number): boolean {
    return (
      x < 0 || x > this.#gridLength + 1 || y < 0 || y > this.#gridHeight + 1
    );
  }
}

/** provide your solution as the return of this function */
export async function day18a(data: string[]) {
  console.log(data);
  const gridZize = 70;
  const n = 1024;
  const bytesToFall = data.slice(0, n).map(getCoord);
  const grid = new Grid(gridZize, gridZize, bytesToFall);
  console.log(grid.findShortestPath());

  return 0;
}

await runSolution(day18a);
function getCoord(row: string): Coord {
  const [x, y] = row.split(',').map(Number);
  return {
    x,
    y,
  };
}
