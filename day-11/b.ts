import { count } from 'console';
import { runSolution } from '../utils.ts';

class Node {
  public value: number;
  public children: Node[];
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

class Counter {
  private count: number;
  constructor() {
    this.count = 0;
  }

  add(): void {
    this.count++;
  }

  total(): number {
    return this.count;
  }
}

/** provide your solution as the return of this function */
export async function day11b(data: string[]) {
  console.log(data);
  const blinkingTimes = 75;
  const chunkSize = 25;
  const initialArrangement = data[0].split(' ').map(Number);
  const counter = new Counter();

  initialArrangement.forEach((stone: Number) => {
    const root = new Node(stone);
    buildStoneTransformationTree(root, blinkingTimes, transformStone, counter);
  });

  console.log('Total: ', counter.total());
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

function buildStoneTransformationTree(
  node: Node,
  times: number,
  transformationLogic: (number) => number[],
  counter: Counter
) {
  if (times === 0) {
    console.log(node.value);
    counter.add();
    return;
  }
  const stepStones = transformationLogic(node.value);
  for (const stone of stepStones) {
    const childNode = new Node(stone);
    node.children.push(childNode);
    buildStoneTransformationTree(
      childNode,
      times - 1,
      transformationLogic,
      counter
    );
  }
}

function chunkedComputation(
  initialNodes: number[],
  totalSteps: number,
  chunkSize: number,
  transformationLogic: (number) => number[]
): number {
  let currentNodes = initialNodes.map((n) => new Node(n));
  let remainingSteps = totalSteps;

  while (remainingSteps > 0) {
    const nextNodes: number[] = [];

    for (const node of currentNodes) {
      nextNodes.push(...transformationLogic(node.value));
    }

    if (nextNodes.length > chunkSize) {
      let newLeaves = 0;
      for (const leaf of nextNodes) {
        newLeaves += chunkedComputation(
          [leaf],
          remainingSteps - 1,
          chunkSize,
          transformationLogic
        );
      }

      return newLeaves;
    }

    currentNodes = nextNodes.map((n) => new Node(n));
    remainingSteps -= 1;
  }
}
