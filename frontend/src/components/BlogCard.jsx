import { Link } from 'react-router-dom';
import { FiUser, FiCalendar, FiTag } from 'react-icons/fi';

const BlogCard = ({ blog }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link
      to={`/blogs/${blog.slug}`}
      className="block bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-colors"
    >
      <h3 className="text-xl font-semibold text-white mb-2 hover:text-blue-400">
        {blog.title}
      </h3>
      
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-3">
        <div className="flex items-center space-x-1">
          <FiUser className="h-4 w-4" />
          <span>{blog.author?.name || 'Anonymous'}</span>
        </div>
        <div className="flex items-center space-x-1">
          <FiCalendar className="h-4 w-4" />
          <span>{formatDate(blog.createdAt)}</span>
        </div>
      </div>

      {blog.tags && blog.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {blog.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded"
            >
              <FiTag className="h-3 w-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
};

export default BlogCard;
