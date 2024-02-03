import { DynamoDB } from 'aws-sdk';
const dynamoDB = new DynamoDB.DocumentClient()
export interface Employee {
    employeeId: string;
    fName: string;
    lName: string;
}
export class EmployeeModel {
    private tableName: string;
    constructor(tableName: string) {
        this.tableName = tableName
    }
    async createEmployee(employee: Employee): Promise<void> {
        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item:employee
        }
        await dynamoDB.put(params).promise()
    }
    async getEmployeeById(employeeId: string): Promise<Employee | null> {
        const params: DynamoDB.DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: { employeeId },
        };
        const result = await dynamoDB.get(params).promise();
        return result.Item as Employee | null;
    }
}