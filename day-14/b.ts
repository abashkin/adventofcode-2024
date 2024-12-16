import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day14a(data: string[]) {
  const input = parseInput(data);
  const sizex = 101;
  const sizey = 103;
  let seconds = 1;
  let total = 0;

  //check first n matches to filter false-positive if any
  while (total < 5) {
    const grid : number[][] = Array.from({length: sizey}, () => Array(sizex).fill(0))
    for (const robot of input) {
      const [pos, vel] = robot;
      const velx = vel[0] >= 0 ? vel[0] : sizex+vel[0];
      const vely = vel[1] >= 0 ? vel[1] : sizey+vel[1];
      const x = Math.abs((pos[0] + velx*seconds)%sizex);
      const y = Math.abs((pos[1] + vely*seconds)%sizey);
      grid[y][x] = 1; //different from 0 no matter how many robots here
    }

    //assumption that easter egg (christmasa tree) will have a long parts of robots standing in a row
    if(grid.some(r => r.join('').includes('111111111111111'))) {
      console.log(seconds);
      console.log(grid.map(row => row.join('')));
      total++;
    }
    seconds++;
  }

  return 0;
}

await runSolution(day14a);

function parseInput(data: string[]) {
  return data.map((row: string) => {
    const [pos, vel] = row.split(' ')
    return [extract(pos), extract(vel)]
  }) 
}

function extract(inputString: string): [number, number] {
  const regex = /=\s*(-?\d+)\s*,\s*(-?\d+)/;
  const match = inputString.match(regex);

  if (match) {
      const n1 = parseInt(match[1], 10);
      const n2 = parseInt(match[2], 10);
      return [n1, n2];
  }
}