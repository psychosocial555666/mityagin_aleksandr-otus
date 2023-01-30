import React from "react";
import {connect} from "react-redux";
import {creditTypes} from "../../const";
import {getCreditSelectStatus, getCurrentCreditType} from "../../reducer/ui/selectors";
import {ActionCreator} from "../../reducer/ui/ui.js";
import PropTypes from 'prop-types';

function StepOne(props) {
  const {isCreditTypeSelectOpened, currentCreditType, onOptionClick, onSelectClick} = props;

  let selectText;

  switch (currentCreditType) {
    case creditTypes.NONE:
      selectText = 'Выберите цель кредита';
      break;
    case creditTypes.MORTGAGE:
      selectText = 'Ипотечное кредитование';
      break;
    case creditTypes.AUTO:
      selectText = 'Автомобильное кредитование';
      break;
  
    default:
      break;
  }

  return (
    <React.Fragment>
      <div className="calculator__step step-one">
        <h3>Шаг 1. Цель кредита</h3>
        <div className={isCreditTypeSelectOpened ? "step-one__control step-one__control--opened" : "step-one__control"}>
          <button className="step-one__select" 
          onClick={() => {onSelectClick(isCreditTypeSelectOpened)}} 
          >{selectText}</button>
          <div className="step-one__options">
            <button className="step-one__option" 
            onClick={() => {
                onOptionClick(creditTypes.MORTGAGE);
                onSelectClick(isCreditTypeSelectOpened);
              }}
            >Ипотечное кредитование</button>
            <button className="step-one__option" 
            onClick={() => {
              onOptionClick(creditTypes.AUTO);
              onSelectClick(isCreditTypeSelectOpened);
              }
            }
              >Автомобильное кредитование</button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};


StepOne.propTypes = {
  isCreditTypeSelectOpened: PropTypes.bool,
  currentCreditType: PropTypes.string,
  onSelectClick: PropTypes.func,
  onOptionClick: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isCreditTypeSelectOpened: getCreditSelectStatus(state),
  currentCreditType: getCurrentCreditType(state),
});

const mapDispatchToProps = (dispatch) => ({
  onSelectClick(status) {
    dispatch(ActionCreator.changeCreditSelectStatus(status));
  },
  onOptionClick(type) {
    dispatch(ActionCreator.setCreditType(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(StepOne);