import { calculationsServices } from '../services/calculations';
import { Request, Response } from 'express';

const getAll = (req: Request, res: Response) => {
  const calculations = calculationsServices.getAll();

  res.send(calculations);
};

const create = (req: Request, res: Response) => {
  const { enteredValue } = req.body;

  if (!enteredValue) {
    res.sendStatus(400);

    return;
  }

  if (typeof enteredValue !== 'string') {
    res.sendStatus(422);

    return;
  }

  const newCalculation = calculationsServices.create(enteredValue);

  res.statusCode = 201;
  res.send(newCalculation);
};

const removeMany = (req: Request, res: Response) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    res.sendStatus(422);

    return;
  }

  calculationsServices.removeMany(ids);
  res.sendStatus(204);
};

export const calculationsControllers = {
  getAll,
  create,
  removeMany,
};
