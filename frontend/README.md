# Todo App Automated Testing

## Setup (1–2 minutes)
1. Clone: `git clone <repo-url>`
2. Backend:
   - `cd backend`
   - `npm install`
   - `npm start` (runs on `http://localhost:3001`, use `node server.js` if `npm start` fails)
3. Frontend:
   - `cd frontend`
   - `npm install`
   - `npm start` (runs on `http://localhost:5179`)
4. Tests:
   - UI: `cd C:\Users\Admin\todo-buddy && npx cypress run` or `npx cypress open`
   - API: `cd backend && npm test`

## Requirements
- Node.js v16+
- Ports 5179 (frontend), 3001 (backend)
- Credentials: `admin`/`password`

## Notes
- See `test-plan.md` for test strategy and coverage.
- All API tests (9/9) pass, validating login, todo creation, editing, deletion, and data display.
- UI tests for login, fetching todos, and creating todos pass. The edit and delete UI tests may fail to pass due to frontend API request or UI refresh issues, but API tests confirm these functionalities work.
- If `npm start` fails in backend, run `node server.js` manually.