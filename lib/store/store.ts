import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, } from "redux-persist";
import localStorage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import authReducer from './auth/authSlice';
import casesReducer from './cases/casesSlice';
import documentsReducer from './documents/documentsSlice'
import timeTrackingReducer from './timeTracking/timeTrackingSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    documents: documentsReducer,
    cases: casesReducer,
    timeTracking: timeTrackingReducer,
  });
const persistConfig = {
    key: "root",
    storage:localStorage, // Uses localStorage to persist data
    whitelist: ["auth", "documents", "cases", "timeTracking"],
}

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = configureStore({
    reducer:persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: false, // Prevents errors from Redux Persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch