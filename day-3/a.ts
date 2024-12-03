import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3a(data: string[]) {
  const mulMatcher = /mul\(\d{1,3},\d{1,3}\)/g;
  return data
    .join()
    .match(mulMatcher)
    .reduce((prev, curr) => {
      const result = excecuteMul(curr);
      return prev + result;
    }, 0);
}

function excecuteMul(mulStr: string): number {
  const numRegexp = /\d{1,3}/g;
  const nums = mulStr.match(numRegexp).map(parseFloat);
  return nums[0] * nums[1];
}

await runSolution(day3a);
