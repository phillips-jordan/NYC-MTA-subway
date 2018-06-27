import React, { Component } from 'react';
import Map from './components/map.js';
import { ScaleLoader } from 'react-spinners';
import './App.css';


class App extends Component {
  constructor(){
    super();
    this.state={
      loading: true,
      stops: []
    }
  }
  componentDidMount = () =>{
    fetch('/getAllStops',{
      method: 'GET'
    })
    .then(res=>res.json())
    .then(res=>{
      console.log(res)
      this.setState({stops:res, loading: false})
    })
    .catch(err=>console.log(err))
  }
  render() {
    return (
      <div>
        {this.state.loading?
        <ScaleLoader
          color='#828282'
          loading={this.state.loading}
        />
        :
        <Map
        stops={this.state.stops}
        />
        }
      </div>
    );
  }
}

export default App;
