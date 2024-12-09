import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day9a(data: string[]) {
  const mappedData: string[] = mapDataToIds(data[0]);
  return defrag(mappedData).reduce((prev, curr, indx) => {
    return prev + +curr * indx;
  }, 0);
}

await runSolution(day9a);

function mapDataToIds(blocks: string): string[] {
  console.log(blocks);
  let result = [];
  let id = 0;
  blocks.split('').forEach((block, indx) => {
    if (indx % 2 === 0) {
      const ids = new Array(+block).fill(`${id++}`);
      result.push(...ids);
    } else {
      const ids = new Array(+block).fill('.');
      result.push(...ids);
    }
  });
  return result;
}
function defrag(mappedData: string[]) {
  let disk = mappedData;
  let result = [];
  let l = 0;
  let r = disk.length - 1;
  while (l <= r) {
    if (disk[l] !== '.') {
      result.push(disk[l]);
      l++;
    } else if (disk[r] === '.') {
      r--;
    } else {
      result.push(disk[r]);
      l++;
      r--;
    }
  }
  return result;
}
