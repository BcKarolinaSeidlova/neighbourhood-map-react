import React, {Component} from 'react';
import ListItem from './ListItem';
import './index.css'
class Search extends Component {

    search = (event) =>{
        let query = event.target.value;
        this.props.filter(query);
        let places = this.props.places
        this.setState({places});
      
    };



    render() {
        const {map,infoWindow,markers} = this.props;
        return (
            <div className='side-nav-container'>
                <div className="side-nav">
                   <input type="text"
                         placeholder="Search by place name"
                         onChange={this.search}
                  />

                    <ul className="location-list">
                        {      markers.map(marker => (
                                <ListItem  map={map} marker={marker} key={marker.title} infoWindow={infoWindow} 
                                search={marker.search}/>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    };
}


export default Search;