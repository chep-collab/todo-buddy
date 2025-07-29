# Test Plan for Todo App

## Objective
Validate the functionality of a Todo web application (React frontend, Node.js backend) through automated UI and API testing, ensuring login and todo CRUD operations work as expected.

## Scope
- **Frontend (React)**: Test login, todo creation, editing, deletion, and data display.
- **Backend (Node.js)**: Test API endpoints for authentication and todo CRUD.
- **Test Types**: Functional UI tests, API tests (positive/negative cases).

## Test Coverage
- **UI Tests** (Cypress):
  - Login with valid/invalid credentials.
  - Fetch and display todos on page load.
  - Create, edit, and delete a todo.
- **API Tests** (Supertest/Chai):
  - `POST /login`: Valid/invalid credentials.
  - `GET /todos`: Fetch todos.
  - `POST /todos`: Create todo (valid/invalid data).
  - `PUT /todos/:id`: Update todo (valid/invalid ID).
  - `DELETE /todos/:id`: Delete todo (valid/invalid ID).

## Tools Used
- **Cypress**: For UI testing (React-friendly, easy debugging).
- **Supertest/Chai/Mocha**: For API testing (lightweight, Node.js-compatible).
- **Why**: Cypress simplifies UI automation; Supertest integrates with Express.

## Assumptions
- Frontend: `http://localhost:5179`, backend: `http://localhost:3001`.
- Credentials: `admin`/`password`.
- Todos require `title`, optional `description`.

## Limitations
- Tests assume a stable local environment.
- In-memory data may reset between runs.
- Excludes performance/security testing.
- UI edit/delete tests may fail to pass due to frontend API request or UI refresh issues, but API tests validate these functionalities.

## How to Run Tests
1. Clone: `git clone <repo-url>`
2. Backend: `cd backend && npm install && npm start`
3. Frontend: `cd frontend && npm install && npm start`
4. UI Tests: `cd C:\Users\Admin\todo-buddy && npx cypress run`
5. API Tests: `cd backend && npm test`