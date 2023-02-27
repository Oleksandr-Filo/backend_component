import { calculationsServices } from '../services/calculations';
import { Request, Response } from 'express';

const getAll = async (req: Request, res: Response) => {
  const calculations = await calculationsServices.getAll();

  res.statusCode = 200;
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

const removeAll = async (req: Request, res: Response) => {
  await calculationsServices.removeAll();
  
  res.sendStatus(204);
};

export const calculationsControllers = {
  getAll,
  create,
  removeAll,
};
