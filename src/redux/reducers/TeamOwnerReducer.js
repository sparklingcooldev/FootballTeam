import { TO_GET_PLAYERS } from '../actions/types';

const initState = {
    players: []
};

export default function todo(state = initState, action) {
    switch (action.type) {

        case TO_GET_PLAYERS:
            return {
                ...state,
                players: action.payload,
            }

        default:
            return state
    }
}