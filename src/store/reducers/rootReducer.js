import actionTypes from '../actions/actionTypes';
const initState = {
    language: 'vi',
    token: null,
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload,
            };
        case actionTypes.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
            };
        default:
            return state;
    }
};

export default rootReducer;
