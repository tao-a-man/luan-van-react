import React, { Component } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import appService from '../../services/appService';
import { connect } from 'react-redux';

class SchedulePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingData: [],
        };
    }
    componentDidMount() {
        this.getData();
    }
    getData = async () => {
        const booking = await appService.getBookingByUserId(this.props.token);
        this.setState({ bookingData: booking.booking });
        console.log(booking);
    };
    render() {
        return (
            <div style={{ marginTop: '70px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
                <Container fluid="xl">
                    <Row className="justify-content-md-center">
                        <Col className="title mt-2">
                            <h4 style={{ color: '#555' }}>Thông tin lịch khám</h4>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center" style={{ fontSize: '13px' }}>
                        <Col>
                            <Table striped bordered hover className="mt-4 ms-4 me-4">
                                <thead>
                                    <tr>
                                        <th width="10%">Giờ khám</th>
                                        <th width="10%">Tên bệnh nhân</th>
                                        <th width="15%">Tên bác sĩ</th>
                                        <th width="15%">Địa chỉ phòng khám</th>
                                        <th width="15%">Tên phòng khám</th>
                                        <th width="10%">Số điện thoại bác sĩ</th>
                                        <th width="10%">Trạng thái</th>
                                        <th width="15%">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.bookingData.map((item) => {
                                        return (
                                            <tr>
                                                <td>{item.date}</td>
                                                <td>{item.fullName}</td>
                                                <td>
                                                    {item.managerData.position} {item.managerData.userData.lastName}{' '}
                                                    {item.managerData.userData.firstName}
                                                </td>
                                                <td>{item.managerData.addressClinic}</td>
                                                <td>{item.managerData.nameClinic}</td>
                                                <td>{item.managerData.phoneNumber}</td>
                                                <td>{item.status}</td>
                                                <td>
                                                    <button type="button" class="btn btn-primary">
                                                        Hủy Lịch
                                                    </button>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        token: state.token,
    };
};

export default connect(mapStateToProps, null)(SchedulePatient);
