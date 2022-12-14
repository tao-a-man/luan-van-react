import React, { Component } from 'react';
import { Row, Container, Col, InputGroup, Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import swal from 'sweetalert';

import { withParamsAndNavigate } from '../../hoc/withParamsAndNavigate';
import appService from '../../services/appService';

class BookingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addressClinic: '',
            date: '',
            doctorId: '',
            fullname: '',
            id: '',
            image: '',
            isBooking: '',
            isDoing: '',
            position: '',
            price: '',
            valueVi: '',
            timeType: '',
            infoPatient: {
                fullName: '',
                gender: '',
                phoneNumberPatient: '',
                birthDate: '',
                addressPatient: '',
                description: '',
            },
        };
    }
    componentDidMount() {
        this.getData();
    }
    getData = () => {
        const location = this.props.location ? this.props.location : '';
        delete location.state.data.createdAt;
        delete location.state.data.updatedAt;
        this.setState({
            ...this.state,
            ...location.state.data,
        });
    };
    handleChangeInput = (e) => {
        this.setState({
            ...this.state,
            infoPatient: { ...this.state.infoPatient, [e.target.name]: e.target.value },
        });
    };
    handleValidateForm = () => {
        for (let key in this.state.infoPatient) {
            if (!this.state.infoPatient[key]) {
                return { type: false, errMessage: 'All fields must be not null' };
            }
        }
        return { type: true };
    };
    handleCreateBooking = async (dateTime) => {
        const validate = this.handleValidateForm();
        if (validate.type) {
            const respon = await appService.postCreateBooking(
                {
                    doctorId: this.state.doctorId,
                    status: '?????t th??nh c??ng',
                    date: dateTime,
                    scheduleId: this.state.id,
                    ...this.state.infoPatient,
                    email: this.props.email,
                },
                this.props.token,
            );
            if (respon.errCode === 0) {
                swal({
                    title: respon.errMessage,
                    icon: 'success',
                });
                this.props.navigate('/SchedulePatient');
            } else {
                swal({
                    title: 'Error',
                    text: respon.errMessage.errors[0].message,
                    icon: 'error',
                });
            }
        } else {
            swal({
                title: 'Error',
                text: validate.errMessage,
                icon: 'error',
            });
        }
    };
    render() {
        const dayVi = ['Ch??? Nh???t', 'Th??? 2', 'Th??? 3', 'Th??? 4', 'Th??? 5', 'Th??? 6', 'Th??? 7'];
        const dateTime = `${this.state.valueVi}--${dayVi[new Date(this.state.date).getDay()]}--${new Date(
            this.state.date,
        ).toLocaleDateString('vi')}`;
        return (
            <>
                {this.props.token ? '' : <Navigate to="/Login" />}
                <Container
                    className="mt-4"
                    fluid="xl"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '20px' }}
                >
                    <Row
                        className="justify-content-md-center"
                        style={{
                            marginTop: '70px',
                        }}
                    >
                        <Col md={4}>
                            <div
                                style={{
                                    width: '110px',
                                    height: '110px',
                                    borderRadius: '50%',
                                    backgroundImage: `url(${this.state.image})`,
                                    backgroundSize: 'contain',
                                }}
                                className="float-end"
                            ></div>
                        </Col>
                        <Col md={8}>
                            <h6 style={{ color: '#888' }}>?????t l???ch kh??m</h6>
                            <h5 style={{ color: 'blue' }}>
                                {this.state.position} {this.state.fullname}
                            </h5>
                            <h7 style={{ color: '#666' }}>
                                Th???i gian:&nbsp;
                                {dateTime}
                            </h7>
                            <br></br>
                            <h7 style={{ color: '#666' }}>T???i: {this.state.addressClinic}</h7>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mt-3">
                        <Col md={7}>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>H??? T??n:</InputGroup.Text>
                                <Form.Control
                                    name="fullName"
                                    value={this.state.infoPatient.fullName}
                                    onChange={(e) => this.handleChangeInput(e)}
                                    placeholder="H??? t??n b???nh nh??n"
                                />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>Gi???i t??nh</InputGroup.Text>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="gender"
                                    onChange={(e) => this.handleChangeInput(e)}
                                >
                                    <option hidden>Ch???n gi???i t??nh</option>
                                    <option value="M">Nam</option>
                                    <option value="F">N???</option>
                                    <option value="O">Kh??c</option>
                                </Form.Select>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>S??? ??i???n tho???i:</InputGroup.Text>
                                <Form.Control
                                    name="phoneNumberPatient"
                                    value={this.state.infoPatient.phoneNumberPatient}
                                    onChange={(e) => this.handleChangeInput(e)}
                                    type="number"
                                    placeholder="Vui l??ng ??i???n s??? ??i???n tho???i"
                                />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>N??m sinh:</InputGroup.Text>
                                <Form.Control
                                    name="birthDate"
                                    value={this.state.infoPatient.birthDate}
                                    onChange={(e) => this.handleChangeInput(e)}
                                    type="number"
                                    placeholder="Vui l??ng ??i???n n??m sinh"
                                />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>?????a ch???:</InputGroup.Text>
                                <Form.Control
                                    name="addressPatient"
                                    value={this.state.infoPatient.addressPatient}
                                    onChange={(e) => this.handleChangeInput(e)}
                                    placeholder="Vui l??ng ??i???n ?????a ch???"
                                />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>L?? do kh??m:</InputGroup.Text>
                                <Form.Control
                                    name="description"
                                    value={this.state.infoPatient.description}
                                    onChange={(e) => this.handleChangeInput(e)}
                                    as="textarea"
                                />
                            </InputGroup>
                            <div style={{ backgroundColor: '#D4EFFC', padding: '4px 4px', borderRadius: '4px' }}>
                                <h6>L??u ??</h6>
                                <p>
                                    1. Th??ng tin qu?? kh??ch cung c???p s??? ???????c s??? d???ng l??m h??? s?? kh??m b???nh, khi ??i???n th??ng
                                    tin qu?? kh??ch vui l??ng:
                                </p>
                                <ul>
                                    <li>Ghi r?? h??? v?? t??n, vi???t hoa nh???ng ch??? c??i ?????u ti??n, v?? d???: Nguy???n ?????c Th???nh </li>
                                    <li>
                                        ??i???n ?????y ?????, ????ng v?? vui l??ng ki???m tra l???i th??ng tin tr?????c khi ???n "X??c nh???n"
                                    </li>
                                    <li>
                                        M???t email x??c nh???n s??? ???????c g???i ?????n ?????a ch??? email b???n ????ng ?? t??i kho???n, vui l??ng
                                        x??c nh???n email ????? ho??n t???t th??? t???c ????ng k??:
                                    </li>
                                </ul>
                            </div>
                            <Button
                                onClick={() => {
                                    this.handleCreateBooking(dateTime);
                                }}
                                style={{ width: '100%', marginTop: '10px' }}
                                clasName="btn btn-primary"
                                size="lg"
                            >
                                X??c nh???n l???ch kh??m
                            </Button>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        email: state.email,
    };
};

export default connect(mapStateToProps, null)(withParamsAndNavigate(BookingPage));
