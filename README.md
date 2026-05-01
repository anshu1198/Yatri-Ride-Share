# Yatri Ride Share

Yatri Ride Share is a full-stack web application designed to facilitate ride-sharing. Built utilizing the MERN stack (MongoDB, Express.js, React, Node.js), this platform provides a seamless and secure environment for users to request, offer, and manage rides.

## Core Features

- **Authentication & Security:** Secure user registration and login using JWT-based authentication and bcrypt password hashing.
- **Ride Management:** Comprehensive CRUD operations allowing users to create new ride requests or offers, view available rides, modify details, and cancel rides.
- **Responsive User Interface:** A modern, mobile-responsive design tailored for optimal user experience across various devices.
- **Search & Filtering:** Efficient mechanisms to find available rides based on specific criteria.

## Technology Stack

### Frontend
- **Framework:** React.js (via Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **HTTP Client:** Axios
- **Assets/UI:** Lucide React Icons, React Toastify

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Security:** JSON Web Tokens (JWT), bcryptjs

## Prerequisites

Ensure the following software is installed on your local machine before proceeding:
- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/) (Local instance or MongoDB Atlas cluster)
- Git

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd Yatri-Ride-Share-master
   ```

2. **Backend Setup:**
   Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. **Frontend Setup:**
   Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

## Environment Variables

To run this project, you will need to add environment variables. Create a `.env` file within the `backend/` directory and configure the following parameters:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret_key
```

## Running the Application

### Backend Server
From the root directory, navigate to the backend and start the development server:
```bash
cd backend
npm run dev
```
The backend server will initialize on `http://localhost:5000`.

### Frontend Application
Open a new terminal, navigate to the frontend directory, and start the Vite development server:
```bash
cd frontend
npm run dev
```
The frontend application will be accessible at `http://localhost:5173`.

## Project Structure Overview

```text
Yatri-Ride-Share-master/
├── backend/                  # Node.js & Express server
│   ├── config/               # Database connection logic
│   ├── controllers/          # Request handlers
│   ├── middleware/           # Custom middleware (Auth, Error Handling)
│   ├── models/               # Mongoose schemas
│   ├── routes/               # API route definitions
│   └── server.js             # Application entry point
└── frontend/                 # React frontend application
    ├── src/
    │   ├── assets/           # Static assets
    │   ├── components/       # Reusable React components
    │   ├── context/          # React Context providers
    │   ├── pages/            # View components
    │   └── services/         # API integration logic
    └── tailwind.config.js    # Tailwind configuration
```
