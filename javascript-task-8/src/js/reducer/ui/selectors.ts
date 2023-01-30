import { IState, NameSpaceType } from "../../types";
import NameSpace from "../name-space";


const NAME_SPACE = NameSpace.UI as NameSpaceType;

export const getMenuStatus = (state: IState) => {
  return state[NAME_SPACE].isMenuOpened;
};

export const getTabType = (state: IState) => {
  return state[NAME_SPACE].tabType;
};

export const getModalType = (state: IState) => {
  return state[NAME_SPACE].modalType;
};

export const getLoginStatus = (state: IState) => {
  return state[NAME_SPACE].isLoginValid;
};

export const getPasswordStatus = (state: IState) => {
  return state[NAME_SPACE].isPasswordValid;
};

export const getPasswordShowStatus = (state: IState) => {
  return state[NAME_SPACE].isPasswordShown;
};

export const getLoginFormStatus = (state: IState) => {
  return state[NAME_SPACE].isLoginFormValid;
};

export const getCreditSelectStatus = (state: IState) => {
  return state[NAME_SPACE].isCreditTypeSelectOpened;
};

export const getCurrentCreditType = (state: IState) => {
  return state[NAME_SPACE].currentCreditType;
};

export const getCreditParameters = (state: IState) => {
  return state[NAME_SPACE].creditParameters;
};

export const getRequestNumber = (state: IState) => {
  return state[NAME_SPACE].requestNumber;
};

export const getRequestStatus = (state: IState) => {
  return state[NAME_SPACE].isRequestOpened;
};
