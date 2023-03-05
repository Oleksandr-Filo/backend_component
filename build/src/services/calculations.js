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
exports.calculationsServices = void 0;
const Calculation_1 = require("../models/Calculation");
const MAX_HISTORY_LENGTH = 10;
function getMedians(number) {
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
    const primeNumbers = numsArr.reduce((result, element, index) => element
        ? (result.push(index), result)
        : result, []);
    return primeNumbers.length % 2 === 0
        ? [
            primeNumbers[primeNumbers.length / 2 - 1],
            primeNumbers[primeNumbers.length / 2],
        ]
        : [primeNumbers[Math.floor(primeNumbers.length / 2)]];
}
const getAll = () => {
    return Calculation_1.Calculation.findAll({
        order: [['id', 'DESC']],
        logging: false,
    });
};
const create = (value) => __awaiter(void 0, void 0, void 0, function* () {
    const enteredValue = Number(value);
    const medians = getMedians(enteredValue);
    const calculations = yield Calculation_1.Calculation.findAll({ logging: false });
    if (calculations.length === MAX_HISTORY_LENGTH) {
        yield Calculation_1.Calculation.destroy({
            where: { id: calculations[0].id },
            logging: false,
        });
    }
    const newCalculation = yield Calculation_1.Calculation.create({
        enteredValue,
        medians,
    }, { logging: false });
    return newCalculation;
});
const removeAll = () => {
    return Calculation_1.Calculation.destroy({
        truncate: true,
        logging: false,
    });
};
exports.calculationsServices = {
    getAll,
    create,
    removeAll,
    getMedians,
};
