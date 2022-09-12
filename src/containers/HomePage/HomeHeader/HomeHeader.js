import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { userLogoutSuccess } from '../../../store/actions';
import Button from '../../../component/Button';
import './HomeHeader.scss';
import { Link } from 'react-router-dom';
import { LANGUAGES } from '../../../utils';

class HomeHeader extends Component {
    render() {
        return (
            <div className="home-header-container">
                <div className="home-header-content">
                    <div className="left-content">
                        <div className="logo"></div>
                    </div>
                    <div className="center-content">
                        <div className="item">
                            <h3 className="title">
                                <FormattedMessage id="homeHeader.specialist" />
                            </h3>
                            <p className="description">description</p>
                        </div>
                        <div className="item">
                            <h3 className="title">item</h3>
                            <p className="description">description</p>
                        </div>
                        <div className="item">
                            <h3 className="title">item</h3>
                            <p className="description">description</p>
                        </div>
                        <div className="item">
                            <h3 className="title">item</h3>
                            <p className="description">description</p>
                        </div>
                    </div>
                    <div className="right-content">
                        {this.props.token === null ? (
                            <Link to="/Login">
                                <Button primary iconLeft={<FontAwesomeIcon icon="fa-solid fa-right-to-bracket" />}>
                                    Login
                                </Button>
                            </Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
