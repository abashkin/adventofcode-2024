import { runSolution } from '../utils.ts';

type Region = [number, number][];

/** provide your solution as the return of this function */
export async function day12a(data: string[]) {
  console.log(data);

  const regions = findRegions(data);

  for (const regionName of Object.keys(regions)) {
  }

  const price = Object.keys(regions).reduce((fencePrice, regionName) => {
    console.log(regionName);

    const price = regions[regionName].reduce((fencePrice, region) => {
      const square = region.length;
      const perimeter = calculateRegionPerimeter(region);

      return (fencePrice += square * perimeter);
    }, 0);

    return (fencePrice += price);
  }, 0);

  return price;
}

await runSolution(day12a);

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
  let perimeter = 0;

  const directions = [
    [0, -1], //left
    [-1, 0], //up
    [0, 1], //right
    [1, 0], //down
  ];

  for (const [row, col] of region) {
    for (const [drow, dcol] of directions) {
      const neighbor = `${row + drow}:${col + dcol}`;
      if (!regionSet.has(neighbor)) {
        perimeter++;
      }
    }
  }

  return perimeter;
}
