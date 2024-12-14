import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day14a(data: string[]) {
  const input = parseInput(data);
  const sizex = 101;
  const sizey = 103;
  const seconds = 100;
  const midx = (sizex-1)/2;
  const midy = (sizey-1)/2;
  const q = {
    q1: 0,
    q2: 0,
    q3: 0,
    q4: 0
  }
  for (const robot of input) {
    const [pos, vel] = robot;
    const velx = vel[0] >= 0 ? vel[0] : sizex+vel[0];
    const vely = vel[1] >= 0 ? vel[1] : sizey+vel[1];
    const x = Math.abs((pos[0] + velx*seconds)%sizex);
    const y = Math.abs((pos[1] + vely*seconds)%sizey);
    if(x<midx && y<midy) {
      q.q1++;
    }
    if(x>midx && y<midy) {
      q.q2++
    }
    if(x<midx && y>midy) {
      q.q3++;
    }
    if(x>midx && y>midy) {
      q.q4++
    }
  }
  return q.q1*q.q2*q.q3*q.q4;
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
