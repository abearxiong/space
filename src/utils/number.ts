type LikeNum = string | number | undefined;

/**
 * 字符串转数字
 * @param num 需要转数字
 */
const strToNum = (num: LikeNum): number => {
  const n = Number(num);
  return isNaN(n) ? 0 : n;
};
const stn = strToNum;

/**
 * 数字相加
 * @param nc 参数
 */
const numAdd = (...nc: any[]): number => {
  let n = 0;
  for (const i in nc) {
    n = n + strToNum(nc[i]);
  }
  return n;
};
/**
 * money add money
 * @param money must keep 2 decimal places
 */
const moneyAdd = (...money: any[]): number => {
  const n = numAdd(...money);
  return numFixdN(n);
};
/**
 * maybe number and number will have many decimal
 * keep need decimal places
 * @param num number
 * @param fixed number
 */
const numFixdN = (num: number | string, fixed = 2): number => {
  if (typeof num === 'string' || typeof num !== 'number') {
    const n = strToNum(num);
    return parseFloat(n.toFixed(fixed));
  } else {
    return parseFloat(num.toFixed(fixed));
  }
};
const Random = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min)) + min;
};
export { strToNum, stn, numAdd, moneyAdd, numFixdN, Random };
