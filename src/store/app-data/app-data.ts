import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { AppData } from '../../types/state';
import { Destinations } from '../../types/destinations';
import { MapRoute } from '../../types/map-route';

export const getInitialStateAppData = (): AppData => ({
  mapRoutes: [],
  destinationsList: [],
});

export const appData = createSlice({
  name: NameSpace.Data,
  initialState: getInitialStateAppData(),
  reducers: {
    storeMapRoutes: (state, action: PayloadAction<MapRoute>) => {
      const index = state.mapRoutes.findIndex((mapRoute) => mapRoute.destinationsId === action.payload.destinationsId);

      if (index === -1) {
        state.mapRoutes.push(action.payload);
      } else {
        state.mapRoutes[index] = action.payload;
      }
    },
    storeDestinationPoints: (state, action: PayloadAction<Destinations[]>) => {
      state.destinationsList = action.payload;
    },
  },
});

export const { storeMapRoutes, storeDestinationPoints } = appData.actions;
