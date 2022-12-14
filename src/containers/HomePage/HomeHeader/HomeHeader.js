import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, NavLink } from 'react-router-dom';

import { userLogoutSuccess } from '../../../store/actions';
import './HomeHeader.scss';
import { LANGUAGES } from '../../../utils';
import { withParamsAndNavigate } from '../../../hoc/withParamsAndNavigate';
import appService from '../../../services/appService';
import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import { Nav } from 'reactstrap';

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            specialist: [],
        };
    }
    async componentDidMount() {
        const respon = await appService.getSpecialist();
        this.setState({ specialist: respon.specialist });
    }
    render() {
        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <Link to="/">
                            <div className="logo"></div>
                        </Link>
                    </div>
                    <div className="center-content">
                        {this.state.specialist.map((item, index) => {
                            return (
                                <NavLink
                                    key={index}
                                    to={`/Specialist/${item.id}`}
                                    className={({ isActive }) => {
                                        return isActive ? 'active' : '';
                                    }}
                                >
                                    <div className="item">
                                        <h6 className="title">{item.name}</h6>
                                        <p className="description">Khám {item.name}</p>
                                    </div>
                                </NavLink>
                            );
                        })}
                    </div>
                    <div className="right-content">
                        {this.props.token === null ? (
                            <button
                                className="btn btn-success btn-lg"
                                onClick={() => {
                                    this.props.navigate('/Login');
                                }}
                            >
                                <FontAwesomeIcon icon="fa-solid fa-right-to-bracket" className="me-2" />
                                Login
                            </button>
                        ) : (
                            <Navbar expand="lg" style={{ fontSize: '20px' }}>
                                <Container>
                                    <Navbar.Collapse id="basic-navbar-nav">
                                        <Nav className="me-4">
                                            <NavDropdown title={this.props.firstName} id="basic-nav-dropdown">
                                                <NavDropdown.Item
                                                    onClick={() => {
                                                        this.props.navigate('/SchedulePatient');
                                                    }}
                                                >
                                                    Lịch khám
                                                </NavDropdown.Item>
                                                <NavDropdown.Item
                                                    onClick={() => {
                                                        this.props.navigate('/ReExamPatient');
                                                    }}
                                                >
                                                    Lịch tái khám
                                                </NavDropdown.Item>
                                                <NavDropdown.Item
                                                    onClick={() => {
                                                        this.props.navigate('/HistoriesCarePatient');
                                                    }}
                                                >
                                                    Lịch sử khám
                                                </NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <span
                                                        onClick={() => {
                                                            this.props.navigate('/');
                                                            this.props.userLogoutSuccess();
                                                        }}
                                                    >
                                                        Logout
                                                    </span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </Nav>
                                    </Navbar.Collapse>
                                </Container>
                            </Navbar>
                        )}
                        {/* <div className="language">
                            <Button
                                onClick={() => {
                                    this.props.userLogoutSuccess();
                                }}
                                primary
                                iconLeft={<FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />}
                            >
                                Logout
                            </Button>
                            <span
                                onClick={() => {
                                    this.handleChangeLanguage(LANGUAGES.VI);
                                }}
                                className={this.props.language === LANGUAGES.VI ? 'active' : ''}
                            >
                                VI
                            </span>
                            <span
                                onClick={() => {
                                    this.handleChangeLanguage(LANGUAGES.EN);
                                }}
                                className={this.props.language === LANGUAGES.EN ? 'active' : ''}
                            >
                                EN
                            </span>
                        </div> */}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
        firstName: state.firstName,
    };
};
const mapDispatchToProps = (dispatch) => {
    return { userLogoutSuccess: () => dispatch(userLogoutSuccess()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(withParamsAndNavigate(HomeHeader));
