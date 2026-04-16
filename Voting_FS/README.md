# Secure Online Voting System (E-Governance Platform)

A full-stack, secure, and modern online voting platform built with **React (Frontend)** and **Spring Boot (Backend)**.

## 🚀 Features

- **Authentication**: JWT-based login, BCrypt password hashing, and Role-Based Access Control (Admin/Voter).
- **Security**: Strict validation to prevent multiple voting (One User = One Vote).
- **Candidate Management**: Admins can add, edit, and delete candidates.
- **Real-time Results**: Live vote counting with interactive Bar and Pie charts.
- **Premium UI**: Modern government-style design using Tailwind CSS and Framer Motion.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS v4, Framer Motion, Recharts, Lucide Icons.
- **Backend**: Java 17+, Spring Boot 3.x, Spring Security, JPA/Hibernate.
- **Database**: MySQL.

---

## ⚙️ Setup Instructions

### 1. Prerequisites
- **Node.js**: v18+
- **JDK**: v17+
- **MySQL Server**: Running on localhost:3306

### 2. Backend Setup
1. Open `backend/src/main/resources/application.properties`.
2. Update `spring.datasource.username` and `spring.datasource.password` with your MySQL credentials.
3. Run the application using your IDE or Maven:
   ```bash
   cd backend
   mvn spring-boot:run
   ```
   *The database `voting_db` will be created automatically.*

### 3. Frontend Setup
1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```

---

## 🧪 Testing the System

### Initial Admin Setup
1. Go to the **Register** page.
2. Fill in the details and select **Account Role: Administrator**.
3. Log in as an Admin to add candidates via the **Admin Dashboard**.

### Voting Process
1. Register a new **Citizen (Voter)** account.
2. Log in and navigate to the **Dashboard**.
3. Choose a candidate and click **Cast Your Vote**.
4. Once cast, the system will lock your voting capability and record the choice securely.
5. Visit the **Live Results** page to see real-time updates.

---

## 📁 Folder Structure

### Backend
- `/controller`: API endpoints for Auth, Voting, and Candidates.
- `/model`: JPA Entities (User, Candidate, Vote).
- `/repository`: Data access interfaces.
- `/security`: JWT and Spring Security configuration.
- `/payload`: Request and Response DTOs.

### Frontend
- `/components`: Reusable UI elements (Navbar, StatCard, etc.).
- `/context`: Auth management.
- `/pages`: Main application views (Home, Dashboard, Results).
- `/services`: Axios API configuration.

---

## 🔐 Security Highlights
- **Unique Voter ID**: Prevents registration with duplicate government IDs.
- **One-Vote Constraint**: Backend `Transactional` logic ensures atomic vote counting and user status update.
- **Stateless Auth**: JWT tokens for secure, cross-origin communication.
