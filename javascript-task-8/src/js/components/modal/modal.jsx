import React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/ui/ui.js";
import {ESC_KEY, ModalType} from "../../const";
import {getModalType} from "../../reducer/ui/selectors";
import PropTypes from 'prop-types';
import LoginForm from "../login-form/login-form.jsx";
import Success from "../success/success.jsx";

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);

    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._overlayClickHandler = this._overlayClickHandler.bind(this);
    this._isEscKeyPressed = this._isEscKeyPressed.bind(this);
  }

  _closeButtonClickHandler () {
    this.props.popupClose(ModalType.NONE);
  }

  _overlayClickHandler (evt) {
    if (evt.target.matches('.modal__overlay')) {
      this.props.popupClose(ModalType.NONE);
    }
  }

  _isEscKeyPressed (evt) {
    if (evt.keyCode === ESC_KEY) {
      this.props.popupClose(ModalType.NONE);
    }
  }

  componentDidMount () {
    window.addEventListener("keydown", this._isEscKeyPressed);
    document.querySelector('body').classList.add('overlay');
  }

  componentWillUnmount () {
    window.removeEventListener("keydown", this._isEscKeyPressed);
    document.querySelector('body').classList.remove('overlay');
  };

  render() {
    return(
      <React.Fragment>
        <section className="modal">
          <div className="modal__overlay" onClick={this._overlayClickHandler}>
            {this.props.modalType === ModalType.LOGIN ?
            <LoginForm closeButtonClickHandler={this._closeButtonClickHandler}/> :
            <Success closeButtonClickHandler={this._closeButtonClickHandler}/>
          }
            
          </div>
        </section>
      </React.Fragment>
    )
  };
};

Modal.propTypes = {
  modalType: PropTypes.string,
  popupClose: PropTypes.func,
};

const mapStateToProps = (state) => ({
  modalType: getModalType(state),
});

const mapDispatchToProps = (dispatch) => ({
  popupClose(type) {
    dispatch(ActionCreator.changeModalType(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);