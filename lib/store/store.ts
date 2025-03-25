import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import casesReducer from './cases/casesSlice';
import documentsReducer from './documents/documentsSlice'
import timeTrackingReducer from './timeTracking/timeTrackingSlice'

export const store  = configureStore({
    reducer:{
        auth:authReducer,
        cases:casesReducer,
        documents:documentsReducer,
        timeTracking:timeTrackingReducer,


    }

});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch