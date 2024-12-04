import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day4b(data: string[]) {
  return calculateAll3x3Matches(data)
}

function calculateAll3x3Matches(data: string[]): number {
  let result = 0;
  const rowsCount = data.length;
  const colCount = data[0].length;
  for(let i = 0; i<=rowsCount-3; i++) {
    for(let j = 0; j<=colCount-3; j++){
      result = isXMas(data, i, j) ? result + 1 : result;
    }
  }
  return result;
}

function isXMas(data: string[], startRow: number, startCol: number): boolean {  
  let diag1 = '';
  let diag2 = '';
  for (let i = 0; i < 3; i++) {
    diag1+=data[startRow+i].at(startCol+i);
    diag2+=data[startRow+i].at(startCol+2-i);
  }

  return [diag1, diag2].every(diag => diag === 'MAS' || diag === 'SAM') 
}

await runSolution(day4b);
