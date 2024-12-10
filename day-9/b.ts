import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day9a(data: string[]) {
  const mappedData: string[][] = mapDataToIds(data[0]);
  return defrag(mappedData).reduce((prev, curr, indx) => {
    return prev + +curr * indx;
  }, 0);
}

await runSolution(day9a);

function mapDataToIds(blocks: string): string[][] {
  console.log(blocks);
  let result = [];
  let id = 0;
  blocks.split('').forEach((block, indx) => {
    if (indx % 2 === 0) {
      const file = new Array(+block).fill(`${id++}`);
      result.push(file);
    } else if (+block > 0) {
      const emptySpace = new Array(+block).fill('.');
      result.push(emptySpace);
    }
  });
  return result;
}
function defrag(disk: string[][]) {
  let result = [];
  let l = 0;
  let r = disk.length - 1;

  //start with empty
  disk.shift();
  let fileIdxData = +disk[disk.length - 1][0];
  let emptySpaceStrat = 0;
  let fileStart = disk.length - 1;

  while (fileIdxData > 0) {
    for (let i = 0; i < disk.length; i += 2) {
      const emptySpace = disk[i];
      console.log(disk);
      console.log(fileStart);
      const file = disk[fileStart];
      const lenDiff = emptySpace.length - file.length;
      if (lenDiff > 0) {
        disk = [
          ...disk.slice(0, emptySpaceStrat),
          new Array(file.length).fill(fileIdxData),
          new Array(lenDiff).fill('.'),
          ...disk.slice(emptySpaceStrat + emptySpace.length - 2),
        ];
        emptySpaceStrat = emptySpaceStrat + disk[emptySpaceStrat].length;
        console.log('EmptyStart: ', emptySpaceStrat);
      }
      if (lenDiff === 0) {
        disk = [
          ...disk.slice(0, emptySpaceStrat),
          new Array(file.length).fill(fileIdxData),
          ...disk.slice(emptySpaceStrat + emptySpace.length),
        ];
        emptySpaceStrat =
          emptySpaceStrat +
          disk[emptySpaceStrat].length +
          disk[emptySpaceStrat + 1].length;
      }
    }
    fileIdxData--;
  }

  console.log(disk);

  return result;
}

function isFile(data: string[]): boolean {
  return data[0] !== '.';
}
