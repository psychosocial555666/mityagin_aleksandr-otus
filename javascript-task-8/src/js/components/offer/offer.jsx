import React from "react";
import {connect} from "react-redux";
import {creditTypes} from "../../const";
import {ActionCreator} from "../../reducer/ui/ui.js";
import {getCreditParameters, getCurrentCreditType} from "../../reducer/ui/selectors";
import {maskThisValue} from "../../utils/utils";
import PropTypes from 'prop-types';
import {parametersType} from "../../types";

function Offer(props) {
  const {currentCreditType, creditParameters, openRequest} = props;
  const {creditSum, creditPercent, payment, income, isOfferCorrect, minCreditSum} = creditParameters;
  return (
    <React.Fragment>
      {isOfferCorrect ? 
        <section className="calculator__offer offer">
          <div className="offer__content">
            <h3>Наше предложение</h3>
            <ul className="offer__list">
              <li className="offer__item">
                <p>{maskThisValue(creditSum, ` рублей`)}</p>
                <span>{currentCreditType === creditTypes.MORTGAGE ? `Сумма ипотеки` : `Сумма автокредита`}</span>
              </li>
              <li className="offer__item">
                <p>{`${creditPercent} %`}</p>
                <span>Процентная ставка</span>
              </li>
              <li className="offer__item">
                <p>{maskThisValue(payment, ` рублей`)}</p>
                <span>Ежемесячный платеж</span>
              </li>
              <li className="offer__item">
                <p>{maskThisValue(income, ` рублей`)}</p>
                <span>Необходимый доход</span>
              </li>
            </ul>
            <button type="button" className="offer__button button"
            onClick={() => {openRequest(true)}}
            >Оформить заявку</button>
          </div>
        </section> : 
        <section className="calculator__offer offer">
        <div className="offer__content offer__content--invalid">
          <h3>Наш банк не выдаёт ипотечные кредиты меньше {maskThisValue(minCreditSum, ` рублей`)}.</h3>
          <p>Попробуйте использовать другие параметры для расчёта.</p>
        </div>
        </section>
      }
    </React.Fragment>
  );
};

Offer.propTypes = {
  currentCreditType: PropTypes.string,
  creditParameters: parametersType,
};

const mapStateToProps = (state) => ({
  currentCreditType: getCurrentCreditType(state),
  creditParameters: getCreditParameters(state),
});

const mapDispatchToProps = (dispatch) => ({
  openRequest(status) {
    dispatch(ActionCreator.changeRequestStatus(status));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Offer);