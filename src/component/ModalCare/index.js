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
        };
    }
    componentDidMount() {
        this.getData();
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
                this.setState({
                    ...this.state,
                    [e.target.name]: e.target.value,
                });
            }
        } else {
            // let checkValue = this.state.dayTimeCheck;
            // if (e.target.checked) {
            //     let ischecked = false;
            //     checkValue = checkValue.filter((item) => {
            //         if (e.target.value === item) {
            //             ischecked = true;
            //         }
            //         return item !== e.target.value;
            //     });
            //     if (!ischecked) {
            //         checkValue.push(e.target.value);
            //     }
            // }
            this.setState({
                ...this.state,
                dayTimeCheck: e.target.value,
            });
        }
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
        console.log(this.state.dayTimeCheck);
        return (
            <Modal {...this.props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Khám bệnh</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <InputGroup.Text>Tình trạng bệnh</InputGroup.Text>
                        <Form.Control as="textarea" aria-label="With textarea" />
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary">Hoàn thành</Button>
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
    };
};

export default connect(mapStateToProps, null)(ModalCare);
