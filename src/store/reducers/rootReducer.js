import actionTypes from '../actions/actionTypes';
const initState = {
    language: 'vi',
    token: null,
    roleId: '',
    firstName: '',
    age: '',
    lastName: '',
    email: '',
    id: '',
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.USER_LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                roleId: action.payload.roleId ? action.payload.roleId : 'R3',
                firstName: action.payload.firstName ? action.payload.firstName : '',
                lastName: action.payload.lastName ? action.payload.lastName : '',
                age: action.payload.age ? action.payload.age : '',
                email: action.payload.email ? action.payload.email : '',
                id: action.payload.id ? action.payload.id : '',
            };
        case actionTypes.USER_LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                roleId: null,
                firstName: null,
                age: null,
                lastName: null,
                email: null,
                id: null,
            };
        default:
            return state;
    }
};

export default rootReducer;
