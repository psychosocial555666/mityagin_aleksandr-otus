import { WordItemType } from './types';

export const getArrayRandElement = (arr: WordItemType[]) => {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

export const unique = (arr: string[]) => {
  let result: string[] = [];

  for (let str of arr) {
    if (str && !result.includes(str)) {
      result.push(str);
    }
  }

  return result;
};
