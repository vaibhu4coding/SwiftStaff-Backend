import express from 'express'
import { createEmployee } from '../controllers/employeeController'
import { auth } from '../middlewares/auth'
export const employeeRoute = express.Router()
employeeRoute.post('/', auth,createEmployee)
