"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmployeeById = exports.createEmployee = void 0;
const employeeModel_1 = require("../models/employeeModel");
const tableName = process.env.DYNAMODB_TABLE_NAME || '';
const employeeModel = new employeeModel_1.EmployeeModel(tableName);
const createEmployee = async (req, res) => {
    try {
        const newEmployee = req.body;
        await employeeModel.createEmployee(newEmployee);
        res.status(201).json({ message: 'Employee created successfully!' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createEmployee = createEmployee;
const getEmployeeById = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const employee = await employeeModel.getEmployeeById(employeeId);
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
exports.getEmployeeById = getEmployeeById;
