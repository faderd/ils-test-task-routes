import { LatLngExpression } from 'leaflet';

export type MapRoute = {
  destinationsId: number,
  route: {
    code: string,
    routes: {
      geometry: {
        coordinates: LatLngExpression[],
        type: string
      }
    }[]
  }
};
