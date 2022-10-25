import React, { Component } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import { Form, InputGroup } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import appService from '../../services/appService';
import { Link } from 'react-router-dom';

class SpecialistItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: [],
            listSchedule: [],
            schedule: [],
            currentDay: '',
            allcode: [],
        };
    }
    componentDidMount() {
        this.getData();
    }

    getData = async () => {
        const respon = await appService.getScheduleByDoctorId(this.props.doctor.id);
        const allcode = await appService.getAllcodeByTime();
        const schedule = respon.schedule;
        const date = schedule.map((item) => {
            return item.date;
        });
        const dateAfterSet = new Set(date);
        const dateAfterFormat = Array.from(dateAfterSet);
        this.setState({
            ...this.state,
            listSchedule: schedule,
            date: dateAfterFormat,
            allcode: allcode.time,
        });
    };
    handleChangeInput = (e) => {
        if (e.target.name === 'currentDay') {
            const dataDay = this.state.listSchedule.filter((day) => {
                return day.date == e.target.value;
            });
            const timeReal = dataDay.map((day) => {
                var newObj = { ...day };
                this.state.allcode.forEach((code) => {
                    if (code.keyMap === day.timeType) {
                        newObj.valueVi = code.valueVi;
                        return;
                    }
                });
                return newObj;
            });
            const timeIsDoing = timeReal.filter((item) => {
                return item.isBooking == 0 && item.isDoing == 1;
            });
            this.setState({
                ...this.state,
                currentDay: e.target.value,
                schedule: timeIsDoing,
            });
        }
    };
    render() {
        const image = this.props.doctor.managerData ? this.props.doctor.managerData.image : '';
        const description = this.props.doctor.managerData ? this.props.doctor.managerData.markdownData.description : '';
        const position = this.props.doctor.managerData ? this.props.doctor.managerData.position : '';
        const fullname = this.props.doctor.managerData
            ? `${this.props.doctor.lastName} ${this.props.doctor.firstName}`
            : '';
        const regions = this.props.doctor.managerData ? this.props.doctor.managerData.regions : '';
        const addressClinic = this.props.doctor.managerData ? ` ${this.props.doctor.managerData.addressClinic}` : '';
        const price = this.props.doctor.managerData ? ` ${this.props.doctor.managerData.price}` : '';
        const dayVi = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        return (
            <Container
                className="mt-4"
                fluid="xl"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '20px' }}
            >
                <Row className="justify-content-md-center">
                    <Col md={1}>
                        <Link to={`/Specialist/${this.props.id}/DetailDoctor`} state={{ data: this.props.doctor }}>
                            <div
                                style={{
                                    margin: '2px 2px',
                                    width: '75px',
                                    height: '75px',
                                    borderRadius: '50%',
                                    backgroundImage: `url(${image})`,
                                    backgroundSize: 'contain',
                                }}
                            ></div>
                            <font color="blue" size="2.5">
                                Xem thêm
                            </font>
                        </Link>
                    </Col>
                    <Col md={6}>
                        <Link to={`/Specialist/${this.props.id}/DetailDoctor`} state={{ data: this.props.doctor }}>
                            <h5 style={{ color: '#0eab42' }}>
                                {position} {fullname}
                            </h5>
                        </Link>
                        <p>{description}</p>
                        <span>
                            <FontAwesomeIcon icon="fa-solid fa-location-dot" /> {regions}
                        </span>
                    </Col>
                    <Col md={5}>
                        <div className="row">
                            <div className="form-group col-6">
                                <InputGroup className="mb-6 mt-1">
                                    <Form.Select
                                        aria-label="Default select example"
                                        name="currentDay"
                                        onChange={(e) => this.handleChangeInput(e)}
                                    >
                                        <option hidden>Chọn ngày</option>
                                        {this.state.date.map((day, index) => {
                                            const dayFormat = new Date(day).toLocaleDateString('vi-VN', {
                                                timeZone: 'Asia/Ho_Chi_Minh',
                                            });
                                            const date = new Date(day).getDay();
                                            return (
                                                <option
                                                    key={index}
                                                    value={day}
                                                >{`${dayVi[date]}--${dayFormat}`}</option>
                                            );
                                        })}
                                    </Form.Select>
                                </InputGroup>
                            </div>
                        </div>

                        <div className="mt-2">
                            <FontAwesomeIcon icon="fa-solid fa-calendar-days" className="me-1 ms-1" />
                            <b>Lịch khám</b>
                        </div>
                        {this.state.schedule.map((item, index) => {
                            return (
                                <Link
                                    key={index}
                                    to={`/Booking`}
                                    state={{ data: { ...item, image, fullname, position, price, addressClinic } }}
                                >
                                    <button type="button" className="btn btn-outline-primary mt-2 me-2">
                                        {item.valueVi}
                                    </button>
                                </Link>
                            );
                        })}
                        <div className="mt-2">
                            <b>
                                Chọn <FontAwesomeIcon icon="fa-regular fa-hand-pointer" /> và đặt lịch miễn phí
                            </b>
                        </div>
                        <div className="mt-4">
                            <h6>Địa chỉ khám:</h6>
                            {addressClinic}
                        </div>
                        <div className="mt-4">
                            <h6>Giá khám: </h6>
                            {price}.000<sup>đ</sup>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default SpecialistItem;
