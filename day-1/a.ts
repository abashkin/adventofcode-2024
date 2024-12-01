import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1a(data: string[]) {
  const [left, right] = processLine(data);

  return left.reduce((prev, curr, indx) => {
    const dist = Math.abs(left[indx] - right[indx]);
    console.log(dist);
    return prev + dist;
  }, 0);
}

await runSolution(day1a);

function processLine(data: string[]): [number[], number[]] {
  const l1: number[] = [];
  const l2: number[] = [];
  data.forEach((row) => {
    const rowSplit = row.trim().split(' ');
    l1.push(+rowSplit.at(0));
    l2.push(+rowSplit.at(-1));
  });

  const l1Sorted = l1.toSorted((a, b) => a - b);
  const l2Sorted = l2.toSorted((a, b) => a - b);

  return [l1Sorted, l2Sorted];
}
