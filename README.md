# Simple Notes Manager 📝

## Project Overview
A full-stack note-taking app built with Vue.js (frontend), Node.js + Express (backend), and SQLite (database). Supports full CRUD operations.

## Live Deployments
Frontend (Vercel): https://simplefilemanagementsystem.vercel.app
Backend (Render): https://simplefilemanagementsystem.onrender.com

## Tech Stack
Frontend: Vue 3, Vuetify 3, Tailwind CSS, Vite
Backend: Node.js, Express, SQLite, Multer
API Requests: Axios
Deployment: Vercel (frontend), Render (backend)

## Features
1. Create, read, update, delete notes.
2. Upload images with notes.
3. Responsive design with animated cards and hover effects.
4. Local testing with npm run dev for frontend, API served locally via Express.

## Development Process
1️⃣ Designing the Notes Card Layout
AI Prompt: “Generate a Tailwind CSS card layout with hover animations for a Vue 3 notes app, including a title, content snippet, and optional image.”
AI Output: Provided a basic card with padding, shadow, hover scaling, and minimal styling.
Modifications / Verification: 
1. Added gradients for background to create a premium look (linear-gradient for normal, hover, and in-view states).
2. Included hover scaling & box-shadow transitions for smooth animations.
3. Added a max-height scrollable content area to prevent large notes from overflowing.
4. Verified using local Vite dev server (npm run dev).
Reasoning: AI gave a skeleton card. Enhancements were made to ensure visual appeal, readability, and responsive behavior on desktop and mobile.

2️⃣ Handling API Integration & Dynamic Images
AI Prompt: “Write Vue 3 code to fetch notes from a REST API, display them in a card grid, and handle optional image uploads using v-img.”
AI Output: Skeleton Vue component using axios.get() for notes listing and placeholders for images.
Modifications / Verification:
1. Integrated environment variables with import.meta.env.VITE_API_URL to dynamically fetch the backend URL.
2. Added logic for image uploads (v-file-input) and preview (v-img).
3. Implemented CRUD functionality: createNote, updateNote, deleteNote using FormData to handle images.
4. Verified with local backend server and checked that images display correctly.
Reasoning: AI provided a starting point; modifications were essential for production use and correct dynamic behavior with uploads.

3️⃣ Implementing IntersectionObserver Animations
AI Prompt: “Animate cards on scroll with IntersectionObserver in Vue 3, highlighting cards as they appear in viewport.”
AI Output: Provided a basic observer that logs visibility changes.
Modifications / Verification:
1. Linked each card’s data-note-id to its note and updated visibleNotes array on intersecting.
2. Added CSS transformations and hover effects when cards come into view.
3. Verified in browser; cards smoothly scale when scrolled into viewport.
Reasoning: Enhances UX by showing animated cards only when visible, reducing cognitive load and improving aesthetic appeal.

## Vercel Deployment Troubleshooting
During the first deployment, the frontend build failed because Vercel was trying to parse a root-level package.json that wasn’t valid for the frontend.
Changes Made: 
1. Deleted the root package.json to avoid conflicts.
2. Ensured frontend/package.json contained all frontend dependencies (vue, vuetify, vite, Tailwind, etc.) and scripts (dev, build, preview).
3. Added .env variables for API URLs (VITE_API_URL) and configured import.meta.env.VITE_API_URL usage in App.vue and api.js.
4. Verified Vite configuration via vite.config.js with Vue plugin.
5. Forced a fresh deployment using the Vercel CLI (vercel --prod --force) to ignore old caches.
6. Resolved import.meta parsing issues by making sure Vue SFC scripts are treated as modules.

## API Endpoints
Method		  Endpoint		  Description
------------------------------------------------------------------------------
1. GET		  /notes		    Get all notes
2. GET		  /notes/:id		Get a single note by ID
3. POST		  /notes		    Create a new note
4. PUT		  /notes/:id		Update an existing note
5. DELETE		/notes/:id		Delete a note

## local Backend Setup
1. Go to backend folder: cd backend
2. Install dependencies: npm install
3. Start backend server: node server.js
4. The backend will run at http://localhost:3000.

## Local Frontend Setup
1. Go to frontend folder: cd frontend
2. Install dependencies: npm install
3. Start frontend server: npm run dev
4. The frontend will run at http://localhost:5173.
