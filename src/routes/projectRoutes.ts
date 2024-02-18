import express from 'express'
import { createProject, getAllProjects } from '../controllers/projectController'
import { auth } from '../middlewares/auth'
export const projectRoute = express.Router()
projectRoute.post('/', auth, createProject)
projectRoute.get('/',auth, getAllProjects)
