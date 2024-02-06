import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
const dynamoDB = new DynamoDB.DocumentClient()
import bcrypt from 'bcrypt';
export interface Employee {
    employeeId: string;
    fName: string;
    lName: string;
    email: string;
    password: string;
    department: string;
    age: string;
    salary: number;
}
export class EmployeeModel {
    private tableName: string;
    constructor(tableName: string) {
        this.tableName = tableName
    }
    async createEmployee(employee: Employee): Promise<void> {
        const params: DynamoDB.DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item:{...employee,password:await bcrypt.hash(employee.password,10)}
        }
        await dynamoDB.put(params).promise()
    }
    async getEmployeeByEmail(email: string): Promise<Employee | null> {
        const params: DocumentClient.ScanInput = {
            TableName: this.tableName,
            FilterExpression: 'email= :email',
            ExpressionAttributeValues: {
                ':email':email
            }
        }
        const result = await dynamoDB.scan(params).promise()
        return result.Items ? (result.Items[0] as Employee) : null
    }
    async getAllEmployees(department?: string, minAge?: number, maxAge?: number, minSalary?: number, maxSalary?: number):Promise<Employee[]>  {
        const params: DocumentClient.ScanInput = {
            TableName: this.tableName
        }

        if (department) {
            params.FilterExpression = 'department = :department'
            params.ExpressionAttributeValues = {
                ':department':department
            }
        }

        if (minAge !== undefined && maxAge !== undefined) {
            params.FilterExpression = 'age BETWEEN :minAge AND :maxAge'
            params.ExpressionAttributeValues = {
                ...params.ExpressionAttributeValues,
                ':minAge': minAge,
                'maxAge': maxAge
            }
        }

        if (minSalary !== undefined && maxSalary !== undefined) {
            params.FilterExpression = 'salary BETWEEN :minSalary AND :maxSalary'
            params.ExpressionAttributeValues = {
                ':minSalary': minSalary,
                ':maxSalary': maxSalary
            }
        }

        const result = await dynamoDB.scan(params).promise()
        return result.Items as Employee[];
    }
    
}