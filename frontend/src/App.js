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
      this.setState({stops:res, loading: false})
    })
    .catch(err=>console.log(err))
  }
  render() {
    return <div>
        {this.state.loading ? (
          <div className='loader'><ScaleLoader
            height={100} width={4} margin='5px'
            color="#5998ff"
            loading={this.state.loading}
          /></div>
        ) : (
          <Map stops={this.state.stops} />
        )}
      </div>;
  }
}

export default App;
