import { Sequelize } from 'sequelize-typescript';
import { models } from '../models';

const URI = 'postgres://oleksandr.filo.job:1rUcqx8ihSva@ep-polished-limit-522964.eu-central-1.aws.neon.tech/neondb';

export const dbinit = () => {
  return new Sequelize(
    URI,
    {
      models,
      dialectOptions: {
        ssl: true,
      }
    }
  );
};
