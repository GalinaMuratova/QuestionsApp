import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { questionsReducer } from '../features/questions/questionsSlice';
import { usersReducer } from '../features/users/usersSlice';
import storage from "redux-persist/lib/storage";
import persistReducer from 'redux-persist/es/persistReducer';
import { FLUSH, PAUSE, PERSIST, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';

const usersPersistConfig = {
  key: 'questionApp:users',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  questions: questionsReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);