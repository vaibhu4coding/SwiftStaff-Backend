"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const employeeModel_1 = require("../models/employeeModel");
const tableName = process.env.DYNAMODB_TABLE_NAME_EMPLOYEE || '';
const employeeModel = new employeeModel_1.EmployeeModel(tableName);
const secret = process.env.JWT_SECRET || '';
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const employee = await employeeModel.getEmployeeByEmail(email);
        if (!employee) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        if (employee.department !== 'HR') {
            return res.status(403).json({ message: 'Forhibidden access' });
        }
        const passwordMatch = await bcrypt_1.default.compare(password, employee.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid Credentials' });
        }
        const token = jsonwebtoken_1.default.sign({
            employeeId: employee.employeeId,
            employeeAge: employee.age,
            employeeDepartment: employee.department,
            employeeEmail: employee.email,
            employeeFName: employee.fName,
            employeeLName: employee.lName,
            employeeSalary: employee.salary
        }, secret, { expiresIn: '1h' });
        res.status(200).json({
            token: token,
            employeeId: employee.employeeId,
            employeeAge: employee.age,
            employeeDepartment: employee.department,
            employeeEmail: employee.email,
            employeeFName: employee.fName,
            employeeLName: employee.lName,
            employeeSalary: employee.salary
        });
    }
    catch (error) {
        console.error('Login failed: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.login = login;
