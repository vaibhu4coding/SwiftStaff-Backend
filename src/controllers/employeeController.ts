import { Request, Response } from 'express';
import { Employee, EmployeeModel } from '../models/employeeModel';
import { randomUUID } from 'crypto';

const tableName = process.env.DYNAMODB_TABLE_NAME_EMPLOYEE || '';
const employeeModel = new EmployeeModel(tableName);

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
    try {
        const newEmployee: Employee = req.body;
        newEmployee.employeeId = randomUUID()
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
export const getAllEmployees = async (req: Request, res: Response) => {
    try {
        const department = req.query.department as string | undefined
        const minAge = parseInt(req.query.minAge as string) || undefined
        const maxAge = parseInt(req.query.maxAge as string) || undefined
        const minSalary = parseInt(req.query.minSalary as string) || undefined
        const maxSalary = parseInt(req.query.maxSalary as string) || undefined

        const employees = await employeeModel.getAllEmployees(department, minAge, maxAge, minSalary, maxSalary)
        res.status(200).json(employees)
    } catch (error) {
        console.error('Error fetching employees:', error)
        res.status(500).json({message:'Internal server error'})
    }
}
