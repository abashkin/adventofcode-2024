import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day10a(data: string[]) {
  const topographicMap: number[][] = createMap(data);
  const hikingStartPoints: number[][] = getHikingStartPoints(topographicMap);
  let counter = { total: 0 };
  hikingStartPoints.forEach((startPoint) => {
    hikeTrail(startPoint, topographicMap, counter);
  });

  console.log(counter.total);
  return 0;
}

await runSolution(day10a);

function createMap(data: string[]): number[][] {
  const map = [];
  data.forEach((row, idx) => {
    map[idx] = row.split('').map((point) => {
      return isNaN(Number(point)) ? Number.NEGATIVE_INFINITY : Number(point);
    });
  });

  return map;
}

function getHikingStartPoints(map: number[][]): number[][] {
  const startPoints = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        startPoints.push([i, j]);
      }
    }
  }
  return startPoints;
}

function hikeTrail(
  point: number[],
  map: number[][],
  counter: { total: number }
) {
  const [row, col] = point;
  const pointHeight = map[row][col];
  const pointMarker = `${row}-${col}`;

  if (pointHeight === 9) {
    counter.total++;
  }

  //goUp
  if (row > 0) {
    const up = map[row - 1][col];
    if (up - pointHeight === 1) {
      hikeTrail([row - 1, col], map, counter);
    }
  }
  //goRight
  if (col < map[0].length - 1) {
    const right = map[row][col + 1];
    if (right - pointHeight === 1) {
      hikeTrail([row, col + 1], map, counter);
    }
  }
  //goDown
  if (row < map.length - 1) {
    const down = map[row + 1][col];
    if (down - pointHeight === 1) {
      hikeTrail([row + 1, col], map, counter);
    }
  }
  //goLeft
  if (col > 0) {
    const left = map[row][col - 1];
    if (left - pointHeight === 1) {
      hikeTrail([row, col - 1], map, counter);
    }
  }
}
