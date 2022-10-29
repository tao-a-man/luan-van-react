import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import appService from '../../services/appService';

class ReExam extends Component {
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
        const data = await appService.getHistoryCareHaveReExam(this.props.token);
        this.setState({ data: data.data });
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
                                    <button class="btn btn-primary">Tái khám</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
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
