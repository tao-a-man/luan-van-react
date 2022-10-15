import React, { Component } from 'react';
import { withParamsAndNavigate } from '../../hoc/withParamsAndNavigate';
import { Container, Col, Row } from 'react-bootstrap';
import SpecialistItem from '../SpecialistItem';
class DetailDoctor extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        const dataDoctor = this.props.location.state.data;
        return (
            <Container style={{ marginTop: '70px', backgroundColor: 'rgb(255,255,255)', borderRadius: '12px' }}>
                <SpecialistItem doctor={dataDoctor}></SpecialistItem>
                <div
                    className="mt-4"
                    dangerouslySetInnerHTML={{ __html: dataDoctor.managerData.markdownData.contentHTML }}
                ></div>
            </Container>
        );
    }
}

export default withParamsAndNavigate(DetailDoctor);
