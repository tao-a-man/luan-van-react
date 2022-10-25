import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React, { Component } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';

import appService from '../../services/appService';
import ScheduleItem from '../Schedule/ScheduleItem';

class ModalCare extends Component {
    constructor(props) {
        super(props);
        this.state = {
            re: false,
            schedule: [],
            date: [],
            time: [],
            currentDay: '',
            dayTimeCheck: [],
            description: '',
        };
    }
    componentDidMount() {
        this.getData();
    }
    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.show !== this.props.show) {
            nextState.re = false;
        }
        return true;
    }
    getData = async () => {
        const date = await appService.getScheduleByDoctorId(this.props.doctorId);
        const time = await appService.getAllcodeByTime();
        const days = date.schedule.map((day) => {
            return day.date;
        });
        const dayAfterSet = new Set(days);
        const dayAfterArray = Array.from(dayAfterSet);
        this.setState({
            schedule: date.schedule,
            date: dayAfterArray,
            time: time.time,
        });
    };
    handleChangeInput = (e) => {
        if (e.target.name !== 'dayTimeCheck') {
            if (e.target.name === 'currentDay') {
                const dataDay = this.state.schedule.filter((day) => {
                    return day.date == e.target.value;
                });
                const timeReal = dataDay.map((day) => {
                    var newObj = { ...day };
                    this.state.time.forEach((code) => {
                        if (code.keyMap === day.timeType) {
                            newObj.valueVi = code.valueVi;
                            return;
                        }
                    });
                    return newObj;
                });
                let timeTypeCheck = [];
                timeReal.forEach((item) => {
                    if (item.isDoing === 0) {
                        timeTypeCheck.push(item.timeType);
                    }
                });
                this.setState({
                    ...this.state,
                    currentDay: e.target.value,
                    dayTimeCheck: [],
                });
            } else {
                if (e.target.name === 're') {
                    this.setState({
                        re: !this.state.re,
                        dayTimeCheck: [],
                        currentDay: '',
                    });
                } else {
                    this.setState({
                        ...this.state,
                        [e.target.name]: e.target.value,
                    });
                }
            }
        } else {
            this.setState({
                ...this.state,
                dayTimeCheck: e.target.value,
            });
        }
    };
    handleExam = async () => {
        await appService.postCreateHistoryCare(
            {
                date: this.state.currentDay,
                time: this.state.dayTimeCheck,
                bookingId: this.props.bookingId,
                description: this.state.description,
            },
            this.props.token,
        );
        this.getData();
        this.props.onHide();
    };
    render() {
        const dayVi = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        const dataDay = this.state.schedule.filter((day) => {
            return day.date == this.state.currentDay;
        });
        const timeReal = dataDay.map((day) => {
            var newObj = { ...day };
            this.state.time.forEach((code) => {
                if (code.keyMap === day.timeType) {
                    newObj.valueVi = code.valueVi;
                    return;
                }
            });
            return newObj;
        });
        console.log(this.state);
        return (
            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Khám bệnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <InputGroup.Text>Tình trạng bệnh</InputGroup.Text>
                        <Form.Control
                            as="textarea"
                            aria-label="With textarea"
                            name="description"
                            onChange={(e) => {
                                this.handleChangeInput(e);
                            }}
                        />
                    </InputGroup>
                    <Form.Check
                        id="re"
                        type="checkbox"
                        name="re"
                        label="Tái khám"
                        className="mt-4"
                        onChange={(e) => {
                            this.handleChangeInput(e);
                        }}
                    ></Form.Check>
                    {this.state.re ? (
                        <>
                            <InputGroup className="mb-3">
                                <InputGroup.Text id="basic-addon1">Choice day for edit</InputGroup.Text>
                                <Form.Select
                                    aria-label="Default select example"
                                    name="currentDay"
                                    onChange={(e) => this.handleChangeInput(e)}
                                >
                                    <option hidden>Choice Day</option>
                                    {this.state.date.map((day) => {
                                        const dayFormat = new Date(day).toLocaleDateString('vi-VN', {
                                            timeZone: 'Asia/Ho_Chi_Minh',
                                        });
                                        const date = new Date(day).getDay();
                                        return <option value={day}>{`${dayVi[date]}--${dayFormat}`}</option>;
                                    })}
                                </Form.Select>
                            </InputGroup>
                            <InputGroup className="mb-3">
                                {timeReal.map((time) => {
                                    if (time.isDoing == 1 && time.isBooking == 0) {
                                        return (
                                            <ScheduleItem
                                                day={this.state.currentDay}
                                                item={time}
                                                handleChangeInput={(e) => this.handleChangeInput(e)}
                                                re
                                            ></ScheduleItem>
                                        );
                                    }
                                })}
                            </InputGroup>
                        </>
                    ) : (
                        ''
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleExam}>
                        Hoàn thành
                    </Button>
                    <Button variant="danger" onClick={this.props.onHide}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        doctorId: state.id,
        token: state.token,
    };
};

export default connect(mapStateToProps, null)(ModalCare);
