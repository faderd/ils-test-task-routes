import { store } from '../store';
import { Destinations } from './destinations';
import { MapRoute } from './map-route';

export type AppData = {
    destinationsList: Destinations[],
    mapRoutes: MapRoute[],
};

export type AppDispatch = typeof store.dispatch;

export type State = ReturnType<typeof store.getState>;