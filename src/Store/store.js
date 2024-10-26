import { configureStore } from '@reduxjs/toolkit';
import homeSlice from './homeSlice';
import userSlice from './userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  home: homeSlice,
  user: userSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
