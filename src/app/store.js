import { configureStore } from '@reduxjs/toolkit'
import FirstReducer from '../redux/reducers/FirstReducer'
import PelletReducer from '../redux/reducers/PelletReducer'
import AdminReducer from '../redux/reducers/AdminReducer'
import TeamOwnerReducer from '../redux/reducers/TeamOwnerReducer'
import LeagueManagerReducer from '../redux/reducers/LeagueManagerReducer'

export default configureStore({
    reducer: {
        FirstReducer: FirstReducer,
        PelletReducer: PelletReducer,
        AdminReducer: AdminReducer,
        TeamOwnerReducer: TeamOwnerReducer,
        LeagueManagerReducer: LeagueManagerReducer
    }
})