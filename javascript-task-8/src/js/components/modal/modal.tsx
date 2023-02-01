import React from "react";
import { connect } from "react-redux";
import { ActionCreator } from "../../reducer/ui/ui";
import { ESC_KEY, ModalType } from "../../const";
import { getModalType } from "../../reducer/ui/selectors";
import LoginForm from "../login-form/login-form";
import Success from "../success/success";
import { Dispatch } from "redux";
import { IState, ModalTypesType } from "../../types";

class Modal extends React.PureComponent<IModalProps> {
  constructor(props: IModalProps) {
    super(props);

    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._overlayClickHandler = this._overlayClickHandler.bind(this);
    this._isEscKeyPressed = this._isEscKeyPressed.bind(this);
  }

  _closeButtonClickHandler() {
    this.props.popupClose(ModalType.NONE as ModalTypesType);
  }

  _overlayClickHandler(evt: React.MouseEvent<HTMLDivElement>) {
    if (evt.currentTarget.className === "modal__overlay") {
      this.props.popupClose(ModalType.NONE as ModalTypesType);
    }
  }

  _isEscKeyPressed(evt: KeyboardEvent) {
    if (evt.keyCode === ESC_KEY) {
      this.props.popupClose(ModalType.NONE as ModalTypesType);
    }
  }

  componentDidMount() {
    window.addEventListener("keydown", this._isEscKeyPressed);
    document.querySelector("body")?.classList.add("overlay");
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this._isEscKeyPressed);
    document.querySelector("body")?.classList.remove("overlay");
  }

  render() {
    return (
      <React.Fragment>
        <section className="modal">
          <div className="modal__overlay" onClick={this._overlayClickHandler}>
            {this.props.modalType === ModalType.LOGIN ? (
              <LoginForm
                closeButtonClickHandler={this._closeButtonClickHandler}
              />
            ) : (
              <Success
                closeButtonClickHandler={this._closeButtonClickHandler}
              />
            )}
          </div>
        </section>
      </React.Fragment>
    );
  }
}

interface IModalProps {
  modalType: ModalTypesType;
  popupClose: (type: ModalTypesType) => void;
}

const mapStateToProps = (state: IState) => ({
  modalType: getModalType(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  popupClose(type: ModalTypesType) {
    dispatch(ActionCreator.changeModalType(type));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
