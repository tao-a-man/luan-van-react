import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import appService from '../../services/appService';
import ModalCare from '../ModalCare';

class ReExam extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isShowModalCare: false,
            reExam: [],
            bookingId: '',
        };
    }
    componentDidMount() {
        this.getData();
    }
    getData = async () => {
        const data = await appService.getHistoryCareHaveReExam(this.props.token);
        this.setState({ data: data.data });
    };
    handleReExam = async (bookingId) => {
        const data = await appService.getHistoryCareByBookingId(this.props.token, bookingId);
        this.setState({ isShowModalCare: true, reExam: data.data, bookingId: bookingId });
    };
    handleDeleteHistory = async (id, idTime) => {
        await appService.deleteHistoryCareHaveReExam(id, idTime, this.props.token);
        this.getData();
    };
    state = {};
    render() {
        const dayVi = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        return (
            <Table className="mt-4" striped bordered hover>
                <thead>
                    <tr>
                        <th>Khám ngày</th>
                        <th>Họ Tên</th>
                        <th>Năm sinh</th>
                        <th>Giới tính</th>
                        <th>Tình trạng bệnh</th>
                        <th>Tái khám lúc</th>
                        <th>Trạng thái</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.data.map((item) => {
                        return (
                            <tr>
                                <td>{item.bookingData.date}</td>
                                <td>{item.bookingData.fullName}</td>
                                <td>{item.bookingData.birthDate}</td>
                                <td>{item.bookingData.gender}</td>
                                <td>{item.description}</td>
                                <td>
                                    {item.scheduleData.timeData.valueVi}--
                                    {dayVi[new Date(item.scheduleData.date).getDay()]}
                                    --{new Date(item.scheduleData.date).toLocaleDateString('vi')}
                                </td>
                                <td>{item.status}</td>
                                <td>
                                    <button
                                        class="btn btn-danger"
                                        onClick={() => {
                                            this.handleDeleteHistory(item.id, item.timeReExam);
                                        }}
                                    >
                                        Hủy lịch
                                    </button>
                                    <button
                                        class="btn btn-primary"
                                        onClick={() => {
                                            this.handleReExam(item.bookingId);
                                        }}
                                    >
                                        Tái khám
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>

                <ModalCare
                    show={this.state.isShowModalCare}
                    onHide={() => {
                        this.setState({ isShowModalCare: false });
                    }}
                    bookingId={this.state.bookingId}
                    getDataFromParent={this.getData}
                    reDB={this.state.reExam}
                ></ModalCare>
            </Table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
    };
};
export default connect(mapStateToProps, null)(ReExam);
