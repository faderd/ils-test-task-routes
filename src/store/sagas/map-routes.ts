import { createAction } from '@reduxjs/toolkit';
import { storeMapRoutes } from '../app-data/app-data';
import { put } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { getUrlFromOsrmOrg } from '../../helpers/common';
import { Destinations } from '../../types/destinations';

export const FETCH_MAP_ROUTES = 'data/fetchMapRoutes';
export const fetchMapRoutes = createAction<Destinations>(FETCH_MAP_ROUTES);

export function* fetchMapRoutesSaga(destinations: {payload: Destinations }): Generator<any, void, AxiosResponse> {
  const url = getUrlFromOsrmOrg(destinations.payload.destinations);

  try {
    const response = yield axios.get(url);

    const mapRoute = { destinationsId: destinations.payload.id, route: response.data}
    yield put(storeMapRoutes(mapRoute));
  } catch (err) {
    console.log(err);
  }
}
