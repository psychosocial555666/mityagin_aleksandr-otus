import Header from "../header/header";
import Slider from "../slider/slider";
import Services from "../services/services";
import Map from "../map/map";
import Modal from "../modal/modal";
import { connect } from "react-redux";
import { getModalType } from "../../reducer/ui/selectors";
import Footer from "../footer/footer";
import Calculator from "../calculator/calculator";
import { ModalType } from "../../const";
import { IState, ModalTypesType } from "../../types";

interface AppProps {
  modalType: ModalTypesType;
}

function App(props: AppProps) {
  const { modalType } = props;

  return (
    <div className="app">
      {modalType !== ModalType.NONE ? <Modal /> : ""}
      <Header />
      <main>
        <Slider />
        <Services />
        <Calculator />
        <div className="container">
          <Map />
        </div>
      </main>
      <Footer />
    </div>
  );
}

const mapStateToProps = (state: IState) => ({
  modalType: getModalType(state),
});

export default connect(mapStateToProps, null)(App);
