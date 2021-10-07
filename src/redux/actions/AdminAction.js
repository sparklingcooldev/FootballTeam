import { ADMIN_GET_USERS, ADMIN_GET_PLAYERS, ADMIN_GET_TEAM, ADMIN_GET_LEAGUE, ADMIN_REFRESH } from './types'
import axios from 'axios'

export function doGetWholeUser() {
    return (dispatch) => {
        axios.get('/api/adminController/doGetWholeUser')
            .then((res) => {
                dispatch({
                    type: ADMIN_GET_USERS,
                    payload: res.data
                })
            })
    }
}

export function doGetWholePlayer() {
    return (dispatch) => {
        axios.get('/api/adminController/doGetWholePlayer')
            .then((res) => {
                dispatch({
                    type: ADMIN_GET_PLAYERS,
                    payload: res.data
                })
            })
    }
}

export function doGetWholeTeam() {
    return (dispatch) => {
        axios.post('/api/adminController/doGetWholeTeam')
            .then((res) => {
                dispatch({
                    type: ADMIN_GET_TEAM,
                    payload: res.data
                })
            })
    }
}

export function doGetWholeLeague() {
    return (dispatch) => {
        axios.post('/api/adminController/doGetWholeLeague')
            .then((res) => {
                dispatch({
                    type: ADMIN_GET_LEAGUE,
                    payload: res.data
                })
            })
    }
}

export function setUserPermission(id, permission) {
    return (dispatch) => {
        axios.post('/api/adminController/setUserPermission', { id, permission })
            .then((res) => {
            })
    }
}

//!!!!!!!!!!!!!!!!!!!!!!!PLAYER!!!!!!!!!!!!!!!!!!!!!!!

export function AddPlayer(firstname, lastname, price) {
    return (dispatch) => {
        axios.post('/api/adminController/AddPlayer', { firstname, lastname, price })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: ADMIN_REFRESH });
            })
    }
}

export function DeletePlayer(_id) {
    return (dispatch) => {
        axios.post('/api/adminController/DeletePlayer', { _id })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: ADMIN_REFRESH });
            })
    }
}

export function UpdatePlayer(_id, firstname, lastname, price) {
    return (dispatch) => {
        axios.post('/api/adminController/UpdatePlayer', { _id, firstname, lastname, price })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: ADMIN_REFRESH });
            })
    }
}

export function ChangePlayerTeam(_id, teamid) {
    return (dispatch) => {
        axios.post('/api/adminController/ChangePlayerTeam', { _id, teamid })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: ADMIN_REFRESH });
            })
    }
}

//!!!!!!!!!!!!!!!!!!!!!!!TEAMOWNER!!!!!!!!!!!!!!!!!!!!!!!

export function AddTeam(username, password) {
    return (dispatch) => {
        axios.post('/api/adminController/AddTeam', { username, password })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: ADMIN_REFRESH });
            })
    }
}

export function DeleteTeam(_id) {
    return (dispatch) => {
        axios.post('/api/adminController/DeleteTeam', { _id })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: ADMIN_REFRESH });
            })
    }
}

export function ChangeTeamLeague(_id, leagueid) {
    return (dispatch) => {
        axios.post('/api/adminController/ChangeTeamLeague', { _id, leagueid })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: ADMIN_REFRESH });
            })
    }
}

export function UpgradeLeague(_id) {
    return (dispatch) => {
        axios.post('/api/adminController/UpgradeLeague', { _id })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: ADMIN_REFRESH });
            })
    }
}

export function UpdateTeam(_id, name) {
    return (dispatch) => {
        axios.post('/api/adminController/UpdateTeam', { _id, name })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: ADMIN_REFRESH });
            })
    }
}

//!!!!!!!!!!!!!!!!LEAGUEMANAGER!!!!!!!!!!!!!!!

export function AddLeague(username, password) {
    return (dispatch) => {
        axios.post('/api/adminController/AddLeague', { username, password })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: ADMIN_REFRESH });
            })
    }
}

export function DeleteLeague(_id) {
    return (dispatch) => {
        axios.post('/api/adminController/DeleteLeague', { _id })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: ADMIN_REFRESH });
            })
    }
}

export function UpdateLeague(_id, name) {
    return (dispatch) => {
        axios.post('/api/adminController/UpdateLeague', { _id, name })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: ADMIN_REFRESH });
            })
    }
}