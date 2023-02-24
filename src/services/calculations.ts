import { Calculation } from '../types';

let calculations: Calculation[] = [];
let largestId = 0;

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
      element ? (result.push(index), result) : result,
    []
  );

  return primeNumbers.length % 2 === 0
    ? [
      primeNumbers[primeNumbers.length / 2 - 1],
      primeNumbers[primeNumbers.length / 2],
    ]
    : [primeNumbers[Math.floor(primeNumbers.length / 2)]];
}

const getAll = () => calculations;

const findById = (calculationId: number) => {
  const foundCalculation = calculations.find(calculation => (
    calculation.id === calculationId
  ));

  return foundCalculation || null;
};

const create = (enteredValue: string) => {
  largestId++;

  const newCalculation: Calculation = {
    id: largestId,
    enteredValue: +enteredValue,
    medians: getMedians(+enteredValue),
  };

  if (calculations.length === 10) {
    calculations.pop();
  }

  calculations.unshift(newCalculation);

  return newCalculation;
};

const removeMany = (ids: number[]) => {
  calculations = calculations.filter(calculation => (
    !ids.includes(calculation.id)
  ));
};

export const calculationsServices = {
  getAll,
  findById,
  create,
  removeMany,
};
