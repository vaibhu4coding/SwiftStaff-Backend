"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeByEmail = exports.createEmployee = void 0;
const employeeModel_1 = require("../models/employeeModel");
const tableName = process.env.DYNAMODB_TABLE_NAME || '';
const employeeModel = new employeeModel_1.EmployeeModel(tableName);
const createEmployee = async (req, res) => {
    try {
        const newEmployee = req.body;
        await employeeModel.createEmployee(newEmployee);
        res.status(200).json({ message: 'Employee created successfully!' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createEmployee = createEmployee;
const getEmployeeByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        const employee = await employeeModel.getEmployeeByEmail(email);
        if (!employee)
            res.status(404).json({ message: 'employee not found' });
        else
            res.json(200).json(employee);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getEmployeeByEmail = getEmployeeByEmail;
