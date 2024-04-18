import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import createUserSlice from '@slices/createUserSlice/createUserSlice';
import { Action } from 'redux';
import { createTransform, FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

import { State } from './types';

const TransformDate = createTransform(JSON.stringify, (toRehydrate) => {
	return JSON.parse(toRehydrate, (_key, value) => {
		return typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/) ? new Date(value) : value;
	});
});

const persistConfig = {
	key: 'root',
	storage: AsyncStorage,
	transforms: [TransformDate],
};

const rootReducer = combineReducers({
	createUserSlice,
});

export type RootReducer = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer<any, RootReducer & Action>(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: false,
			ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
		});
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
export default store;
