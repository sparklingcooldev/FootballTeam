import { LM_GET_TEAM, LM_REFRESH } from '../actions/types';

const initState = {
    teams: [],
    refresh: 1,
};

export default function todo(state = initState, action) {
    switch (action.type) {
        case LM_GET_TEAM:
            return {
                ...state,
                teams: action.payload,
                refresh: 0
            }
        case LM_REFRESH:
            return {
                ...state,
                refresh: 1
            }
        default:
            return state
    }
}