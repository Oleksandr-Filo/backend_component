import express from 'express';
import cors from 'cors';
import { calculationsRouter } from './routes/calculations';
import { dbinit } from './utils/dbinit';

const PORT = 5000;

const app = express();

dbinit();

app.use(cors());

app.use('/calculations', calculationsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
