import { configureStore, combineReducers } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import schedules from 'store/schedules';

const reducers = combineReducers({
  schedules: schedules.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // blacklist: ['schedules'],
  whitelist: ['schedules'],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof reducers>;
