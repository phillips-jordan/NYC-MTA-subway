import React, { Component } from "react";
import "../App.css";

class Pin extends Component {
  render() {
    return (
      <div id={this.props.id}>
        <img style={{'zIndex':-1}}src="pin.png" height="18vh" alt="blue pin"/>
      </div>
    );
  }
}

export default Pin;
