import React, { Component } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

import './Schedule.scss';

class ScheduleItem extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    shouldComponentUpdate(nextProps, nextState) {
        if (this.props.day !== nextProps.day) {
            if (nextProps.item.isDoing === 1) {
                this.textInput.classList = '';
                this.textInput.classList.add('label-check-time');
                this.textInput.classList.add('me-2');
                this.textInput.classList.add('mt-2');
            }
            if (nextProps.item.isDoing === 0) {
                this.textInput.classList = '';
                this.textInput.classList.add('label-check-time');
                this.textInput.classList.add('noactive');
                this.textInput.classList.add('me-2');
                this.textInput.classList.add('mt-2');
            }
        }
        return true;
    }
    render() {
        const time = this.props.item;
        return (
            <>
                <label
                    ref={(input) => {
                        this.textInput = input;
                    }}
                    for={time.id}
                    className={
                        time.isBooking !== 0
                            ? 'label-check-time disiable me-2 mt-2'
                            : time.isDoing === 0
                            ? 'label-check-time noactive me-2 mt-2'
                            : 'label-check-time me-2 mt-2'
                    }
                    onClick={(e) => {
                        if (!e.target.classList.contains('disiable')) {
                            if (this.props.re) {
                                var list = document.getElementsByClassName('label-check-time');
                                for (let item of list) {
                                    item.classList.remove('noactive');
                                }
                            }
                            e.target.classList.toggle('noactive');
                        }
                    }}
                >
                    {time.valueVi}
                </label>
                <Form.Check
                    hidden
                    checked=""
                    disabled={time.isBooking === 0 ? '' : '1'}
                    id={time.id}
                    type="checkbox"
                    name="dayTimeCheck"
                    value={time.timeType}
                    onChange={(e) => {
                        this.props.handleChangeInput(e);
                    }}
                ></Form.Check>
            </>
        );
    }
}

export default ScheduleItem;
