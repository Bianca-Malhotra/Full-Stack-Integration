# Full Stack Student Management Application

A modern, professional student management system built with React frontend and Spring Boot backend, featuring a beautiful green-themed UI and complete CRUD operations.

## 🌟 Features

- **Modern React Frontend**: Built with React 19, Vite, and professional UI design
- **Spring Boot Backend**: RESTful API with MySQL database integration
- **Complete CRUD Operations**: Create, Read, Update, Delete students
- **Professional UI**: Green-themed design with responsive layout
- **Real-time Updates**: Live data synchronization between frontend and backend
- **Search Functionality**: Find students by ID
- **Form Validation**: Client-side validation with user-friendly error messages
- **Loading States**: Smooth loading indicators and animations

## 🛠️ Tech Stack

### Frontend
- **React 19.2.4** - Modern JavaScript library
- **Vite 8.0.4** - Fast build tool and development server
- **React Icons** - Beautiful icon library
- **CSS3** - Custom styling with animations

### Backend
- **Spring Boot 4.0.3** - Java framework for REST APIs
- **Java 17** - Programming language
- **Spring Data JPA** - Database access layer
- **MySQL** - Relational database
- **Maven** - Build automation tool

## 🚀 Getting Started

### Prerequisites

- **Java 17** or higher
- **Node.js 18+** and npm
- **MySQL 8.0+**
- **Maven 3.6+**

### Database Setup

1. Install MySQL and create a database:
```sql
CREATE DATABASE chandigarh_university;
```

2. Update database credentials in `Rest-Api-main/Rest-Api/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/chandigarh_university
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8081
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd Rest-Api-main/Rest-Api
```

2. Build the project:
```bash
./mvnw clean package -DskipTests
```

3. Run the Spring Boot application:
```bash
java -jar target/Rest-Api-0.0.1-SNAPSHOT.jar
```

The backend will start on `http://localhost:8081`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd fsd_integration
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students` | Get all students |
| GET | `/api/students/{id}` | Get student by ID |
| POST | `/api/students` | Create new student |
| PUT | `/api/students/{id}` | Update existing student |
| DELETE | `/api/students/{id}` | Delete student |

### Sample API Requests

**Create Student:**
```json
POST /api/students
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "course": "Computer Science"
}
```

**Update Student:**
```json
PUT /api/students/1
{
  "name": "Jane Doe",
  "email": "jane.doe@example.com",
  "course": "Information Technology"
}
```

## 🏗️ Project Structure

```
Full-Stack-Integration/
├── fsd_integration/                 # React Frontend
│   ├── public/                      # Static assets
│   ├── src/
│   │   ├── api.js                   # API service functions
│   │   ├── App.jsx                  # Main React component
│   │   ├── App.css                  # Main styling
│   │   ├── main.jsx                 # React entry point
│   │   └── index.css                # Global styles
│   ├── package.json                 # Frontend dependencies
│   └── vite.config.js               # Vite configuration
├── Rest-Api-main/Rest-Api/          # Spring Boot Backend
│   ├── src/main/java/com/AML2A/Rest_Api/
│   │   ├── controller/              # REST controllers
│   │   │   ├── StudentController.java
│   │   │   └── TestController.java
│   │   ├── model/                   # Entity classes
│   │   │   └── Student.java
│   │   ├── repository/              # Data repositories
│   │   │   └── StudentRepository.java
│   │   ├── service/                 # Business logic
│   │   │   └── StudentService.java
│   │   └── RestApiApplication.java  # Main application class
│   ├── src/main/resources/
│   │   └── application.properties   # Configuration
│   ├── pom.xml                      # Maven configuration
│   └── mvnw/mvnw.cmd                # Maven wrapper
└── README.md                        # This file
```

## 🎨 UI Features

- **Two-Column Layout**: Form on left, data display on right
- **Green Color Palette**: Professional emerald green theme
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Loading spinners, hover effects, transitions
- **Form Validation**: Real-time validation with visual feedback
- **Search Functionality**: Find students by ID with instant results
- **Edit Mode**: Inline editing with cancel/save options
- **Success/Error Messages**: Toast notifications for user feedback

## 🔧 Development

### Running Tests

**Backend Tests:**
```bash
cd Rest-Api-main/Rest-Api
./mvnw test
```

**Frontend Tests:**
```bash
cd fsd_integration
npm test
```

### Building for Production

**Backend:**
```bash
cd Rest-Api-main/Rest-Api
./mvnw clean package
```

**Frontend:**
```bash
cd fsd_integration
npm run build
```

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