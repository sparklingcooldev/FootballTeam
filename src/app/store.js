import { configureStore } from '@reduxjs/toolkit'
import FirstReducer from '../redux/reducers/FirstReducer'
import PelletReducer from '../redux/reducers/PelletReducer'
import AdminReducer from '../redux/reducers/AdminReducer'

export default configureStore({
    reducer: {
        FirstReducer: FirstReducer,
        PelletReducer: PelletReducer,
        AdminReducer: AdminReducer,
    }
})