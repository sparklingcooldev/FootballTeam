import { TO_GET_PLAYERS, TO_REFRESH, TO_GET_OFFERCNT, TO_GET_USER } from './types'
import axios from 'axios'

export function GetPlayer(_id, type, criteria) {
    return (dispatch) => {
        axios.post('/api/TOController/GetPlayer', { _id, type, criteria })
            .then((res) => {
                dispatch({
                    type: TO_GET_PLAYERS,
                    payload: res.data
                })
            })
    }
}

export function GetUser(_id) {
    return (dispatch) => {
        axios.post('/api/TOController/GetUser', { _id })
            .then((res) => {
                dispatch({
                    type: TO_GET_USER,
                    payload: res.data
                })
            })
    }
}

export function GetOfferCnt(_id, type) {
    return (dispatch) => {
        axios.post('/api/TOController/GetOfferCnt', { _id, type })
            .then((res) => {
                dispatch({
                    type: TO_GET_OFFERCNT,
                    payload: res.data
                })
            })
    }
}

export function UpdatePlayer(_id, firstname, lastname, country, sellmoney) {
    return (dispatch) => {
        axios.post('/api/TOController/UpdatePlayer', { _id, firstname, lastname, country, sellmoney })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: TO_REFRESH });
            })
    }
}

export function ChangeStatus(_id, value) {
    return (dispatch) => {
        axios.post('/api/TOController/ChangeStatus', { _id, value })
            .then((res) => {
                if (res.data.success)
                    dispatch({ type: TO_REFRESH });
            })
    }
}

export function OfferPlayer(playerid, teamid) {
    return (dispatch) => {
        axios.post('/api/TOController/OfferPlayer', { playerid, teamid })
            .then((res) => {
                dispatch({ type: TO_REFRESH });
            })
    }
}

export function StopOffer(playerid, teamid) {
    return (dispatch) => {
        axios.post('/api/TOController/StopOffer', { playerid, teamid })
            .then((res) => {
                dispatch({ type: TO_REFRESH });
            })
    }
}

export function AcceptTerm(playerid, teamid, teamid1) {
    return (dispatch) => {
        axios.post('/api/TOController/AcceptTerm', { playerid, teamid, teamid1 })
            .then((res) => {
                dispatch({ type: TO_REFRESH });
            })
    }
}