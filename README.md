# Student Management System

A full-stack web application for managing students, built using Spring Boot for the backend and React (Vite) for the frontend.

## Features
- **User Authentication**: Secure Login and Registration functionality using JWT (JSON Web Tokens).
- **Role-Based Access**: Every registered user gets an `ADMIN` role by default.
- **CRUD Operations**: Full Create, Read, Update, and Delete operations for Student records.
- **RESTful API**: A well-structured Spring Boot backend exposing REST endpoints.
- **Modern UI**: A responsive, fast React frontend served by Vite.

## Tech Stack
### Backend
- **Java 17**
- **Spring Boot 3.2.5**
  - Spring Web (REST APIs)
  - Spring Data JPA (Hibernate)
  - Spring Security (Authentication & Authorization)
- **MySQL Database**: Persistent storage for `User` and `Student` records.
- **JWT (io.jsonwebtoken)**: For stateless, secure API communication.

### Frontend
- **React 19**
- **Vite**: Ultra-fast build tool and development server.
- **React Router DOM v7**: Client-side routing.
- **Axios**: HTTP client for communicating with the backend.

## Project Structure
```
Student_management/
├── Student/                # Spring Boot Backend
│   ├── src/main/java/com/sms/Student/
│   │   ├── controller/     # Express REST endpoints
│   │   ├── model/          # Entities: User, Student
│   │   ├── repository/     # JPA Repositories
│   │   ├── security/       # JWT configs and filters
│   │   ├── service/        # Business logic
│   │   └── dto/            # Data Transfer Objects
│   └── pom.xml             # Maven configuration
│
└── frontend/               # React (Vite) Frontend
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Views like Login, Register, Dashboard
    │   ├── services/       # API integration endpoints (Axios config)
    │   ├── App.jsx         # Main Layout & Router
    │   └── index.css       # Global styling
    └── package.json        # NPM dependencies
```

## Getting Started

### Prerequisites
- Java 17+
- Node.js & npm (or yarn)
- MySQL Server running

### 1. Backend Setup
1. Create a MySQL database named `db` (or modify `application.properties`).
2. Navigate to the backend directory:
   ```bash
   cd Student
   ```
3. Update `src/main/resources/application.properties` with your MySQL credentials.
4. Run the application:
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080`.

### 2. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The frontend will be accessible at `http://localhost:5173`.

## How to use
1. Once both servers are running, access the frontend URL.
2. Go to the "Register" page to create your administrative account. As there's no pre-populated default account, creating an account is necessary first. 
3. Proceed to the "Login" page using the new credentials.
4. You will then have access to the dashboard to manage students.
