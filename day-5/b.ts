import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day5a(data: string[]) {
  const [rules, orders] = divideDataToRulesAndOrders(data);

  const correctedOrders = getCorrectedOrders(orders, rules);

  return correctedOrders.reduce((prev, curr) => {
    return prev + getMiddlePage(curr);
  }, 0);
}

await runSolution(day5a);

function divideDataToRulesAndOrders(data: string[]): [string[], string[]] {
  const divider = data.indexOf('');
  return [data.slice(0, divider), data.slice(divider + 1)];
}

function getCorrectedOrders(orders: string[], rules: string[]): string[] {
  console.log('Hello');
  let result = [];
  const badOrders = orders.filter((order) => isBadOrder(order, rules));

  for (let i = 0; i < badOrders.length; i++) {
    let badOrder = badOrders[i];
    const incorrectRules = getIncorrectRulesForOrder(badOrder, rules);

    console.log('Bad Order: ', badOrder);
    console.log('Rules', incorrectRules);
    for (let j = 0; j < incorrectRules.length; j++) {
      badOrder = getFixedOrderForRule(badOrder, incorrectRules[j]);
    }
    result.push(badOrder);
  }

  return result;
}

function isBadOrder(order, rules) {
  let isBad = false;
  let indx = 0;
  while (!isBad && indx < rules.length) {
    isBad = isIncorrectRule(order, rules[indx]);
    indx++;
  }

  console.log(`Order: ${order} is: ${isBad}`);
  return isBad;
}

function getIncorrectRulesForOrder(order, rules): string[] {
  return rules.filter((rule) => {
    const isIncorrect = isIncorrectRule(order, rule);
    return isIncorrect;
  });
}

function isIncorrectRule(order, rule): boolean {
  const [first, second] = rule.split('|');
  if (order.includes(first) && order.includes(second)) {
    return order.indexOf(first) > order.indexOf(second);
  }
  return false;
}

function getFixedOrderForRule(order: string, rule: string): string {
  console.log(`Fixing order ${order} for Rule ${rule}`);

  const [first, second] = rule.split('|');
  const orderAsArr = order.split(',');
  const indx1 = orderAsArr.indexOf(first);
  const indx2 = orderAsArr.indexOf(second);

  const correctFirst = orderAsArr[indx2];
  const correctSecond = orderAsArr[indx1];

  console.log(orderAsArr);
  console.log('Bad1: ', indx1);
  console.log('Bad2: ', indx2);
  orderAsArr[indx1] = correctFirst;
  orderAsArr[indx2] = correctSecond;

  console.log(`Fixed order ${orderAsArr.join(',')}`);

  return orderAsArr.join(',');
}

function getMiddlePage(order: string): number {
  const orderPageNums = order.split(',').map(Number);
  console.log(orderPageNums[(orderPageNums.length - 1) / 2]);
  return orderPageNums[(orderPageNums.length - 1) / 2];
}
