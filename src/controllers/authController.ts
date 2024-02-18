import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { EmployeeModel } from "../models/employeeModel";
const tableName = process.env.DYNAMODB_TABLE_NAME_EMPLOYEE || '';
const employeeModel = new EmployeeModel(tableName);
const secret = process.env.JWT_SECRET || ''
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const employee = await employeeModel.getEmployeeByEmail(email);
        if (!employee) {
            return res.status(401).json({message: 'Invalid Credentials'})
        }
        if (employee.department !== 'HR') {
            return res.status(403).json({message:'Forhibidden access'})
        }
        const passwordMatch = await bcrypt.compare(password, employee.password)
        if (!passwordMatch) {
            return res.status(401).json({message:'Invalid Credentials'})
        }

        const token = jwt.sign({
            employeeId: employee.employeeId,
            employeeAge: employee.age,
            employeeDepartment: employee.department,
            employeeEmail: employee.email,
            employeeFName: employee.fName,
            employeeLName: employee.lName,
            employeeSalary: employee.salary
        }, secret, { expiresIn: '1h' })
        res.status(200).json({
            token: token,
            employeeId: employee.employeeId,
            employeeAge: employee.age,
            employeeDepartment: employee.department,
            employeeEmail: employee.email,
            employeeFName: employee.fName,
            employeeLName: employee.lName,
            employeeSalary: employee.salary})
    } catch (error) {
        console.error('Login failed: ', error)
        res.status(500).json({message:'Internal server error'})
    }
}