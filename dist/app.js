"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors = require('cors');
dotenv_1.default.config();
const employeeRoutes_1 = require("./routes/employeeRoutes");
const authRoutes_1 = require("./routes/authRoutes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(body_parser_1.default.json());
app.use('/employees', employeeRoutes_1.employeeRoute);
app.use('/auth', authRoutes_1.loginRoute);
app.listen(PORT, () => console.log(`App is running on port: ${PORT}`));
