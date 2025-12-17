# CodeLens - AI Code Complexity Analyzer
## Project Report

---

## 1. Introduction

**CodeLens** is a full-stack web application that helps developers analyze the time and space complexity of their code using artificial intelligence. Users can paste their code, select the programming language, and receive instant insights about algorithmic efficiency powered by Google's Gemini AI.

### Problem Statement
Understanding code complexity is crucial for writing efficient algorithms, but manually analyzing Big O notation can be challenging for beginners and time-consuming for experienced developers. CodeLens automates this process using AI.

### Solution
A web-based platform where users can:
- Analyze code complexity instantly
- Learn about Big O notation through tutorials
- Track their analysis history
- Share knowledge through a blog system

---

## 2. Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| React 18 | UI Library |
| Vite | Build Tool & Dev Server |
| Tailwind CSS v4 | Styling |
| React Router | Client-side Routing |
| CodeMirror | Code Editor Component |
| Tiptap | Rich Text Editor (Blogs) |
| Axios | HTTP Client |

### Backend
| Technology | Purpose |
|------------|---------|
| Node.js | Runtime Environment |
| Express.js | Web Framework |
| MongoDB | Database |
| Mongoose | ODM (Object Document Mapper) |
| JWT | Authentication |
| bcryptjs | Password Hashing |
| Google Gemini AI | Code Analysis |

### Deployment
| Service | Component |
|---------|-----------|
| Vercel | Frontend & Backend Hosting |
| MongoDB Atlas | Cloud Database |

---

## 3. System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
│                     React + Vite + Tailwind                      │
└─────────────────────────────┬───────────────────────────────────┘
                              │ HTTPS (REST API)
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND (Express.js)                        │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │
│  │   Auth   │  │ Analysis │  │   Blog   │  │    Middleware    │ │
│  │  Routes  │  │  Routes  │  │  Routes  │  │  (JWT, CORS)     │ │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └──────────────────┘ │
│       │             │             │                              │
│       ▼             ▼             ▼                              │
│  ┌──────────────────────────────────────┐                       │
│  │           Controllers                 │                       │
│  │  (Business Logic & Data Processing)   │                       │
│  └──────────────────┬───────────────────┘                       │
└─────────────────────┼───────────────────────────────────────────┘
                      │
          ┌───────────┴───────────┐
          ▼                       ▼
┌──────────────────┐    ┌──────────────────┐
│   MongoDB Atlas  │    │   Gemini AI API  │
│    (Database)    │    │  (Code Analysis) │
└──────────────────┘    └──────────────────┘
```

---

## 4. Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  name: String,          // User's display name
  email: String,         // Unique, lowercase
  password: String,      // Hashed with bcrypt
  role: String,          // "user" or "admin"
  createdAt: Date,
  updatedAt: Date
}
```

### Analysis Collection
```javascript
{
  _id: ObjectId,
  user: ObjectId,        // Reference to User
  code: String,          // The analyzed code
  language: String,      // javascript, python, java, c, cpp
  timeComplexity: {
    bestCase: String,    // e.g., "O(1)"
    averageCase: String, // e.g., "O(n)"
    worstCase: String    // e.g., "O(n²)"
  },
  spaceComplexity: {
    bestCase: String,
    averageCase: String,
    worstCase: String
  },
  explanation: String,   // AI-generated explanation
  createdAt: Date
}
```

### Blogs Collection
```javascript
{
  _id: ObjectId,
  author: ObjectId,      // Reference to User
  title: String,
  slug: String,          // URL-friendly title
  content: Object,       // Tiptap JSON format
  tags: [String],
  published: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 5. API Endpoints

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register new user | No |
| POST | `/api/auth/login` | Login & get token | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Code Analysis
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/analysis` | Analyze code complexity | Yes |
| GET | `/api/analysis/history` | Get user's history | Yes |

### Blogs
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/blogs` | Get all published blogs | No |
| GET | `/api/blogs/:slug` | Get single blog | No |
| GET | `/api/blogs/my` | Get user's blogs | Yes |
| POST | `/api/blogs` | Create new blog | Yes |
| PUT | `/api/blogs/:id` | Update blog | Yes |
| DELETE | `/api/blogs/:id` | Delete blog | Yes |

---

## 6. Key Features

### 6.1 Code Complexity Analysis
The core feature uses Google's Gemini AI to analyze code:

1. User submits code with selected language
2. Backend sends code to Gemini API with a structured prompt
3. AI returns time complexity, space complexity, and explanation
4. Results are saved to database and displayed to user

**Supported Languages:** JavaScript, Python, Java, C, C++

### 6.2 Authentication System
- JWT (JSON Web Token) based authentication
- Passwords hashed using bcrypt (10 salt rounds)
- Token stored in localStorage on frontend
- Protected routes require valid token in Authorization header

### 6.3 User Roles
| Role | Permissions |
|------|-------------|
| User | Analyze code, view history, write/edit own blogs |
| Admin | All user permissions + edit/delete any blog |

### 6.4 Blog System
- Rich text editor with Tiptap
- Support for headings, bold, italic, lists, code blocks
- Syntax highlighting in code blocks
- Draft/Published status
- Tag-based organization

---

## 7. Security Measures

1. **Password Security** - bcrypt hashing with salt
2. **JWT Authentication** - Secure token-based auth
3. **CORS Configuration** - Restricted origins
4. **Input Validation** - Server-side validation
5. **Environment Variables** - Sensitive data in .env files

---

## 8. Deployment Architecture

```
GitHub Repository
       │
       ▼
┌──────────────────────────────────────────────┐
│                   Vercel                      │
│  ┌─────────────┐      ┌─────────────────┐    │
│  │  Frontend   │      │    Backend      │    │
│  │  (Static)   │ ───► │  (Serverless)   │    │
│  └─────────────┘      └────────┬────────┘    │
└────────────────────────────────┼─────────────┘
                                 │
                                 ▼
                    ┌────────────────────────┐
                    │    MongoDB Atlas       │
                    │    (Cloud Database)    │
                    └────────────────────────┘
```

---

## 9. Future Enhancements

1. **More Languages** - Add support for Go, Rust, TypeScript
2. **Code Optimization Suggestions** - AI-powered refactoring tips
3. **Comparison Tool** - Compare complexity of different solutions
4. **Social Features** - Share analyses, follow users
5. **VS Code Extension** - Analyze code directly in editor
6. **API Rate Limiting** - Prevent abuse (currently removed)

---

## 10. Conclusion

CodeLens demonstrates a practical implementation of a modern full-stack application using the MERN stack. The integration of AI (Gemini) adds significant value by automating complex code analysis. The modular architecture with separate frontend and backend allows for independent scaling and deployment.

**Key Learnings:**
- Building RESTful APIs with Express.js
- JWT authentication implementation
- AI integration in web applications
- Serverless deployment on Vercel
- MongoDB schema design

---

**Project Links:**
- Frontend: [Vercel Deployment URL]
- Backend: https://bacnendcode-lens-ai-code-complexity.vercel.app
- GitHub: https://github.com/cross-entropy0/CodeLens-AI-Code-Complexity-Analyzer

---

*Report generated for CodeLens - AI Code Complexity Analyzer*
*December 2024*
