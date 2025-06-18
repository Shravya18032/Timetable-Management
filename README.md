# Timetable-Management
Timetable management for HOD, Faculty and students of the college.
Changin the readme


[![MERN CI](https://github.com/Shravya18032/Timetable-Management/actions/workflows/ci.yml/badge.svg)](https://github.com/Shravya18032/Timetable-Management/actions/workflows/ci.yml)

A web-based Timetable Management System for colleges, designed to streamline the scheduling process for Heads of Departments (HOD), faculty, and students. This project enables effective creation, management, and viewing of timetables with tailored access and features for each role.

---

## Features

- **Role-based Access**: Supports HOD, faculty, and student logins, with each role having different permissions and access to relevant timetable data.
- **Timetable Creation & Management**:
  - Admin can manage the timetables for all the users(HOD, faculty and students)
  - HODs can view their timetable as well as faculty's timetables.
  - Faculty can view their timetables.
  - Students can view timetables.
- **Daily and Weekly Views**: Retrieve timetables by day or as daily views for easy planning.
- **Search and Filter**: Find timetables by department, semester, section, and role.
- **Authentication & Authorization**: JWT-based secure login and protected API endpoints.
- **RESTful API**: Backend exposes endpoints for timetable CRUD operations.
- **Modern Stack**: Built with MongoDB, Express.js, React, and Node.js (MERN stack).

---

## Tech Stack

- **Frontend**: React (with Vite)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT
- **CI/CD**: GitHub Actions
- **Testing**: Jest (backend tests)

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Shravya18032/Timetable-Management.git
   cd Timetable-Management
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   # Create a .env file with your MongoDB URI and JWT secret
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Access the App**
   - Visit `http://localhost:5173` (or the port shown in your terminal).

---

## Usage

- **Register Users**: Admin/HOD can register faculty and students.
- **Login**: Each user logs in according to their role.
- **Timetable Management**:
  - HOD can create/edit department/faculty timetables.
  - Faculty can manage their own schedules.
  - Students can view their class schedule.

---

## API Endpoints (Backend)

- `POST /api/auth/register` – Register a new user (admin, HOD, faculty, student)
- `POST /api/auth/login` – User authentication
- `POST /api/timetable` – Create or update a daily timetable
- `GET /api/timetable/day/:day` – Get timetable for a specific day (by role)
- `GET /api/timetable/daily-view` – Get daily view for faculty/student/HOD
- `GET /api/timetable/search` – Search timetable by department, semester, etc.
- `DELETE /api/timetable/:id` – Delete a timetable entry

---

## Project Structure

```
Timetable-Management/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── tests/
│   └── server.js
├── client/
│   ├── src/
│   └── ...
└── README.md
```

---

## Contributing

Contributions are welcome! Please open issues or pull requests for improvements or bug fixes.

---

## License

This project is licensed under the MIT License.

---

## Acknowledgements

- Built with the MERN stack.
- Inspired by the need for efficient academic scheduling in colleges.
