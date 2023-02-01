import { AnyAction } from "redux";
import { creditTypes, ModalType, TabType } from "../../const";
import { CreditParametersType, CreditTypesType, ModalTypesType, TabTypesType } from "../../types.js";
import {
  countRequestNumber,
  extend,
  initiateParameters,
} from "../../utils/utils";

const ActionType = {
  CHANGE_MENU_STATUS: `CHANGE_MENU_STATUS`,
  CHANGE_MODAL_TYPE: `CHANGE_MODAL_TYPE`,
  CHANGE_CREDIT_SELECT_STATUS: `CHANGE_CREDIT_SELECT_STATUS`,
  CHANGE_LOGIN_VALIDITY: `CHANGE_LOGIN_VALIDITY`,
  CHANGE_PASSWORD_VALIDITY: `CHANGE_PASSWORD_VALIDITY`,
  CHANGE_PASSWORD_SHOW_STATUS: `CHANGE_PASSWORD_SHOW_STATUS`,
  CHANGE_LOGIN_FORM_VALIDITY: `CHANGE_LOGIN_FORM_VALIDITY`,
  SET_TAB_TYPE: `SET_TAB_TYPE`,
  SET_CREDIT_TYPE: `SET_CREDIT_TYPE`,
  UPDATE_CREDIT_PARAMETRES: `UPDATE_CREDIT_PARAMETRES`,
  INCREASE_REQUEST_NUMBER: "INCREASE_REQUEST_NUMBER",
  CHANGE_REQUEST_STATUS: `CHANGE_REQUEST_STATUS`,
};

const initialState = {
  isMenuOpened: false,
  modalType: ModalType.NONE,
  isLoginValid: true,
  isPasswordValid: true,
  isPasswordShown: false,
  isLoginFormValid: true,
  isCreditTypeSelectOpened: false,
  tabType: TabType.DEPOSITS,
  currentCreditType: creditTypes.NONE,
  creditParameters: null,
  isRequestOpened: false,
  requestNumber: "0001",
};

const ActionCreator = {
  toggleMenu: (status: boolean) => ({
    type: ActionType.CHANGE_MENU_STATUS,
    payload: !status,
  }),
  changeModalType: (type: ModalTypesType) => ({
    type: ActionType.CHANGE_MODAL_TYPE,
    payload: type,
  }),
  changeCreditSelectStatus: (status: boolean) => ({
    type: ActionType.CHANGE_CREDIT_SELECT_STATUS,
    payload: !status,
  }),
  setTabType: (type: TabTypesType) => ({
    type: ActionType.SET_TAB_TYPE,
    payload: type,
  }),
  changeLoginValidity: (status: boolean) => ({
    type: ActionType.CHANGE_LOGIN_VALIDITY,
    payload: status,
  }),
  changePasswordValidity: (status: boolean) => ({
    type: ActionType.CHANGE_PASSWORD_VALIDITY,
    payload: status,
  }),
  changePasswordShowStatus: (status: boolean) => ({
    type: ActionType.CHANGE_PASSWORD_SHOW_STATUS,
    payload: status,
  }),
  changeLoginFormValidity: (status: boolean) => ({
    type: ActionType.CHANGE_LOGIN_FORM_VALIDITY,
    payload: status,
  }),
  setCreditType: (type: CreditTypesType) => ({
    type: ActionType.SET_CREDIT_TYPE,
    payload: type,
  }),
  updateCreditParameters: (parameters: CreditParametersType) => ({
    type: ActionType.UPDATE_CREDIT_PARAMETRES,
    payload: parameters,
  }),
  increaseRequestNumber: (number: number) => ({
    type: ActionType.INCREASE_REQUEST_NUMBER,
    payload: countRequestNumber(number),
  }),
  changeRequestStatus: (status: boolean) => ({
    type: ActionType.CHANGE_REQUEST_STATUS,
    payload: status,
  }),
};

const reducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ActionType.CHANGE_MENU_STATUS:
      return extend(state, {
        isMenuOpened: action["payload"],
      });
    case ActionType.CHANGE_MODAL_TYPE:
      return extend(state, {
        modalType: action["payload"],
      });
    case ActionType.CHANGE_CREDIT_SELECT_STATUS:
      return extend(state, {
        isCreditTypeSelectOpened: action["payload"],
      });
    case ActionType.SET_TAB_TYPE:
      return extend(state, {
        tabType: action["payload"],
      });
    case ActionType.SET_CREDIT_TYPE:
      return extend(state, {
        currentCreditType: action["payload"],
        creditParameters: initiateParameters(action["payload"]),
      });
    case ActionType.CHANGE_LOGIN_VALIDITY:
      return extend(state, {
        isLoginValid: action["payload"],
      });
    case ActionType.CHANGE_PASSWORD_VALIDITY:
      return extend(state, {
        isPasswordValid: action["payload"],
      });
    case ActionType.CHANGE_PASSWORD_SHOW_STATUS:
      return extend(state, {
        isPasswordShown: action["payload"],
      });
    case ActionType.CHANGE_LOGIN_FORM_VALIDITY:
      return extend(state, {
        isLoginFormValid: action["payload"],
      });
    case ActionType.UPDATE_CREDIT_PARAMETRES:
      return extend(state, {
        creditParameters: action["payload"],
      });
    case ActionType.INCREASE_REQUEST_NUMBER:
      return extend(state, {
        requestNumber: action["payload"],
      });
    case ActionType.CHANGE_REQUEST_STATUS:
      return extend(state, {
        isRequestOpened: action["payload"],
      });

    default:
      return state;
  }
};

export { reducer, ActionType, ActionCreator };
