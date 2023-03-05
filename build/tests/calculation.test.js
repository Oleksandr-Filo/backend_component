"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("@jest-mock/express");
const calculations_1 = require("../src/services/calculations");
const calculations_2 = require("../src/controllers/calculations");
let calculations = [];
const { getMedians } = calculations_1.calculationsServices;
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
    const { res, mockClear } = (0, express_1.getMockRes)();
    let spyGetAll;
    let spyCreate;
    let spyRemoveAll;
    beforeEach(() => {
        spyGetAll = jest.spyOn(calculations_1.calculationsServices, 'getAll')
            .mockImplementation(() => Promise.resolve(calculations.reverse()));
        spyCreate = jest.spyOn(calculations_1.calculationsServices, 'create')
            .mockImplementation((value) => {
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
            };
            calculations.push(newCalculation);
            return Promise.resolve(newCalculation);
        });
        spyRemoveAll = jest.spyOn(calculations_1.calculationsServices, 'removeAll')
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
        it('should return an empty array if no calculations', () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, express_1.getMockReq)();
            yield calculations_2.calculationsControllers.getAll(req, res);
            expect(spyGetAll)
                .toHaveBeenCalledTimes(1);
            expect(res.statusCode)
                .toEqual(200);
            expect(res.send)
                .toHaveBeenCalledWith([]);
            expect(res.send)
                .toHaveBeenCalledTimes(1);
        }));
        it('should return all calculations', () => __awaiter(void 0, void 0, void 0, function* () {
            let enteredValue = '10';
            let req = (0, express_1.getMockReq)({ body: { enteredValue } });
            let res = (0, express_1.getMockRes)().res;
            yield calculations_2.calculationsControllers.create(req, res);
            mockClear();
            enteredValue = '18';
            req = (0, express_1.getMockReq)({ body: { enteredValue } });
            res = (0, express_1.getMockRes)().res;
            yield calculations_2.calculationsControllers.create(req, res);
            mockClear();
            req = (0, express_1.getMockReq)();
            res = (0, express_1.getMockRes)().res;
            yield calculations_2.calculationsControllers.getAll(req, res);
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
        }));
    });
    describe('createCalculation', () => {
        it('should create a new calculation', () => __awaiter(void 0, void 0, void 0, function* () {
            const enteredValue = '14';
            const mediansForEnteredValue = [5, 7];
            const createdCalculationForCheck = {
                id: 3,
                enteredValue: +enteredValue,
                medians: mediansForEnteredValue,
            };
            const req = (0, express_1.getMockReq)({ body: { enteredValue } });
            yield calculations_2.calculationsControllers.create(req, res);
            expect(spyCreate)
                .toHaveBeenCalledTimes(1);
            expect(res.statusCode)
                .toEqual(201);
            expect(res.send)
                .toHaveBeenCalledWith(createdCalculationForCheck);
            expect(res.send)
                .toHaveBeenCalledTimes(1);
        }));
        it('should return 400 if enteredValue is not provided', () => __awaiter(void 0, void 0, void 0, function* () {
            const req = (0, express_1.getMockReq)();
            yield calculations_2.calculationsControllers.create(req, res);
            expect(res.sendStatus)
                .toHaveBeenCalledWith(400);
            expect(res.send)
                .not.toHaveBeenCalled();
        }));
        it('should return 422 if enteredValue is not a string', () => __awaiter(void 0, void 0, void 0, function* () {
            const enteredValue = 14;
            const req = (0, express_1.getMockReq)({ body: { enteredValue } });
            yield calculations_2.calculationsControllers.create(req, res);
            expect(res.sendStatus)
                .toHaveBeenCalledWith(422);
            expect(res.send)
                .not.toHaveBeenCalled();
        }));
    });
    describe('clearHistory', () => {
        it('should clear hisory of calculations', () => __awaiter(void 0, void 0, void 0, function* () {
            let req = (0, express_1.getMockReq)();
            let res = (0, express_1.getMockRes)().res;
            yield calculations_2.calculationsControllers.removeAll(req, res);
            expect(spyRemoveAll)
                .toHaveBeenCalledTimes(1);
            expect(res.sendStatus)
                .toHaveBeenCalledWith(204);
            mockClear();
            req = (0, express_1.getMockReq)();
            res = (0, express_1.getMockRes)().res;
            yield calculations_2.calculationsControllers.getAll(req, res);
            expect(res.send)
                .toHaveBeenCalledWith([]);
            mockClear();
        }));
    });
});
