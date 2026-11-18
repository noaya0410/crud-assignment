# Student Management API

A lightweight RESTful backend API built with **Node.js**, **Express**, and **MongoDB (Mongoose)** for managing student records.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```
*(On Windows PowerShell, if script execution is restricted, run `npm.cmd install` or fix policy using `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`).*

### 2. Configure Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/student_db?retryWrites=true&w=majority
```

### 3. Start the Server
* **Development (auto-reload):**
  ```bash
  npm run dev
  ```
* **Production:**
  ```bash
  npm start
  ```

---

## 📡 API Endpoints

Base URL: `http://localhost:5000`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Health check & database connection status |
| `GET` | `/api/students` | Get all students (supports filter & search) |
| `POST` | `/api/students` | Register / create a new student |
| `GET` | `/api/students/:id` | Get single student details by ID |
| `PUT` | `/api/students/:id` | Update student details by ID |
| `DELETE` | `/api/students/:id` | Delete a student by ID |

---

## 📝 Request & Response Examples

### 1. Create Student (`POST /api/students`)
* **Headers:** `Content-Type: application/json`
* **Body:**
```json
{
  "name": "Aditya Raj",
  "rollNumber": "CS2026001",
  "email": "aditya@college.edu",
  "course": "Computer Science",
  "year": 3,
  "gpa": 8.8
}
```
* **Success Response (201 Created):**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "_id": "673b18...",
    "name": "Aditya Raj",
    "rollNumber": "CS2026001",
    "email": "aditya@college.edu",
    "course": "Computer Science",
    "year": 3,
    "gpa": 8.8,
    "createdAt": "2026-11-18T...",
    "updatedAt": "2026-11-18T..."
  }
}
```

### 2. Query / Filter Students (`GET /api/students`)
* Filter by Course: `GET /api/students?course=Computer Science`
* Search by Name: `GET /api/students?search=Aditya`

### 3. Update Student (`PUT /api/students/:id`)
* **Body:**
```json
{
  "year": 4,
  "gpa": 9.2
}
```

### 4. Delete Student (`DELETE /api/students/:id`)
* **Success Response (200 OK):**
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "data": {}
}
```
