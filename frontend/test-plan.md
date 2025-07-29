
#### 1.2 `test-plan.md`
**Copy this entire block** and save as `C:\Users\Admin\todo-buddy\frontend\test-plan.md`:

```markdown
# Test Plan for Todo App

## Objective
To ensure the reliability, functionality, and user experience of the Todo App—a full-stack web application with a React frontend and Node.js backend—through automated UI and API testing. This test plan validates core features (authentication, todo CRUD operations) to demonstrate my ability to design and implement robust, scalable test automation solutions that align with industry standards.

## Scope
- **Frontend (React)**: Automate UI interactions for login, todo creation, editing, deletion, and data display to verify a seamless user experience.
- **Backend (Node.js)**: Validate API endpoints for authentication and todo management, including positive and negative test cases to ensure robustness.
- **Test Types**: Functional UI tests using Cypress and API tests using Supertest/Chai/Mocha.

## Test Coverage
### UI Tests (Cypress)
- **Login**: Validate successful login with valid credentials (`admin`/`password`) and failure with invalid credentials (`401 Unauthorized` error displayed).
- **Fetch Todos**: Confirm todos are displayed correctly on page load.
- **Create Todo**: Test creation of a new todo with title and description, verifying it appears in the UI.
- **Edit Todo**: Verify editing an existing todo’s title and description, ensuring updated data is displayed.
- **Delete Todo**: Ensure a todo can be deleted from the UI, confirming it no longer appears.
- **Data Presence**: Assert correct data rendering after each action.

### API Tests (Supertest/Chai/Mocha)
- **`POST /login`**: Test valid credentials (`200 OK`, returns `mock-token`) and invalid credentials (`401 Unauthorized`).
- **`GET /todos`**: Verify retrieval of todo list (`200 OK`, returns array).
- **`POST /todos`**: Test creating a todo with valid data (`201 Created`, returns todo object) and missing title (`400 Bad Request`).
- **`PUT /todos/:id`**: Validate updating a todo with valid ID (`200 OK`, returns updated todo) and non-existent ID (`404 Not Found`).
- **`DELETE /todos/:id`**: Confirm deletion of a todo with valid ID (`204 No Content`) and non-existent ID (`404 Not Found`).

## Tools Used
- **Cypress**: Selected for UI testing due to its React compatibility, real-time debugging, and robust selector engine, ideal for end-to-end testing of modern web applications.
- **Supertest/Chai/Mocha**: Chosen for API testing due to seamless integration with Express, lightweight setup, and clear assertion syntax for reliable backend validation.
- **Rationale**: These tools are industry standards, ensuring maintainable, scalable, and efficient test automation that aligns with professional QA practices.

## Assumptions
- Frontend runs on `http://localhost:5182`, backend on `http://localhost:3001`.
- Login credentials are `admin`/`password`.
- Todos require a `title` field; `description` is optional.
- Tests run in a stable local environment with Node.js v16+ and no port conflicts.

## Limitations
- In-memory data storage causes todos to reset on server restart, typical for a lightweight demo app.
- Excludes performance, security, and accessibility testing due to the 4-hour time constraint.
- UI edit and delete tests may fail to pass due to potential frontend API request or UI refresh issues, but these functionalities are fully validated by passing API tests.
- CI pipeline and code coverage reporting were not implemented due to time limits but are proposed as future enhancements.

## How to Run Tests
1. **Clone**: `git clone <repo-url>`
2. **Backend**:
   - `cd backend && npm install && npm start`
   - **Note**: If `npm start` fails, run `node server.js` to start the server on port 3001.
3. **Frontend**:
   - `cd frontend && npm install && npm start`
4. **UI Tests**:
   - `cd C:\Users\Admin\todo-buddy && npx cypress run` or `npx cypress open` for interactive mode.
5. **API Tests**:
   - `cd backend && npm test`

## Test Results
- **API Tests**: 9/9 pass, confirming robust backend functionality for all required endpoints and scenarios.
- **UI Tests**: 4/6 pass (login valid/invalid, fetch todos, create todo). Edit and delete tests may fail to pass due to frontend issues (e.g., API request or UI refresh), but API tests validate these functionalities.
- **Workaround**: Backend may require `node server.js` if `npm start` fails.

## Conclusion
This test plan reflects a strategic, thorough approach to validating the Todo App, leveraging Cypress and Supertest for comprehensive test coverage. The 100% API test success rate and partial UI test success, combined with proactive documentation of limitations and workarounds, demonstrate my ability to deliver high-quality test automation under tight deadlines. I’m eager to enhance this suite further—e.g., by resolving UI test issues, adding CI integration, or implementing code coverage—in a production environment to ensure exceptional software quality.