import React, {Component} from 'react';
import List from './List.js'
import './index.css';

class Map extends Component {
	state ={
		map: {},
		places: [
			{title: "Our Lady of Lourdes",
		        location:{
		        lat: 49.149017, 
		        lng: 17.570997},
		        visible: true
		    
		      },
		    
		    {title: "Our Lady of Seventh pains",
		        location:{
		        lat: 49.149532,
		        lng: 17.570430},
		        visible: true
		    
		      },
		    
		    {title: "Cholera cross",
		        location:{
		        lat: 49.150146,
		        lng: 17.569632},
		        visible: true
		    
		      },
		    
		    {title: "Isidor Mlynek's cross",
		        location:{
		        lat: 49.150907,
		        lng: 17.568888},
		        visible: true

		  },

		  	{title: "Church of St. Anthony of Padua",
		    	location:{
		    	lat: 49.152767,
		    	lng: 17.569109},
		    	visible: true

		  }
		],

		infoWindow: {},
        markers: [],
        query: '',

	}


	 //function to filter places based on their names
    filter = (query) => {
        const map = this.state.map;
        const markers = this.state.markers;
        //clear map
        markers.forEach(marker => marker.setMap(null))

        const selectLocations = this.state.places.map((place) => {
            if ((place.title.toLowerCase().search(query.toLowerCase())!=-1) || (query === '')) {
                place.visible = true
            } else {
                place.visible = false
            }
            return place
        });

        this.setState({selectLocations, query});
        this.setMarkers(map)

    };


    componentDidMount() {
        this.loadMap(); // call loadMap function to load the google map
        console.log(this.loadMap);
       
    }

    setMarkers(map) {

        let markers = this.state.places.filter(place => place.visible).map(place => {
            const marker = new window.google.maps.Marker({
                position: {lat: place.location.lat, lng: place.location.lng},
                map,
                title: place.title
            });

            marker.addListener('click', () => {
                this.state.map.panTo(marker.getPosition());
                this.state.infoWindow.setContent(`
                    <div tabIndex="1" name=${marker.title}>
                        <p>${marker.title}</p>
                    </div>`);
                this.state.infoWindow.open(map, marker)
            });

            marker.addListener('mouseover', function() {
                this.setAnimation(window.google.maps.Animation.BOUNCE);
                setTimeout(() => this.setAnimation(null), 400)
            });

            marker.addListener('mouseout', function() {
                this.setAnimation(null)
            });

            return marker;
        });
        this.setState({markers})
    }

    loadMap() {
     
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: {lat: 49.150146, lng: 17.569632},
                zoom: 15,
            });

            const infoWindow = new window.google.maps.InfoWindow({
                content: 'content'
            });
            this.setState({map, infoWindow});
            this.setMarkers(map);
        
    }

render () {
    const {query, places, map, infoWindow, markers} = this.state;
     const style = window.innerWidth >= 900 ? 
     {      width: '80vw',
            height: '90vh'} : {width: '100vw', height: '75vh'}
console.log(style)
	return (
		<div className="container" role="main">
                 <List query={query} 
                        places={places} 
                        markers={markers} 
                        map={map}
                        infoWindow={infoWindow} 
                        filter={this.filter}
                         />

                <div className="map-container">
                    <div id="map" 
                        aria-hidden="true" 
                        style={style} 
                        role="application"/>
                </div>
            </div>
		)
	}
}

export default Map