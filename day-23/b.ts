import { runSolution } from '../utils.ts';

type Connection = [string,string]
type Graph = Map<string, Set<string>>

/** provide your solution as the return of this function */
export async function day23b(data: string[]) {
  const connections: Connection[] = data.map((pair) => {
    const split = pair.split('-');
    return [split[0], split[1]]
  });

  const lanGraph: Graph = buildLanGraph(connections);
  
  // const nodes = [...lanGraph.keys()];
  // const largestLan: string[] = findClique(lanGraph, [], nodes, []);
  // console.log(largestLan.sort().join(','))

  //this is a MASSIVE optimization compared to first solution
  const clique = findMaxCliques(lanGraph);
  console.log([...clique].sort().join(','));

  return 0;
}

await runSolution(day23b);

function buildLanGraph(connections: Connection[]): Graph {
  const lanGraph: Graph = new Map();
  for (const [pc1, pc2] of connections) {
    if(!lanGraph.has(pc1)) lanGraph.set(pc1, new Set())
    if(!lanGraph.has(pc2)) lanGraph.set(pc2, new Set())
    lanGraph.get(pc1)!.add(pc2)
    lanGraph.get(pc2)!.add(pc1)
  }
  return lanGraph
}

//https://en.wikipedia.org/wiki/MaxCliqueDyn_algorithm#cite_note-Tomita2003-2
function findClique(
  graph: Graph,
  current: string[],
  candidates: string[],
  largestClique: string[]
): string[] {
  if(candidates.length === 0) {
    return current.length > largestClique.length ? current : largestClique
  }

  if((candidates.length + current.length)<=largestClique.length) {
    return largestClique;
  }

  for(let i = 0; i<candidates.length; i++){
    const newCurr = [...current, candidates[i]];
    const newCandidates = candidates.filter((node) => graph.get(candidates[i]).has(node));
    largestClique = findClique(graph, newCurr, newCandidates, largestClique)
  }

  return largestClique;
}

//https://en.wikipedia.org/wiki/Bron%E2%80%93Kerbosch_algorithm
function bronKerboschWithPivot(
  graph: Graph,
  R: Set<string>,
  P: Set<string>,
  X: Set<string>,
  cliques: Set<string>[]
) {
  if(P.size === 0 && X.size === 0) {
    cliques.push(new Set(R)); //R - max clique
    return;
  }

  const union = new Set([...P, ...X]);
  const pivot = union.values().next().value;

  const pivotNeighbours = graph.get(pivot) || new Set();
  const candidates = new Set([...P].filter(p => !pivotNeighbours.has(p)));

  for (const vertex of candidates) {
    const vertexNeighbours = graph.get(vertex) || new Set();
    bronKerboschWithPivot(
      graph, 
      new Set([...R, vertex]), 
      new Set([...P].filter(p => vertexNeighbours.has(p))),
      new Set([...X].filter(x => vertexNeighbours.has(x))),
      cliques
    )
    P.delete(vertex);
    X.add(vertex);
  }
}

function findMaxCliques(graph: Graph): Set<string> {
  const cliques: Set<string>[] = []
  const nodes = new Set(graph.keys());
  bronKerboschWithPivot(graph, new Set(), nodes, new Set(), cliques);

  return cliques.reduce((longest, curr) => {
    return longest.size < curr.size ? curr : longest
  }, new Set());
}

