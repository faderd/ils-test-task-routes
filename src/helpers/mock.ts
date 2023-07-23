import { Destinations } from '../types/destinations';

export const getPoints = async (): Promise<Destinations[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const destinationsList = [
        {
          id: 1,
          destinations: [
            [59.84660399, 30.29496392],
            [59.82934196, 30.42423701],
            [59.83567701, 30.38064206]]
        },
        {
          id: 2,
          destinations: [
            [59.82934196, 30.42423701],
            [59.82761295, 30.41705607],
            [59.84660399, 30.29496392]]
        },
        {
          id: 3,
          destinations: [
            [59.83567701, 30.38064206],
            [59.84660399, 30.29496392],
            [59.82761295, 30.41705607]]
        }
      ];
      resolve(destinationsList);
    }, 1000);

  });
};
