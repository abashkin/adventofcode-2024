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
    console.log(antenna);
    const antennaCoords = antennaMap.get(antenna);
    console.log(antennaCoords);
    for (let i = 0; i < antennaCoords.length; i++) {
      for (let j = i + 1; j < antennaCoords.length; j++) {
        const first = antennaCoords[i];
        const second = antennaCoords[j];

        const rowDiff = Math.abs(first.row - second.row);
        const colDiff = Math.abs(first.col - second.col);

        let rUp = Math.min(first.row, second.row);
        let cUp =
          first.col < second.col
            ? Math.min(first.col, second.col)
            : Math.max(first.col, second.col);
        let cUpDiff = first.col < second.col ? -1 * colDiff : colDiff;
        //loop up
        while (rUp >= 0 && cUp >= 0 && cUp < maxCol) {
          antinodeSet.add(`${rUp}-${cUp}`);
          rUp -= rowDiff;
          cUp += cUpDiff;
        }
        //loop down
        let rDown = Math.max(first.row, second.row);
        let cDown =
          first.col < second.col
            ? Math.max(first.col, second.col)
            : Math.min(first.col, second.col);
        let cDownDiff = first.col < second.col ? colDiff : -1 * colDiff;
        while (rDown < maxRow && cDown >= 0 && cDown < maxCol) {
          antinodeSet.add(`${rDown}-${cDown}`);
          rDown += rowDiff;
          cDown += cDownDiff;
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
