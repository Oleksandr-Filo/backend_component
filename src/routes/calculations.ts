import express from 'express';
import { calculationsControllers } from '../controllers/calculations';

export const calculationsRouter = express.Router();

calculationsRouter.get('/', calculationsControllers.getAll);
calculationsRouter.post('/', express.json(), calculationsControllers.create);
calculationsRouter.delete('/:calculationId', calculationsControllers.remove);
