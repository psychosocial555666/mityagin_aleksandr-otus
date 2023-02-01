import React from "react";
import { connect } from "react-redux";
import {
  getCreditParameters,
  getCurrentCreditType,
} from "../../reducer/ui/selectors";
import { ActionCreator } from "../../reducer/ui/ui";
import plus from "../../../img/plus.svg";
import minus from "../../../img/minus.svg";
import { creditTypes, MAX_PERCENT } from "../../const";
import {
  maskThisValue,
  extend,
  increasePrice,
  reducePrice,
  checkValueValidity,
  returnCorrectValue,
  percentToSum,
  sumToPercent,
  returnMortgagePercent,
  returnMortgageSum,
  returnMonthlyCreditPercent,
  returnTimeInMonths,
  calculatePayment,
  calculateMinIncome,
  returnAutoPercent,
  returnAutoSum,
  maskThisTime,
} from "../../utils/utils";
import { CreditParametersType, CreditTypesType, IState } from "../../types";
import { Dispatch } from "redux";

class StepTwo extends React.PureComponent<IStepTwoProps> {
  priceRef: React.RefObject<HTMLInputElement>;
  persentInputRef: React.RefObject<HTMLInputElement>;
  timeInputRef: React.RefObject<HTMLInputElement>;
  persentSliderRef: React.RefObject<HTMLInputElement>;
  timeSliderRef: React.RefObject<HTMLInputElement>;
  capitalRef: React.RefObject<HTMLInputElement>;
  cascoRef: React.RefObject<HTMLInputElement>;
  insuranceRef: React.RefObject<HTMLInputElement>;
  initialSum: number | null;
  constructor(props: IStepTwoProps) {
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

    this._initialSliderChangeHandler =
      this._initialSliderChangeHandler.bind(this);
    this._timeSliderChangeHandler = this._timeSliderChangeHandler.bind(this);
    this._capitalCheckboxChangeHandler =
      this._capitalCheckboxChangeHandler.bind(this);
    this._cascoCheckboxChangeHandler =
      this._cascoCheckboxChangeHandler.bind(this);
    this._insuranceCheckboxChangeHandler =
      this._insuranceCheckboxChangeHandler.bind(this);
  }

  componentDidMount() {
    const { creditParameters } = this.props;
    if (
      !creditParameters ||
      !this.priceRef.current ||
      !this.persentInputRef.current ||
      !this.persentSliderRef.current ||
      !this.timeInputRef.current ||
      !this.timeSliderRef.current
    )
      return;
    const { price, initialPercent, time } = creditParameters;
    this.priceRef.current.value = maskThisValue(price || "", ` рублей`);
    this._countInitialSum();
    this.persentInputRef.current.value = maskThisValue(
      String(this.initialSum),
      ` рублей`
    );
    this.persentSliderRef.current.value = String(initialPercent);
    this.timeInputRef.current.value = maskThisValue(String(time), ` лет`);
    this.timeSliderRef.current.value = String(time);
  }

  componentDidUpdate() {
    const { creditParameters } = this.props;
    if (
      !creditParameters ||
      !this.priceRef.current ||
      !this.persentInputRef.current ||
      !this.persentSliderRef.current ||
      !this.timeInputRef.current ||
      !this.timeSliderRef.current
    )
      return;
    const { price, initialPercent, time } = creditParameters;

    this.priceRef.current.value = maskThisValue(price || "", ` рублей`);
    this.priceRef.current.parentNode?.parentNode instanceof HTMLElement &&
      this.priceRef.current.parentNode.parentNode.classList.remove(
        "step-two__item--invalid"
      );
    this.persentInputRef.current.parentNode instanceof HTMLElement &&
      this.persentInputRef.current.parentNode.classList.remove(
        "step-two__item--invalid"
      );
    this.timeInputRef.current.parentNode instanceof HTMLElement &&
      this.timeInputRef.current.parentNode.classList.remove(
        "step-two__item--invalid"
      );
    this._countInitialSum();
    this.persentInputRef.current.value = maskThisValue(
      String(Math.round(this.initialSum as number)),
      ` рублей`
    );
    this.persentSliderRef.current.value = String(initialPercent);
    this.timeInputRef.current.value = maskThisTime(time || 0);
    this.timeSliderRef.current.value = String(time);
  }

  _updateCalculator(updatedParametr: CreditParametersType) {
    const { creditParameters, currentCreditType } = this.props;

    if (!creditParameters) return;

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

    return this._calculateCreditOffer(
      currentCreditType,
      price,
      initialPercent,
      time,
      minCreditSum,
      capital,
      casco,
      insurance
    );
  }

  _calculateCreditOffer(
    type: CreditTypesType,
    price: number,
    initial: number,
    time: number,
    minCreditSum: number,
    capital: boolean,
    casco: boolean,
    insurance: boolean
  ) {
    if (type === creditTypes.MORTGAGE) {
      let mortgagePercent = returnMortgagePercent(initial);
      let creditSum =
        returnMortgageSum(price, initial, capital, minCreditSum) || 0;
      let monthlyPercent = returnMonthlyCreditPercent(mortgagePercent);
      let timeInMonths = returnTimeInMonths(time);
      let monthlyPayment = calculatePayment(
        +creditSum,
        monthlyPercent,
        timeInMonths
      );
      let minIncome = calculateMinIncome(+monthlyPayment);
      if (creditSum) {
        return {
          creditPercent: mortgagePercent,
          creditSum: creditSum,
          payment: monthlyPayment,
          income: minIncome,
          isOfferCorrect: true,
        };
      } else {
        return {
          isOfferCorrect: false,
        };
      }
    }

    if (type === creditTypes.AUTO) {
      let autoPercent = returnAutoPercent(price, casco, insurance);
      let creditSum = returnAutoSum(price, initial, minCreditSum) || 0;
      let monthlyPercent = returnMonthlyCreditPercent(autoPercent);
      let timeInMonths = returnTimeInMonths(time);
      let monthlyPayment = calculatePayment(
        +creditSum,
        monthlyPercent,
        timeInMonths
      );
      let minIncome = calculateMinIncome(+monthlyPayment);
      if (creditSum) {
        return {
          creditPercent: autoPercent,
          creditSum: creditSum,
          payment: monthlyPayment,
          income: minIncome,
          isOfferCorrect: true,
        };
      } else {
        return {
          isOfferCorrect: false,
        };
      }
    }
  }

  _applyNewParameters(parametr: CreditParametersType) {
    const { creditParameters, updateCreditParameters } = this.props;

    let newParameters = extend(
      creditParameters,
      extend(this._updateCalculator(parametr), parametr)
    );
    updateCreditParameters(newParameters);
  }

  _priceButtonIncreaseHandler(value: string, step: number, maxValue: number) {
    let result = increasePrice(value, step, maxValue);
    this._applyNewParameters({ price: result } as CreditParametersType);
  }

  _priceButtonReduceHandler(value: string, step: number, minValue: number) {
    let result = reducePrice(value, step, minValue);
    this._applyNewParameters({ price: result } as CreditParametersType);
  }

  _keyPressHandler(evt: React.KeyboardEvent) {
    const keyCode = evt.keyCode || evt.which;
    const keyValue = String.fromCharCode(keyCode);
    if (!/^[0-9]+$/.test(keyValue)) evt.preventDefault();
  }

  _itemInputChangeHandler(
    value: string,
    minValue: number,
    maxValue: number,
    item: HTMLElement | null
  ) {
    if (!item) return;
    checkValueValidity(value, minValue, maxValue)
      ? item.classList.add("step-two__item--invalid")
      : item.classList.remove("step-two__item--invalid");
  }

  _priceInputBlurHandler(
    evt: React.FocusEvent<HTMLInputElement>,
    minValue: number,
    maxValue: number
  ) {
    let value = evt.target.value;

    let result = returnCorrectValue(value, minValue, maxValue);
    this._applyNewParameters({ price: result } as CreditParametersType);
  }

  _initialInputBlurHandler(
    evt: React.FocusEvent<HTMLInputElement>,
    minValue: number,
    maxValue: number,
    price: number
  ) {
    let value = evt.target.value;

    let result = returnCorrectValue(value, minValue, maxValue);
    this._applyNewParameters({
      initialPercent: sumToPercent(price, result || 0),
    } as CreditParametersType);
  }

  _timeInputBlurHandler(
    evt: React.FocusEvent<HTMLInputElement>,
    minValue: number,
    maxValue: number
  ) {
    let value = evt.target.value;

    let result = returnCorrectValue(value, minValue, maxValue);
    this._applyNewParameters({
      time: result,
    });
  }

  _initialSliderChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    this._applyNewParameters({
      initialPercent: Number(evt.target.value),
    });
  }

  _timeSliderChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    this._applyNewParameters({
      time: Number(evt.target.value),
    });
  }

  _capitalCheckboxChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    this._applyNewParameters({
      capital: evt.target.checked,
    });
  }

  _cascoCheckboxChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    this._applyNewParameters({
      casco: evt.target.checked,
    });
  }

  _insuranceCheckboxChangeHandler(evt: React.ChangeEvent<HTMLInputElement>) {
    this._applyNewParameters({
      insurance: evt.target.checked,
    });
  }

  _countInitialSum() {
    this.initialSum = percentToSum(
      Number(this.props.creditParameters?.price) || 0,
      this.props.creditParameters?.initialPercent || 0
    );
  }

  render() {
    const { creditParameters, currentCreditType } = this.props;
    if (!creditParameters) return;
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
      capital,
      casco,
      insurance,
    } = creditParameters;

    return (
      <React.Fragment>
        <div className="calculator__step step-two">
          <h3>Шаг 2. Введите параметры кредита</h3>
          <div className="step-two__item step-two__item--sum">
            <label htmlFor="price">
              {currentCreditType === creditTypes.MORTGAGE
                ? "Стоимость недвижимости"
                : "Стоимость автомобиля"}
            </label>
            <div className="step-two__cover">
              <button
                type="button"
                className="step-two__price-control step-two__price-control--minus"
                onClick={() => {
                  this._priceButtonReduceHandler(
                    price || "",
                    priceStep || 0,
                    Number(minPrice) || 0
                  );
                }}
              >
                <img src={minus} alt="minus" />
              </button>
              <input
                type="text"
                id="price"
                ref={this.priceRef}
                onFocus={(evt) => {
                  evt.target.value = price || "";
                }}
                onKeyPress={this._keyPressHandler}
                onChange={(evt) => {
                  this._itemInputChangeHandler(
                    evt.target.value,
                    Number(minPrice) || 0,
                    Number(maxPrice) || 0,
                    evt.target.parentNode?.parentNode instanceof HTMLElement
                      ? evt.target.parentNode.parentNode
                      : null
                  );
                }}
                onBlur={(evt) => {
                  this._priceInputBlurHandler(
                    evt,
                    Number(minPrice),
                    Number(maxPrice)
                  );
                }}
              />
              <button
                type="button"
                className="step-two__price-control step-two__price-control--plus"
                onClick={() => {
                  this._priceButtonIncreaseHandler(
                    price || "",
                    priceStep || 0,
                    Number(maxPrice)
                  );
                }}
              >
                <img src={plus} alt="plus" />
              </button>
            </div>
            <span>{`От ${maskThisValue(minPrice || "", ``)}  до ${maskThisValue(
              String(maxPrice),
              ``
            )} рублей`}</span>
          </div>

          <div className="step-two__item step-two__item--initial">
            <label htmlFor="initial">Первоначальный взнос</label>
            <input
              type="text"
              id="initial"
              ref={this.persentInputRef}
              onKeyPress={this._keyPressHandler}
              onFocus={(evt) => {
                evt.target.value = String(this.initialSum);
              }}
              onChange={(evt) => {
                this._itemInputChangeHandler(
                  evt.target.value,
                  percentToSum(Number(price), minInitialPercent || 0),
                  percentToSum(Number(price), MAX_PERCENT),
                  evt.target.parentNode instanceof HTMLElement
                    ? evt.target.parentNode
                    : null
                );
              }}
              onBlur={(evt) => {
                this._initialInputBlurHandler(
                  evt,
                  percentToSum(Number(price), minInitialPercent || 0),
                  percentToSum(Number(price), MAX_PERCENT),
                  Number(price)
                );
              }}
            />
            <div className="step-two__slider">
              <output htmlFor="slider">{`${initialPercent} %`}</output>
              <input
                type="range"
                id="slider"
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
            <input
              type="text"
              id="time"
              ref={this.timeInputRef}
              onKeyPress={this._keyPressHandler}
              onFocus={(evt) => {
                evt.target.value = String(time);
              }}
              onChange={(evt) => {
                this._itemInputChangeHandler(
                  evt.target.value,
                  minTime || 0,
                  maxTime || 0,
                  evt.target.parentNode instanceof HTMLElement
                    ? evt.target.parentNode
                    : null
                );
              }}
              onBlur={(evt) => {
                this._timeInputBlurHandler(evt, minTime || 0, maxTime || 0);
              }}
            />
            <div className="step-two__slider">
              <output htmlFor="slider">
                <span>{maskThisTime(minTime || 0)}</span>
                <span>{maskThisTime(maxTime || 0)}</span>
              </output>
              <input
                type="range"
                id="slider"
                ref={this.timeSliderRef}
                min={minTime}
                max={maxTime}
                step="1"
                onChange={this._timeSliderChangeHandler}
              />
            </div>
          </div>

          {currentCreditType === creditTypes.MORTGAGE ? (
            <div className="step-two__item step-two__item--additional">
              <input
                type="checkbox"
                id="capital"
                className="visually-hidden"
                checked={Boolean(capital)}
                onChange={this._capitalCheckboxChangeHandler}
              />
              <label htmlFor="capital">Использовать материнский капитал</label>
            </div>
          ) : (
            <React.Fragment>
              <div className="step-two__item step-two__item--additional">
                <input
                  type="checkbox"
                  id="CASCO"
                  className="visually-hidden"
                  checked={Boolean(casco)}
                  onChange={this._cascoCheckboxChangeHandler}
                />
                <label htmlFor="CASCO">Оформить КАСКО в нашем банке</label>
              </div>
              <div className="step-two__item step-two__item--additional">
                <input
                  type="checkbox"
                  id="insurance"
                  className="visually-hidden"
                  checked={Boolean(insurance)}
                  onChange={this._insuranceCheckboxChangeHandler}
                />
                <label htmlFor="insurance">
                  Оформить Страхование жизни в нашем банке
                </label>
              </div>
            </React.Fragment>
          )}
        </div>
      </React.Fragment>
    );
  }
}

interface IStepTwoProps {
  creditParameters: CreditParametersType | null;
  currentCreditType: CreditTypesType;
  // capital: boolean;
  // casco: boolean;
  // insurance: boolean;
  updateCreditParameters: (parameters: CreditParametersType) => void;
}

const mapStateToProps = (state: IState) => ({
  currentCreditType: getCurrentCreditType(state),
  creditParameters: getCreditParameters(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateCreditParameters(parameters: CreditParametersType) {
    dispatch(ActionCreator.updateCreditParameters(parameters));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StepTwo);
