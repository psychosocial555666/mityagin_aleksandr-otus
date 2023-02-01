/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import close from "../../../img/close.svg";
import eye from "../../../img/eye.svg";
import logo from "../../../img/logo-modal.svg";
import { connect } from "react-redux";
import {
  getLoginStatus,
  getLoginFormStatus,
  getPasswordShowStatus,
} from "../../reducer/ui/selectors";
import { getPasswordStatus } from "../../reducer/ui/selectors";
import { ActionCreator } from "../../reducer/ui/ui";
import { Dispatch } from "redux";
import { IState } from "../../types";

class LoginForm extends React.PureComponent<ILoginFormProps> {
  loginRef: React.RefObject<HTMLInputElement>;
  passwordRef: React.RefObject<HTMLInputElement>;
  myStorage: Storage;
  constructor(props: ILoginFormProps) {
    super(props);

    this.loginRef = React.createRef();
    this.passwordRef = React.createRef();

    this.myStorage = window.localStorage;

    this._onLoginFormSubmit = this._onLoginFormSubmit.bind(this);
    this._isFormValid = this._isFormValid.bind(this);
  }

  componentDidMount() {
    let login = this.loginRef.current;
    let password = this.passwordRef.current;

    if (!login || !password) return;

    login?.focus();

    if (this.myStorage["login"]) {
      login.value = this.myStorage["login"];
    }

    if (this.myStorage["password"]) {
      password.value = this.myStorage["password"];
    }
  }

  _isFormValid(login: string | undefined, password: string | undefined) {
    if (!login) {
      this.props.validateLogin(false);
      return false;
    } else {
      this.props.validateLogin(true);
    }

    if (!password) {
      this.props.validatePassword(false);
      return false;
    } else {
      this.props.validatePassword(true);
    }

    this.props.validateLogin(true);
    this.props.validatePassword(true);
    return true;
  }

  _onLoginFormSubmit(evt: React.FormEvent) {
    evt.preventDefault();

    let login = this.loginRef?.current?.value;
    let password = this.passwordRef?.current?.value;

    if (this._isFormValid(login, password)) {
      this.props.closeButtonClickHandler(false);

      this.myStorage.setItem("login", login as string);
      this.myStorage.setItem("password", password as string);
    } else {
      this.props.validateLoginForm(false);

      setTimeout(() => {
        this.props.validateLoginForm(true);
      }, 2000);
    }
  }

  render() {
    const {
      closeButtonClickHandler,
      isLoginFormValid,
      isLoginValid,
      isPasswordValid,
      isPasswordShown,
      showPassword,
    } = this.props;
    return (
      <div
        className={
          isLoginFormValid
            ? "modal__popup login"
            : "modal__popup modal__popup--invalid login"
        }
      >
        <form className="login__form" onSubmit={this._onLoginFormSubmit}>
          <img src={logo} className="login__logo" alt="Лига банк логотип" />
          <div
            className={
              isLoginValid
                ? "login__item login__item--login form-field"
                : "login__item login__item--login form-field login__item--invalid"
            }
          >
            <input ref={this.loginRef} type="text" id="login" />
            <label htmlFor="login">Логин</label>
          </div>
          <div
            className={
              isPasswordValid
                ? "login__item login__item--password form-field"
                : "login__item login__item--password form-field login__item--invalid"
            }
          >
            <input
              ref={this.passwordRef}
              type={isPasswordShown ? "text" : "password"}
              id="password"
            />
            <label htmlFor="password">Пароль</label>
            <button
              type="button"
              onMouseDown={() => {
                showPassword(true);
              }}
              onMouseUp={() => {
                showPassword(false);
              }}
            >
              <span className="visually-hidden">Показать пароль</span>
              <img src={eye} alt="eye" />
            </button>
          </div>
          <a href="#" className="login__forget">
            Забыли пароль?
          </a>
          <button type="submit" className="login__submit button">
            Войти
          </button>
          <button
            type="button"
            className="login__close"
            onClick={() => {
              closeButtonClickHandler(false);
            }}
          >
            <img src={close} alt="close" />
          </button>
        </form>
      </div>
    );
  }
}

interface ILoginFormProps {
  isLoginValid: boolean;
  isPasswordValid: boolean;
  isPasswordShown: boolean;
  isLoginFormValid: boolean;
  validateLogin: (status: boolean) => void;
  validatePassword: (status: boolean) => void;
  showPassword: (status: boolean) => void;
  validateLoginForm: (status: boolean) => void;
  closeButtonClickHandler: (status: boolean) => void;
}

const mapStateToProps = (state: IState) => ({
  isLoginValid: getLoginStatus(state),
  isPasswordValid: getPasswordStatus(state),
  isPasswordShown: getPasswordShowStatus(state),
  isLoginFormValid: getLoginFormStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  validateLogin(status: boolean) {
    dispatch(ActionCreator.changeLoginValidity(status));
  },

  validatePassword(status: boolean) {
    dispatch(ActionCreator.changePasswordValidity(status));
  },

  showPassword(status: boolean) {
    dispatch(ActionCreator.changePasswordShowStatus(status));
  },

  validateLoginForm(status: boolean) {
    dispatch(ActionCreator.changeLoginFormValidity(status));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
