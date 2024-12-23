import { runSolution } from '../utils.ts';

type Connection = [string,string]
type Graph = Map<string, Set<string>>

/** provide your solution as the return of this function */
export async function day23a(data: string[]) {
  const connections: Connection[] = data.map((pair) => {
    const split = pair.split('-');
    return [split[0], split[1]]
  });

  const trios = getTrio(connections);

  console.log(trios.size);
  return 0;
}

await runSolution(day23a);

function getTrio(connections: Connection[]): Set<string> {
  const lanGraph: Graph = new Map();
  for (const [pc1, pc2] of connections) {
    if(!lanGraph.has(pc1)) lanGraph.set(pc1, new Set())
    if(!lanGraph.has(pc2)) lanGraph.set(pc2, new Set())
    lanGraph.get(pc1)!.add(pc2)
    lanGraph.get(pc2)!.add(pc1)
  }

  for (const pc of [...lanGraph.keys()]) {
    console.log(lanGraph.get(pc))
  }


  const trios: Set<string> = new Set();

  for (const [pc, lan] of lanGraph.entries()) {
    for (const pc2 of lan) {
      if(pc !== pc2) {
        const commonLan = new Set([...lanGraph.get(pc)].filter((lanPc) => lanGraph.get(pc2).has(lanPc)))
        for (const lanPc of commonLan) {
          const trio = [pc, pc2, lanPc].sort();
          if(trio.some(t => t.startsWith('t'))) {
            trios.add(trio.join('-'))
          }
        }
      }
    }
  }

  return trios;
}
