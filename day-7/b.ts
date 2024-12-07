import { runSolution } from '../utils.ts';

type Node = {
  value: number[];
  left?: Node;
  middle?: Node;
  right?: Node;
};

/** provide your solution as the return of this function */
export async function day7a(data: string[]) {
  let result = 0;

  data.forEach((eq) => {
    const [eqResult, eqParams] = getEquationData(eq);
    const { found } = createBinaryTree(eqParams, eqResult);
    if (found) {
      result += eqResult;
    }
  });

  return result;
}

await runSolution(day7a);

function getEquationData(eq: string): [number, number[]] {
  const [eqResult, eqParams] = eq.split(': ');

  return [+eqResult, eqParams.split(' ').map(Number)];
}

function createBinaryTree(
  params: number[],
  result: number
): { node: Node; found: boolean } {
  if (params.length === 1) {
    const isResult = params[0] === result;
    return { node: { value: params }, found: isResult };
  }
  const rest = params.slice(2);
  const add = [params[0] + params[1], ...rest];
  const multiply = [params[0] * params[1], ...rest];
  const concat = [Number(`${params[0]}${params[1]}`), ...rest];
  const current: Node = { value: params };

  const left = createBinaryTree(add, result);
  current.left = left.node;
  if (left.found) return { node: current, found: true };

  const mid = createBinaryTree(concat, result);
  current.middle = mid.node;
  if (mid.found) return { node: current, found: true };

  const right = createBinaryTree(multiply, result);
  current.right = right.node;

  return { node: current, found: right.found };
}
