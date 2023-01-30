import React from "react";
import ServiceSlider from "../service-slider/service-slider";
import Tabs from "../tabs/tabs";

class Services extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      screen: "desktop",
    };

    this._onSizeCheck = this._onSizeCheck.bind(this);
  }

  componentDidMount() {
    this._onSizeCheck();
    window.addEventListener('resize', this._onSizeCheck);
  }

  _onSizeCheck() {
    let size = window.innerWidth;
    size > 1023 ? this.setState(
      {
        screen: "desktop",
      }
    ) : this.setState(
      {
        screen: "mobile",
      }
    )
  }

  render() {
      if (this.state.screen === 'desktop') {
        return (
          <div className="container">
            <Tabs />
          </div>
        );
      } else {
        return (
          <div className="container">
            <ServiceSlider />
          </div>
        );
      }
  }
}

export default Services;