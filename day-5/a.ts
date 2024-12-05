import { stringify } from 'querystring';
import { runSolution } from '../utils.ts';

/** provide your solution as the return of this function */
export async function day5a(data: string[]) {
  const [rules, orders] = divideDataToRulesAndOrders(data);

  return orders
    .filter((order) => bypassRulesOrder(order, rules))
    .reduce((prev, curr) => {
      return prev + getMiddlePage(curr);
    }, 0);
}

await runSolution(day5a);

function divideDataToRulesAndOrders(data: string[]): [string[], string[]] {
  const divider = data.indexOf('');
  return [data.slice(0, divider), data.slice(divider + 1)];
}

function bypassRulesOrder(order: string, rules: string[]): boolean {
  let isCorrectOrder = true;
  let indx = 0;
  while (isCorrectOrder && indx < rules.length) {
    isCorrectOrder = isCorrectRule(order, rules[indx]);
    indx++;
  }

  return isCorrectOrder;
}

function getMiddlePage(order: string): number {
  const orderPageNums = order.split(',').map(Number);
  console.log(orderPageNums[(orderPageNums.length - 1) / 2]);
  return orderPageNums[(orderPageNums.length - 1) / 2];
}

function isCorrectRule(order: string, rule: string): boolean {
  const [first, second] = rule.split('|');
  if (order.includes(first) && order.includes(second)) {
    return order.indexOf(first) < order.indexOf(second);
  }

  return true;
}
