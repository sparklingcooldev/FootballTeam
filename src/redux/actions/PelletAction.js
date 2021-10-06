import { PELLET_GET, PELLET_TYPES_GET } from './types'
import axios from 'axios'

export function doGetWholePellet() {
    return (dispatch) => {
        axios.get('/api/pelletController/doGetWholePellet')
        .then((res) => {
            dispatch({
                type    : PELLET_GET,
                pellets : res.data
            })
        })
    }
}

export function doGetWholePelletTypes() {
    return (dispatch) => {
        axios.get('/api/pelletController/doGetWholePelletTypes')
        .then((res) => {
            dispatch({
                type            : PELLET_TYPES_GET,
                pelletTypes     : res.data
            })
        })
    }
}