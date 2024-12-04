import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day4a(data: string[]) {
  return [data, getVertical(data), getLeftDiagonal(data), getRightDiagonal(data)].reduce(
    (prev, curr) => prev + count(curr),
    0
  )
}

await runSolution(day4a);

function count(data: string[]): number {
  return data.reduce((prev, curr) => {return prev + countWordInString(curr)}, 0);
}

function countWordInString(str: string): number {  
  const matches = str.match(/XMAS/g) || [];
  const matchesBackwards = str.match(/SAMX/g) || [];
  
  console.log(`${str}: Count: ${matches.length}, Backwards: ${matchesBackwards.length} `);
  return matches.length + matchesBackwards.length;
}

function getVertical(data: string[]): string[] {
  const result = [];
  const lineLength = data[0].length;
  for(let i = 0; i < lineLength; i++) {
    let vertical = '';
    for (const line of data) {
      vertical += line[i]
    }
    result.push(vertical);
  }

  return result;
}

function getLeftDiagonal(data: string[]): string[] {
  const result = [];
  const rowsCount = data.length;
  const colsCount = data[0].length;

  for (let start = 0; start < rowsCount + colsCount - 1; start++) {
    let diagonal = '';
    for (let row = 0; row < rowsCount; row++) {
      const col = start - row;
      if(col >=0 && col < colsCount) {
        diagonal+=data[row].at(col);
      }      
    }
    result.push(diagonal);
  }  
  return result;
}

function getRightDiagonal(data: string[]): string[] {
  const result = [];
  const rowsCount = data.length;
  const colsCount = data[0].length;

  for (let start = 0; start < rowsCount + colsCount - 1; start++) {
    let diagonal = '';
    for (let row = 0; row < rowsCount; row++) {
      const col = rowsCount - (start - row) - 1;
      if(col >=0 && col < colsCount) {
        diagonal+=data[row].at(col);
      }    
    }

    result.push(diagonal);
  }  
  return result;
}
