import { generateKeySync } from 'crypto';
import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day24a(data: string[]) {
  const delimeter = data.indexOf('');
  const wires: Map<string, boolean> = new Map();
  const gates: Map<
    number,
    { w1: string; w2: string; operand: string; result: string }
  > = new Map();
  data.toSpliced(delimeter).forEach((wire) => {
    const [name, value] = wire.split(': ');
    wires.set(name, value === '1');
  });
  data.toSpliced(0, delimeter + 1).forEach((gate, idx) => {
    const [w1, operand, w2, arr, result] = gate.split(' ');
    gates.set(idx, { w1, w2, operand, result });
  });

  while (gates.size) {
    [...gates.keys()].forEach((key) => {
      const { w1, w2, operand, result } = gates.get(key);
      if (wires.has(w1) && wires.has(w2)) {
        switch (operand) {
          case 'AND':
            wires.set(result, wires.get(w1) && wires.get(w2));
            break;
          case 'OR':
            wires.set(result, wires.get(w1) || wires.get(w2));
            break;
          case 'XOR':
            wires.set(result, wires.get(w1) !== wires.get(w2));
            break;

          default:
            break;
        }
        gates.delete(key);
      }
    });
  }

  const binary = [...wires.keys()]
    .filter((key) => key.startsWith('z'))!
    .sort()
    .map((wire) => +wires.get(wire))
    .reverse()
    .join('');

  return parseInt(binary, 2);
}

await runSolution(day24a);
