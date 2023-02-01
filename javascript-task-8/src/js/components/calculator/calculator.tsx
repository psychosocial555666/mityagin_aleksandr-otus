import React from "react";
import { connect } from "react-redux";
import { creditTypes } from "../../const";
import {
  getCurrentCreditType,
  getRequestStatus,
} from "../../reducer/ui/selectors";
import { ActionCreator } from "../../reducer/ui/ui";
import Offer from "../offer/offer";
import StepOne from "../step-one/step-one";
import StepThree from "../step-three/step-three";
import StepTwo from "../step-two/step-two";
import { Dispatch } from "redux";
import { CreditTypesType, IState, TabTypesType } from "../../types";

function Calculator(props: ICalculatorProps) {
  const { currentCreditType, isRequestOpened } = props;

  return (
    <React.Fragment>
      <section className="calculator" id="calculator">
        <div className="container">
          <div className="calculator__content">
            <h2>Кредитный калькулятор</h2>
            <div className="calculator__wrapper">
              <div className="calculator__parameters">
                <StepOne />
                {currentCreditType === creditTypes.NONE ? "" : <StepTwo />}
              </div>
              {currentCreditType === creditTypes.NONE ? "" : <Offer />}
            </div>
          </div>
          {currentCreditType !== creditTypes.NONE && isRequestOpened ? (
            <StepThree />
          ) : (
            ""
          )}
        </div>
      </section>
    </React.Fragment>
  );
}

interface ICalculatorProps {
  currentCreditType: CreditTypesType;
  isRequestOpened: boolean;
  onTabButtonClick: (type: TabTypesType) => void;
}

const mapStateToProps = (state: IState) => ({
  currentCreditType: getCurrentCreditType(state),
  isRequestOpened: getRequestStatus(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onTabButtonClick(type: TabTypesType) {
    dispatch(ActionCreator.setTabType(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Calculator);
