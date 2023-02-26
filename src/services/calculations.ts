import { Op } from 'sequelize';
import { Calculation } from '../models/Calculation';

const MAX_HISTORY_LENGTH = 10;

function getMedians(number: number) {
  const numsArr = Array.from({ length: number + 1 }, () => true);

  numsArr[0] = false;
  numsArr[1] = false;

  for (let i = 2; i <= Math.floor(Math.sqrt(number)); i++) {
    if (numsArr[i]) {
      for (let j = i + i; j <= number; j += i) {
        numsArr[j] = false;
      }
    }
  }

  const primeNumbers = numsArr.reduce(
    (result: number[], element, index) =>
      element
        ? (result.push(index), result)
        : result,
    []
  );

  return primeNumbers.length % 2 === 0
    ? [
      primeNumbers[primeNumbers.length / 2 - 1],
      primeNumbers[primeNumbers.length / 2],
    ]
    : [primeNumbers[Math.floor(primeNumbers.length / 2)]];
}

const getAll = () => {
  return Calculation.findAll({
    order: [['id', 'DESC']],
    logging: false,
  });
};

const create = async (value: string) => {
  const enteredValue = Number(value);
  const medians = getMedians(enteredValue);
  const calculations = await Calculation.findAll({ logging: false });

  if (calculations.length === MAX_HISTORY_LENGTH) {
    await Calculation.destroy({
      where: { id: calculations[0].id }
    });
  }

  const newCalculation = await Calculation.create({
    enteredValue,
    medians,
  });

  return newCalculation;
};

const removeMany = (ids: number[]) => {
  return Calculation.destroy({
    where: {
      id: {
        [Op.in]: ids,
      }
    }
  });
};

export const calculationsServices = {
  getAll,
  create,
  removeMany,
  getMedians,
};
