import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day19b(data: string[]) {
  const patterns: string[] = data[0].split(', ');
  const designs = data.slice(2);

  console.log(designs.map((d) => count(d, patterns)));

  return designs
    .map((d) => count(d, patterns))
    .reduce((sum, count) => {
      return (sum += count);
    }, 0);
}

await runSolution(day19b);

function count(design: string, patterns: Array<string>): number {
  const len = design.length;
  // Create a DP array to store number of ways to construct string up to index i
  const dp: number[] = new Array(len + 1).fill(0);
  dp[0] = 1;

  for (let i = 1; i <= len; i++) {
    for (const pattern of patterns) {
      if (i >= pattern.length) {
        const start = i - pattern.length;
        if (design.slice(start, i) === pattern) {
          dp[i] += dp[start];
        }
      }
    }
  }
  return dp[design.length];
}
