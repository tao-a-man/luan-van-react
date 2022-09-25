import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { userLogoutSuccess } from '../../../store/actions';
import Button from '../../../component/Button';
import './HomeHeader.scss';
import { LANGUAGES } from '../../../utils';
import { withParamsAndNavigate } from '../../../hoc/withParamsAndNavigate';
import appService from '../../../services/appService';

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
                        {this.state.specialist.map((item) => {
                            return (
                                <Link to={`/Specialist/${item.id}`}>
                                    <div className="item">
                                        <h6 className="title">{item.name}</h6>
                                        <p className="description">Khám {item.name}</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    <div className="right-content">
                        {this.props.token === null ? (
                            <Button
                                onClick={() => {
                                    this.props.navigate('/Login');
                                }}
                                primary
                                iconLeft={<FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />}
                            >
                                Login
                            </Button>
                        ) : (
                            <Button
                                onClick={() => {
                                    this.props.userLogoutSuccess();
                                }}
                                primary
                                iconLeft={<FontAwesomeIcon icon="fa-solid fa-right-from-bracket" />}
                            >
                                Logout
                            </Button>
                        )}
                        <div className="language">
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
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        token: state.token,
    };
};
const mapDispatchToProps = (dispatch) => {
    return { userLogoutSuccess: () => dispatch(userLogoutSuccess()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(withParamsAndNavigate(HomeHeader));
