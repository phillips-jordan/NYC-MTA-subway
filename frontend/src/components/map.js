import React, { Component } from "react";
import MapGL, { NavigationControl } from "react-map-gl";
import "../App.css";
import "mapbox-gl/dist/mapbox-gl.css";

const TOKEN =
  "pk.eyJ1IjoiZWxmd29ybGQxIiwiYSI6ImNqaXhobzc5ZjBhOTQzdXA0bWxvNzhwZWkifQ.CeAvYQgbjChSNbnX3N7CgA";

class Map extends Component {
  state = {
    viewport: {
      width: Math.max(
        document.documentElement.clientWidth,
        window.innerWidth || 0
      ),
      height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0),
      latitude: 40.7306,
      longitude: -73.9352,
      zoom: 11
    }
  };

  render() {
    return (
      <MapGL
        {...this.state.viewport}
        mapStyle="mapbox://styles/mapbox/dark-v9"
        mapboxApiAccessToken={TOKEN}
        onViewportChange={viewport => this.setState({ viewport })}
      />
    );
  }
}

export default Map;
