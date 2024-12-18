import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day17a(data: string[]) {
  let program = data.join().match(/\d+/g).map(BigInt).slice(3);
  return findA(program, 0n);
}

await runSolution(day17a);

//this is not a generic solution and only depends on my input
function findA(program: bigint[], a: bigint): bigint {
  if (program.length === 0) {
    return a;
  }

  let regA: bigint, regB: bigint, regC: bigint;
  for (let b = 0n; b < 7n; b++) {
    regB = b;
    regA = (a << 3n) | regB;
    regB = regB ^ 5n;
    regC = regA >> regB;
    regB = regB ^ 6n;
    regB = regB ^ regC;
    if (regB % 8n === program.at(-1)) {
      const result = findA(program.slice(0, -1), regA);
      if (result) {
        return result;
      }
    }
  }
}
