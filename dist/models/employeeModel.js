"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModel = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDB = new aws_sdk_1.DynamoDB.DocumentClient();
const bcrypt_1 = __importDefault(require("bcrypt"));
class EmployeeModel {
    constructor(tableName) {
        this.tableName = tableName;
    }
    async createEmployee(employee) {
        const params = {
            TableName: this.tableName,
            Item: { ...employee, password: await bcrypt_1.default.hash(employee.password, 10) }
        };
        await dynamoDB.put(params).promise();
    }
    async getEmployeeByEmail(email) {
        const params = {
            TableName: this.tableName,
            FilterExpression: 'email= :email',
            ExpressionAttributeValues: {
                ':email': email
            }
        };
        const result = await dynamoDB.scan(params).promise();
        return result.Items ? result.Items[0] : null;
    }
    async getAllEmployees(department, minAge, maxAge, minSalary, maxSalary) {
        const params = {
            TableName: this.tableName
        };
        if (department) {
            params.FilterExpression = 'department = :department';
            params.ExpressionAttributeValues = {
                ':department': department
            };
        }
        if (minAge !== undefined && maxAge !== undefined) {
            params.FilterExpression = 'age BETWEEN :minAge AND :maxAge';
            params.ExpressionAttributeValues = {
                ...params.ExpressionAttributeValues,
                ':minAge': minAge,
                'maxAge': maxAge
            };
        }
        if (minSalary !== undefined && maxSalary !== undefined) {
            params.FilterExpression = 'salary BETWEEN :minSalary AND :maxSalary';
            params.ExpressionAttributeValues = {
                ':minSalary': minSalary,
                ':maxSalary': maxSalary
            };
        }
        const result = await dynamoDB.scan(params).promise();
        return result.Items;
    }
}
exports.EmployeeModel = EmployeeModel;
