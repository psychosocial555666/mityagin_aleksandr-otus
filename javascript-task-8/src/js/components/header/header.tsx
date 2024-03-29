/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import logo from "../../../img/logo.svg";
import auth from "../../../img/auth.svg";
import menu from "../../../img/menu.svg";
import close from "../../../img/close.svg";
import { connect } from "react-redux";
import { getMenuStatus } from "../../reducer/ui/selectors";
import { ActionCreator } from "../../reducer/ui/ui";
import { ModalType } from "../../const";
import { Dispatch } from "redux";
import { IState, ModalTypesType } from "../../types";

function Header(props: IHeaderProps) {
  const { isMenuOpened, onMenuButtonClick, popupOpen } = props;

  return (
    <React.Fragment>
      <header
        className={
          isMenuOpened ? "page-header page-header--menu-opened" : "page-header"
        }
      >
        <div className="container">
          <div className="page-header__content">
            <button
              className="page-header__menu"
              onClick={
                isMenuOpened
                  ? () => {}
                  : () => {
                      onMenuButtonClick(isMenuOpened);
                    }
              }
            >
              <img src={menu} alt="Кнопка открытия меню" />
              <span className="visually-hidden">Меню</span>
            </button>
            <button
              className="page-header__close"
              onClick={
                isMenuOpened
                  ? () => {
                      onMenuButtonClick(isMenuOpened);
                    }
                  : () => {}
              }
            >
              <img src={close} alt="Кнопка закрытия меню" />
              <span className="visually-hidden">Закрыть</span>
            </button>
            <a className="page-header__logo">
              <img src={logo} alt="Logo" width="149" height="25" />
            </a>
            <nav className="page-header__nav main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item">
                  <a href="#" className="main-nav__link">
                    Услуги
                  </a>
                </li>
                <li className="main-nav__item">
                  <a href="#" className="main-nav__link">
                    Рассчитать кредит
                  </a>
                </li>
                <li className="main-nav__item">
                  <a href="#" className="main-nav__link">
                    Конвертер валют
                  </a>
                </li>
                <li className="main-nav__item">
                  <a href="#" className="main-nav__link">
                    Контакты
                  </a>
                </li>
              </ul>
            </nav>
            <div className="page-header__auth">
              <a
                href="#"
                className="page-header__link"
                onClick={(evt) => {
                  evt.preventDefault();
                  popupOpen(ModalType.LOGIN as ModalTypesType);
                }}
              >
                <img src={auth} alt="Log-In" />
                <span>Войти в Интернет-банк</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
}

interface IHeaderProps {
  isMenuOpened: boolean;
  onMenuButtonClick: (status: boolean) => void;
  popupOpen: (type: ModalTypesType) => void;
}

const mapStateToProps = (state: IState) => ({
  isMenuOpened: getMenuStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onMenuButtonClick(status: boolean) {
    dispatch(ActionCreator.toggleMenu(status));
  },

  popupOpen(type: ModalTypesType) {
    dispatch(ActionCreator.changeModalType(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
