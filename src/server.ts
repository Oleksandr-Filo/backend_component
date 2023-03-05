import express from 'express';
import cors from 'cors';
import { calculationsRouter } from './routes/calculations';
import { dbinit } from './utils/dbinit';

const PORT = process.env.PORT || 5000;

export const app = express();

dbinit();

app.use(cors());

app.use('/calculations', calculationsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
