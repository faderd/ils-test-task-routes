import { MutableRefObject, useEffect, useRef, useState } from 'react';
import leaflet, { Map } from 'leaflet';

function useMap(mapRef: MutableRefObject<HTMLElement | null>): Map | null {

    const [map, setMap] = useState<Map | null>(null);
    const isRenderedRef = useRef<boolean>(false);

    useEffect(() => {
        let isMounted = true;

        if (!isMounted) { return; }

        if (mapRef.current !== null && !isRenderedRef.current) {
            const instance = leaflet.map(mapRef.current, {
                // center: {
                    // lat: startLocation.latitude,
                    // lng: startLocation.longitude,
                // },
                // zoom: startLocation.zoom,
            });

            leaflet
                .tileLayer(
                    'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
                    {
                        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
                    },
                )
                .addTo(instance);

            setMap(instance);
            isRenderedRef.current = true;
        }
    }, [mapRef, map]);

    return map;
}

export default useMap;