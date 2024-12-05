import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day5a(data: string[]) {
  const [rules, orders] = divideDataToRulesAndOrders(data);

  return getCorrectedOrders(orders, rules).reduce((prev, curr) => {
    return prev + getMiddlePage(curr);
  }, 0);
}

await runSolution(day5a);

function divideDataToRulesAndOrders(data: string[]): [string[], string[]] {
  const divider = data.indexOf('');
  return [data.slice(0, divider), data.slice(divider + 1)];
}

function getCorrectedOrders(orders: string[], rules: string[]): string[] {
  const result = [];
  const badOrders = orders.filter((order) => isBadOrder(order, rules));

  for (let i = 0; i < badOrders.length; i++) {
    let badOrder = badOrders[i];

    while(hasIncorrectRules(badOrder, rules)) {
      const first = getIncorrectRulesForOrder(badOrder, rules)[0];
      badOrder = getFixedOrderForRule(badOrder, first);
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

function hasIncorrectRules(order, rules): boolean {
  return rules.some(rule => isIncorrectRule(order, rule))
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
  const fixedOrder = swapNumbersInOrder(orderAsArr, orderAsArr.indexOf(first), orderAsArr.indexOf(second));

  return fixedOrder;
}

function swapNumbersInOrder(order: string[], indx1, indx2): string {
  const correctFirst = order[indx2];
  const correctSecond = order[indx1];

  order[indx1] = correctFirst;
  order[indx2] = correctSecond;

  return order.join(',')
}

function getMiddlePage(order: string): number {
  const orderPageNums = order.split(',').map(Number);
  return orderPageNums[(orderPageNums.length - 1) / 2];
}
