import React, {Component} from 'react';
import SideBar from './SideBar.js'
import './index.css';

class Map extends Component {
	state ={
        places: [
            {title: "Our Lady of Lourdes",
             detail: "This small statue was built as a vote thanks to God. In 1890, a startled horse fell into a water well. Fortunately, the horse was saved and nobody was hurt.",
             location:{
                lat: 49.149017, 
                lng: 17.570997},
             visible: true,
             term: "Our_Lady_of_Lourdes"
        
            },
            
            {title: "Our Lady of Sorrows",
             detail: "The statue was built in 1917. It was funded by very religious married couple that was childless.",
             location:{
                lat: 49.149532,
                lng: 17.570430},
             visible: true,
             term: "Our_Lady_of_Sorrows"
        
            },
            
            {title: "Cholera cross",
             detail: "Cross reminding victims of Cholera epidemies, that appeared in 1836 and 1866.",
             location:{
                lat: 49.150146,
                lng: 17.569632},
             visible: true,
             term: "Cholera"
        
            },
            
            {title: "Isidor Mlynek's cross",
             detail: "This cross from 1886 reminds young man, Isidor Mlynek, who tragically died in 1885 aged 18 years.",
             location:{
                lat: 49.150907,
                lng: 17.568888},
             visible: true,
             term: " "
            },

            {title: "Church of St. Anthony of Padua",
             detail: "Church was built and consecrated in 1940.",
             location:{
                lat: 49.152767,
                lng: 17.569109},
             visible: true,
             term: "Anthony_of_Padua"
            }
        ],

		map: {},
		infoWindow: {},
        markers: [],
        query: ''
	}


    componentDidMount() {
        this.loadMap();
    }


    loadMap() { 
     
            const map = new window.google.maps.Map(document.getElementById('map'), {
                center: {lat: 49.150907, lng: 17.568888},
                zoom: 16,
            });


            const infoWindow = new window.google.maps.InfoWindow({
                content: 'content'
            });

            this.setState({map, infoWindow});
            this.createMarkers(map);  
    }
 

    createMarkers(map) {
        let markers = this.state.places.filter(place => place.visible).map(place => {
            const marker = new window.google.maps.Marker({
                position: {lat: place.location.lat, lng: place.location.lng},
                map,
                title: place.title,
                search: place.term,
                detail: place.detail  
            });

            marker.addListener('click', () => {
                let listItem = document.getElementById(marker.title);
                listItem.click();
                listItem.classList.add('focus');
                 
            });

            marker.addListener('focus', ()=> {
                let listItem = document.getElementById(marker.title);
                listItem.classList.add('hover-focus');
            });

            marker.addListener('mouseover', function() {
                let listItem = document.getElementById(marker.title);
                 listItem.classList.add('hover-focus');
                this.setAnimation(window.google.maps.Animation.BOUNCE);
                setTimeout(() => this.setAnimation(null), 400)
            });

            marker.addListener('mouseout', function() {
               let listItem = document.getElementById(marker.title);
                 listItem.classList.remove('hover-focus');
                this.setAnimation(null)
            });

            marker.addListener('blur', function() {
               let listItem = document.getElementById(marker.title);
                 listItem.classList.remove('hover-focus');
                this.setAnimation(null)
            });
            
            return marker;
        });
        this.setState({markers})
    }


     //function to filter places based on their names
    filter = (query) => {
        const map = this.state.map;
        const markers = this.state.markers;
        //clear map
        markers.forEach(marker => marker.setMap(null))

        this.state.places.map((place) => {
            if ((place.title.toLowerCase().search(query.toLowerCase())!==-1) || (query === '')) {
                place.visible = true
            } else {
                place.visible = false
            }
            return place
        });

        this.setState({query});
        this.createMarkers(map)

    };

        

render () {
    const {query, map, infoWindow, markers} = this.state;
    const {places} = this.props;

	return (
		<div className='container' role='main'>
                 <SideBar query={query} 
                        places={places} 
                        markers={markers} 
                        map={map}
                        infoWindow={infoWindow} 
                        filter={this.filter}
                         />

                <div className='map-container'>
                    <div id='map'
                        role='application'/>
                </div>
            </div>
		)
	}
}

export default Map