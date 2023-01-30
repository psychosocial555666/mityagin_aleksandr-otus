import { PRICE_TO_DISCONT, MONTHS_IN_YEAR, CAPITAL_SUM, creditTypes, MAX_PERCENT, mortgagePercents, PERCENT_FROM_INCOME, autoPercents } from "../const";
import { CreditTypesType } from "../types";

export const extend = (a: object, b: object) => {
  return Object.assign({}, a, b);
};

export const initiateParameters = (type: CreditTypesType) => {
  if (type === creditTypes.MORTGAGE) {
    return (
      {
        price: '2000000',
        priceStep: 100000,
        minPrice: '1200000',
        maxPrice: '25000000',
        initialPercent: 10,
        minInitialPercent: 10,
        time: 5,
        minTime: 5,
        maxTime: 30,
        capital: false,
        casco: null,
        insurance: null,
        creditPercent: 9.4,
        minCreditSum: '500000',
        creditSum: '1800000',
        payment: '37715',
        income: '83811',
        isOfferCorrect: true,
      }
    )
  }

  if (type === creditTypes.AUTO) {
    return (
      {
        price: '2000000',
        priceStep: 50000,
        minPrice: '500000',
        maxPrice: '5000000',
        initialPercent: 20,
        minInitialPercent: 20,
        time: 1,
        minTime: 1,
        maxTime: 5,
        creditPercent: 15,
        capital: null,
        casco: false,
        insurance: false,
        minCreditSum: '200000',
        creditSum: '1600000',
        payment: '144413',
        income: '320917',
        isOfferCorrect: true,
      }
    )
  }
  if (type === creditTypes.NONE) {
    return null;
  };
}

export const percentToSum = (price: number, percent: number) => {
  return (Number(price) * Number(percent)) / MAX_PERCENT;
}

export const sumToPercent = (price: number, initial: number) => {
  let result = (Number(initial) * MAX_PERCENT) / Number(price);
  return Math.round(result / 5) * 5;
}

export const maskThisValue = (value: string, string: string) => {
  let valueArray = value.split("").reverse();
  let newValue = valueArray.map((item, i) => {
    if (i % 3 === 0) {
      return `${item} `;
    }
    return item;
  }).reverse().join("");

  return newValue + string;
};

export const maskThisTime = (time: number) => {
  let result;
  switch (time) {
    case 1:
      result = `${time} год`
      break;

    case 2 || 3 || 4:
      result = `${time} года`
      break;

      case 3:
      result = `${time} года`
      break;

      case 4:
      result = `${time} года`
      break;

    default:
      result = `${time} лет`
      break;
  }
  return result;
}

export const checkValueValidity = (value: string, minValue: number, maxValue: number) => {
  return Number(value) > Number(maxValue) || Number(value) < Number(minValue) ? true : false;
}

export const returnCorrectValue = (value: string, minValue: number, maxValue: number) => {
  let result = Number(value);

  if (result > Number(maxValue)) {
    return result = maxValue;
  }

  if (!result || result < Number(minValue)) {
    return result = minValue;
  }

  return String(result);
}

export const increasePrice = (value: string, step: number, maxValue: number) => {
  let result = Number(value) + step;

  if (result > Number(maxValue)) {
    return result = maxValue;
  }

  return String(result);
}

export const reducePrice = (value: string, step: number, minValue: number) => {
  let result = Number(value) - step;

  if (result < Number(minValue)) {
    return result = minValue;
  }
  return String(result);
}

export const returnMortgagePercent = (initial: number) => {
  return initial >= 15 ? mortgagePercents.MIN : mortgagePercents.MAX;
}

export const countRequestNumber = (number: number) => {
  let numberResult = String(Number(number) + 1);
  let numberArr = numberResult.split('');
  let maskArr = ['0', '0', '0', '0',];

  let result = maskArr.slice(0, maskArr.length - numberArr.length).concat(numberArr).join('');
  return result;
}

export const returnAutoPercent = (price: number, casco: boolean, insurance: boolean) => {
  if (casco && insurance) {
    return autoPercents.MIN;
  }

  if (casco || insurance) {
    return autoPercents.SPECIAL;
  }

  if (Number(price) < PRICE_TO_DISCONT) {
    return autoPercents.MAX;
  }

  return autoPercents.REDUCED;
}

export const returnMortgageSum = (price: number, initial: number, capital: boolean, minSum: number) => {
  let initialSum = percentToSum(price, initial);
  let creditSum = Number(price) - initialSum - (capital ? CAPITAL_SUM : 0);

  if (creditSum < Number(minSum)) {
    return null;
  }

  return String(creditSum);
}

export const returnAutoSum = (price: number, initial: number, minSum: number) => {
  let initialSum = percentToSum(price, initial);
  let creditSum = Number(price) - initialSum;

  if (creditSum < Number(minSum)) {
    return null;
  }

  return String(creditSum);
}

export const returnMonthlyCreditPercent = (percent: number) => {
  return (percent / MAX_PERCENT) / MONTHS_IN_YEAR;
}

export const returnTimeInMonths = (time: number) => {
  return time * MONTHS_IN_YEAR;
}

export const calculatePayment = (sum: number, monthlyPercent: number, timeInMonths: number) => {
  let payment = Number(sum) * (monthlyPercent + (monthlyPercent / (Math.pow(1 + monthlyPercent, timeInMonths) - 1)));
  return String(Math.round(payment));
}

export const calculateMinIncome = (payment: number) => {
  return String(Math.round(Number(payment) / PERCENT_FROM_INCOME));
}
