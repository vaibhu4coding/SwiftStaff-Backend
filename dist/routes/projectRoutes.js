"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectRoute = void 0;
const express_1 = __importDefault(require("express"));
const projectController_1 = require("../controllers/projectController");
const auth_1 = require("../middlewares/auth");
exports.projectRoute = express_1.default.Router();
exports.projectRoute.post('/', auth_1.auth, projectController_1.createProject);
exports.projectRoute.get('/', auth_1.auth, projectController_1.getAllProjects);
