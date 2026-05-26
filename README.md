# Wewe's Bite – Food Ordering Demo

A portfolio food-ordering web app built with **React (Vite)**, **Tailwind CSS**, and **JSON Server** as a fake REST API.

## Features

- Menu loaded from the API (with images and categories)
- Cart persisted in `localStorage`
- Checkout with delivery details (demo only — no real payments)
- Order history from JSON Server

## Tech Stack

| Layer    | Stack                          |
| -------- | ------------------------------ |
| Frontend | React 18, Vite, React Router   |
| Styling  | Tailwind CSS v4                |
| API      | JSON Server (`backend/db.json`) |

## Prerequisites

- [Node.js](https://nodejs.org/) 18+ and npm

## Run Locally

### Option A — one command (recommended)

From the project root:

```bash
npm install
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
npm run dev
```

- Frontend: http://localhost:5173  
- API: http://localhost:5000  

### Option B — two terminals

**Terminal 1 — API**

```bash
cd backend
npm install
npm start
```

**Terminal 2 — frontend**

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Copy the example env file for the frontend:

```bash
cp frontend/.env.example frontend/.env
```

| Variable        | Default                 | Description        |
| --------------- | ----------------------- | ------------------ |
| `VITE_API_URL`  | `http://localhost:5000` | JSON Server base URL |

## Deploy (Portfolio)

This app has two parts: a static **frontend** and a **JSON Server** API.

### 1. Deploy the API (Render)

1. Push this repo to GitHub.
2. On [Render](https://render.com), create a **Web Service** from the repo.
3. Use the settings in `render.yaml` (or manually):
   - **Root directory:** `backend`
   - **Build:** `npm install`
   - **Start:** `npm start`
4. Copy the service URL (e.g. `https://wewes-bite-api.onrender.com`).

> Free tier services sleep when idle; the first request may take ~30s to wake up.

### 2. Deploy the frontend (Vercel)

1. Import the repo on [Vercel](https://vercel.com).
2. Set **Root Directory** to `frontend`.
3. Add environment variable:
   - `VITE_API_URL` = your Render API URL (no trailing slash)
4. Deploy.

Vercel rewrites are configured in `frontend/vercel.json` for client-side routing.

### 3. CORS note

JSON Server allows browser requests by default. If you host the API elsewhere, ensure CORS allows your Vercel domain.

## Project Structure

```
wewes-bite-demo/
├── backend/          # JSON Server + db.json
├── frontend/         # React app
├── package.json      # Root scripts (run both apps)
└── render.yaml       # Optional Render blueprint
```

## Scripts

| Command              | Where  | Description                    |
| -------------------- | ------ | ------------------------------ |
| `npm run dev`        | root   | API + frontend together        |
| `npm run dev:api`    | root   | JSON Server only               |
| `npm run dev:web`    | root   | Vite dev server only           |
| `npm run build`      | root   | Production frontend build      |
| `npm start` (backend)| backend| JSON Server on port 5000       |

## License

Demo project for portfolio use.
