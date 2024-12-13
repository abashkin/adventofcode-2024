import { runSolution } from '../utils.ts';

type Region = [number, number][];

/** provide your solution as the return of this function */
export async function day12b(data: string[]) {
  console.log(data);

  const regions = findRegions(data);

  const price = Object.keys(regions).reduce((fencePrice, regionName) => {
    console.log(regionName);
    const price = regions[regionName].reduce((fencePrice, region) => {
      const square = region.length;
      const perimeter = calculateRegionPerimeter(region);
      console.log('Perimeter: ', perimeter);
      return (fencePrice += square * perimeter);
    }, 0);

    return (fencePrice += price);
  }, 0);

  return price;
}

await runSolution(day12b);

function findRegions(farm: string[]): Record<string, Region[]> {
  const totalRows = farm.length;
  const totalCols = farm[0].length;
  const visitedPlots: boolean[][] = Array.from({ length: totalRows }, () =>
    Array(totalCols).fill(false)
  );
  const regions: Record<string, Region[]> = {};

  for (let row = 0; row < totalRows; row++) {
    for (let col = 0; col < totalCols; col++) {
      if (!visitedPlots[row][col]) {
        const plot = farm[row].at(col);
        const currentRegion: Region = [];
        dfs(row, col, plot, currentRegion, farm, visitedPlots);

        if (!regions[plot]) {
          regions[plot] = [];
        }
        regions[plot].push(currentRegion);
      }
    }
  }

  return regions;
}

function isPlotInFarm(
  row: number,
  col: number,
  maxRow: number,
  maxCol: number
): boolean {
  return row >= 0 && row < maxRow && col >= 0 && col < maxCol;
}

function dfs(
  row: number,
  col: number,
  plot: string,
  currentRegion: Region,
  farm: string[],
  visitedPlots: boolean[][]
): void {
  const directions = [
    [0, -1], //left
    [-1, 0], //up
    [0, 1], //right
    [1, 0], //down
  ];

  const totalRows = farm.length;
  const totalCols = farm[0].length;

  visitedPlots[row][col] = true;
  currentRegion.push([row, col]);

  for (const [drow, dcol] of directions) {
    const newRow = row + drow;
    const newCol = col + dcol;
    if (
      isPlotInFarm(newRow, newCol, totalRows, totalCols) &&
      !visitedPlots[newRow][newCol] &&
      farm[newRow].at(newCol) === plot
    ) {
      dfs(newRow, newCol, plot, currentRegion, farm, visitedPlots);
    }
  }
}
function calculateRegionPerimeter(region: Region): number {
  const regionSet = new Set(region.map(([row, col]) => `${row}:${col}`));
  //console.log(regionSet);
  let perimeter = 0;

  const isHorizontalLine = region.every(([row, _]) => row === region[0][0]);
  const isVerticalLine = region.every(([_, col]) => col === region[0][0]);

  if (isHorizontalLine) {
    return 4;
  }

  if (isVerticalLine) {
    return 4;
  }

  const directions = [
    [0, -1], //left
    [-1, 0], //up
    [0, 1], //right
    [1, 0], //down
  ];

  for (const [row, col] of region) {
    let neighborCount = 0;
    let horizontalNeighbors = 0;
    let verticalNeighbors = 0;
    const neighbors: [number, number][] = [];

    // Count neighbors in all directions
    for (const [dRow, dCol] of directions) {
      const neighborKey = `${row + dRow}:${col + dCol}`;
      if (regionSet.has(neighborKey)) {
        neighbors.push([dRow, dCol]);
        neighborCount++;
        if (dRow === 0) horizontalNeighbors++;
        if (dCol === 0) verticalNeighbors++;
      }
    }

    //console.log('N: ', neighbors);
    console.log(`Row: ${row}, Col: ${col}`);
    if (neighborCount === 0) {
      console.log(`No neighbours: +4`);
      perimeter += 4;
    } else if (neighborCount === 1) {
      console.log(`One neighb: +2`);
      perimeter += 2;
    } else if (neighborCount === 2) {
      if (horizontalNeighbors === 2 || verticalNeighbors === 2) {
        console.log(`two neighb SAME LINE: 0`);
        perimeter += 0;
      } else if (
        regionSet.has(getDiagonalNeighborWithSameNeighbors(row, col, neighbors))
      ) {
        console.log(`two neighb Diff LINE AND Diagonal: +1`);
        perimeter += 1;
      } else {
        console.log(`two neighb Diff LINE: +2`);
        perimeter += 2;
      }
    } else if (neighborCount === 3) {
      const numberOfDiagNeighbInTShape = calculateDiagNeighbInTshape(
        row,
        col,
        regionSet,
        neighbors
      );
      perimeter += numberOfDiagNeighbInTShape;
    } else if (neighborCount === 4) {
      const numberOfDiagNeighbInCross = calculateDiagNeighbInCross(
        row,
        col,
        regionSet,
        neighbors
      );
      perimeter += numberOfDiagNeighbInCross;
    }
  }

  return perimeter;
}
function getDiagonalNeighborWithSameNeighbors(
  row: number,
  col: number,
  neighbors: [number, number][]
): string {
  console.log('Neigh: ', neighbors);
  const diagRow = row + neighbors[0][0] + neighbors[1][0];
  const diagCol = col + neighbors[0][1] + neighbors[1][1];
  console.log(`DIAG: ${diagRow}:${diagCol}`);
  return `${diagRow}:${diagCol}`;
}

function calculateDiagNeighbInTshape(
  row: number,
  col: number,
  regionSet: Set<string>,
  neighbors: [number, number][]
): number {
  let maxTShapedResult = 2;
  console.log(neighbors);
  const mappenNeighb = neighbors.map(([r, c]) => [r + row, c + col]);
  console.log('Mapped: ', mappenNeighb);
  const diagNeighb: [number, number][] = [];
  for (let i = 0; i < neighbors.length; i++) {
    for (let j = i + 1; j < neighbors.length; j++) {
      const rSum = neighbors[i][0] + neighbors[j][0];
      const cSum = neighbors[i][1] + neighbors[j][1];
      if (rSum !== 0 && cSum !== 0) {
        diagNeighb.push([rSum, cSum]);
      }
    }
  }

  for (const [drow, dcol] of diagNeighb) {
    if (regionSet.has(`${row + drow}:${col + dcol}`)) {
      maxTShapedResult--;
    }
  }

  return maxTShapedResult;
}

function calculateDiagNeighbInCross(
  row: number,
  col: number,
  regionSet: Set<string>,
  neighbors: [number, number][]
) {
  let maxCrossResult = 4;
  console.log(neighbors);
  const diagNeighb: [number, number][] = [];
  for (let i = 0; i < neighbors.length; i++) {
    for (let j = i + 1; j < neighbors.length; j++) {
      const rSum = neighbors[i][0] + neighbors[j][0];
      const cSum = neighbors[i][1] + neighbors[j][1];
      if (rSum !== 0 && cSum !== 0) {
        diagNeighb.push([rSum, cSum]);
      }
    }
  }

  for (const [drow, dcol] of diagNeighb) {
    if (regionSet.has(`${row + drow}:${col + dcol}`)) {
      maxCrossResult--;
    }
  }

  return maxCrossResult;
}
