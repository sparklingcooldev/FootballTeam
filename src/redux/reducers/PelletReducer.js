import { PELLET_GET, PELLET_TYPES_GET } from '../actions/types';

const initState = {
    pellets: [],
    pelletTypes: [],
};

export default function todo(state = initState, action) {
    switch (action.type) {
        case PELLET_GET:
            return {
                ...state,
                pellets: action.pellets
            }
        case PELLET_TYPES_GET:
            return {
                ...state,
                pelletTypes: action.pelletTypes
            }
        default:
            return state
    }
}