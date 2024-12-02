import { log } from 'console';
import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2b(data: string[]) {
  return data.map(isSafeByRemovingOneLevel).filter((isSafe) => isSafe).length;
}

await runSolution(day2b);

function isSafeByRemovingOneLevel(row: string): boolean {
  const rowNums = row.split(' ').map(parseFloat);
  for (let indx = 0; indx < rowNums.length; indx++) {
    const tmpNums: number[] = rowNums
      .slice(0, indx)
      .concat(rowNums.slice(indx + 1));
    if (isSafeRow(tmpNums)) {
      return true;
    }
  }
  return false;
}

function isSafeRow(nums: number[]): boolean {
  let isIncreasing: boolean | null = null;

  for (let index = 0; index < nums.length - 1; index++) {
    const num1 = nums.at(index);
    const num2 = nums.at(index + 1);
    const delta = num2 - num1;

    if (delta > 0) {
      if (isIncreasing === false) return false;
      isIncreasing = true;
    }

    if (delta < 0) {
      if (isIncreasing === true) return false;
      isIncreasing = false;
    }

    if (Math.abs(delta) > 3 || Math.abs(delta) < 1) {
      return false;
    }
  }
  return true;
}
