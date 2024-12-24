import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day22b(data: string[]) {
  console.log(data);

  data.forEach((sec) => {
    let s = BigInt(sec);
    for (let i = 0; i < 2000; i++) {
      s = (round(s << 6n) ^ s) & 0xffffffn;
      s = ((s >> 5n) ^ s) & 0xffffffn;
      s = ((s << 11n) ^ s) & 0xffffffn;
    }
  });
  return 0;
}

await runSolution(day22b);

function round(n: bigint): bigint {
  return BigInt(`${n}`.split('.')[0]);
}
