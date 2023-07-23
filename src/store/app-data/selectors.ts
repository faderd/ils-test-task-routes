import { NameSpace } from '../../const';
import { State } from '../../types/state';

export const getDestinationsPoints = (state: State) => state[NameSpace.Data].destinationsList;
export const getMapRoutes = (state: State) => state[NameSpace.Data].mapRoutes;
