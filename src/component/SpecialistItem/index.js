import React, { Component } from 'react';

class SpecialistItem extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        return <h1>{this.props.id}</h1>;
    }
}

export default SpecialistItem;
