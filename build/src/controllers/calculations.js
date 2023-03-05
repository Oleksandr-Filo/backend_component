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
exports.calculationsControllers = void 0;
const calculations_1 = require("../services/calculations");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const calculations = yield calculations_1.calculationsServices.getAll();
    res.statusCode = 200;
    res.send(calculations);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { enteredValue } = req.body;
    if (!enteredValue) {
        res.sendStatus(400);
        return;
    }
    if (typeof enteredValue !== 'string') {
        res.sendStatus(422);
        return;
    }
    const newCalculation = yield calculations_1.calculationsServices.create(enteredValue);
    res.statusCode = 201;
    res.send(newCalculation);
});
const removeAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield calculations_1.calculationsServices.removeAll();
    res.sendStatus(204);
});
exports.calculationsControllers = {
    getAll,
    create,
    removeAll,
};
