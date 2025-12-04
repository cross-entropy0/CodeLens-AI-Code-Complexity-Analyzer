import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiCode, FiBook, FiClock, FiEdit, FiLogOut, FiUser, FiMenu, FiX } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <FiCode className="h-8 w-8 text-blue-500" />
            <span className="text-xl font-bold text-white">CodeLens</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
            >
              <FiCode className="h-4 w-4" />
              <span>Analyzer</span>
            </Link>
            
            <Link
              to="/tutorials"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
            >
              <FiBook className="h-4 w-4" />
              <span>Tutorials</span>
            </Link>

            <Link
              to="/blogs"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
            >
              <FiEdit className="h-4 w-4" />
              <span>Blogs</span>
            </Link>

            {isAuthenticated && (
              <Link
                to="/history"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
              >
                <FiClock className="h-4 w-4" />
                <span>History</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Auth Section - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center space-x-2 text-gray-300">
                  <FiUser className="h-4 w-4" />
                  <span className="text-sm">{user?.name}</span>
                  {isAdmin && (
                    <span className="ml-1 px-2 py-0.5 text-xs bg-purple-600 text-white rounded-full">
                      Admin
                    </span>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1"
                >
                  <FiLogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              >
                <span className="flex items-center space-x-2">
                  <FiCode className="h-4 w-4" />
                  <span>Analyzer</span>
                </span>
              </Link>
              <Link
                to="/tutorials"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              >
                <span className="flex items-center space-x-2">
                  <FiBook className="h-4 w-4" />
                  <span>Tutorials</span>
                </span>
              </Link>
              <Link
                to="/blogs"
                onClick={() => setMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
              >
                <span className="flex items-center space-x-2">
                  <FiEdit className="h-4 w-4" />
                  <span>Blogs</span>
                </span>
              </Link>
              {isAuthenticated && (
                <Link
                  to="/history"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                >
                  <span className="flex items-center space-x-2">
                    <FiClock className="h-4 w-4" />
                    <span>History</span>
                  </span>
                </Link>
              )}
            </div>
            
            {/* Mobile Auth Section */}
            <div className="pt-4 pb-3 border-t border-gray-700">
              {isAuthenticated ? (
                <div className="px-2 space-y-1">
                  <div className="px-3 py-2 text-gray-300 flex items-center space-x-2">
                    <FiUser className="h-4 w-4" />
                    <span>{user?.name}</span>
                    {isAdmin && (
                      <span className="ml-1 px-2 py-0.5 text-xs bg-purple-600 text-white rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="text-gray-300 hover:text-white hover:bg-gray-700 w-full text-left px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2"
                  >
                    <FiLogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="px-2 space-y-1">
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-white hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="bg-blue-600 hover:bg-blue-700 text-white block px-3 py-2 rounded-md text-base font-medium text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
