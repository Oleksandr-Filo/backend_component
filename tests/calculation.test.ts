import { calculationsServices } from '../src/services/calculations';

import supertest from 'supertest';
import { app } from '../src/server';
import { Calculation } from '../src/models/Calculation';

const { getMedians } = calculationsServices;
const api = supertest(app);

describe('Calculation', () => {
  describe('clearHistory', () => {
    it('should return 422 if provided ids is not array', async () => {
      const ids = {};

      await api
        .delete('/calculations')
        .send({ ids })
        .expect(422);
    });

    it('should clear hisory of calculations', async () => {
      const res = await api
        .get('/calculations')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const resBody: Calculation[] = res.body;
      const ids = resBody.map(el => el.id);

      await api
        .delete('/calculations')
        .send({ ids })
        .expect(204);

      const response = await api
        .get('/calculations')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        .toEqual([]);
    });
  });

  describe('getCalculations', () => {
    it('should return empty array if no calculations', async() => {
      const response = await api
        .get('/calculations')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        .toEqual([]);
    });

    it('should return all calculations', async() => {
      const calculations = [
        {
          enteredValue: '10',
        },
        {
          enteredValue: '18',
        },
      ];

      const createdCalculations = await Promise.all(
        calculations.map(
          async(calculation) => {
            const res = await api
              .post('/calculations')
              .send(calculation)
              .expect(201)
              .expect('Content-Type', /application\/json/);

            return res.body;
          },
        ),
      );

      const response = await api
        .get('/calculations')
        .expect(200)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        .toEqual(
          expect.arrayContaining(
            createdCalculations,
          ),
        );
    });
  });

  describe('createCalculation', () => {
    it('should create a new calculation', async () => {
      const enteredValue = '14';
      const medians = [5, 7];

      const response = await api
        .post('/calculations')
        .send({
          enteredValue,
        })
        .expect(201)
        .expect('Content-Type', /application\/json/);

      expect(response.body)
        .toEqual(
          expect.objectContaining({
            id: expect.any(Number),
            enteredValue: +enteredValue,
            medians,
          }),
        );
    });

    it('should return 400 if enteredValue is not provided', async () => {
      await api
        .post('/calculations')
        .send({})
        .expect(400);
    });
  });
});

describe('getMedians', () => {
  it('should return an array', () => {
    const medians = getMedians(10);

    expect(medians)
      .toBeInstanceOf(Array);
  });

  it('should return one median if the length of the array of primes is odd', () => {
    const medians = getMedians(18);

    expect(medians)
      .toEqual([7]);
  });

  it('should return two medians if the length of the array of primes is even', () => {
    const medians = getMedians(10);

    expect(medians)
      .toEqual([3, 5]);
  });
});
