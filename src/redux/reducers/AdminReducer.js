import { ADMIN_GET_USERS, ADMIN_GET_PLAYERS, ADMIN_GET_TEAM, ADMIN_GET_LEAGUE, ADMIN_REFRESH } from '../actions/types';

const initState = {
    users: [],
    players: [],
    teams: [],
    leagues: [],
    refresh: 1,
};

export default function todo(state = initState, action) {
    switch (action.type) {

        case ADMIN_GET_USERS:
            return {
                ...state,
                users: action.payload,
                refresh: 0
            }
        case ADMIN_GET_PLAYERS:
            return {
                ...state,
                players: action.payload,
                refresh: 0
            }
        case ADMIN_GET_TEAM:
            return {
                ...state,
                teams: action.payload,
                refresh: 0
            }
        case ADMIN_GET_LEAGUE:
            console.log(action.payload);
            return {
                ...state,
                leagues: action.payload,
                refresh: 0
            }
        case ADMIN_REFRESH:
            return {
                ...state,
                refresh: 1
            }
        default:
            return state
    }
}