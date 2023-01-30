import React from "react";
import close from "../../../img/close.svg";
import PropTypes from 'prop-types';

function Success(props) {
  const {closeButtonClickHandler} = props;

  return (
    <React.Fragment>
      <div className="modal__popup success">
        <h3>Спасибо за обращение в наш банк.</h3>
        <p>Наш менеджер скоро свяжется с вами <br className="desktop-only"/> <br className="tablet-only"/>
          по указанному номеру телефона.</p>
        <button type="button" className="success__close" tabIndex="2" onClick={() => {closeButtonClickHandler(false)}}>
          <img src={close} alt="close"/>
        </button>
      </div>
    </React.Fragment>
  );
};

Success.propTypes = {
  closeButtonClickHandler: PropTypes.func,
};

export default Success;