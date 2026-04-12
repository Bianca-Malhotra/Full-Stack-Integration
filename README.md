# Student Management System (StudentMS)

A comprehensive full-stack web application for managing students, courses, marks, attendance, and documents. Built with modern technologies for a professional and user-friendly experience.

![StudentMS](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)

---

## ✨ Features

### Core Functionality
- **Student Management**
  - Add, edit, delete, and view students
  - Track student information (name, email, phone, enrollment date)
  - Search and filter students by name, course, or ID
  - Student profile with complete details

- **Course Management**
  - Create and manage courses
  - Course details (code, name, description, duration, fee)
  - Associate students with courses
  - View course-wise student lists

- **Academic Tracking**
  - Record student marks with automatic grade calculation
  - Grade distribution: A (90+), B (80-89), C (70-79), D (60-69), F (Below 60)
  - Track attendance percentage
  - View academic history

- **Document Management**
  - Upload marksheets (PDF/Image)
  - Upload documents (PDF/Image)
  - Download uploaded files directly from the application
  - Secure file storage

- **Dashboard & Analytics**
  - Overview statistics (total students, courses, average marks)
  - Grade distribution charts (Pie chart)
  - Marks distribution visualization (Bar chart)
  - A-grade student count
  - Real-time analytics

- **Professional UI**
  - Responsive design (mobile, tablet, desktop)
  - Intuitive navigation with sidebar
  - Smooth animations and transitions
  - Icon-based visual indicators

---

## 🛠 Tech Stack

### Frontend
- **React.js** - UI framework
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Recharts** - Data visualization (charts and graphs)
- **Lucide React** - Icon library
- **CSS3** - Styling with flexbox and grid

### Backend
- **Java 11+** - Programming language
- **Spring Boot** - Web framework
- **Spring Data JPA** - ORM for database operations
- **Spring Web** - RESTful API development
- **Maven** - Build management tool

### Database
- **MySQL** - Relational database
- **Hibernate** - ORM framework

---

## 📁 Project Structure

```
Full_Stack-Integration/
├── fsd_integration/                    # Frontend (React + Vite)
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.jsx           # Analytics dashboard
│   │   │   └── Courses.jsx             # Course management
│   │   ├── api.js                      # API client functions
│   │   ├── App.jsx                     # Main application component
│   │   ├── App.css                     # Application styles
│   │   ├── main.jsx                    # Entry point
│   │   └── index.css                   # Global styles
│   ├── package.json                    # Node dependencies
│   ├── vite.config.js                  # Vite configuration
│   └── index.html                      # HTML template
│
├── Rest-Api-main/Rest-Api/             # Backend (Spring Boot)
│   ├── src/
│   │   ├── main/java/com/AML2A/Rest_Api/
│   │   │   ├── controller/
│   │   │   │   ├── StudentController.java    # Student endpoints
│   │   │   │   └── CourseController.java     # Course endpoints
│   │   │   ├── model/
│   │   │   │   ├── Student.java        # Student entity
│   │   │   │   └── Course.java         # Course entity
│   │   │   ├── repository/
│   │   │   │   ├── StudentRepository.java    # Student DB access
│   │   │   │   └── CourseRepository.java     # Course DB access
│   │   │   ├── service/
│   │   │   │   ├── StudentService.java       # Business logic
│   │   │   │   └── CourseService.java        # Course logic
│   │   │   └── RestApiApplication.java       # Entry point
│   │   └── resources/
│   │       └── application.properties        # Configuration
│   ├── pom.xml                         # Maven dependencies
│   └── mvnw                            # Maven wrapper
│
└── README.md                           # This file
```

---

## � Prerequisites

Before running this application, ensure you have:

- **Java JDK 11 or higher**
  ```bash
  java -version
  ```

- **Maven 3.6+**
  ```bash
  mvn -version
  ```

- **Node.js 14+ and npm**
  ```bash
  node -version
  npm -version
  ```

- **MySQL Server 5.7+**
  ```bash
  mysql --version
  ```

---

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/Bianca-Malhotra/Full-Stack-Integration.git
cd Full-Stack-Integration
```

### Step 2: Set Up MySQL Database

```bash
# Start MySQL service
# Windows:
net start MySQL80  # or your MySQL version

# macOS:
brew services start mysql

# Linux:
sudo systemctl start mysql
```

Create the database:

```bash
mysql -u root -p
```

In MySQL shell:

```sql
CREATE DATABASE chandigarh_university;
USE chandigarh_university;
```

### Step 3: Backend Setup

```bash
cd Rest-Api-main/Rest-Api

# Build the project
mvn clean build

# Or use Maven wrapper
./mvnw clean build
```

### Step 4: Frontend Setup

```bash
cd fsd_integration

# Install dependencies
npm install
```

---

## ⚙️ Configuration

### Backend Configuration

Edit `Rest-Api-main/Rest-Api/src/main/resources/application.properties`:

```properties
# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/chandigarh_university
spring.datasource.username=root
spring.datasource.password=123456
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.database-platform=org.hibernate.dialect.MySQLDialect

# Server Port
server.port=8081
```

**Important:** Change the `spring.datasource.password` to your MySQL password.

### Frontend Configuration

The Vite dev server is configured to proxy API calls to the backend. See `fsd_integration/vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8081',
      changeOrigin: true,
    },
  },
}
```

---

## ▶️ Running the Application

### Terminal 1: Start Backend (Spring Boot)

```bash
cd Rest-Api-main/Rest-Api

# Using Maven wrapper
./mvnw spring-boot:run

# Or using Maven
mvn spring-boot:run
```

The backend will start at: **http://localhost:8081**

### Terminal 2: Start Frontend (React/Vite)

```bash
cd fsd_integration

# Start development server
npm run dev
```

The frontend will start at: **http://localhost:5173**

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

---

## 🐛 Troubleshooting

### Backend Won't Start

**Error:** `Port 8081 already in use`

```bash
# Find process using port 8081
netstat -ano | findstr :8081  # Windows
lsof -i :8081  # macOS/Linux

# Kill the process
taskkill /PID <PID> /F  # Windows
kill -9 <PID>  # macOS/Linux
```

**Error:** `Cannot connect to database`

- Verify MySQL is running
- Check credentials in `application.properties`
- Ensure database `chandigarh_university` exists
- Check MySQL username/password

### Frontend Won't Start

**Error:** `Port 5173 already in use`

```bash
# Kill the process using port 5173
netstat -ano | findstr :5173  # Windows
lsof -i :5173  # macOS/Linux
```

**Error:** `npm modules not found`

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Issues

If you see CORS errors:
- Ensure backend is running on `http://localhost:8081`
- Check `vite.config.js` proxy configuration
- Restart both frontend and backend

### File Upload Fails

- Check `uploads/` directory exists in backend root
- Ensure file size < 50MB
- Verify file format (PDF, JPG, PNG)
- Check file permissions on `uploads/` folder

---

## 📜 License

This project is licensed under the MIT License.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

---

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] Email notifications for low marks
- [ ] Bulk import from CSV/Excel
- [ ] PDF report generation
- [ ] Student profile pictures
- [ ] Parent portal access
- [ ] Mobile app (React Native)
- [ ] Advanced filtering and sorting
- [ ] Audit logs and history tracking
- [ ] Multi-language support

---

## 📊 Project Status

| Component | Status | Version |
|-----------|--------|---------|
| Backend (Spring Boot) | ✅ Production | 1.0.0 |
| Frontend (React) | ✅ Production | 1.0.0 |
| Database | ✅ MySQL | 5.7+ |
| API | ✅ RESTful | v1 |

---

**Happy Learning! 🎓**

*Last Updated: April 2026 | Made with ❤️ by Bianca Malhotra*

## � API Endpoints

### Student Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Add new student (multipart) |
| PUT | `/api/students/{id}` | Update student (multipart) |
| DELETE | `/api/students/{id}` | Delete student |
| GET | `/api/students/download/{type}/{id}` | Download files (marksheet/doc) |

### Course Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/courses` | Get all courses |
| GET | `/api/courses/{code}` | Get course by code |
| POST | `/api/courses` | Add new course |
| PUT | `/api/courses/{code}` | Update course |
| DELETE | `/api/courses/{code}` | Delete course |

### Example: Add Student (cURL)

```bash
curl -X POST http://localhost:8081/api/students \
  -F "id=1" \
  -F "name=John Doe" \
  -F "course=CS101" \
  -F "email=john@example.com" \
  -F "phone=9876543210" \
  -F "marks=85" \
  -F "attendance=90" \
  -F "enrollmentDate=2024-01-15" \
  -F "marksheet=@marksheet.pdf" \
  -F "doc=@document.pdf"
```

---

## 🗄️ Database Schema

### Student Table

```sql
CREATE TABLE student (
  id INT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  course_code VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20),
  marks DOUBLE,
  marksheet_path VARCHAR(255),
  doc_path VARCHAR(255),
  attendance INT DEFAULT 0,
  grade VARCHAR(1),
  enrollment_date VARCHAR(50)
);
```

### Course Table

```sql
CREATE TABLE course (
  code VARCHAR(50) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  duration INT,
  fee DOUBLE
);
```

---

## 📖 Usage Guide

### Adding a Student

1. Navigate to **Students** section
2. Fill in the required fields:
   - Student ID (unique)
   - Full Name
   - Course Code
3. Optional fields:
   - Email
   - Phone
   - Marks
   - Attendance (%)
   - Enrollment Date
   - Upload Marksheet
   - Upload Document
4. Click **Add Student**

### Managing Courses

1. Go to **Courses** section
2. Click **Add New Course**
3. Enter course details:
   - Course Code (unique)
   - Course Name
   - Description
   - Duration (months)
   - Fee ($)
4. Click **Add Course**

### Viewing Dashboard

1. Click **Dashboard** in sidebar
2. View statistics:
   - Total students
   - Total courses
   - Average marks
   - A-grade student count
3. View charts:
   - Grade distribution (pie chart)
   - Marks distribution (bar chart)

### Downloading Files

1. View student details
2. Click **Download** link next to Marksheet or Document
3. File will be downloaded with original filename

### Searching Students

1. Use the search bar on the Students page
2. Search by:
   - Student name
   - Course code
   - Student ID
3. Results filter in real-time

---

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file
2. Configure production database settings
3. Run: `java -jar target/Rest-Api-0.0.1-SNAPSHOT.jar`

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your web server
3. Update API base URL in `src/api.js` for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

If you have any questions or issues, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ using React & Spring Boot**