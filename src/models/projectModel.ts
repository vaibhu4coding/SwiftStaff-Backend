import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const dynamoDB = new DynamoDB.DocumentClient();

export interface Project {
    projectId: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
    department: string;
    // employees: string[]; // Assuming employee IDs are stored as strings
}

export class ProjectModel {
    private tableName: string;

    constructor(tableName: string) {
        this.tableName = tableName;
    }

    async createProject(project: Project): Promise<void> {
        const params: DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: project
        };

        await dynamoDB.put(params).promise();
    }

    async getAllProjects(department?: string, status?: string): Promise<Project[]> {
        const params: DocumentClient.ScanInput = {
            TableName: this.tableName
        };
    
        if (department || status) {
            const filterExpression: string[] = [];
            const expressionAttributeValues: DocumentClient.ExpressionAttributeValueMap = {};
    
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
        return result.Items as Project[];
    }
    
}
