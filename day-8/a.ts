import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day8a(data: string[]) {
  const antinodeSet: Set<string> = new Set();
  const antennaMap: Map<string, { row: number; col: number }[]> =
    createMap(data);

  const maxRow = data.length;
  const maxCol = data[0].length;

  //iterate over antennas
  for (const antenna of antennaMap.keys()) {
    const antennaCoords = antennaMap.get(antenna);
    for (let i = 0; i < antennaCoords.length; i++) {
      for (let j = i + 1; j < antennaCoords.length; j++) {
        const first = antennaCoords[i];
        const second = antennaCoords[j];

        const rowDiff = Math.abs(first.row - second.row);
        const colDiff = Math.abs(first.col - second.col);

        //top antinode
        const trow = Math.min(first.row, second.row) - rowDiff;
        const tcol =
          first.col < second.col
            ? Math.min(first.col, second.col) - colDiff
            : Math.max(first.col, second.col) + colDiff;

        //bottom antinode
        const brow = Math.max(first.row, second.row) + rowDiff;
        const bcol =
          first.col < second.col
            ? Math.max(first.col, second.col) + colDiff
            : Math.min(first.col, second.col) - colDiff;

        if (trow >= 0 && trow < maxRow && tcol >= 0 && tcol < maxCol) {
          antinodeSet.add(`${trow}-${tcol}`);
        }
        if (brow >= 0 && brow < maxRow && bcol >= 0 && bcol < maxCol) {
          antinodeSet.add(`${brow}-${bcol}`);
        }
      }
    }
  }

  console.log(antinodeSet);
  return antinodeSet.size;
}

await runSolution(day8a);
function createMap(
  data: string[]
): Map<string, { row: number; col: number }[]> {
  const map: Map<string, { row: number; col: number }[]> = new Map();
  const antennaRegexp = /[a-zA-Z0-9]/;
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    for (let j = 0; j < row.length; j++) {
      const antennaType = row.at(j);
      if (antennaRegexp.test(antennaType)) {
        const antennasList = map.get(antennaType) || [];
        const newPos = { row: i, col: j };
        map.set(antennaType, [...antennasList, newPos]);
      }
    }
  }
  return map;
}
