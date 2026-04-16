# 🚀 Setup Guide (For New Laptops)

Follow these steps to run this project on any new machine.

---

### 1. Prerequisites
- **Node.js**: v18+ 
- **Java JDK**: 17 or higher (tested on Java 25)
- **MySQL Server**: Running on localhost:3306

---

### 2. Database Configuration
1. Open MySQL and ensure you have access to the root user.
2. Open `backend/src/main/resources/application.properties`.
3. Update these lines with **your** MySQL credentials:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=YOUR_PASSWORD_HERE
   ```
   *(Note: The database `voting_db` and all tables will be created automatically on the first run).*

---

### 3. Start the Backend (Spring Boot)
1. Open a terminal in the `backend` folder.
2. Run the Maven Wrapper command:
   ```powershell
   ./mvnw.cmd spring-boot:run
   ```
   *Wait for the log: `Tomcat started on port 8080 (http)`.*

---

### 4. Start the Frontend (React)
1. Open a **new** terminal window in the `frontend` folder.
2. Install dependencies (only required once):
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### 🔐 Predefined Admin Credentials
You do NOT need to register for an Admin account. The system creates one automatically:
- **Email**: `riyaroy2264dns@gmail.com`
- **Password**: `Riya@123`

---

### 🛠️ Common Troubleshooting
- **Port 8080 already in use**: If the backend fails to start, another app is using port 8080. Kill that process and restart.
- **CORS Errors**: Ensure the frontend is running on `http://localhost:5173`. Any other port will be blocked by the security policy.
- **Blank Screen**: Perform a hard refresh (`Ctrl + F5`) to clear the browser cache.
