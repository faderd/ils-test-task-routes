import './map.less';
import { useEffect, useRef } from 'react';
import useMap from '../../hooks/use-map/use-map';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapRoute } from '../../types/map-route';
import { DefaultLocation } from '../../const';

type MapProps = {
  mapRoute?: MapRoute,
  destinations?: number[][]
};

const DEFAULT_ICON = leaflet.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [27, 39],
  iconAnchor: [13.5, 39]
});

const markerGroup = leaflet.layerGroup();
const routeGroup = leaflet.layerGroup();

function Map({ mapRoute, destinations }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef);

  useEffect(() => {
    let isMounted = true;

    if (!isMounted) { return; }

    if (map && !destinations) {
      markerGroup.clearLayers();
      routeGroup.clearLayers();

      map.setView({
        lat: DefaultLocation.Lat,
        lng: DefaultLocation.Lng
      }, DefaultLocation.Zoom);
    }

    if (map && destinations) {
      markerGroup.clearLayers();
      routeGroup.clearLayers();
      markerGroup.addTo(map);
      routeGroup.addTo(map);

      map.setView({
        lat: destinations[0][0],
        lng: destinations[0][1],
      }, 12);

      destinations.forEach((destinationsItem) => {
        leaflet
          .marker([
            destinationsItem[0],
            destinationsItem[1],
          ], {
            icon: DEFAULT_ICON
          })
          .addTo(markerGroup);
      });


      if (mapRoute) {
        const routeCoordinates = mapRoute.route.routes[0].geometry.coordinates as number[][];
        const latLngs = routeCoordinates.map((coord) => leaflet.latLng(coord[1], coord[0]));

        const routeLine = leaflet.polyline(latLngs, { color: 'blue', weight: 4, opacity: 0.5 }).addTo(routeGroup);


        // масштабирование и центрирование карты по маршруту
        map.fitBounds(routeLine.getBounds());
      }
    }

    return () => {
      isMounted = false;
    };
  }, [destinations, map, mapRoute]);
  return (
    <section
      className='map'
      ref={mapRef}
      data-testid='map'
    />
  );
}

export default Map;
