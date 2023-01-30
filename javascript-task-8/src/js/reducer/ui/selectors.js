import NameSpace from "../name-space";


const NAME_SPACE = NameSpace.UI;

export const getMenuStatus = (state) => {
  return state[NAME_SPACE].isMenuOpened;
};

export const getTabType = (state) => {
  return state[NAME_SPACE].tabType;
};

export const getModalType = (state) => {
  return state[NAME_SPACE].modalType;
};

export const getLoginStatus = (state) => {
  return state[NAME_SPACE].isLoginValid;
};

export const getPasswordStatus = (state) => {
  return state[NAME_SPACE].isPasswordValid;
};

export const getPasswordShowStatus = (state) => {
  return state[NAME_SPACE].isPasswordShown;
};

export const getLoginFormStatus = (state) => {
  return state[NAME_SPACE].isLoginFormValid;
};

export const getCreditSelectStatus = (state) => {
  return state[NAME_SPACE].isCreditTypeSelectOpened;
};

export const getCurrentCreditType = (state) => {
  return state[NAME_SPACE].currentCreditType;
};

export const getCreditParameters = (state) => {
  return state[NAME_SPACE].creditParameters;
};

export const getRequestNumber = (state) => {
  return state[NAME_SPACE].requestNumber;
};

export const getRequestStatus = (state) => {
  return state[NAME_SPACE].isRequestOpened;
};
