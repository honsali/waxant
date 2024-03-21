import { AnyAction, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import notificationMiddleWare from 'core/flow/notificationMiddleWare';
import StateMessage from 'core/flow/StateMessage';
import StateAuth from 'core/security/StateAuth';

const rootReducer = combineReducers({
    stateAuth: StateAuth,
    stateSession: StateMessage,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(notificationMiddleWare),
});

const getStore = () => {
    return store;
};

export type IRootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, AnyAction>;

export default getStore;
