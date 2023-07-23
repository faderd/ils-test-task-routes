import { Col, Row } from 'antd';
import Map from '../../map/map';
import './main-page.less';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { useEffect, useState } from 'react';
import { fetchDestinationPoints } from '../../../store/api-actions';
import { getDestinationsPoints, getMapRoutes } from '../../../store/app-data/selectors';
import { fetchMapRoutes } from '../../../store/sagas/map-routes';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const destinationsList = useAppSelector(getDestinationsPoints);
  const mapRoutes = useAppSelector(getMapRoutes);

  const [activeMapRoute, setActiveMapRoute] = useState<number>(NaN);
  const [processedDestinations, setProcessedDestinations] = useState<number[]>([]);

  useEffect(() => {
    dispatch(fetchDestinationPoints());
  }, [dispatch]);

  useEffect(() => {
    if (!destinationsList) { return; }

    destinationsList.forEach((destinationsItem) => {
      if (processedDestinations.includes(destinationsItem.id)) {
        return;
      }

      const containsElement = mapRoutes.some((mapRoute) => mapRoute.destinationsId === destinationsItem.id);

      if (!containsElement) {
        dispatch(fetchMapRoutes(destinationsItem));
        setProcessedDestinations((prevProcessedDestinations) => [
          ...prevProcessedDestinations,
          destinationsItem.id,
        ]);
      }
    });
  }, [destinationsList, dispatch, mapRoutes, processedDestinations]);

  const getDestinationsItemById = (id: number) => destinationsList.find((destinationsItem) => destinationsItem.id === id)?.destinations;
  const getMapRouteById = (id: number) => mapRoutes.find((mapRoute) => mapRoute.destinationsId === id);

  return (
    <div className='wrapper'>
      <Row>
        <Col span={8}>
          <section>
            <h2>Маршруты</h2>
            <ul className='routes-list'>
              {
                destinationsList.map((destinationsItem) => (
                  <li
                    key={destinationsItem.id}
                    className='routes-list__item'
                    onMouseOver={() => setActiveMapRoute(destinationsItem.id)}
                    onMouseOut={() => setActiveMapRoute(NaN)}
                  >{
                      destinationsItem.destinations.map((point: number[], index) => (
                        <div
                          key={`${point}${index}`}>
                          {`${point[0]} ${point[1]}`}
                        </div>
                      ))
                    }</li>
                ))
              }
            </ul>
          </section>
        </Col>
        <Col span={16}>
          <section>
            <Map destinations={getDestinationsItemById(activeMapRoute)} mapRoute={getMapRouteById(activeMapRoute)}></Map>
          </section>
        </Col>
      </Row>
    </div>
  );
}

export default MainPage;
