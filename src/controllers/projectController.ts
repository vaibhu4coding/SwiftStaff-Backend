import { Request, Response } from "express";
import { Project, ProjectModel } from "../models/projectModel";
const tableName = process.env.DYNAMODB_TABLE_NAME || ''
const projectModel = new ProjectModel(tableName)

export const createProject = async (req: Request, res: Response) => {
    try {
        const projectData: Project = req.body
        await projectModel.createProject(projectData)
        res.status(201).json({message:'Project created successfully'})
    } catch (error) {
        console.error('Error creating project:', error)
        res.status(500).json({message: 'Internal server error'})
    }
}
export const getAllProjects = async (req: Request, res: Response) => {
    try {
        const filters = req.query
        const projects = await projectModel.getAllProjects(filters)
        res.status(200).json(projects)
    } catch (error) {
        console.error("Error fetching projects:", error)
        res.status(500).json({message:"Internal server error"})
    }
}