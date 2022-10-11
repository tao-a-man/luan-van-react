import React, { Component } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';

import './Schedule.scss';

class ScheduleItem extends Component {
    constructor(props) {
        super(props);
    }
    state = {};
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.props.day !== nextProps.day) {
    //         this.textInput.classList.remove('noactive');
    //     }
    //     return true;
    // }
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
                            ? 'label-check-time disiable'
                            : time.isDoing === 0
                            ? 'label-check-time noactive'
                            : 'label-check-time'
                    }
                    onClick={(e) => {
                        if (!e.target.classList.contains('disiable')) {
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
