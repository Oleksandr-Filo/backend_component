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

const remove = (req: Request, res: Response) => {
  const calculationId = Number(req.params.calculationId);
  const foundCalculation = calculationsServices.findById(calculationId);

  if (!foundCalculation) {
    res.sendStatus(404);

    return;
  }

  calculationsServices.remove(calculationId);
  res.sendStatus(204);
};

export const calculationsControllers = {
  getAll,
  create,
  remove,
};
