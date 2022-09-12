import actionTypes from './actionTypes';

export const userLoginSuccess = (user) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: user,
});
export const userLogoutSuccess = () => ({
    type: actionTypes.USER_LOGOUT_SUCCESS,
});
