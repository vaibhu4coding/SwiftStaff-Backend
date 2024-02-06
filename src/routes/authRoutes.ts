import express from 'express'
import { login } from '../controllers/authController'
export const loginRoute = express.Router()
loginRoute.post('/login',login)