"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET || '';
const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.body.jwtDecoded = decoded;
        next();
    }
    catch (error) {
        console.error('Authentication failed:', error);
        res.status(401).json({ message: 'Unauthorized' });
    }
};
exports.auth = auth;
