import { ADMIN_GET_USERS, ADMIN_GET_PLAYERS, ADMIN_GET_TEAM, ADMIN_GET_LEAGUE } from '../actions/types';

const initState = {
    users: [],
    players: [],
    teams: [],
    leagues: [],
};

export default function todo(state = initState, action) {
    switch (action.type) {

        case ADMIN_GET_USERS:
            return {
                ...state,
                users: action.payload
            }
        case ADMIN_GET_PLAYERS:
            return {
                ...state,
                players: action.payload
            }
        case ADMIN_GET_TEAM:
            console.log(action.payload);
            return {
                ...state,
                teams: action.payload
            }
        case ADMIN_GET_LEAGUE:
            return {
                ...state,
                leagues: action.payload
            }
        default:
            return state
    }
}