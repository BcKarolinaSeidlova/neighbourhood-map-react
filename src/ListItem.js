import React, {Component} from 'react';
import './index.css';


class ListItem extends Component {
    state = {
        result: '',
        link: ''
    }

    componentDidMount() {
     const {marker} = this.props;
     if (marker.search === ' ') {
            this.setState({result: 'Sorry, there are no facts for this place in Wikipedia'})
     }
      else {
          fetch(`https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=extracts&titles=${marker.search}&exintro=1`)
             .then((resp) => resp.json())
             .then((resp) => {
    
                this.setState({
                 result: resp.query.pages[Object.keys(resp.query.pages)[0]].extract.substr(0, 500)
                });

                 this.setState({
                 link: `<a href='https://en.wikipedia.org/wiki/${marker.search}' target="_blank"> More info </a>`
             });
            })
     }
    }


    openMarker = () => {     
    const {map, infoWindow, marker} = this.props;
     
    map.panTo(marker.getPosition());
     infoWindow.setContent(
                `<div class="infoWindow" tabIndex="0" name=${ marker.title }>
                     <h2>${marker.title}</h2>
                     <p>${marker.detail}</p>
                     <h4 class="wikipedia"> What Wikipedia says? </h4>
                 <p class="wikipedia">${this.state.result}... <span>${this.state.link}</span></p>
             </div>`
        );

        marker.setAnimation(window.google.maps.Animation.BOUNCE);
        infoWindow.open(map, marker)
        

        let listItems = document.getElementsByClassName('list-item');
        for (let item of listItems) {if (item.id!=marker.title) {item.classList.remove('focus')}}

        let listItem = document.getElementById(marker.title);
        listItem.classList.add('focus');
    }

    mouseOver = () => {
        const {marker}= this.props;
        marker.setAnimation(window.google.maps.Animation.BOUNCE);
}


    mouseOut = () => {
        const {marker}= this.props;
        marker.setAnimation(null);
    }

    default = () => {
        const {infoWindow} = this.props;
        
        let listItems = document.getElementsByClassName('list-item');
        for (let item of listItems) {if (infoWindow.anchor.visible==false) {item.classList.remove('focus')}}
    }


    render() {this.default;
        const {marker} = this.props;

        return (
            <li id={marker.title} 
                className='list-item'
                tabIndex='0' 
                onClick={this.openMarker} 
                onMouseOver={this.mouseOver} 
                onMouseOut={this.mouseOut} 
                onFocus={this.mouseOver} 
                onBlur={this.mouseOut}
                onKeyPress={this.openMarker}
               >
                <p>{marker.title}</p>
            </li>

        )
    }
}

export default ListItem;