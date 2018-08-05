import React, {Component} from 'react';
import './index.css';


class Marker extends Component {

    openMarker = () => {
        const {tips, map, infoWindow, marker} = this.props;
        map.panTo(marker.getPosition());
        infoWindow.setContent(
            `<div tabIndex="1" name=${ marker.title }>
                <p>${marker.title}</p>
            </div>`
        );
        marker.setAnimation(window.google.maps.Animation.DROP);
        setTimeout(() => {
            marker.setAnimation(null)
        }, 800)
        infoWindow.open(map, marker)

    }

    render() {
        const {marker} = this.props;

        return (
            <li className="nav-item" tabIndex="2" onClick={this.openMarker}>
                <p>{marker.title}</p>
            </li>

        )
    }
}

export default Marker;