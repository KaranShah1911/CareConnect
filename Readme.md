# 🩺 CareConnect

[![Frontend](https://img.shields.io/badge/frontend-react-blue)](https://care-connect-black.vercel.app/)  
[![Backend](https://img.shields.io/badge/backend-nodejs-green)](https://render.com)  

**Live Demo (Patient):** [https://care-connect-black.vercel.app/](https://care-connect-black.vercel.app/)

**Live Demo (Admin & Doctor):** [https://care-connect-doctor.vercel.app/](https://care-connect-doctor.vercel.app/) 

Welcome to **CareConnect** — your trusted role-based doctor appointment platform designed to seamlessly connect patients with verified healthcare professionals. Experience secure, fast, and hassle-free booking and management of medical appointments all in one place.

---

## 🧠 Overview

### What is CareConnect?

CareConnect is a comprehensive medical appointment system that supports three core roles:

- **Users (Patients):** Explore doctors, book, and manage appointments effortlessly.
- **Doctors:** Manage schedules, view upcoming & past appointments.
- **Admins:** Onboard doctors after verification and manage cancellations.

With robust authentication (Google OAuth + JWT tokens), CareConnect ensures that your sessions and sensitive medical data are safe and accessible only to authorized users.

### Why Choose CareConnect?

- 🔐 **Secure Authentication:** Protect your sessions using industry-standard JWT tokens combined with Google OAuth  
- 👥 **Role-Based Access Control:** Different dashboards and functionalities for Users, Doctors, and Admins  
- ☁️ **Smooth Integration:** Manage your appointments efficiently in a sleek UI powered by React and Tailwind CSS  
- 🛠️ **Modern Tech Stack:** Using Node.js, Express.js & MongoDB for a fast and scalable backend  

---

## 🛠️ Tech Stack
[![Frontend](https://img.shields.io/badge/Frontend-React%20⚛️%20|%20Tailwind%20CSS%20🎨-blue)]()

[![Backend](https://img.shields.io/badge/Backend-Node.js%20🟢%20|%20Express.js%20🚂-green)]()

[![Database](https://img.shields.io/badge/Database-MongoDB%20🍃-yellowgreen)]()

[![Authentication](https://img.shields.io/badge/Auth-JWT%20🔑%20|%20Google%20OAuth%20🔵%20|%20Passport.js%20🎫-lightgrey)]()

[![Deployment](https://img.shields.io/badge/Deployment-Vercel%20🎯%20(frontend)%20|%20Render%20🚀%20(backend)-black)]()

---

## 📁 File Structure
```
careconnect/
├── backend/ # Node + Express backend
│ ├── config/
│ ├── controllers/
│ ├── middlewares/
│ ├── models/
│ ├── routes/
│ ├── utility/
│ └── server.js
│
├── frontend/ # Frontend (Vite + React)
│ ├── adminanddoctor/
│ │ └── src/
│ │ ├── components/
│ │ ├── constants/
│ │ ├── layouts/
│ │ ├── pages/
│ │ └── store/
│ │
│ └── my-app/
│ ├── components/
│ ├── constants/
│ ├── layouts/
│ ├── pages/
│ ├── store/
│ └── styles/
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites

- Node.js installed  
- MongoDB running locally or accessible via [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)  
- Git installed  

---

### Step 1: Clone the repository

git clone https://github.com/DARSHITSHAH-2906/CareConnect  
cd CareConnect


---

### Step 2: Setup Frontend

Navigate to the frontend directory:  
cd frontend  
### Create a `.env` file:  
VITE_API_URL=http://localhost:3000


#### Setup User Frontend
cd my-app  
npm install  
npm run dev  
Frontend will run at: [http://localhost:5173](http://localhost:5173)

#### Setup Admin and Doctor Frontend

Open a new terminal and run:

cd frontend/adminanddoctor/my-app  
npm install  
npm run dev  
Frontend will run at: [http://localhost:5174](http://localhost:5174)

---

### Step 3: Setup Backend

Navigate to the backend directory:

cd ../../backend

### Create a `.env` file and add your configuration:
MONGODB_URI=your_MONGODB_URI
CLOUDINARY_CLOUD_NAME=your_CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=your_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=your_CLOUDINARY_API_SECRET
ADMIN_EMAIL=your_ADMIN_EMAIL
ADMIN_PASS=your_ADMIN_PASS
JWT_SECRET=your_JWT_SECRET
GOOGLE_CLIENT_ID=your_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET=your_GOOGLE_CLIENT_SECRET
FRONTEND_URL=http://localhost:5173


Install dependencies:  
npm install


Start the backend server:  
npm start


The backend will run at: `http://localhost:3000`

---

## 👨‍💻 Contributors

- [DARSHIT SHAH](https://github.com/DARSHITSHAH-2906) - Lead Developer & Architect  
- [Ritesh Saindane](https://github.com/aaravpatel) - Frontend Developer  
- [Karan Shah](https://github.com/meerajoshi) - Backend Developer  
- [Yogesh Palve](https://github.com/rohandesai) - UI/UX Designer  

_Open for contributions! Feel free to submit issues and PRs!_

---

## 🖼️ Screenshots

| User Dashboard                         | Doctor Dashboard                       | Admin Dashboard                         |
| ------------------------------------ | ------------------------------------ | ------------------------------------- |
| ![UserView](https://your-image-link/user-dashboard.png) | ![DoctorView](https://your-image-link/doctor-dashboard.png) | ![AdminView](https://your-image-link/admin-dashboard.png) |

---

---

> **CareConnect** — Bringing quality healthcare appointments to your fingertips with trust, security, and speed.









