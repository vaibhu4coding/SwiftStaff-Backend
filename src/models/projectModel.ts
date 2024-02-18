import { DynamoDB } from 'aws-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
const dynamoDB = new DynamoDB.DocumentClient()
export interface Project {
    projectId: string,
    name: string,
    description: string,
    startDate: string,
    endDate: string,
    status: string,
    department: string,
    employees: string[]
}
export class ProjectModel{
    private tableName: string;
    constructor(tableName: string) {
        this.tableName = tableName
    }

    async createProject(project: Project): Promise<void> {
        const params: DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: project
        }
        await dynamoDB.put(params).promise()
    }

    async getAllProjects(filters:any):Promise<Project[]> {
        const params: DocumentClient.ScanInput = {
            TableName:this.tableName
        }
        if (filters) {
            const filterExpression = []
            const expressionAttributeValues:any = {}
            if (filters.department) {
                filterExpression.push('department=:department')
                expressionAttributeValues[':department'] = filters.department
            }
            if (filters.startDate && filters.endDate) {
                filterExpression.push('startDate BETWEEN :startDate AND :endDate')
                expressionAttributeValues[':startDate'] = filters.startDate
                expressionAttributeValues[':endDate'] = filters.endDate
            }
            if (filters.status) {
                filterExpression.push('#status = :status')
                expressionAttributeValues[':status'] = filters.status
            }
            params.FilterExpression = filterExpression.join(' AND ')
            params.ExpressionAttributeValues = expressionAttributeValues
            params.ExpressionAttributeNames = { '#status': 'status' }
            
        }
        const result = await dynamoDB.scan(params).promise()
        return result.Items as Project[]
    }
}