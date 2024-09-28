# Employee Onboarding Portal
Project Objective
The Employee Onboarding Portal aims to evaluate your full-stack development skills by having you build a functional web application. In this project, you will create a portal where HR managers can manage employee profiles and onboarding tasks effectively. Employees will also have a dedicated interface to track their onboarding progress and upload necessary documents.

This assessment will allow you to demonstrate your proficiency in both front-end and back-end technologies, focusing on user experience and system architecture.

# ----------------------------------------------------------------------------------------------------------------------------------------------

# Features to Implement
CRUD Operations:
Implement Create, Read, Update, and Delete functionalities for employee profiles.
Allow HR managers to manage onboarding tasks associated with each employee.

2FA Login:
Integrate Two-Factor Authentication to enhance security during user login.
Use methods such as email or SMS for verification codes.

Social Login:
Enable users to sign in using their Google or LinkedIn accounts.
Simplify the authentication process and improve user experience.

Onboarding Progress Tracking:
Develop a visual onboarding progress tracker for employees.
Allow employees to view their completed and pending onboarding tasks.

Role-Based Access Control:
Implement different access levels for HR managers and employees.
Ensure that only authorized users can perform sensitive actions.

# ----------------------------------------------------------------------------------------------------------------------------------------------

# Tech Stack
This project is primarily designed using the following technologies:

Frontend: React, Axios, HTML, CSS
Backend: Node.js, Express.js (alternatively, you may use Django or Flask if preferred)
Database: MongoDB (Mongoose for schema modeling)
Authentication: JWT (JSON Web Tokens), bcrypt for password encryption
Other Tools: Nodemailer for sending emails, Socket.IO (optional for real-time updates)

You are encouraged to use any full-stack technology you are comfortable with, as long as the project requirements are met. The main goal is to showcase your full-stack development skills, regardless of the framework chosen.

# ----------------------------------------------------------------------------------------------------------------------------------------------

# API Endpoints
Here’s a list of the key API endpoints for the project:

Method	Endpoint	Description
GET	/api/employees	Get all employees
POST	/api/employees	Add a new employee
PUT	/api/employees/:id	Update an existing employee
DELETE	/api/employees/:id	Delete an employee
POST	/api/tasks	Assign a task to an employee
GET	/api/tasks/:employeeId	Get tasks for a specific employee

# ----------------------------------------------------------------------------------------------------------------------------------------------

## Setup Instructions

### Front-End
1. Navigate to the `frontend/` folder.
2. Install dependencies:

# ----------------------------------------------------------------------------------------------------------------------------------------------

# Project Structure
Here’s a breakdown of the key folders and files in the project:

employee-onboarding-portal/
│
├── backend/                  # Backend code (Node.js/Express)
│   ├── controllers/          # API route logic
│   ├── models/               # MongoDB models (schemas)
│   ├── routes/               # API routes
│   ├── app.js                # Main backend entry point
│   ├── server.js             # Backend server configuration
│   └── package.json          # Backend dependencies
│
├── frontend/                 # Frontend code (React)
│   ├── public/               # Static frontend assets
│   ├── src/                  # Main React code
│   │   ├── components/       # Reusable React components
│   │   ├── pages/            # Pages (Login, Dashboard, etc.)
│   ├── App.js                # Main app component
│   └── package.json          # Frontend dependencies
│
├── data/                     # Sample data files
├── database/                 # MongoDB connection
└── .env                      # Environment variables


# ----------------------------------------------------------------------------------------------------------------------------------------------