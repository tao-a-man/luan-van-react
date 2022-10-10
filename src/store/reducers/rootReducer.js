import actionTypes from '../actions/actionTypes';
const initState = {
    language: 'vi',
    token: null,
    roleId: '',
    firstName: '',
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                token: action.payload.token,
                roleId: action.payload.roleId ? action.payload.roleId : 'R3',
                firstName: action.payload.firstName ? action.payload.firstName : '',
            };
        case actionTypes.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                roleId: null,
                firstName: null,
            };
        default:
            return state;
    }
};

export default rootReducer;
