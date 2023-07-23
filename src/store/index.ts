import { configureStore } from '@reduxjs/toolkit';
import { createAPI } from '../services/api';
import { rootReducer } from './root-reducer';
import { redirect } from './middlewares/redirect';
import createSagaMiddleware from '@redux-saga/core';
import { FETCH_MAP_ROUTES, fetchMapRoutesSaga } from './sagas/map-routes';
import { takeEvery } from 'redux-saga/effects';
import { TakeableChannel } from 'redux-saga';


export const api = createAPI();

const sagaMiddleware = createSagaMiddleware();

function* sagas() {
  yield takeEvery(FETCH_MAP_ROUTES as unknown as TakeableChannel<unknown>, fetchMapRoutesSaga);
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      },
    }).concat(redirect).concat(sagaMiddleware),
});

sagaMiddleware.run(sagas);
