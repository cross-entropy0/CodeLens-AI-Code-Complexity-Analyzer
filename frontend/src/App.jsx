import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Analyzer from './pages/Analyzer';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import Tutorials from './pages/Tutorials';
import Blogs from './pages/Blogs';
import BlogView from './pages/BlogView';
import BlogWrite from './pages/BlogWrite';
import BlogEdit from './pages/BlogEdit';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-900">
          <Navbar />
          <main>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Analyzer />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tutorials" element={<Tutorials />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:slug" element={<BlogView />} />

              {/* Protected Routes */}
              <Route
                path="/history"
                element={
                  <ProtectedRoute>
                    <History />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blogs/write"
                element={
                  <ProtectedRoute>
                    <BlogWrite />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/blogs/edit/:id"
                element={
                  <ProtectedRoute>
                    <BlogEdit />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
