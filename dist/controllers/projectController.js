"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProjects = exports.createProject = void 0;
const projectModel_1 = require("../models/projectModel");
const tableName = process.env.DYNAMODB_TABLE_NAME_PROJECT || '';
const projectModel = new projectModel_1.ProjectModel(tableName);
const createProject = async (req, res) => {
    try {
        const projectData = req.body;
        await projectModel.createProject(projectData);
        res.status(201).json({ message: 'Project created successfully' });
    }
    catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.createProject = createProject;
const getAllProjects = async (req, res) => {
    try {
        const { department, status } = req.query;
        const projects = await projectModel.getAllProjects(department, status);
        res.status(200).json(projects);
    }
    catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
exports.getAllProjects = getAllProjects;
