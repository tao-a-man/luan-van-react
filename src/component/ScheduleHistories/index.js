import React, { Component } from 'react';
import appService from '../../services/appService';
import { connect } from 'react-redux';
import { Button, InputGroup, Modal, Table, Form } from 'react-bootstrap';

class ScheduleHistories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            detail: [],
            show: false,
            realData: false,
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
        this.setState({ show: true, detail: data.data });
    };
    handleClose = () => {
        this.setState({ show: false, detail: [] });
    };
    handleChangeInput = (e) => {
        const newData = this.state.data.filter((item) => {
            console.log(item.bookingData.fullName.includes(e.target.value));
            return item.bookingData.fullName.includes(e.target.value);
        });
        this.setState({ realData: newData });
    };
    render() {
        const dayVi = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
        return (
            <div style={{ marginTop: '70px', backgroundColor: 'rgba(255,255,255,0.9)' }}>
                <br></br>
                <InputGroup className="mb-3 mt-3">
                    <InputGroup.Text id="basic-addon1">Tìm kiếm</InputGroup.Text>
                    <Form.Control
                        placeholder="Nhập tên người bệnh"
                        name="search"
                        onChange={this.handleChangeInput}
                        aria-describedby="basic-addon1"
                    />
                </InputGroup>
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
                        {this.state.realData
                            ? this.state.realData.map((item, index) => {
                                  return (
                                      <tr key={index}>
                                          <td>{item.bookingData.fullName}</td>
                                          <td>{item.bookingData.birthDate}</td>
                                          <td>{item.bookingData.gender}</td>
                                          <td>{item.bookingData.date}</td>
                                          <td>{item.description}</td>
                                          <td>{item.timeReExam ? 'Có' : 'Không'}</td>
                                          <td>
                                              {item.timeReExam ? (
                                                  <button
                                                      className="btn btn-primary"
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
                              })
                            : this.state.data.map((item, index) => {
                                  return (
                                      <tr key={index}>
                                          <td>{item.bookingData.fullName}</td>
                                          <td>{item.bookingData.birthDate}</td>
                                          <td>{item.bookingData.gender}</td>
                                          <td>{item.bookingData.date}</td>
                                          <td>{item.description}</td>
                                          <td>{item.timeReExam ? 'Có' : 'Không'}</td>
                                          <td>
                                              {item.timeReExam ? (
                                                  <button
                                                      className="btn btn-primary"
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
                <Modal size="xl" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Chuỗi khám bệnh</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.state.detail.map((item, index) => {
                            return (
                                <Table striped bordered hover key={index}>
                                    <thead>
                                        <tr>
                                            <th>Tái khám lần</th>
                                            <th>Tên bệnh nhân</th>
                                            <th>Năm sinh</th>
                                            <th>Giới tính</th>
                                            <th>Khám lúc</th>
                                            <th>Tình trạng bệnh</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{item.bookingData.fullName}</td>
                                            <td>{item.bookingData.birthDate}</td>
                                            <td>{item.bookingData.gender}</td>
                                            <td>
                                                {index == 0
                                                    ? item.bookingData.date
                                                    : `${this.state.detail[index - 1].scheduleData.timeData.valueVi}--
        ${dayVi[new Date(this.state.detail[index - 1].scheduleData.date).getDay()]}
        --${new Date(this.state.detail[index - 1].scheduleData.date).toLocaleDateString('vi')}`}
                                            </td>
                                            <td>{item.description}</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            );
                        })}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
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
