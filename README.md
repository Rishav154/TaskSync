# TaskSync

TaskSync is a modern and sleek MERN stack web application designed for managing tasks and notes. With a focus on user-friendliness and aesthetic design, TaskSync enables users to create, update, read, delete, and mark tasks as completed, as well as manage notes effortlessly.

## Features

### Task Management
- Create, read, update, and delete tasks.
- Mark tasks as completed.
- Restore from completed tasks.

### Notes Management
- Create, read, update, and delete notes.

### User Authentication
- Secure login and registration using JWT tokens.
- "Remember Me" feature powered by JWT tokens.
- Passwords are securely hashed with bcrypt.

### Modern Design
- Sleek, responsive, and aesthetic user interface.

### Other Features
- Deployed on [Vercel](https://task-sync-omega.vercel.app).
- Optimized for performance using Vite as the frontend tool.

## Tech Stack

### Frontend
- **React.js**: JavaScript library for building user interfaces.
- **Tailwind CSS**: For styling the frontend with modern design principles.
- **Axios**: For making HTTP requests to the backend.
- **React Router**: For seamless navigation and routing.

### Backend
- **Node.js**: JavaScript runtime environment.
- **Express.js**: Backend framework for building APIs.
- **MongoDB (via Mongoose)**: NoSQL database for storing user data, tasks, and notes.
- **JWT Authentication**: Used for secure login and session management.
- **bcrypt**: For hashing passwords securely.
- **CORS**: Middleware for enabling Cross-Origin Resource Sharing.

### Deployment
- **Vercel**: Hosting and deployment platform for modern web applications.

## Installation and Setup

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB
- npm or yarn

### Clone the Repository
```bash
$ git clone https://github.com/Rishav154/TaskSync.git
$ cd TaskSync
```

### Frontend Setup
1. Navigate to the `frontend` folder:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file:
    ```env
    VITE_API_URL=http://localhost:3000
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
   This will run the frontend on `http://localhost:5173`.

### Backend Setup
1. Navigate to the `backend` folder:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file and add your MongoDB URI and other configurations:
    ```env
    MONGO_URI=your-mongodb-uri
    PORT=3000
    JWT_SECRET=your_jwt_secret_key
    ```
4. Start the backend server:
    ```bash
    npm start
    ```
   This will run the backend on `http://localhost:3000`.

### Connecting the Frontend and Backend
Ensure that the backend is running on port 3000, and the frontend is running on port 5173. The frontend makes API requests to the backend at `http://localhost:3000/api/`.

### Testing the Application
Once both the frontend and backend are running, you can:
1. Visit the frontend on `http://localhost:5173`.
2. Create an account using the signup form.
3. Login with your credentials.
4. Add and manage tasks and notes.

## Folder Structure
```
Directory structure:
└── TaskSync/
    ├── README.md
    ├── backend/
    │   ├── package.json
    │   ├── server.js
    │   ├── vercel.json
    │   ├── .gitignore
    │   └── model/
    │       ├── NotesModel.js
    │       ├── TodoModel.js
    │       └── UserModel.js
    └── frontend/
        ├── README.md
        ├── eslint.config.js
        ├── index.html
        ├── package-lock.json
        ├── package.json
        ├── postcss.config.js
        ├── tailwind.config.js
        ├── vercel.json
        ├── vite.config.js
        ├── .env
        ├── .gitignore
        ├── public/
        └── src/
            ├── App.css
            ├── App.jsx
            ├── index.css
            ├── main.jsx
            ├── assets/
            │   ├── dashboardBg.webp
            │   ├── homeBg.webp
            │   ├── homeBg2.webp
            │   ├── homeBgMobile.webp
            │   └── loginBg.webp
            └── components/
                ├── Dashboard.jsx
                ├── Home.jsx
                ├── Login.jsx
                ├── ProtectedRoute.jsx
                ├── Signup.jsx
                └── TermsAndCondition.jsx

```

## Contributions
Contributions are welcome! If you find any issues or have suggestions for new features, feel free to create a pull request or open an issue in the repository.

### Steps to Contribute
1. Fork the repository.
2. Clone your fork:
   ```bash
   $ git clone https://github.com/yourusername/TaskSync.git
   ```
3. Create a new branch for your feature or bug fix:
   ```bash
   $ git checkout -b feature-name
   ```
4. Make your changes and commit them:
   ```bash
   $ git commit -m "Add a brief description of your changes"
   ```
5. Push your changes to your fork:
   ```bash
   $ git push origin feature-name
   ```
6. Open a pull request in the main repository.
