import { LM_REFRESH, LM_GET_TEAM } from './types'
import axios from 'axios'

export function GetTeam(_id) {
    return (dispatch) => {
        axios.post('/api/LMController/GetTeam', { _id })
            .then((res) => {
                dispatch({
                    type: LM_GET_TEAM,
                    payload: res.data
                });
            })
    }
}

export function AddTeam(username, password, _id) {
    return (dispatch) => {
        axios.post('/api/LMController/AddTeam', { username, password , _id})
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: LM_REFRESH });
            })
    }
}

export function DeleteTeam(_id) {
    return (dispatch) => {
        axios.post('/api/LMController/DeleteTeam', { _id })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: LM_REFRESH });
            })
    }
}

export function UpdateTeam(_id, name) {
    return (dispatch) => {
        axios.post('/api/LMController/UpdateTeam', { _id, name })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: LM_REFRESH });
            })
    }
}