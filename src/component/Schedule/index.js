import React, { Component } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import swal from 'sweetalert';

import { withParamsAndNavigate } from '../../hoc/withParamsAndNavigate';
import appService from '../../services/appService';
import ScheduleItem from './ScheduleItem';

class Schedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            fullname: '',
            age: '',
            userId: '',
            date: '',
            currentDay: '',
            schedule: [],
            allcode: [],
            dayTimeCheck: [],
        };
    }
    async componentDidMount() {
        this.getData();
    }
    getData = async () => {
        const { id, fullname, username, age } = this.props.params;
        const schedule = await appService.getScheduleByDoctorId(id);
        const allcode = await appService.getAllcodeByTime();
        this.setState({
            userId: id,
            username,
            fullname,
            age,
            schedule: schedule.schedule,
            allcode: allcode.time,
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
                    this.state.allcode.forEach((code) => {
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
                console.log('timeReal', timeReal);
                this.setState({
                    ...this.state,
                    currentDay: e.target.value,
                    dayTimeCheck: timeTypeCheck,
                });
            } else {
                this.setState({
                    ...this.state,
                    [e.target.name]: e.target.value,
                });
            }
        } else {
            let checkValue = this.state.dayTimeCheck;
            if (e.target.checked) {
                let ischecked = false;
                checkValue = checkValue.filter((item) => {
                    if (e.target.value === item) {
                        ischecked = true;
                    }
                    return item !== e.target.value;
                });
                if (!ischecked) {
                    checkValue.push(e.target.value);
                }
            }
            this.setState({
                ...this.state,
                dayTimeCheck: checkValue,
            });
        }
    };
    bulkUpdateSchedule = async () => {
        const respon = await appService.patchBulkUpdateSchedule({
            times: this.state.dayTimeCheck,
            date: this.state.currentDay,
            id: this.state.userId,
        });
        if (respon.errCode === 0) {
            swal({ title: 'Bulk Update Schedule Success!', icon: 'success' });
        } else {
            swal({ title: 'Error', text: respon.errMessage.errors[0].message, icon: 'error' });
        }
        this.getData();
    };
    render() {
        const dayVi = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        const days = this.state.schedule.map((day) => {
            return day.date;
        });
        const dayAfterSet = new Set(days);
        const dayAfterArray = Array.from(dayAfterSet);
        const dataDay = this.state.schedule.filter((day) => {
            return day.date == this.state.currentDay;
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
        console.log(timeReal, this.state.dayTimeCheck);
        return (
            <div className="row mt-4 ms-2 me-2">
                <input value={this.state.id} hidden disabled></input>
                <div className="form-group col-5">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">UserName</InputGroup.Text>
                        <Form.Control
                            value={this.state.username}
                            disabled
                            placeholder="Username"
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div className="form-group col-5">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">FullName</InputGroup.Text>
                        <Form.Control
                            value={this.state.fullname}
                            disabled
                            placeholder="Full Name"
                            aria-label="FullName"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>
                <div className="form-group col-2 mb-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Age</InputGroup.Text>
                        <Form.Control
                            value={this.state.age}
                            disabled
                            placeholder="Age"
                            aria-label="Age"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                </div>

                <div className="form-group col-4">
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">Choice day for edit</InputGroup.Text>
                        <Form.Select
                            aria-label="Default select example"
                            name="currentDay"
                            onChange={(e) => this.handleChangeInput(e)}
                        >
                            <option hidden>Choice Day</option>
                            {dayAfterArray.map((day) => {
                                const dayFormat = new Date(day).toLocaleDateString('vi-VN', {
                                    timeZone: 'Asia/Ho_Chi_Minh',
                                });
                                const date = new Date(day).getDay();
                                return <option value={day}>{`${dayVi[date]}--${dayFormat}`}</option>;
                            })}
                        </Form.Select>
                    </InputGroup>
                </div>
                <div className="form-group col-12 mt-5">
                    <InputGroup className="mb-3">
                        {timeReal.map((time) => {
                            return (
                                <ScheduleItem
                                    day={this.state.currentDay}
                                    item={time}
                                    handleChangeInput={(e) => this.handleChangeInput(e)}
                                ></ScheduleItem>
                            );
                        })}
                    </InputGroup>
                </div>
                <button
                    className="btn btn-success mt-5"
                    size="lg"
                    onClick={() => {
                        this.bulkUpdateSchedule();
                    }}
                >
                    Cập nhật lịch
                </button>
            </div>
        );
    }
}

export default withParamsAndNavigate(Schedule);
