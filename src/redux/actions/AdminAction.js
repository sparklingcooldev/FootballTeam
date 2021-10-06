import { ADMIN_GET_USERS, ADMIN_GET_PLAYERS, ADMIN_GET_TEAM, ADMIN_GET_LEAGUE } from './types'
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

export function AddPlayer(firstname, lastname) {
    return (dispatch) => {
        axios.post('/api/adminController/AddPlayer', { firstname, lastname })
            .then((res) => {
            })
    }
}

export function DeletePlayer(_id) {
    return (dispatch) => {
        axios.post('/api/adminController/DeletePlayer', { _id })
            .then((res) => {
            })
    }
}

export function ChangePlayerTeam(_id, teamid) {
    return (dispatch) => {
        axios.post('/api/adminController/ChangePlayerTeam', { _id, teamid })
            .then((res) => {

            })
    }
}

//!!!!!!!!!!!!!!!!!!!!!!!TEAMOWNER!!!!!!!!!!!!!!!!!!!!!!!

export function AddTeam(username, password) {
    return (dispatch) => {
        axios.post('/api/adminController/AddTeam', { username, password })
            .then((res) => {
                
            })
    }
}

export function DeleteTeam(_id) {
    return (dispatch) => {
        axios.post('/api/adminController/DeleteTeam', { _id })
            .then((res) => {
            })
    }
}

export function ChangeTeamLeague(_id, leagueid) {
    return (dispatch) => {
        axios.post('/api/adminController/ChangeTeamLeague', { _id, leagueid })
            .then((res) => {

            })
    }
}