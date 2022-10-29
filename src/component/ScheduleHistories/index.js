import React, { Component } from 'react';
import appService from '../../services/appService';
import { connect } from 'react-redux';
import { Table } from 'react-bootstrap';

class ScheduleHistories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
        };
    }
    componentDidMount() {
        this.getData();
    }
    getData = async () => {
        const data = await appService.getHistoryCare(this.props.token);
        this.setState({ data: data.data });
    };
    handleView = async (id) => {
        const data = await appService.getHistoryCareByBookingId(this.props.token, id);
    };
    render() {
        return (
            <div style={{ marginTop: '70px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Tên bệnh nhân</th>
                            <th>Năm sinh</th>
                            <th>Giới tính</th>
                            <th>Khám lúc</th>
                            <th>Tình trạng bệnh</th>
                            <th>Tái khám</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((item) => {
                            return (
                                <tr>
                                    <td>{item.bookingData.fullName}</td>
                                    <td>{item.bookingData.birthDate}</td>
                                    <td>{item.bookingData.gender}</td>
                                    <td>{item.bookingData.date}</td>
                                    <td>{item.description}</td>
                                    <td>{item.timeReExam ? 'Có' : 'Không'}</td>
                                    <td>
                                        {item.timeReExam ? (
                                            <button
                                                class="btn btn-primary"
                                                onClick={() => this.handleView(item.bookingId)}
                                            >
                                                Xem chi tiết
                                            </button>
                                        ) : (
                                            'Không tái khám'
                                        )}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.token,
        roleId: state.roleId,
    };
};

export default connect(mapStateToProps, null)(ScheduleHistories);
