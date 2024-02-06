"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeRoute = void 0;
const express_1 = __importDefault(require("express"));
const employeeController_1 = require("../controllers/employeeController");
const auth_1 = require("../middlewares/auth");
exports.employeeRoute = express_1.default.Router();
exports.employeeRoute.post('/', auth_1.auth, employeeController_1.createEmployee);
