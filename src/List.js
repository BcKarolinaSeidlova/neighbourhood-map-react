import React, {Component} from 'react';
import Marker from './Marker';
import './index.css'
class List extends Component {

    updateQuery = (event) =>{
        let query = event.target.value;
        this.props.filter(query);
        let places = this.props.places
        this.setState({places});
      
    };



    render() {
        const {map,infoWindow,markers,query} = this.props;
        return (
            <div className='side-nav-container'>
                <div className="side-nav">
                   <input type="text"
                         placeholder="Search by place name"
                         onChange={this.updateQuery}
                  />

                    <ul className="location-list">
                        {      markers.map(marker => (
                                <Marker  map={map} marker={marker} key={marker.title} infoWindow={infoWindow} />
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    };
}


export default List;