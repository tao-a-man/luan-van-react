import React, { Component } from 'react';
import { Row, Container, Col } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import appService from '../../services/appService';
import { connect } from 'react-redux';

import ModalCare from '../ModalCare';

class ScheduleBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingData: [],
            isShowModalCare: false,
        };
    }
    componentDidMount() {
        this.getData();
    }
    getData = async () => {
        const booking = await appService.getBookingByUserId(this.props.token);
        this.setState({ bookingData: booking.booking });
    };
    deleteBooking = async (scheduleId) => {
        await appService.deleteBooking(scheduleId);
        this.getData();
    };
    acceptBooking = async (id) => {
        await appService.acceptBooking(id);
        this.getData();
    };
    render() {
        return (
            <div style={{ marginTop: '70px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
                <Container fluid>
                    <Row className="justify-content-md-center">
                        <Col className="title mt-2">
                            <h4 style={{ color: '#555' }}>Thông tin lịch khám</h4>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center" style={{ fontSize: '18px' }}>
                        <Col>
                            <Table striped bordered hover className="mt-4 me-4">
                                <thead>
                                    <tr className="text-center">
                                        {this.props.roleId === 'R3' ? (
                                            <>
                                                <th width="10%">Giờ khám</th>
                                                <th width="10%">Tên bệnh nhân</th>
                                                <th width="15%">Tên bác sĩ</th>
                                                <th width="15%">Địa chỉ phòng khám</th>
                                                <th width="15%">Tên phòng khám</th>
                                                <th width="10%">Số điện thoại</th>
                                                <th width="10%">Trạng thái</th>
                                                <th width="15%">Action</th>
                                            </>
                                        ) : (
                                            <>
                                                <th width="10%">Giờ khám</th>
                                                <th width="10%">Tên bệnh nhân</th>
                                                <th width="5%">Tuổi</th>
                                                <th width="5%">Giới tính</th>
                                                <th width="10%">Triệu chứng</th>
                                                <th width="20%">Địa chỉ</th>
                                                <th width="10%">Số điện thoại</th>
                                                <th width="5%">Trạng thái</th>
                                                <th width="15%">Action</th>
                                            </>
                                        )}
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.bookingData.map((item) => {
                                        return (
                                            <tr>
                                                {this.props.roleId === 'R3' && item.status !== 'Đã khám' ? (
                                                    <>
                                                        <td>{item.date}</td>
                                                        <td>{item.fullName}</td>
                                                        <td>
                                                            {item.managerData.position}{' '}
                                                            {item.managerData.userData.lastName}{' '}
                                                            {item.managerData.userData.firstName}
                                                        </td>
                                                        <td>{item.managerData.addressClinic}</td>
                                                        <td>{item.managerData.nameClinic}</td>
                                                        <td>{item.managerData.phoneNumber}</td>
                                                        <td className="text-center">
                                                            <b>
                                                                <font size="3" face="arial" color="#008000">
                                                                    {item.status}
                                                                </font>
                                                            </b>
                                                        </td>
                                                        <td className="text-center">
                                                            {item.status == 'Đã khám' ? (
                                                                ''
                                                            ) : (
                                                                <button
                                                                    onClick={() => {
                                                                        this.deleteBooking(item.scheduleId);
                                                                    }}
                                                                    type="button"
                                                                    className="btn btn-danger"
                                                                >
                                                                    Hủy Lịch
                                                                </button>
                                                            )}
                                                        </td>
                                                    </>
                                                ) : this.props.roleId === 'R2' ? (
                                                    <>
                                                        <td>{item.date}</td>
                                                        <td>{item.fullName}</td>
                                                        <td>{item.birthDate}</td>
                                                        <td>{item.gender}</td>
                                                        <td>{item.description}</td>
                                                        <td>{item.addressPatient}</td>
                                                        <td>{item.phoneNumberPatient}</td>
                                                        <td className="text-center">
                                                            <b>
                                                                <font size="3" face="arial" color="#008000">
                                                                    {item.status}
                                                                </font>
                                                            </b>
                                                        </td>
                                                        <td className="text-center">
                                                            {item.status != 'Đã xác nhận' &&
                                                            item.status != 'Đã khám' ? (
                                                                <>
                                                                    <button
                                                                        onClick={() => {
                                                                            this.deleteBooking(item.scheduleId);
                                                                        }}
                                                                        type="button"
                                                                        className="btn btn-danger"
                                                                    >
                                                                        Hủy Lịch
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            this.acceptBooking(item.id);
                                                                        }}
                                                                        type="button"
                                                                        className="btn btn-primary"
                                                                    >
                                                                        Xác nhận
                                                                    </button>
                                                                </>
                                                            ) : item.status != 'Đã khám' ? (
                                                                <>
                                                                    <button
                                                                        onClick={() => {
                                                                            this.setState({ isShowModalCare: true });
                                                                        }}
                                                                        type="button"
                                                                        className="btn btn-primary"
                                                                    >
                                                                        Khám bệnh
                                                                    </button>
                                                                    <ModalCare
                                                                        show={this.state.isShowModalCare}
                                                                        onHide={() => {
                                                                            this.setState({ isShowModalCare: false });
                                                                        }}
                                                                        bookingId={item.id}
                                                                        getDataFromParent={this.getData}
                                                                    ></ModalCare>
                                                                </>
                                                            ) : (
                                                                <button
                                                                    onClick={() => {
                                                                        this.setState({ isShowModalCare: true });
                                                                    }}
                                                                    type="button"
                                                                    className="btn btn-primary"
                                                                >
                                                                    Xem lịch sử khám
                                                                </button>
                                                            )}
                                                        </td>
                                                    </>
                                                ) : (
                                                    ''
                                                )}
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
        roleId: state.roleId,
    };
};

export default connect(mapStateToProps, null)(ScheduleBooking);
