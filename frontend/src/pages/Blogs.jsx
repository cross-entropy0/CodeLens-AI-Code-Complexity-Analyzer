import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEdit, FiSearch } from 'react-icons/fi';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/blogs');
      setBlogs(response.data);
    } catch (err) {
      console.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Community Blogs</h1>
          <p className="text-gray-400 mt-1">Learn from the community's tutorials and articles</p>
        </div>
        {isAuthenticated && (
          <Link
            to="/blogs/write"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <FiEdit className="h-4 w-4" />
            <span>Write Blog</span>
          </Link>
        )}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search blogs by title or tag..."
          className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Blog List */}
      {filteredBlogs.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <FiEdit className="h-16 w-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-medium text-gray-300 mb-2">
            {searchTerm ? 'No blogs found' : 'No blogs yet'}
          </h3>
          <p className="text-gray-400 mb-4">
            {searchTerm ? 'Try a different search term' : 'Be the first to write one!'}
          </p>
          {isAuthenticated && !searchTerm && (
            <Link
              to="/blogs/write"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              <FiEdit className="h-4 w-4" />
              <span>Write Blog</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredBlogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Blogs;
