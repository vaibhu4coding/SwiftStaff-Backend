"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDB = new aws_sdk_1.DynamoDB.DocumentClient();
class ProjectModel {
    constructor(tableName) {
        this.tableName = tableName;
    }
    async createProject(project) {
        const params = {
            TableName: this.tableName,
            Item: project
        };
        await dynamoDB.put(params).promise();
    }
    async getAllProjects(department, status) {
        const params = {
            TableName: this.tableName
        };
        if (department || status) {
            const filterExpression = [];
            const expressionAttributeValues = {};
            if (department) {
                filterExpression.push('#department = :department');
                expressionAttributeValues[':department'] = department;
            }
            if (status) {
                filterExpression.push('#status = :status');
                expressionAttributeValues[':status'] = status;
            }
            params.FilterExpression = filterExpression.join(' AND ');
            params.ExpressionAttributeNames = {
                '#department': 'department',
                '#status': 'status'
            };
            params.ExpressionAttributeValues = expressionAttributeValues;
        }
        const result = await dynamoDB.scan(params).promise();
        return result.Items;
    }
}
exports.ProjectModel = ProjectModel;
