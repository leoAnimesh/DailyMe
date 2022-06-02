import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import userSlice from '../redux/userSlice';
import { combineReducers } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import tasksSlice from '../redux/tasksSlice';
import appLinksSlice from '../redux/appLinksSlice';
import focusSlice  from '../redux/FocusSlice';

const rootReducer = combineReducers({
  user: userSlice,
  tasks: tasksSlice,
  apps: appLinksSlice,
  focus : focusSlice
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
export default store;
