import React from "react";
import {connect} from "react-redux";
import {getTabType} from "../../reducer/ui/selectors";
import {ActionCreator} from "../../reducer/ui/ui.js";
import {TabType} from "../../const.js";
import PropTypes from 'prop-types';
import cards from "../../../img/cards.svg";
import phone from "../../../img/phone.svg";
import security from "../../../img/security.svg";
import vault from "../../../img/vault.svg";
import bank from "../../../img/piggybank.png";
import appPhone from "../../../img/app-phone.png";
import car from "../../../img/car.png";
import lock from "../../../img/lock.png";

function Tabs(props) {

  const {
    tabType,
    onTabButtonClick,
  } = props;

  let tabScreen;

  switch (tabType) {
    case TabType.DEPOSITS:
      tabScreen = <article className="services__item service">
      <div className="service__content">
        <h3>Вклады Лига Банка – это выгодная инвестиция в свое будущее</h3>
        <ul className="service__list">
          <li className="service__item">Проценты по вкладам до 7%</li>
          <li className="service__item">Разнообразные условия</li>
          <li className="service__item">Возможность ежемесячной капитализации или вывод процентов на банковскую карту</li>
        </ul>
        <a href="#more" className="service__button button">Узнать подробнее</a>
      </div>
      <div className="service__image">
        <img src={bank} alt="Вклады Лига Банка" width="440" height="290"/>          
      </div>
    </article>
      break;
    case TabType.CREDITS:
      tabScreen = <article className="services__item service">
      <div className="service__content">
        <h3>Лига Банк выдает кредиты под любые цели</h3>
        <ul className="service__list">
          <li className="service__item">Ипотечный кредит</li>
          <li className="service__item">Автокредит</li>
          <li className="service__item">Потребительский кредит</li>
        </ul>
        <p className="service__description">
          Рассчитайте ежемесячный платеж <br />
          и ставку по кредиту воспользовавшись нашим <a href="#calculator">кредитным калькулятором</a>
        </p>
      </div>
      <div className="service__image">
        <img src={car} alt="Кредиты Лига Банка" width="440" height="290"/>
      </div>
    </article>
      break;
    case TabType.INSURANCE:
      tabScreen = <article className="services__item service">
      <div className="service__content">
        <h3>Лига Страхование — застрахуем все что захотите</h3>
        <ul className="service__list">
          <li className="service__item">Автомобильное страхование</li>
          <li className="service__item">Страхование жизни и здоровья</li>
          <li className="service__item">Страхование недвижимости</li>
        </ul>
        <a href="#more" className="service__button button">Узнать подробнее</a>
      </div>
      <div className="service__image">
        <img src={lock} alt="Страхование Лига Банка" width="440" height="290"/>         
      </div>
    </article>
      break;
    case TabType.ONLINE:
      tabScreen = <article className="services__item service">
      <div className="service__content">
        <h3>Лига Банк — это огромное количество онлайн-сервисов для вашего удобства</h3>
        <ul className="service__list">
          <li className="service__item">Мобильный банк, который всегда под рукой</li>
          <li className="service__item">Приложение Лига-проездной позволит вам оплачивать билеты по всему миру</li>
        </ul>
        <a href="#more" className="service__button button">Узнать подробнее</a>
      </div>
      <div className="service__image">
        <img src={appPhone} alt="Вклады Лига Банка" width="440" height="290"/>          
      </div>
    </article>
      break;
  
    default:
      break;
  };

  return (
    <React.Fragment>
      <section className="services">
        <div className="services__controls">
          <button 
          onClick={() => {onTabButtonClick(TabType.DEPOSITS)}}
          className={tabType === TabType.DEPOSITS ? "services__control services__control--active" : "services__control"}>
            <img src={vault} alt="Вклады"/>
            <span>Вклады</span>
          </button>
          <button 
          onClick={() => {onTabButtonClick(TabType.CREDITS)}}
          className={tabType === TabType.CREDITS ? "services__control services__control--active" : "services__control"}>
            <img src={cards} alt="Кредиты"/>
            <span>Кредиты</span>
          </button>
          <button 
          onClick={() => {onTabButtonClick(TabType.INSURANCE)}}
          className={tabType === TabType.INSURANCE ? "services__control services__control--active" : "services__control"}>
            <img src={security} alt="Страхование"/>
            <span>Страхование</span>
          </button>
          <button 
          onClick={() => {onTabButtonClick(TabType.ONLINE)}}
          className={tabType === TabType.ONLINE ? "services__control services__control--active" : "services__control"}>
            <img src={phone} alt="Онлайн-сервисы"/>
            <span>Онлайн-сервисы</span>
          </button>
        </div>
        <div className="services__content">
          {tabScreen}
        </div>
      </section>
    </React.Fragment>
  );
};


Tabs.propTypes = {
  tabType: PropTypes.string,
  onTabButtonClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  tabType: getTabType(state),
});

const mapDispatchToProps = (dispatch) => ({
  onTabButtonClick(type) {
    dispatch(ActionCreator.setTabType(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Tabs);