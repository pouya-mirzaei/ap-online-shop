# AP Online Shop Project

Welcome to the **AP Online Shop** — a hands-on project designed for Advanced Programming students to simulate the experience of working as a **backend developer** at a software company.

In this project, you’ve just joined a development team. The **frontend team** has already completed their work and handed off a fully functional UI. Your job as a backend developer is to implement the backend business logic using Java and Spring Boot, strictly following the provided API contracts.

---

## Project Overview

The AP Online Shop is a full-stack e-commerce application consisting of:

- **Frontend**: A modern React app built using **TypeScript**, **Vite**, and **Tailwind CSS**
- **Backend**: A Spring Boot application that exposes RESTful APIs

Students will focus solely on the backend implementation. The frontend code and API documentation are provided — no frontend modifications are required.

---

## Prerequisites

Ensure the following tools are installed before starting:

- [JDK 17 or higher](https://www.oracle.com/java/technologies/javase/jdk17-archive-downloads.html)
- [IntelliJ IDEA](https://www.jetbrains.com/idea/download/) (Community or Ultimate)
- [Node.js (v16 or higher)](https://nodejs.org/) and npm

> **Important:** Node.js is required to run the frontend. If you've never used Node.js before, follow the instructions below to install it.

---

## Node.js Installation

### Windows

1. Download the Node.js installer from [nodejs.org](https://nodejs.org/)
2. Select the **LTS (Long Term Support)** version
3. Run the installer and follow the installation wizard
4. Accept the license agreement and keep the default settings
5. Complete the installation
6. Verify the installation:

   - Open Command Prompt and type:

     ```bash
     node --version
     npm --version
     ```

### Troubleshooting

- If you get “command not found” or similar errors:

  - Make sure Node.js is installed correctly and added to your **PATH**
  - Restart your computer and try again

---

## Getting Started

### ✅ Backend Setup (Student Task)

1. Open the project in IntelliJ IDEA:

   - Select **"Open"** and choose the backend folder of the project
   - Wait for dependencies to finish loading

2. Run the backend server:

   - Go to `src/main/java/com/shop/backend/`
   - click on `BackendApplication.java` and run the file
   - The backend server will start at: `http://localhost:8080`

---

### ✅ Frontend Setup (UI Provided)

1. Open a terminal and go to the frontend folder:

   ```bash
   cd frontend
   ```

2. Install frontend dependencies (only once):

   ```bash
   npm install
   ```

3. Start the frontend development server:

   ```bash
   npm run dev
   ```

   The app will open at: `http://localhost:5173`

---

## Project Structure

```
ap-online-shop/
├── backend/
│   ├── src/
│   │   ├── main/java/com/shop/backend/
│   │   │   ├── controllers/       # REST controllers (DO NOT MODIFY)
│   │   │   ├── models/            # Data models (DO NOT MODIFY)
│   │   │   ├── services/
│   │   │   │   ├── api/           # Service interfaces (DO NOT MODIFY)
│   │   │   │   ├── core/          # Reference implementation (READ ONLY)
│   │   │   │   └── student/       # YOUR IMPLEMENTATION GOES HERE
│   │   │   └── BackendApplication.java
│   │   └── test/
│   ├── api-doc.md                 # API documentation
│   └── README.md                  # Backend-specific instructions
│
└── frontend/
    ├── src/
    ├── api-doc.md
    └── README.md
```

---

## Your Mission

As a backend developer on the team, your job is to implement backend functionality in the `services/student/` package.

### Your tasks:

1. Open and implement all methods marked with `// TODO` in:

   - `StudentUserService.java`
   - `StudentProductService.java`
   - `StudentCartService.java`
   - `StudentOrderService.java`

2. Follow the interfaces in `services/api/` as your contract

3. **Do not modify** the provided:

   - Models
   - Controllers
   - Interfaces

4. Use in-memory storage like `List`, `Map`, etc. — no database is needed

5. If needed, refer to the example logic in `services/core/` (read-only)

---

## API Documentation

Check the full API guide in:
📄 `backend/api-doc.md`

This file explains all endpoints you must implement, including:

- Request formats
- Response structures
- Expected status codes

---

## Testing

1. Run both the frontend and backend as described
2. Use the browser interface at `http://localhost:5173`
3. Interact with the app and observe results
4. Check the IntelliJ console for errors or logs

✅ Make sure the following features work:

- User registration and login
- Product browsing and search
- Shopping cart behavior
- Order placement and history

---

## Troubleshooting Tips

| Problem             | Possible Solution                                             |
| ------------------- | ------------------------------------------------------------- |
| Backend won’t start | Make sure JDK 17+ is installed and selected in IntelliJ       |
| Frontend errors     | Confirm Node.js is installed and run `npm install`            |
| No API response     | Ensure `@Service` annotations and proper dependency injection |

---

## Final Notes

This project will give you experience working with:

- Spring Boot and RESTful APIs
- Predefined frontend/backend API contracts
- Real-world software team roles (you’re the backend dev!)

You’re expected to complete your backend logic independently and responsibly — just like in a real company.

Good luck!
