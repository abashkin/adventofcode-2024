import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day17a(data: string[]) {
  console.log(data);

  let [regA, regB, regC, ...program] = data.join().match(/\d+/g).map(Number);
  const out = [];
  const getCombo = (ptr: number): number => {
    const value = program[ptr + 1];
    if (value < 4) return value;
    if (value === 4) return regA;
    if (value === 5) return regB;
    if (value === 6) return regC;
  };

  let ptr = 0;
  while (ptr < program.length) {
    const opcode = program[ptr];
    switch (opcode) {
      case 0:
        console.log('0');
        regA = regA >> getCombo(ptr);
        console.log(regA, regB, regC);
        break;
      case 1:
        console.log('1');
        regB = regB ^ program[ptr + 1];
        console.log(regA, regB, regC);
        break;
      case 2:
        console.log('2');
        regB = getCombo(ptr) % 8;
        console.log(regA, regB, regC);
        break;
      case 3:
        console.log('3');
        if (regA !== 0) ptr = program[ptr + 1] - 2;
        console.log(regA, regB, regC);
        break;
      case 4:
        console.log('4');
        regB = regB ^ regC;
        console.log(regA, regB, regC);
        break;
      case 5:
        console.log('5');
        out.push(getCombo(ptr) % 8);
        console.log(regA, regB, regC);
        break;
      case 6:
        console.log('6');
        regB = Math.floor(regA / Math.pow(2, getCombo(ptr)));
        console.log(regA, regB, regC);
        break;
      case 7:
        console.log('7');
        regC = Math.floor(regA / Math.pow(2, getCombo(ptr)));
        console.log(regA, regB, regC);
        break;
      default:
        break;
    }
    ptr += 2;
  }

  console.log(out.join(','));
}

await runSolution(day17a);
