import express from 'express'
import { getEmployeeById, createEmployee } from '../controllers/employeeController'
export const employeeRoute = express.Router()
employeeRoute.post('/', createEmployee)
employeeRoute.get('/:employeeId',getEmployeeById)