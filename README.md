# Student Management API

A clean and modular RESTful backend API built with **Node.js**, **Express**, and **MongoDB (Mongoose)** for managing college student records.

---

## 🚀 Quick Setup & Run

### 1. Install Dependencies
```bash
npm install
```
*(On Windows PowerShell, if script execution is restricted, run `npm.cmd install` or execute `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`).*

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```env
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/student_db?retryWrites=true&w=majority
```

### 3. Start the Server
* **Development mode (with auto-restart via nodemon):**
  ```bash
  npm run dev
  ```
* **Production mode:**
  ```bash
  npm start
  ```

---

## 📡 API Endpoints Overview

**Base URL:** `http://localhost:5000`

| # | HTTP Method | Endpoint | Description |
| :-: | :--- | :--- | :--- |
| 1 | `GET` | `/` | Health check & database connection status |
| 2 | `POST` | `/api/students` | Register a new student |
| 3 | `GET` | `/api/students` | Retrieve all students (with optional filtering/search) |
| 4 | `GET` | `/api/students/:id` | Retrieve a single student by ID |
| 5 | `PUT` | `/api/students/:id` | Update student details by ID |
| 6 | `DELETE` | `/api/students/:id` | Remove a student record by ID |

---

## 📖 Detailed Endpoint Documentation

### 1. Health Check
* **Endpoint:** `GET /`
* **Description:** Verifies the server is live and checks whether MongoDB is connected.
* **Response `(200 OK)`:**
```json
{
  "success": true,
  "message": "Student Management API is running",
  "database": "Connected"
}
```

---

### 2. Register / Create Student
* **Endpoint:** `POST /api/students`
* **Description:** Creates a new student record. Enforces unique `rollNumber` and `email`.
* **Headers:** `Content-Type: application/json`
* **Request Body:**
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
* **Success Response `(201 Created)`:**
```json
{
  "success": true,
  "message": "Student registered successfully",
  "data": {
    "_id": "673b18f4a1b2c3d4e5f60001",
    "name": "Aditya Raj",
    "rollNumber": "CS2026001",
    "email": "aditya@college.edu",
    "course": "Computer Science",
    "year": 3,
    "gpa": 8.8,
    "createdAt": "2026-11-18T16:00:00.000Z",
    "updatedAt": "2026-11-18T16:00:00.000Z"
  }
}
```
* **Validation Error Response `(400 Bad Request)`:**
```json
{
  "success": false,
  "message": "Student with this rollNumber already exists"
}
```

---

### 3. Get All Students
* **Endpoint:** `GET /api/students`
* **Description:** Returns a list of all registered students sorted by most recently created.
* **Optional Query Parameters:**
  * `?course=<course_name>` - Filter students by course (case-insensitive)
    * Example: `GET /api/students?course=Computer Science`
  * `?search=<student_name>` - Search students by name (case-insensitive)
    * Example: `GET /api/students?search=Aditya`
* **Success Response `(200 OK)`:**
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "673b18f4a1b2c3d4e5f60001",
      "name": "Aditya Raj",
      "rollNumber": "CS2026001",
      "email": "aditya@college.edu",
      "course": "Computer Science",
      "year": 3,
      "gpa": 8.8
    }
  ]
}
```

---

### 4. Get Student by ID
* **Endpoint:** `GET /api/students/:id`
* **Description:** Fetches a single student using their unique MongoDB `_id`.
* **Example:** `GET /api/students/673b18f4a1b2c3d4e5f60001`
* **Success Response `(200 OK)`:**
```json
{
  "success": true,
  "data": {
    "_id": "673b18f4a1b2c3d4e5f60001",
    "name": "Aditya Raj",
    "rollNumber": "CS2026001",
    "email": "aditya@college.edu",
    "course": "Computer Science",
    "year": 3,
    "gpa": 8.8
  }
}
```
* **Error Response `(404 Not Found)`:**
```json
{
  "success": false,
  "message": "Student not found with id of 673b18f4a1b2c3d4e5f60001"
}
```

---

### 5. Update Student by ID
* **Endpoint:** `PUT /api/students/:id`
* **Description:** Updates specific details of an existing student by `_id`.
* **Example:** `PUT /api/students/673b18f4a1b2c3d4e5f60001`
* **Headers:** `Content-Type: application/json`
* **Request Body (send only fields you wish to update):**
```json
{
  "year": 4,
  "gpa": 9.2
}
```
* **Success Response `(200 OK)`:**
```json
{
  "success": true,
  "message": "Student updated successfully",
  "data": {
    "_id": "673b18f4a1b2c3d4e5f60001",
    "name": "Aditya Raj",
    "rollNumber": "CS2026001",
    "email": "aditya@college.edu",
    "course": "Computer Science",
    "year": 4,
    "gpa": 9.2
  }
}
```

---

### 6. Delete Student by ID
* **Endpoint:** `DELETE /api/students/:id`
* **Description:** Removes a student permanently from the database.
* **Example:** `DELETE /api/students/673b18f4a1b2c3d4e5f60001`
* **Success Response `(200 OK)`:**
```json
{
  "success": true,
  "message": "Student deleted successfully",
  "data": {}
}
```
* **Error Response `(404 Not Found)`:**
```json
{
  "success": false,
  "message": "Student not found with id of 673b18f4a1b2c3d4e5f60001"
}
```

---

## 🗄 Student Data Schema Reference

| Field | Type | Required | Unique | Validation Rules |
| :--- | :--- | :---: | :---: | :--- |
| `name` | String | Yes | No | Trimmed string |
| `rollNumber` | String | Yes | Yes | Trimmed, converted to uppercase |
| `email` | String | Yes | Yes | Trimmed, lowercase, valid email format regex |
| `course` | String | Yes | No | Trimmed string |
| `year` | Number | Yes | No | Integer between 1 and 5 |
| `gpa` | Number | No | No | Number between 0.0 and 10.0 |
| `createdAt` | Date | Auto | No | Managed by Mongoose timestamps |
| `updatedAt` | Date | Auto | No | Managed by Mongoose timestamps |
