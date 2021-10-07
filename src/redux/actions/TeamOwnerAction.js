import { TO_GET_PLAYERS } from './types'
import axios from 'axios'

export function GetPlayer(_id, type) {
    return (dispatch) => {
        axios.post('/api/TOController/GetPlayer', { _id, type })
            .then((res) => {
                dispatch({
                    type: TO_GET_PLAYERS,
                    payload: res.data
                })
            })
    }
}