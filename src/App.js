import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map.js';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
      <div> <h1> Neighbourhood map</h1> </div>
      
      <Map google={this.props.google}/>
        
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBMKPk8zWVp5IWwNe3TmrqEo200GRzCHag')
})(App)
