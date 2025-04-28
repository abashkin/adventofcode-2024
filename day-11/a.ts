import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day11a(data: string[]) {
  console.log(data);
  const blinkingTimes = 75;
  let initialArrangement = data[0].split(' ').map(Number);
  for (let i = 0; i < blinkingTimes; i++) {
    const tmpBlink = [];
    initialArrangement.forEach((stone) => {
      if (stone === 0) {
        tmpBlink.push(1);
      } else if (`${stone}`.length % 2 === 0) {
        const [s1, s2] = splitStone(stone);
        tmpBlink.push(s1);
        tmpBlink.push(s2);
      } else {
        tmpBlink.push(stone * 2024);
      }
    });
    initialArrangement = [...tmpBlink];
  }
  console.log(initialArrangement.length);
  return 0;
}

await runSolution(day11a);
function splitStone(stone: number): number[] {
  const stoneStr = `${stone}`;
  const splitLength = stoneStr.length / 2;
  const s1 = stoneStr.slice(0, splitLength);
  const s2 = stoneStr.slice(splitLength);
  return [Number(s1), Number(s2)];
}
