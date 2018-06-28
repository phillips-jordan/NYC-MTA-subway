import React, { Component } from "react";
import MapGL, { Marker, Popup } from "react-map-gl";
import "../App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Pin from "./pin.js";

const TOKEN =
  "pk.eyJ1IjoiZWxmd29ybGQxIiwiYSI6ImNqaXhobzc5ZjBhOTQzdXA0bWxvNzhwZWkifQ.CeAvYQgbjChSNbnX3N7CgA";

let viewWid = Math.max(window.innerWidth || 0);
let viewHei = Math.max(window.innerHeight || 0);

class Map extends Component {
  constructor() {
    super();
    this.state = {
      viewport: {
        width: viewWid,
        height: viewHei,
        latitude: 40.7527,
        longitude: -73.9772,
        zoom: 12
      },
      popupInfo: null
    };
  }

  //render the popup at the pin location when the popinfo is populated in the state

  renderPopup = () => {
    return (
      this.state.popupInfo && (
        <div className="popupContainer">
          <Popup
            className="popupContent"
            tipSize={5}
            anchor="bottom-right"
            longitude={this.state.popupInfo.loc[0]}
            latitude={this.state.popupInfo.loc[1]}
            onClose={() => this.setState({ popupInfo: null })}
            closeOnClick={true}
          >
            <div className="popupText">{this.state.popupInfo.stop_name}</div>
          </Popup>
        </div>
      )
    );
  };

  //get popup info by id and update popupinfo in the state when a user clicks on a pin

  updatePopupInfo = e => {
    fetch("/getStop/" + e.target.parentNode.id, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => {
        this.setState({ popupInfo: res });
      })
      .catch(err => {
        console.log(err);
      });
  };

  //renders all stop markers when the map component renders

  renderMarkers = (stop, i) => {
    return (
      <Marker
        key={i}
        longitude={stop.loc[0]}
        latitude={stop.loc[1]}
        offsetTop={0}
        offsetLeft={0}
      >
        <span onClick={this.updatePopupInfo}>
          <Pin id={stop.stop_id} />
        </span>
      </Marker>
    );
  };
  
  //scales map size to window size

  adjustView = () => {
    let newViewWid = Math.max(window.innerWidth || 0);
    let newViewHei = Math.max(window.innerHeight || 0);
    this.setState({
      viewport: {
        height: newViewHei,
        width: newViewWid,
        latitude: this.state.viewport.latitude,
        longitude: this.state.viewport.longitude,
        zoom: this.state.viewport.zoom
      }
    });
  };

  //checks if window size changes to adjust viewport

  componentDidMount = () => {
    window.addEventListener("resize", this.adjustView);
  };

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={viewport => {
          this.setState({ viewport });
        }}
      >
        {this.renderPopup()}
        {this.props.stops.map(this.renderMarkers)}
      </MapGL>
    );
  }
}

export default Map;
