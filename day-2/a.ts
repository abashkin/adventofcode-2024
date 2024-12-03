import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day2a(data: string[]) {
  return data.map(isSafeRow).filter((isSafe) => isSafe).length;
}

await runSolution(day2a);

function isSafeRow(row: string): boolean {
  console.log(row);
  const numbers = row.split(' ').map(parseFloat);
  let isIncreasing: boolean | null = null;

  for (let index = 0; index < numbers.length - 1; index++) {
    const num1 = numbers.at(index);
    const num2 = numbers.at(index + 1);
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
