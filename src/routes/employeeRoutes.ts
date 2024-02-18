import express from 'express'
import { createEmployee, getAllEmployees } from '../controllers/employeeController'
import { auth } from '../middlewares/auth'
export const employeeRoute = express.Router()
employeeRoute.post('/', auth, createEmployee)
employeeRoute.get('/',auth,getAllEmployees)
