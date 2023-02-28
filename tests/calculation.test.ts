import { getMockReq, getMockRes } from '@jest-mock/express'
import { calculationsServices } from '../src/services/calculations';
import { calculationsControllers } from '../src/controllers/calculations';
import { Calculation } from '../src/models/Calculation';

let calculations: Calculation[] = [];

const { getMedians } = calculationsServices;

describe('getMediansFunction', () => {
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

describe('Calculations', () => {
  const { res, mockClear } = getMockRes();

  let spyGetAll: jest.SpyInstance;
  let spyCreate: jest.SpyInstance;
  let spyRemoveAll: jest.SpyInstance;

  beforeEach(() => {
    spyGetAll = jest.spyOn(calculationsServices, 'getAll')
      .mockImplementation(() => Promise.resolve(calculations.reverse()));

    spyCreate = jest.spyOn(calculationsServices, 'create')
      .mockImplementation((value: string) => {
        const enteredValue = Number(value);
        const medians = getMedians(enteredValue);
        const MAX_HISTORY_LENGTH = 10;

        if (calculations.length === MAX_HISTORY_LENGTH) {
          calculations.shift();
        }

        const maxId = calculations.length
          ? Math.max(...calculations.map(({ id }) => id))
          : 0;

        const newCalculation = {
          id: maxId + 1,
          enteredValue,
          medians,
        } as Calculation;

        calculations.push(newCalculation);

        return Promise.resolve(newCalculation);
      });

    spyRemoveAll = jest.spyOn(calculationsServices, 'removeAll')
      .mockImplementation(() => {
        calculations = [];

        return Promise.resolve(calculations.length);
      });

    mockClear();
  });

  afterEach(() => {
    spyGetAll.mockRestore();
    spyCreate.mockRestore();
    spyRemoveAll.mockRestore();
  });

  describe('getAllCalculations', () => {
    it('should return an empty array if no calculations', async () => {
      const req = getMockReq();
      
      await calculationsControllers.getAll(req, res);
            
      expect(spyGetAll)
        .toHaveBeenCalledTimes(1);

      expect(res.statusCode)
        .toEqual(200);

      expect(res.send)
        .toHaveBeenCalledWith([]);

      expect(res.send)
        .toHaveBeenCalledTimes(1);
    });

    it('should return all calculations', async () => {
      let enteredValue = '10';
      let req = getMockReq({ body: { enteredValue } });
      let res = getMockRes().res;

      await calculationsControllers.create(req, res);

      mockClear();

      enteredValue = '18';
      req = getMockReq({ body: { enteredValue } });
      res = getMockRes().res;

      await calculationsControllers.create(req, res);

      mockClear();

      req = getMockReq();
      res = getMockRes().res;

      await calculationsControllers.getAll(req, res);
      
      expect(spyGetAll)
        .toHaveBeenCalledTimes(1);

      expect(res.statusCode)
        .toEqual(200);

      expect(res.send)
        .toHaveBeenCalledWith([
          {
            id: 2,
            enteredValue: 18,
            medians: [7],
          },
          {
            id: 1,
            enteredValue: 10,
            medians: [3, 5],
          },
        ]);

      expect(res.send)
        .toHaveBeenCalledTimes(1);

      mockClear();
    });
  });

  describe('createCalculation', () => {
    it('should create a new calculation', async () => {
      const enteredValue = '14';
      const mediansForEnteredValue = [5, 7];
      const createdCalculationForCheck = {
        id: 3,
        enteredValue: +enteredValue,
        medians: mediansForEnteredValue,
      };

      const req = getMockReq({ body: { enteredValue } });

      await calculationsControllers.create(req, res);
      
      expect(spyCreate)
        .toHaveBeenCalledTimes(1);

      expect(res.statusCode)
        .toEqual(201);

      expect(res.send)
        .toHaveBeenCalledWith(createdCalculationForCheck);

      expect(res.send)
        .toHaveBeenCalledTimes(1);
    });

    it('should return 400 if enteredValue is not provided', async () => {
      const req = getMockReq();

      await calculationsControllers.create(req, res);

      expect(res.sendStatus)
        .toHaveBeenCalledWith(400);

      expect(res.send)
        .not.toHaveBeenCalled();
    });

    it('should return 422 if enteredValue is not a string', async () => {
      const enteredValue = 14;

      const req = getMockReq({ body: { enteredValue } });

      await calculationsControllers.create(req, res);

      expect(res.sendStatus)
        .toHaveBeenCalledWith(422);

      expect(res.send)
        .not.toHaveBeenCalled();
    });
  });

  describe('clearHistory', () => {
    it('should clear hisory of calculations', async () => {
      let req = getMockReq();
      let res = getMockRes().res;

      await calculationsControllers.removeAll(req, res);

      expect(spyRemoveAll)
        .toHaveBeenCalledTimes(1);

      expect(res.sendStatus)
        .toHaveBeenCalledWith(204);

      mockClear();

      req = getMockReq();
      res = getMockRes().res;

      await calculationsControllers.getAll(req, res);

      expect(res.send)
        .toHaveBeenCalledWith([]);

      mockClear();
    });
  });
});
