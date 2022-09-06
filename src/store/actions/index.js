import actionTypes from './actionTypes';

export const userLoginSuccess = (token) => ({
    type: actionTypes.USER_LOGIN_SUCCESS,
    payload: token,
});
export const userLogoutSuccess = () => ({
    type: actionTypes.USER_LOGOUT_SUCCESS,
});
