# CodeLens - AI Code Complexity Analyzer

A full-stack MERN application that analyzes your code's time and space complexity using Google's Gemini AI. Get instant insights into your algorithm's efficiency with detailed explanations.

![CodeLens](https://img.shields.io/badge/CodeLens-AI%20Powered-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![Express](https://img.shields.io/badge/Express-Backend-lightgrey)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933)

## ✨ Features

- **🔍 Code Complexity Analysis** - Analyze time and space complexity of your code using Gemini AI
- **🌐 Multi-Language Support** - JavaScript, Python, Java, C, and C++
- **📝 Blog System** - Write and share programming blogs with rich text editor (Tiptap)
- **📚 Tutorials** - Learn about Big O notation and complexity analysis
- **📊 History Tracking** - View your past code analyses
- **🔐 Authentication** - JWT-based secure authentication
- **👑 Admin Dashboard** - Admin users can manage all blogs
- **📱 Responsive Design** - Works on all devices

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Google Gemini AI** for code analysis
- **bcryptjs** for password hashing

### Frontend
- **React 18** with Vite
- **Tailwind CSS v4** for styling
- **React Router** for navigation
- **CodeMirror** for code editor
- **Tiptap** for rich text blog editor
- **Axios** for API calls
- **React Icons** for icons

## 📁 Project Structure

```
Complexity/
├── backend/
│   ├── config/
│   │   ├── db.js              # MongoDB connection
│   │   └── gemini.js          # Gemini AI client
│   ├── controllers/
│   │   ├── authController.js  # Auth logic
│   │   ├── analysisController.js
│   │   └── blogController.js
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT & admin middleware
│   ├── models/
│   │   ├── User.js
│   │   ├── Analysis.js
│   │   └── Blog.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── analysis.js
│   │   └── blog.js
│   ├── services/
│   │   └── geminiService.js   # AI analysis logic
│   ├── server.js
│   ├── package.json
│   └── vercel.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js       # API client
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── ComplexityResult.jsx
│   │   │   └── BlogCard.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Analyzer.jsx   # Main code analyzer
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── History.jsx
│   │   │   ├── Tutorials.jsx
│   │   │   ├── Blogs.jsx
│   │   │   ├── BlogView.jsx
│   │   │   ├── BlogWrite.jsx
│   │   │   └── BlogEdit.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   └── vercel.json
│
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Google Gemini API Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/codelens.git
   cd codelens
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   ```

3. **Create backend `.env` file**
   ```env
   PORT=5001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/complexity-analyzer
   JWT_SECRET=your_super_secret_jwt_key_here
   JWT_EXPIRE=7d
   GEMINI_API_KEY=your_gemini_api_key_here
   CLIENT_URL=http://localhost:5173
   ```

4. **Setup Frontend**
   ```bash
   cd ../frontend
   npm install
   ```

5. **Create frontend `.env` file**
   ```env
   VITE_API_URL=http://localhost:5001/api
   ```

### Running Locally

1. **Start MongoDB** (if using local)
   ```bash
   mongod
   ```

2. **Start Backend**
   ```bash
   cd backend
   npm run dev   # or: node server.js
   ```

3. **Start Frontend**
   ```bash
   cd frontend
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

## 🌐 Deployment

### Backend (Vercel)

1. Push to GitHub
2. Import backend folder in Vercel
3. Set environment variables:
   - `MONGODB_URI` - MongoDB Atlas connection string
   - `JWT_SECRET` - Secure random string
   - `JWT_EXPIRE` - `7d`
   - `GEMINI_API_KEY` - Your Gemini API key
   - `CLIENT_URL` - Frontend Vercel URL
   - `NODE_ENV` - `production`

### Frontend (Vercel)

1. Import frontend folder in Vercel
2. Set environment variable:
   - `VITE_API_URL` - Backend URL + `/api`

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Analysis
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/analysis` | Analyze code complexity |
| GET | `/api/analysis/history` | Get user's analysis history |

### Blogs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/blogs` | Get all published blogs |
| GET | `/api/blogs/:slug` | Get single blog |
| GET | `/api/blogs/my` | Get user's blogs |
| GET | `/api/blogs/edit/:id` | Get blog for editing |
| POST | `/api/blogs` | Create new blog |
| PUT | `/api/blogs/:id` | Update blog |
| DELETE | `/api/blogs/:id` | Delete blog |

## 👥 User Roles

- **User** - Can analyze code, view history, write/edit own blogs
- **Admin** - All user permissions + can edit/delete any blog

### Creating Admin User

```bash
mongosh "mongodb://localhost:27017/complexity-analyzer" --eval "
db.users.updateOne(
  {email: 'your@email.com'}, 
  {\$set: {role: 'admin'}}
)"
```

## 📄 License

MIT License - feel free to use this project for learning and development.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

---

Built with ❤️ using MERN Stack and Gemini AI
