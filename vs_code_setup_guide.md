# Ride Share MERN Project Structure Guide

To run this project in VS Code, follow this standard MERN (MongoDB, Express, React, Node.js) directory structure.

## 1. Project Root Directory
Create a main folder called `ride-share`.

```text
ride-share/
├── backend/             # Node.js + Express server
├── frontend/            # React + Vite application
└── .gitignore           # Files to ignore in Git
```

## 2. Backend Structure
Inside `backend/`, initialize your project (`npm init -y`) and set up these folders:

```text
backend/
├── config/              # Database connection (db.js)
├── controllers/         # Logic for each route (authController.js, rideController.js)
├── middleware/          # JWT auth & error handling (authMiddleware.js)
├── models/              # Mongoose schemas (User.js, Ride.js)
├── routes/              # API endpoints (authRoutes.js, rideRoutes.js)
├── .env                 # Secrets (PORT, MONGO_URI, JWT_SECRET)
├── server.js            # Entry point
└── package.json
```

## 3. Frontend Structure
Inside `frontend/`, create your React app (`npm create vite@latest .`) and organize your `src`:

```text
frontend/
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable UI (Navbar.jsx, Footer.jsx, Button.jsx)
│   ├── context/         # AuthContext for global state
│   ├── pages/           # Full screen views (Home.jsx, Login.jsx, Dashboard.jsx, RideDetails.jsx)
│   ├── services/        # Axios API instances (api.js)
│   ├── App.jsx          # Main router and layout
│   └── main.jsx
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json
```

## 4. How to use the code from Stitch
1. **Copy HTML/CSS**: For each screen (Home, Login, Dashboard, Details), click the **</> View Code** button in Stitch.
2. **React Components**: You can take the HTML structure and move it into your React components in the `pages/` folder. Replace standard `<a>` tags with `<Link>` from `react-router-dom`.
3. **Tailwind**: Since these designs use Tailwind, ensure you have Tailwind CSS installed in your Vite project.

## 5. Running the App
1. **Backend**: `cd backend && npm install && npm run dev` (using nodemon)
2. **Frontend**: `cd frontend && npm install && npm run dev`
