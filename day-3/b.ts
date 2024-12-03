import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day3b(data: string[]) {
  const fromDontToDo = /don\'t\(\)(.*?)do\(\)/g;
  const mulMatcher = /mul\(\d{1,3},\d{1,3}\)/g;
  const firstMulMatcher = /mul\(\d{1,3},\d{1,3}\)/;

  //data.join().match(fromDoToDont).forEach(console.log);
  console.log(data.join().replace(fromDontToDo, 'do()'));

  const doSum = data
    .join()
    .replace(fromDontToDo, '')
    .match(mulMatcher)
    .reduce((prev, curr) => {
      const result = excecuteMul(curr);
      return prev + result;
    }, 0);
  const firstMul = data[0].match(firstMulMatcher).join();
  return doSum + excecuteMul(firstMul);
}

function excecuteMul(mulStr: string): number {
  const numRegexp = /\d{1,3}/g;
  const nums = mulStr.match(numRegexp).map(parseFloat);
  return nums[0] * nums[1];
}

await runSolution(day3b);
