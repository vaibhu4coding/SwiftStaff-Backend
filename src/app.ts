import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config()
import {employeeRoute} from './routes/employeeRoutes'
const app = express()
const PORT = process.env.PORT || 3000

app.use(bodyParser.json())
app.use('/employees',employeeRoute)
app.listen(PORT,() => console.log(`App is running on port: ${PORT}`))