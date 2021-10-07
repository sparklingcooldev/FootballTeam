import { FLAG1, AUTH_RESULT, LOGOUT, USER_BLOCKED } from './types'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export function doGetWholeData() {
    return (dispatch) => {
        dispatch({
            type: FLAG1,
            payload: 1
        })
    }
}

export function doRegisterUser(formData) {
    return (dispatch) => {
        axios.post('/api/authController/doRegisterUser', formData)
            .then((res) => {
                if (res.data.success)
                    alert("Registre OK! Please wait being permitted...")
            })
    }
}

export function doLoginUser(formData, history) {
    return (dispatch) => {
        axios.post('/api/authController/doLoginUser', formData)
            .then((res) => {
                if (res.data.success) {
                    localStorage.setItem('jwtToken', res.data.token);
                    dispatch({
                        type: AUTH_RESULT.SUCCESS,
                        cur_user: jwt_decode(res.data.token)
                    })
                    history.push('/dashboard')
                }
                else {
                    alert(res.data.status);
                    if (res.data.status === "password incorrect")
                        dispatch({
                            type: AUTH_RESULT.FAILED
                        })
                    else
                        dispatch({
                            type: USER_BLOCKED
                        })
                }
            })
    }
}

export function doLogoutUser(history) {
    return (dispatch) => {
        localStorage.removeItem('jwtToken')
        history.push('/dashboard')
        dispatch({ type: LOGOUT })
    }
}

export function doBlockUser(name) {
    return (dispatch) => {
        axios.post('/api/authController/doBlockUser', { name })
            .then((res) => {
            })
    }
}

export function verifyUser(code) {
    return (dispatch) => {
        axios.get('/api/authController/' + "confirm/" + code).then((response) => {
            return response.data;
        });
    }
};