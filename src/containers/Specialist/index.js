import { Component } from 'react';
import { withParamsAndNavigate } from '../../hoc/withParamsAndNavigate';
import SpecialistItem from '../../component/SpecialistItem';
class Specialist extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        return (
            <>
                <div className="content"></div>
                <SpecialistItem />
            </>
        );
    }
}

export default withParamsAndNavigate(Specialist);
