import React, {Component} from 'react';
import './index.css';


class ListItem extends Component {
    state = {
        result: "",
        link: ""
    }

componentDidMount() {
    const {marker} = this.props;
      if (marker.search === " ") {this.setState({result: 'Sorry, there are no facts for this place in Wikipedia'})}
    else {
    fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${marker.search}&exintro=1`)
       .then((resp) => resp.json())
       .then((resp) => { console.log(marker.search)
this.setState(
    {result: resp.query.pages[Object.keys(resp.query.pages)[0]].extract.substr(0, 500)});
this.setState({link: `<a href='https://en.wikipedia.org/wiki/${marker.search}' target="_blank"> More info </a>`})
})


   }
   console.log(this.state.link);

}


    openMarker = () => {
        console.log(this.state.link);
        const {map, infoWindow, marker} = this.props;
        map.panTo(marker.getPosition());
        infoWindow.setContent(
            `<div class="infoWindow" tabIndex="1" name=${ marker.title }>
                 <h2>${marker.title}</h2>
                 <p>${marker.detail}</p>
                 <h4 class="wikipedia"> What Wikipedia says? </h4>
                <p class="wikipedia">${this.state.result}... <span>${this.state.link}</span></p>
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
            <li id={marker.title} className="nav-item" tabIndex="2" onClick={this.openMarker}>
                <p>{marker.title}</p>
            </li>

        )
    }
}

export default ListItem;