# SwiftStaff Backend

SwiftStaff is a comprehensive Employee Management System seamlessly integrating HR functionalities, from streamlined talent acquisition to efficient workforce management. Empower your team with innovative tools, fostering collaboration and unlocking the full potential of your workforce.

## Setup

1. Clone this repository.
2. Install dependencies using `npm install`.
3. Configure environment variables by creating a `.env` file based on the `.env.example` file.
4. Run the server using `npm start`.

## API Endpoints

### Projects

- `GET /projects`: Get all projects.
- `POST /projects`: Create a new project.

### Employees

- `GET /employees`: Get all employees.
- `POST /employees`: Create a new employee.
- `GET /employees/:id`: Get employee by ID.

## Technologies Used

- Node.js
- Express.js
- AWS DynamoDB
- bcrypt for password hashing

## Future Enhancements

- Implement an attendance system.
- Add relational schema between employees and projects, employees and attendance.
- Adding features for analysis.