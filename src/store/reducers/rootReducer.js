import actionTypes from '../actions/actionTypes';
const initState = {
    language: 'vi',
    token: null,
    roleId: '',
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                roleId: action.payload.roleId ? action.payload.roleId : 'R3',
            };
        case actionTypes.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                roleId: null,
            };
        default:
            return state;
    }
};

export default rootReducer;
