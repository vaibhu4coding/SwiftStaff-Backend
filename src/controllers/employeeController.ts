import { Request, Response } from 'express';
import { Employee, EmployeeModel } from '../models/employeeModel';

const tableName = process.env.DYNAMODB_TABLE_NAME || '';
const employeeModel = new EmployeeModel(tableName);

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const newEmployee: Employee = req.body;
        await employeeModel.createEmployee(newEmployee);
        res.status(200).json({message:'Employee created successfully!'})
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Server error'})
    }
}
export const getEmployeeByEmail = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.params;
        const employee = await employeeModel.getEmployeeByEmail(email)
        if (!employee) res.status(404).json({ message: 'employee not found' })
        else res.json(200).json(employee)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:'Server error'})
    }
} 

