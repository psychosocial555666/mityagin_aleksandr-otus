import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import marker from "../../../img/location.svg";
import {pinCoords, SCREEN_LATITUDE, SCREEN_LONGITUDE} from "../../const.js";

const AnyReactComponent = ({ source }) => <div className="map__pin"><img src={source} alt="marker"/></div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: SCREEN_LATITUDE,
      lng: SCREEN_LONGITUDE,
    },
    zoom: 5,
  };

  render() {
    return (
      <section className="map" id="map">
        <h2>Отделения Лига Банка</h2>
        <div className="map__wrapper">
          <GoogleMapReact
            bootstrapURLKeys={{ key: "AIzaSyB-IcjyxAAjS1MXEKNDQgvTGo32JiW65P0"}}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >

            {pinCoords.map((item, i) => {
              return(
                <AnyReactComponent 
                  key={i}
                  lat={item.lat}
                  lng={item.lng}
                  source={marker}
                />
              )
            })}
            
          </GoogleMapReact>
        </div>
      </section>
    );
  }
};

export default Map;