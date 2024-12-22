import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day22a(data: string[]) {
  console.log(data);

  let total = 0n;
  data.forEach((sec) => {
    let s = BigInt(sec);
    for (let i = 0; i < 2000; i++) {
      s = (round(s << 6n) ^ s) & 0xffffffn;
      s = ((s >> 5n) ^ s) & 0xffffffn;
      s = ((s << 11n) ^ s) & 0xffffffn;
    }
    total += s;
  });

  console.log(total);
  return 0;
}

await runSolution(day22a);

function mix(num: bigint, s: bigint): bigint {
  return num ^ s;
}

function prune(s: bigint): bigint {
  return s % 16777216n;
}

function round(n: bigint): bigint {
  return BigInt(`${n}`.split('.')[0]);
}
