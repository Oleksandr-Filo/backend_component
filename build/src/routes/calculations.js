"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculationsRouter = void 0;
const express_1 = __importDefault(require("express"));
const calculations_1 = require("../controllers/calculations");
exports.calculationsRouter = express_1.default.Router();
exports.calculationsRouter.get('/', calculations_1.calculationsControllers.getAll);
exports.calculationsRouter.post('/', express_1.default.json(), calculations_1.calculationsControllers.create);
exports.calculationsRouter.delete('/', calculations_1.calculationsControllers.removeAll);
