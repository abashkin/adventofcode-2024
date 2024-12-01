import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day1b(data: string[]) {
  const [left, rightMap] = processLine(data);

  return left.reduce((prev, current, index) => {
    const numberOfValueMatchInRightList = rightMap.get(current) || 0;
    return prev + current * numberOfValueMatchInRightList;
  }, 0);
}

await runSolution(day1b);

function processLine(data: string[]): [number[], Map<number, number>] {
  const left: number[] = [];
  const rightMap: Map<number, number> = new Map();
  data.forEach((row) => {
    const rowSplit = row.trim().split(' ');
    const leftValue = +rowSplit.at(0);
    const rightValue = +rowSplit.at(-1);

    left.push(leftValue);
    rightMap.set(rightValue, (rightMap.get(rightValue) || 0) + 1);
  });

  return [left, rightMap];
}
