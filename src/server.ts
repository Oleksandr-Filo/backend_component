import express from 'express';
import cors from 'cors';

const PORT = 5000;

interface Calculation {
  id: number;
  enteredValue: number;
  medians: number[];
}

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

const app = express();

app.use(cors());

app.get('/calculations', (req, res) => {
  res.send(calculations);
});

app.post('/calculations', express.json(), (req, res) => {
  const { enteredValue } = req.body;

  if (!enteredValue) {
    res.sendStatus(400);

    return;
  }

  if (typeof enteredValue !== 'string') {
    res.sendStatus(422);

    return;
  }

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

  res.statusCode = 201;
  res.send(newCalculation);
});

app.delete('/calculations/:calculationId', (req, res) => {
  const { calculationId } = req.params;
  const foundCalculation = calculations.find(calculation => (
    calculation.id === +calculationId
  ));

  if (!foundCalculation) {
    res.sendStatus(404);

    return;
  }

  const filteredCalculations = calculations.filter(calculation => (
    calculation.id !== +calculationId
  ))

  calculations = filteredCalculations;

  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})
