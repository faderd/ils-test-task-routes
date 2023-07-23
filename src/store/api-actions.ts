import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { getPoints } from '../helpers/mock';
import { storeDestinationPoints } from './app-data/app-data';

export const fetchDestinationPoints = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}
>(
  'data/fetchDestinationPoints',
  async (_, { dispatch }) => {
    const data = await getPoints();
    dispatch(storeDestinationPoints(data));
  },
);
