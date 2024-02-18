import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
const cors = require('cors');
dotenv.config()
import {employeeRoute} from './routes/employeeRoutes'
import { loginRoute } from './routes/authRoutes';
import { projectRoute } from './routes/projectRoutes'
const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(bodyParser.json())
app.use('/employees', employeeRoute)
app.use('/auth', loginRoute)
app.use('/projects',projectRoute)
app.listen(PORT,() => console.log(`App is running on port: ${PORT}`))