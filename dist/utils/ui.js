"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ui = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.ui = {
    label: (s) => chalk_1.default.bold.hex('#f5f5f5')(s), // brand white
    warn: (s) => chalk_1.default.bold.hex('#f5f5f5')(s),
    heading: (s) => chalk_1.default.bold.hex('#a784c2')(s), // brand purple
    ok: (s) => chalk_1.default.bold.hex('#7cb17e')(s), // brand green #7cb17e
    err: (s) => chalk_1.default.bold.hex('#f94144')(s), // brand error
    dim: (s) => chalk_1.default.hex('#666666')(s),
    code: (s) => chalk_1.default.hex('#a784c2')(s),
};
//# sourceMappingURL=ui.js.map