import { Calculation } from './models/Calculation';
import { dbinit } from './utils/dbinit';

const sync = async () => {
  dbinit();

  Calculation.sync({ alter: true });
};

sync();
