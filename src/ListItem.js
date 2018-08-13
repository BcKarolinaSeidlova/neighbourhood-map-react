import React, {Component} from 'react';
import './index.css';


class ListItem extends Component {
    state = {
        result: ""
    }

componentDidMount() {
      if (this.props.search === " ") {this.setState({result: 'Sorry, there are no facts for this place'})}
    else {
    fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${this.props.search}&exintro=1`)
       .then((resp) => resp.json())
       .then((resp) => { 
this.setState(
    {result: resp.query.pages[Object.keys(resp.query.pages)[0]].extract.substr(0, 500)})
})}

}


    openMarker = () => {
        console.log(this.state.result);
        const {map, infoWindow, marker} = this.props;
        map.panTo(marker.getPosition());
        infoWindow.setContent(
            `<div tabIndex="1" name=${ marker.title }>
                 <h3>${marker.title}</h3>
                <p> ${this.state.result}... </p>
                <a href='https://en.wikipedia.org/wiki/${this.props.search}' target='_blank'> More info </a>
            </div>`
        );
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
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

export default ListItem;