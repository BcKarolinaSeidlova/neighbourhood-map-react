import React, {Component} from 'react';
import ListItem from './ListItem';
import './index.css'
class SideBar extends Component {

    search = (event) =>{
        let query = event.target.value;
        this.props.filter(query);
        let places = this.props.places
        this.setState({places});
      
    };

    render() {
        const {map, infoWindow, markers} = this.props;
        return (
            <div className='side-nav-container'>
                <div className='side-nav'>
                   <input className='search' 
                            type='text'
                            role='search'
                            label='Search by place name'
                            aria-label='Search form'
                            placeholder='Search by place name'
                            onChange={this.search}

                  />

                    <ul className='location-list'  
                    aria-label='List of places'
                    > 
                        {markers.map(marker => (
                                <ListItem  
                                map={map} 
                                marker={marker} 
                                key={marker.title} 
                                infoWindow={infoWindow}
                                />
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    };
}


export default SideBar;