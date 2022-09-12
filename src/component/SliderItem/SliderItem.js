import React from 'react';
import './SliderItem.scss';

class SldierItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="slider-item">
                <img className="slider-img" src={this.props.img}></img>
                <span className="slider-title">{this.props.title}</span>
            </div>
        );
    }
}

export default SldierItem;
