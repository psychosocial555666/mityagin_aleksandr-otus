import React from "react";
import {connect} from "react-redux";
import {getCreditParameters, getCurrentCreditType} from "../../reducer/ui/selectors";
import {ActionCreator} from "../../reducer/ui/ui.js";
import plus from "../../../img/plus.svg";
import minus from "../../../img/minus.svg";
import {creditTypes, MAX_PERCENT} from "../../const";
import {maskThisValue, extend, increasePrice, reducePrice, checkValueValidity, returnCorrectValue, percentToSum, sumToPercent, returnMortgagePercent, returnMortgageSum, returnMonthlyCreditPercent, returnTimeInMonths, calculatePayment, calculateMinIncome, returnAutoPercent, returnAutoSum, maskThisTime} from "../../utils/utils";
import PropTypes from 'prop-types';
import { parametersType } from "../../types";

class StepTwo extends React.PureComponent {
  constructor(props) {
    super(props);

    this.priceRef = React.createRef();
    this.persentInputRef = React.createRef();
    this.timeInputRef = React.createRef();
    this.persentSliderRef = React.createRef();
    this.timeInputRef = React.createRef();
    this.timeSliderRef = React.createRef();
    this.capitalRef = React.createRef();
    this.cascoRef = React.createRef();
    this.insuranceRef = React.createRef();

    this.initialSum = null;

    this._initialSliderChangeHandler = this._initialSliderChangeHandler.bind(this);
    this._timeSliderChangeHandler = this._timeSliderChangeHandler.bind(this);
    this._capitalCheckboxChangeHandler = this._capitalCheckboxChangeHandler.bind(this);
    this._cascoCheckboxChangeHandler = this._cascoCheckboxChangeHandler.bind(this);
    this._insuranceCheckboxChangeHandler = this._insuranceCheckboxChangeHandler.bind(this);
  }

  componentDidMount() {
    const {creditParameters} = this.props;
    const {
      price,
      initialPercent,
      time,
    } = creditParameters;
    this.priceRef.current.value = maskThisValue(price, ` рублей`);
    this._countInitialSum();
    this.persentInputRef.current.value = maskThisValue(String(this.initialSum), ` рублей`);
    this.persentSliderRef.current.value = initialPercent;
    this.timeInputRef.current.value = maskThisValue(String(time), ` лет`);
    this.timeSliderRef.current.value = time;
  }

  componentDidUpdate() {
    const {creditParameters} = this.props;
    const {
      price,
      initialPercent,
      time,
    } = creditParameters;

    this.priceRef.current.value = maskThisValue(price, ` рублей`);
    this.priceRef.current.parentNode.parentNode.classList.remove('step-two__item--invalid');
    this.persentInputRef.current.parentNode.classList.remove('step-two__item--invalid');
    this.timeInputRef.current.parentNode.classList.remove('step-two__item--invalid');
    this._countInitialSum();
    this.persentInputRef.current.value = maskThisValue(String(Math.round(this.initialSum)), ` рублей`);
    this.persentSliderRef.current.value = initialPercent;
    this.timeInputRef.current.value = maskThisTime(time);
    this.timeSliderRef.current.value = time;
  }

  _updateCalculator(updatedParametr) {
    const {creditParameters, currentCreditType} = this.props;
    const updatedParameters = extend(creditParameters, updatedParametr);
    const {
      price,
      initialPercent,
      time,
      minCreditSum,
      capital,
      casco,
      insurance,
    } = updatedParameters;

    return this._calculateCreditOffer(currentCreditType, price, initialPercent, time, minCreditSum, capital, casco, insurance);
  }

  _calculateCreditOffer(type, price, initial, time, minCreditSum, capital, casco, insurance) {
    if(type === creditTypes.MORTGAGE) {
      let mortgagePercent = returnMortgagePercent(initial);
      let creditSum = returnMortgageSum(price, initial, capital, minCreditSum);
      let monthlyPercent = returnMonthlyCreditPercent(mortgagePercent);
      let timeInMonths = returnTimeInMonths(time);
      let monthlyPayment = calculatePayment(creditSum, monthlyPercent, timeInMonths);
      let minIncome = calculateMinIncome(monthlyPayment)
      if(creditSum) {
        return(
          {
            creditPercent: mortgagePercent,
            creditSum: creditSum,
            payment: monthlyPayment,
            income: minIncome,
            isOfferCorrect: true,
          }
        );
      } else {
        return(
          {
            isOfferCorrect: false,
          }
        );
      }
    }

    if(type === creditTypes.AUTO) {
      let autoPercent = returnAutoPercent(price, casco, insurance);
      let creditSum = returnAutoSum(price, initial, minCreditSum);
      let monthlyPercent = returnMonthlyCreditPercent(autoPercent);
      let timeInMonths = returnTimeInMonths(time);
      let monthlyPayment = calculatePayment(creditSum, monthlyPercent, timeInMonths);
      let minIncome = calculateMinIncome(monthlyPayment)
      if(creditSum) {
        return(
          {
            creditPercent: autoPercent,
            creditSum: creditSum,
            payment: monthlyPayment,
            income: minIncome,
            isOfferCorrect: true,
          }
        );
      } else {
        return(
          {
            isOfferCorrect: false,
          }
        );
      }
    }
  }

  _applyNewParameters(parametr) {
    const {creditParameters, updateCreditParameters}= this.props;

    let newParameters = extend(creditParameters, extend(this._updateCalculator(parametr), parametr));
    updateCreditParameters(newParameters);
  }

  _priceButtonIncreaseHandler(value, step, maxValue) {
    let result = increasePrice(value, step, maxValue);
    this._applyNewParameters({price: result});
  }

  _priceButtonReduceHandler(value, step, minValue) {
    let result = reducePrice(value, step, minValue);
    this._applyNewParameters({price: result});
  }

  _keyPressHandler(evt) {
    const keyCode = evt.keyCode || evt.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^[0-9]+$/.test(keyValue)) evt.preventDefault();
  }

  _itemInputChangeHandler(value, minValue, maxValue, item) {
    checkValueValidity(value, minValue, maxValue) ? 
      item.classList.add('step-two__item--invalid') : 
      item.classList.remove('step-two__item--invalid');
  }

  _priceInputBlurHandler(evt, minValue, maxValue) {
    let value = evt.target.value;

    let result = returnCorrectValue(value, minValue, maxValue);
    this._applyNewParameters({price: result});
  }

  _initialInputBlurHandler(evt, minValue, maxValue, price) {
    let value = evt.target.value;

    let result = returnCorrectValue(value, minValue, maxValue);
    this._applyNewParameters({
      initialPercent: sumToPercent(price, result)
    });
  }

  _timeInputBlurHandler(evt, minValue, maxValue) {
    let value = evt.target.value;

    let result = returnCorrectValue(value, minValue, maxValue);
    this._applyNewParameters({
      time: result,
    });
  }

  _initialSliderChangeHandler(evt) {
    this._applyNewParameters({
      initialPercent: Number(evt.target.value)
    });
  }

  _timeSliderChangeHandler(evt) {
    this._applyNewParameters({
      time: Number(evt.target.value)
    });
  }

  _capitalCheckboxChangeHandler(evt) {
    this._applyNewParameters({
      capital: evt.target.checked,
    });
  }

  _cascoCheckboxChangeHandler(evt) {
    this._applyNewParameters({
      casco: evt.target.checked,
    });
  }

  _insuranceCheckboxChangeHandler(evt) {
    this._applyNewParameters({
      insurance: evt.target.checked,
    });
  }

  _countInitialSum() {
    this.initialSum = percentToSum(this.props.creditParameters.price, this.props.creditParameters.initialPercent);
  }

  render() {
    const {creditParameters, currentCreditType} = this.props;
    const {
      price,
      priceStep,
      minPrice,
      maxPrice,
      initialPercent,
      minInitialPercent,
      time,
      minTime,
      maxTime,
    } = creditParameters;

    return (
      <React.Fragment>
        <div className="calculator__step step-two">
          <h3>Шаг 2. Введите параметры кредита</h3>
          <div className="step-two__item step-two__item--sum">
            <label htmlFor="price">{currentCreditType === creditTypes.MORTGAGE ? "Стоимость недвижимости" : "Стоимость автомобиля"}</label>
            <div className="step-two__cover">
              <button type="button" 
              className="step-two__price-control step-two__price-control--minus"
              onClick={() => {this._priceButtonReduceHandler(price, priceStep, minPrice)}}
              >
                <img src={minus} alt="minus"/>
              </button>
              <input type="text" id="price" 
              ref={this.priceRef}
              onFocus={(evt) => {evt.target.value = price}}
              onKeyPress={this._keyPressHandler}
              onChange={(evt) => {this._itemInputChangeHandler(evt.target.value, minPrice, maxPrice, evt.target.parentNode.parentNode)}}
              onBlur={(evt) => {this._priceInputBlurHandler(evt, minPrice, maxPrice)}} 
              />
              <button type="button" 
              className="step-two__price-control step-two__price-control--plus"
              onClick={() => {this._priceButtonIncreaseHandler(price, priceStep, maxPrice)}}
              >
                <img src={plus} alt="plus"/>
              </button>
            </div>
            <span>{`От ${maskThisValue(minPrice, ``)}  до ${maskThisValue(maxPrice, ``)} рублей`}</span>
          </div>
  
          <div className="step-two__item step-two__item--initial">
            <label htmlFor="initial">Первоначальный взнос</label>
            <input type="text" id="initial" 
            ref={this.persentInputRef}
            onKeyPress={this._keyPressHandler}
            onFocus={(evt) => {evt.target.value = this.initialSum}}
            onChange={(evt) => {this._itemInputChangeHandler(evt.target.value, percentToSum(price, minInitialPercent), percentToSum(price, MAX_PERCENT), evt.target.parentNode)}}
            onBlur={(evt) => {this._initialInputBlurHandler(evt, percentToSum(price, minInitialPercent), percentToSum(price, MAX_PERCENT), price)}}
            />
            <div className="step-two__slider">
                <output htmlFor="slider">{`${initialPercent} %`}</output> 
                <input type="range" id="slider" 
                ref={this.persentSliderRef}
                min={minInitialPercent} 
                max={String(MAX_PERCENT)} 
                step="5"
                onChange={this._initialSliderChangeHandler}
                />
            </div>
          </div>
  
          <div className="step-two__item step-two__item--time">
            <label htmlFor="time">Срок кредитования</label>
            <input type="text" id="time"
            ref={this.timeInputRef}
            onKeyPress={this._keyPressHandler}
            onFocus={(evt) => {evt.target.value = time}}
            onChange={(evt) => {this._itemInputChangeHandler(evt.target.value, minTime, maxTime, evt.target.parentNode)}}
            onBlur={(evt) => {this._timeInputBlurHandler(evt, minTime, maxTime)}}
            />
            <div className="step-two__slider">
                <output htmlFor="slider">
                  <span>{maskThisTime(minTime)}</span>
                  <span>{maskThisTime(maxTime)}</span>
                </output> 
                <input type="range" id="slider" 
                ref={this.timeSliderRef}
                min={minTime} 
                max={maxTime} 
                step="1"
                onChange={this._timeSliderChangeHandler}
                />
            </div>
          </div>

          {currentCreditType === creditTypes.MORTGAGE ? 
          (
          <div className="step-two__item step-two__item--additional">
            <input type="checkbox" id="capital" className="visually-hidden"
            checked = {this.props.capital}
            onChange={this._capitalCheckboxChangeHandler}
            />
            <label htmlFor="capital">Использовать материнский капитал</label>
          </div>
          ) : (
            <React.Fragment>
            <div className="step-two__item step-two__item--additional">
              <input type="checkbox" id="CASCO" className="visually-hidden"
              checked = {this.props.casco}
              onChange={this._cascoCheckboxChangeHandler}
              />
              <label htmlFor="CASCO">Оформить КАСКО в нашем банке</label>
            </div>
            <div className="step-two__item step-two__item--additional">
              <input type="checkbox" id="insurance" className="visually-hidden"
              checked = {this.props.insurance}
              onChange = {this._insuranceCheckboxChangeHandler}
              />
              <label htmlFor="insurance">Оформить Страхование жизни в нашем банке</label>
            </div>
            </React.Fragment>
          )
        }
          
        </div>
      </React.Fragment>
    );
  };
};

StepTwo.propTypes = {
  creditParameters: parametersType,
  currentCreditType: PropTypes.string,
  updateCreditParameters: PropTypes.func,
};

const mapStateToProps = (state) => ({
  currentCreditType: getCurrentCreditType(state),
  creditParameters: getCreditParameters(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateCreditParameters(parameters) {
    dispatch(ActionCreator.updateCreditParameters(parameters));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);