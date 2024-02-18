import express from "express";
import { createProject, getAllProjects } from '../controllers/projectController'
import { auth } from "../middlewares/auth";
export const projectRoutes = express.Router()
projectRoutes.get('/', auth,getAllProjects)
projectRoutes.post('/',auth,createProject)