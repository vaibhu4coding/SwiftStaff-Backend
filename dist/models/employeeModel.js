"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeModel = void 0;
const aws_sdk_1 = require("aws-sdk");
const dynamoDB = new aws_sdk_1.DynamoDB.DocumentClient();
class EmployeeModel {
    constructor(tableName) {
        this.tableName = tableName;
    }
    async createEmployee(employee) {
        const params = {
            TableName: this.tableName,
            Item: employee
        };
        await dynamoDB.put(params).promise();
    }
    async getEmployeeById(employeeId) {
        const params = {
            TableName: this.tableName,
            Key: { employeeId },
        };
        const result = await dynamoDB.get(params).promise();
        return result.Item;
    }
}
exports.EmployeeModel = EmployeeModel;
