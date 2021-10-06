import { FLAG1, AUTH_RESULT, LOGOUT, USER_BLOCKED } from '../actions/types';

const initState = {
    id: 0,
    user: {},
    isValidUsername: false,
    isValidPassword: false,
    formData: {
        username: '',
        password: ''
    },
    failedCount: 0
};

export default function todo(state = initState, action) {
    switch (action.type) {
        case FLAG1:
            return {
                ...state,
                id: action.payload
            }
        case LOGOUT:
            return {
                ...state,
                user: {}
            }
        case AUTH_RESULT.SUCCESS:
            return {
                ...state,
                user: action.cur_user,
                failedcount: 0
            }
        case AUTH_RESULT.FAILED:
            return {
                ...state,
                failedCount: state.failedCount + 1
            }
        case USER_BLOCKED:
            return {
                ...state,
                failedCount: 0
            }
        default:
            return state
    }
}