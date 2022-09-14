import { Component } from 'react';
import { withParamsAndNavigate } from '../../hoc/withParamsAndNavigate';
class Specialist extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        console.log(this.props);
        return <h1>hi</h1>;
    }
}

export default withParamsAndNavigate(Specialist);
