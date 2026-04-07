# Rest API Project (Spring Boot)

## 📌 Overview

This project is a RESTful API built using **Spring Boot**. It demonstrates a layered architecture with controllers, services, repositories, and models for handling backend operations efficiently.

---

## 🏗️ Project Structure

```
src/main/java/com/AML2A/Rest_Api
│
├── controller     # Handles HTTP requests (API endpoints)
├── service        # Business logic layer
├── repository     # Database interaction layer
├── model          # Entity classes (data models)
└── RestApiApplication.java  # Main Spring Boot entry point
```

---

## 🚀 Technologies Used

* Java 17
* Spring Boot
* Spring Web
* Spring Data JPA
* Maven
* Eclipse IDE

---

## ⚙️ How to Run the Project

### 1. Clone the repository

```
git clone https://github.com/your-username/Rest-Api.git
```

### 2. Navigate to the project

```
cd Rest-Api
```

### 3. Run the application

Using Maven:

```
mvn spring-boot:run
```

OR run `RestApiApplication.java` directly from your IDE.

---

## 🌐 API Endpoints (Example)

| Method | Endpoint           | Description         |
| ------ | ------------------ | ------------------- |
| GET    | /api/students      | Fetch all students  |
| GET    | /api/students/{id} | Fetch student by ID |
| POST   | /api/students      | Add new student     |
| PUT    | /api/students/{id} | Update student      |
| DELETE | /api/students/{id} | Delete student      |

---

## 🧪 Testing the API

You can test the API using:

* Postman
* cURL
* Browser (for GET requests)

Example:

```
http://localhost:8080/api/students
```

---

## IMPLEMENTATION

<img width="1539" height="445" alt="Screenshot 2026-03-31 123951" src="https://github.com/user-attachments/assets/9601d199-de9d-427a-a71d-9b124a0118a7" />

## API CALLS (POSTMAN)

<img width="1074" height="959" alt="Screenshot 2026-03-31 123933" src="https://github.com/user-attachments/assets/e78866b1-dcaf-48a3-93e8-b8a35dbeb458" />

<img width="1070" height="914" alt="Screenshot 2026-03-31 123904" src="https://github.com/user-attachments/assets/331ea318-bf83-4f64-aeba-e0149dfbc9e2" />

<img width="1097" height="994" alt="Screenshot 2026-03-31 123848" src="https://github.com/user-attachments/assets/9de6f165-b772-4704-a1ab-b5840638d162" />

<img width="1104" height="941" alt="Screenshot 2026-03-31 123825" src="https://github.com/user-attachments/assets/37a895c2-7676-4ee4-b9e0-cc712654ba79" />


## 📂 Build

To build the project:

```
mvn clean install
```

---

## ⚠️ Notes

* Ensure port **8080** is free before running.
* Configure database settings in `application.properties` if using a database.
---

## 📄 License

This project is for educational purposes.
