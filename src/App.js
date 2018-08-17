import React, { Component } from 'react';
import { GoogleApiWrapper } from 'google-maps-react';
import Map from './Map.js';
import './App.css';

class App extends Component {


  render() {
  	const {loaded}=this.props;
  	
    return (
      <div className='App'>
      <div className='header'> <h1> My Neighbourhood Map App</h1> </div>
      
     { loaded ? (
     	<Map google={this.props.google}/>
     	) : (
     		<div className='error-loading'>
                <p className='error-msg'>Couldn't load the app</p>
            </div>
     	)
	}
        
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBMKPk8zWVp5IWwNe3TmrqEo200GRzCHag')
})(App)