import { runSolution } from '../utils.ts';

type Coords = {
  x: number;
  y: number;
};

/** provide your solution as the return of this function */
export async function day13b(data: string[]) {
  const equations: { btnA; btnB; prize }[] = parseInput(data);

  const totalPrice = equations
    .map((eq) => solveEq(eq))
    .map((res) => res[0] * 3 + res[1] * 1)
    .reduce((prev, curr) => {
      return prev + curr;
    }, 0);

  console.log(totalPrice);
  return 0;
}

await runSolution(day13b);

function parseInput(data: string[]): {
  btnA: Coords;
  btnB: Coords;
  prize: Coords;
}[] {
  const result = [];
  while (data.length >= 3) {
    const conditions = data.splice(0, 3);
    const btnA = parseToCoords(conditions[0]);
    const btnB = parseToCoords(conditions[1]);
    const prize = parseToCoords(conditions[2]);
    if (data.length > 0) {
      data.shift();
    }
    prize.x += 10000000000000;
    prize.y += 10000000000000;
    console.log(prize);
    result.push({ btnA, btnB, prize });
  }

  return result;
}
function parseToCoords(rawData: string): Coords {
  const divider = rawData.includes('+') ? '+' : '=';
  const nums = rawData
    .split(':')[1]
    .split(',')
    .map((part) => Number(part.split(divider)[1]));

  return { x: nums[0], y: nums[1] };
}

function solveEq(eq: {
  btnA: Coords;
  btnB: Coords;
  prize: Coords;
}): [number, number] {
  const { btnA, btnB, prize } = eq;
  const det = btnA.x * btnB.y - btnA.y * btnB.x;
  if (det !== 0) {
    const detA = prize.x * btnB.y - prize.y * btnB.x;
    const detB = prize.y * btnA.x - prize.x * btnA.y;
    const solveA = detA / det;
    const solveB = detB / det;
    if (Number.isInteger(solveA) && Number.isInteger(solveB)) {
      console.log(solveA, solveB);
      return [solveA, solveB];
    } else {
      return [0, 0];
    }
  }

  return [0, 0];
}
