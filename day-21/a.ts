import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day21a(data: string[]) {

  const robotPad: Map<string, [number, number]> = new Map([
    ["X", [0,0]],
    ["^", [1, 0]],
    ["A", [2,0]],
    ["<", [0,1]],
    ["v", [1, 1]],
    [">", [2, 1]]
  ]);

  const numberPad: Map<string, [number, number]> = new Map([
    ["7", [0,0]],
    ["8", [1,0]],
    ["9", [2,0]],
    ["4", [0,1]],
    ["5", [1,1]],
    ["6", [2,1]],
    ["1", [0,2]],
    ["2", [1,2]],
    ["3", [2,2]],
    ["0", [1,3]],
    ["A", [2,3]],
    ["X", [0,3]],
  ]);

  const memo: Map<string, string> = new Map([
    ["1-0", ">v"],
    ["0-1", "^<"],
    ["4-0",">vv"],
    ["0-4","^^<"],
    ["7-0",">vvv"],
    ["0-7","^^^<"],
    ["1-A",">>v"],
    ["A-1","^<<"],
    ["4-A",">>vv"],
    ["A-4","^^<<"],
    ["7-A",">>vvv"],
    ["A-7","^^^<<"],
    ["^->","v<"],
    ["<-^",">^"],
    ["<-A",">>^"],
    ["A-<","v<<"],
  ]);

  const a = data.map((code) => {
    const numPath = mapCodeToNav(code, numberPad, memo);
    const r1Path = mapCodeToNav(numPath, robotPad, memo);
    const r2Path = mapCodeToNav(r1Path, robotPad, memo);
    // console.log(code)
    // console.log(r2Path.length);
    // console.log(parseInt(code.match(/^\d+/)[0], 10));
    return r2Path.length * parseInt(code.match(/^\d+/)[0], 10)
  }).reduce((sum, curr) => {return sum+=curr}, 0)

  console.log(a);

  // console.log(data);
  // const numPath = mapCodeToNav('973A', numberPad, memo);
  // const r1Path = mapCodeToNav(numPath, robotPad, memo);
  // const r2Path = mapCodeToNav(r1Path, robotPad, memo);
  // console.log(r2Path);
  // console.log(r2Path.length);
  return 0;
}


//223376 to high
//233106 to high
await runSolution(day21a);


function mapCodeToNav(code: string, pad: Map<string, [number, number]>, memo: Map<string, string>): string {

  let current = 'A';
  let path = '';

  code.split('').forEach(c => {
    path += getPath(current, c, pad, memo);
    current = c;
  })

  return path;
}

function getPath(p1: string, p2: string, pad: Map<string, [number, number]>, memo: Map<string, string>): string {
  const memoized = memo.get(`${p1}-${p2}`)
  if(memoized) {
    return memoized + 'A'
  }
  const [x0,y0] = pad.get(p1);
  const [x1,y1] = pad.get(p2);

  let left = ''
  let right = ''
  let up = ''
  let down = '';

  if(x0 > x1) {
    left = new Array(x0-x1).fill('<').join('')
  } else {
    right = new Array(x1-x0).fill('>').join('')
  }

  if(y0>y1) {
    up = new Array(y0-y1).fill('^').join('')
  } else {
    down = new Array(y1-y0).fill('v').join('')
  }
  const path = left + right + up + down;
  //console.log(`${p1}-${p2}: ${path}`)
  memo.set(`{p1}-{p2}`, path);

  console.log(path + 'A')

  return path + 'A';



  //getting path excluding X
  //path as coords -> path as symbols
}