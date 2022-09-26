import React, { Component } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class SpecialistItem extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    render() {
        console.log(this.props.doctor);
        const image = this.props.doctor.managerData ? this.props.doctor.managerData.image : '';
        const description = this.props.doctor.managerData ? this.props.doctor.managerData.markdownData.description : '';
        const position = this.props.doctor.managerData ? this.props.doctor.managerData.position : '';
        const fullname = this.props.doctor.managerData
            ? `${this.props.doctor.lastName} ${this.props.doctor.firstName}`
            : '';
        const regions = this.props.doctor.managerData ? this.props.doctor.managerData.regions : '';
        const addressClinic = this.props.doctor.managerData ? this.props.doctor.managerData.addressClinic : '';
        const price = this.props.doctor.managerData ? this.props.doctor.managerData.price : '';
        return (
            <Container className="mt-4" fluid="xl" style={{ backgroundColor: 'white' }}>
                <Row className="justify-content-md-center">
                    <Col md={2} style={{ border: '1px solid black' }}>
                        <div
                            style={{
                                width: '70px',
                                height: '70px',
                                borderRadius: '50%',
                                backgroundImage: `url(${image})`,
                                backgroundSize: 'contain',
                            }}
                        ></div>
                    </Col>
                    <Col md={5} style={{ border: '1px solid black' }}>
                        <h5 style={{ color: '#0eab42' }}>
                            {position} {fullname}
                        </h5>
                        <p>{description}</p>
                        <span>
                            <FontAwesomeIcon icon="fa-solid fa-location-dot" /> {regions}
                        </span>
                    </Col>
                    <Col md={5} style={{ border: '1px solid black' }}>
                        hihi
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SpecialistItem;
