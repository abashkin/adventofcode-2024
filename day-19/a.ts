import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day19a(data: string[]) {
  const patterns: string[] = data[0].split(', ');
  const designs = data.slice(2);
  console.log(patterns);
  console.log(designs);

  return designs.filter((design) => canBeCreated(design, patterns)).length;
}

await runSolution(day19a);

function canBeCreated(design: string, patterns: Array<string>): boolean {
  const len = design.length;

  // Create a DP array to store if substring up to index i can be constructed
  const dp = Array(len + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= len; i++) {
    for (const pattern of patterns) {
      if (i >= pattern.length) {
        const start = i - pattern.length;
        if (dp[start] && design.slice(start, i) === pattern) {
          dp[i] = true;
          break;
        }
      }
    }
  }

  return dp[len];
}
