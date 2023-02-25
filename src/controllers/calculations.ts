import { calculationsServices } from '../services/calculations';
import { Request, Response } from 'express';

const getAll = async (req: Request, res: Response) => {
  const calculations = await calculationsServices.getAll();

  res.send(calculations);
};

const create = async (req: Request, res: Response) => {
  const { enteredValue } = req.body;

  if (!enteredValue) {
    res.sendStatus(400);

    return;
  }

  if (typeof enteredValue !== 'string') {
    res.sendStatus(422);

    return;
  }

  const newCalculation = await calculationsServices.create(enteredValue);

  res.statusCode = 201;
  res.send(newCalculation);
};

const removeMany = async (req: Request, res: Response) => {
  const { ids } = req.body;

  if (!Array.isArray(ids)) {
    res.sendStatus(422);

    return;
  }

  await calculationsServices.removeMany(ids);
  res.sendStatus(204);
};

export const calculationsControllers = {
  getAll,
  create,
  removeMany,
};
