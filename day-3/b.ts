import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3b(data: string[]) {
  const fromDoToDont = /do\(\).*?don't\(\)/g;
  const mulMatcher = /mul\(\d{1,3},\d{1,3}\)/g;

  return ['do()', ...data, 'dont()'].join()
    .match(fromDoToDont).join()
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

await runSolution(day3b);
