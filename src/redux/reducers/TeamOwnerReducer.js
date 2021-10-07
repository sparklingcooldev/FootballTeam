import { TO_GET_PLAYERS, TO_REFRESH, TO_GET_OFFERCNT, TO_GET_USER } from '../actions/types';

const initState = {
    players: [],
    offercnt: 0,
    refresh: 1,
    user: null
};

export default function todo(state = initState, action) {
    switch (action.type) {

        case TO_GET_PLAYERS:
            return {
                ...state,
                players: action.payload,
                refresh: 0,
            }
        case TO_GET_OFFERCNT:
            return {
                ...state,
                offercnt: action.payload,
                refresh: 0,
            }
        case TO_GET_USER:
            return {
                ...state,
                user: action.payload,
                refresh: 0,
            }
        case TO_REFRESH:
            return {
                ...state,
                refresh: 1,
            }
        default:
            return state
    }
}