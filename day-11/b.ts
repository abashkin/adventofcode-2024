import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day11b(data: string[]) {
  console.log(data);
  const blinkingTimes = 75;
  const initialArrangement = data[0].split(' ').map(Number);
  let stones: Map<number, number> = new Map();
  initialArrangement.forEach(stone => stones.set(stone, 1));

  for(let i = 0; i< blinkingTimes; i++) {
    const blinkMap: Map<number, number> = new Map();
    for (const stone of stones.keys()) {
      const numOfStones = stones.get(stone);
      for (const newStone of transformStone(stone)) {
        if(!blinkMap.has(newStone)) {
          blinkMap.set(newStone, numOfStones)
        } else {
          blinkMap.set(newStone, blinkMap.get(newStone) + numOfStones)
        }
      }
    }
    stones = blinkMap;
  }
  let result = 0;
  for (const stone of stones.keys()) {
    result +=stones.get(stone)
  }

  console.log(result);

  return 0;
}

await runSolution(day11b);

function transformStone(stone: number): number[] {
  if (stone === 0) return [1];
  if (`${stone}`.length % 2 === 0) return splitStone(stone);
  return [stone * 2024];
}

function splitStone(stone: number): number[] {
  const stoneStr = `${stone}`;
  //console.log('Stone to split: ', stone);
  const splitLength = stoneStr.length / 2;
  const s1 = stoneStr.slice(0, splitLength);
  const s2 = stoneStr.slice(splitLength);
  //console.log('Splited: ', Number(s1), Number(s2));
  return [Number(s1), Number(s2)];
}

