export type ModalTypesType = "NONE" | "LOGIN" | "SUCCESS";

export type TabTypesType = "DEPOSITS" | "CREDITS" | "INSURANCE" | "ONLINE";

export type CreditTypesType = "NONE" | "MORTGAGE" | "AUTO";

export type CreditParametersType = {
  price: string;
  priceStep: number;
  minPrice: string;
  maxPrice: string;
  initialPercent: number;
  minInitialPercent: number;
  time: number;
  minTime: number;
  maxTime: number;
  capital: boolean | null;
  casco: boolean | null;
  insurance: boolean | null;
  creditPercent: number;
  minCreditSum: string;
  creditSum: string;
  payment: string;
  income: string;
  isOfferCorrect: boolean;
};

export interface IState {
  UI: {
    isMenuOpened: boolean;
    modalType: ModalTypesType;
    isLoginValid: boolean;
    isPasswordValid: boolean;
    isPasswordShown: boolean;
    isLoginFormValid: boolean;
    isCreditTypeSelectOpened: boolean;
    tabType: TabTypesType;
    currentCreditType: CreditTypesType;
    creditParameters: CreditParametersType | null;
    isRequestOpened: boolean;
    requestNumber: string;
  }
}

export type NameSpaceType = 'UI'

export type AnyObjectType = {[x: string]: any}
