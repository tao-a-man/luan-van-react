import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import appService from '../../services/appService';
class ReExamPatient extends Component {
    constructor(props) {
        super(props);
        this.state = { data: [] };
    }
    componentDidMount() {
        this.getData();
    }
    getData = async () => {
        const data = await appService.getHistoryCareHaveReExam(this.props.token);
        this.setState({ data: data.data });
    };
    handleDeleteHistory = async (id, idTime) => {
        await appService.deleteHistoryCareHaveReExam(id, idTime, this.props.token);
        this.getData();
    };
    state = {};
    render() {
        const dayVi = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];

        return (
            <div style={{ marginTop: '70px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
                <h4 className="me-4 ms-4 ml-4">Lịch tái khám</h4>
                <Table className="me-4 ms-4 ml-4" striped bordered hover>
                    <thead>
                        <tr>
                            <th width="10%">Giờ khám</th>
                            <th width="10%">Tên bệnh nhân</th>
                            <th width="20%">Tên bác sĩ</th>
                            <th width="20%">Địa chỉ phòng khám</th>
                            <th width="10%">Tên phòng khám</th>
                            <th width="10%">Số điện thoại</th>
                            <th width="10%">Trạng thái</th>
                            <th width="10%">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.data.map((item, index) => {
                            console.log(item);
                            return (
                                <tr key={index}>
                                    <td>
                                        {item.scheduleData.timeData.valueVi}--
                                        {dayVi[new Date(item.scheduleData.date).getDay()]}
                                        --{new Date(item.scheduleData.date).toLocaleDateString('vi')}
                                    </td>
                                    <td>{item.bookingData.fullName}</td>
                                    <td>
                                        {item.bookingData.managerData.position}{' '}
                                        {item.bookingData.managerData.userData.lastName}{' '}
                                        {item.bookingData.managerData.userData.firstName}
                                    </td>
                                    <td>{item.bookingData.managerData.addressClinic}</td>
                                    <td>{item.bookingData.managerData.nameClinic}</td>
                                    <td>{item.bookingData.managerData.phoneNumber}</td>
                                    <td>{item.status}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                this.handleDeleteHistory(item.id, item.timeReExam);
                                            }}
                                        >
                                            Hủy lịch
                                        </button>
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
    };
};

export default connect(mapStateToProps, null)(ReExamPatient);
