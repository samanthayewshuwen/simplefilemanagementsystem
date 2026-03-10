# Simple Notes Manager 📝

## Project Overview
A full-stack note-taking app built with Vue.js (frontend), Node.js + Express (backend), and SQLite (database). Supports full CRUD operations.

## Full Stack Flow
1. Frontend Vue app displays notes in cards (App.vue)
2. Users create, update, delete notes through dialogs
3. Vue methods call backend Express API (/notes endpoints) using fetch
4. Backend uses SQLite to persist notes (db/database.js)
5. Responses are returned to frontend to update UI in real-time

---

## Backend Setup
1. Go to backend folder: cd backend
2. Install dependencies: npm install
3. Start backend server: node server.js
4. The backend will run at http://localhost:3000.

## Frontend Setup
1. Go to frontend folder: cd frontend
2. Install dependencies: npm install
3. Start frontend server: npm run dev
4. The frontend will run at http://localhost:5173.