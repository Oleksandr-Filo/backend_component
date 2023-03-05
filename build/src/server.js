"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const calculations_1 = require("./routes/calculations");
const dbinit_1 = require("./utils/dbinit");
const PORT = 5000;
exports.app = (0, express_1.default)();
(0, dbinit_1.dbinit)();
exports.app.use((0, cors_1.default)());
exports.app.use('/calculations', calculations_1.calculationsRouter);
exports.app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
