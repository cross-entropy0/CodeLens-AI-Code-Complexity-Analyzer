import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { FiArrowLeft, FiEdit, FiTrash2, FiUser, FiCalendar, FiTag } from 'react-icons/fi';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

const BlogView = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await api.get(`/blogs/${slug}`);
      setBlog(response.data);
    } catch (err) {
      setError('Blog not found');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    
    try {
      await api.delete(`/blogs/${blog._id}`);
      navigate('/blogs');
    } catch (err) {
      setError('Failed to delete blog');
    }
  };

  const canEdit = user && blog && (user._id === blog.author?._id || user.role === 'admin');

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Render Tiptap JSON content
  const renderContent = (content) => {
    if (!content || !content.content) return null;

    return content.content.map((node, index) => {
      switch (node.type) {
        case 'paragraph':
          return (
            <p key={index} className="my-3 text-gray-300">
              {renderInlineContent(node.content)}
            </p>
          );
        case 'heading':
          const HeadingTag = `h${node.attrs?.level || 2}`;
          const headingClasses = {
            1: 'text-3xl font-bold mt-6 mb-4',
            2: 'text-2xl font-bold mt-5 mb-3',
            3: 'text-xl font-bold mt-4 mb-2',
          };
          return (
            <HeadingTag key={index} className={`text-white ${headingClasses[node.attrs?.level] || ''}`}>
              {renderInlineContent(node.content)}
            </HeadingTag>
          );
        case 'codeBlock':
          return (
            <pre key={index} className="bg-gray-900 rounded-lg p-4 my-4 overflow-x-auto">
              <code className="text-sm text-gray-300">
                {node.content?.map(c => c.text).join('') || ''}
              </code>
            </pre>
          );
        case 'bulletList':
          return (
            <ul key={index} className="list-disc pl-6 my-3 text-gray-300">
              {node.content?.map((item, i) => (
                <li key={i} className="my-1">
                  {item.content?.map((p, j) => renderInlineContent(p.content))}
                </li>
              ))}
            </ul>
          );
        case 'orderedList':
          return (
            <ol key={index} className="list-decimal pl-6 my-3 text-gray-300">
              {node.content?.map((item, i) => (
                <li key={i} className="my-1">
                  {item.content?.map((p, j) => renderInlineContent(p.content))}
                </li>
              ))}
            </ol>
          );
        default:
          return null;
      }
    });
  };

  const renderInlineContent = (content) => {
    if (!content) return null;
    return content.map((item, index) => {
      if (item.type === 'text') {
        let text = item.text;
        if (item.marks) {
          item.marks.forEach(mark => {
            if (mark.type === 'bold') {
              text = <strong key={index}>{text}</strong>;
            } else if (mark.type === 'italic') {
              text = <em key={index}>{text}</em>;
            } else if (mark.type === 'code') {
              text = <code key={index} className="bg-gray-800 px-1 py-0.5 rounded text-sm">{text}</code>;
            }
          });
        }
        return <span key={index}>{text}</span>;
      }
      return null;
    });
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-white mb-4">Blog Not Found</h1>
        <Link to="/blogs" className="text-blue-400 hover:text-blue-300">
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Back Button & Actions */}
      <div className="flex items-center justify-between mb-6">
        <Link
          to="/blogs"
          className="text-gray-400 hover:text-white flex items-center space-x-2"
        >
          <FiArrowLeft className="h-4 w-4" />
          <span>Back to Blogs</span>
        </Link>
        
        {canEdit && (
          <div className="flex items-center space-x-2">
            <Link
              to={`/blogs/edit/${blog._id}`}
              className="p-2 text-gray-400 hover:text-blue-400 transition-colors"
            >
              <FiEdit className="h-5 w-5" />
            </Link>
            <button
              onClick={handleDelete}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            >
              <FiTrash2 className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Blog Header */}
      <article className="bg-gray-800 rounded-lg border border-gray-700 p-8">
        <h1 className="text-3xl font-bold text-white mb-4">{blog.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-6 pb-6 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <FiUser className="h-4 w-4" />
            <span>{blog.author?.name || 'Anonymous'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <FiCalendar className="h-4 w-4" />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {blog.tags.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded-full"
              >
                <FiTag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Blog Content */}
        <div className="max-w-none">
          {renderContent(blog.content)}
        </div>
      </article>
    </div>
  );
};

export default BlogView;
