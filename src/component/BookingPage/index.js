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
                phoneNumber: '',
                birthDate: '',
                address: '',
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
                    status: 'New',
                    date: dateTime,
                    scheduleId: this.state.id,
                    ...this.state.infoPatient,
                },
                this.props.token,
            );
            if (respon.errCode === 0) {
                swal({
                    title: respon.errMessage,
                    icon: 'success',
                });
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
        const dayVi = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        const dateTime = `${this.state.valueVi}--${dayVi[new Date(this.state.date).getDay()]}--${new Date(
            this.state.date,
        ).toLocaleDateString('vi')}`;
        console.log(this.state);
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
                            <h6 style={{ color: '#888' }}>Đặt lịch khám</h6>
                            <h5 style={{ color: 'blue' }}>
                                {this.state.position} {this.state.fullname}
                            </h5>
                            <h7 style={{ color: '#666' }}>
                                Thời gian:&nbsp;
                                {dateTime}
                            </h7>
                            <br></br>
                            <h7 style={{ color: '#666' }}>Tại: {this.state.addressClinic}</h7>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center mt-3">
                        <Col md={7}>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>Họ Tên:</InputGroup.Text>
                                <Form.Control
                                    name="fullName"
                                    value={this.state.infoPatient.fullName}
                                    onChange={(e) => this.handleChangeInput(e)}
                                    placeholder="Họ tên bệnh nhân"
                                />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>Giới tính</InputGroup.Text>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="gender"
                                    onChange={(e) => this.handleChangeInput(e)}
                                >
                                    <option hidden>Chọn giới tính</option>
                                    <option value="M">Nam</option>
                                    <option value="F">Nữ</option>
                                    <option value="O">Khác</option>
                                </Form.Select>
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>Số điện thoại:</InputGroup.Text>
                                <Form.Control
                                    name="phoneNumber"
                                    value={this.state.infoPatient.phoneNumber}
                                    onChange={(e) => this.handleChangeInput(e)}
                                    type="number"
                                    placeholder="Vui lòng điền số điện thoại"
                                />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>Năm sinh:</InputGroup.Text>
                                <Form.Control
                                    name="birthDate"
                                    value={this.state.infoPatient.birthDate}
                                    onChange={(e) => this.handleChangeInput(e)}
                                    type="number"
                                    placeholder="Vui lòng điền năm sinh"
                                />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>Địa chỉ:</InputGroup.Text>
                                <Form.Control
                                    name="address"
                                    value={this.state.infoPatient.address}
                                    onChange={(e) => this.handleChangeInput(e)}
                                    placeholder="Vui lòng điền địa chỉ"
                                />
                            </InputGroup>
                            <InputGroup className="mb-2">
                                <InputGroup.Text>Lý do khám:</InputGroup.Text>
                                <Form.Control
                                    name="description"
                                    value={this.state.infoPatient.description}
                                    onChange={(e) => this.handleChangeInput(e)}
                                    as="textarea"
                                />
                            </InputGroup>
                            <div style={{ backgroundColor: '#D4EFFC', padding: '4px 4px', borderRadius: '4px' }}>
                                <h6>Lưu ý</h6>
                                <p>
                                    1. Thông tin quý khách cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, khi điền thông
                                    tin quý khách vui lòng:
                                </p>
                                <ul>
                                    <li>Ghi rõ họ và tên, viết hoa những chữ cái đầu tiên, ví dụ: Nguyễn Đức Thịnh </li>
                                    <li>
                                        Điền đầy đủ, đúng và vui lòng kiểm tra lại thông tin trước khi ấn "Xác nhận"
                                    </li>
                                    <li>
                                        Một email xác nhận sẽ được gửi đến địa chỉ email bạn đăng ý tài khoản, vui lòng
                                        xác nhận email để hoàn tất thủ tục đăng kí:
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
                                Xác nhận lịch khám
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
    };
};

export default connect(mapStateToProps, null)(withParamsAndNavigate(BookingPage));
