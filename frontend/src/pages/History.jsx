import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiCode, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import api from '../api/axios';

const History = () => {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await api.get('/analysis');
      setAnalyses(response.data);
    } catch (err) {
      setError('Failed to load history');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this analysis?')) return;
    
    try {
      await api.delete(`/analysis/${id}`);
      setAnalyses(analyses.filter(a => a._id !== id));
    } catch (err) {
      setError('Failed to delete analysis');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateCode = (code, maxLength = 100) => {
    if (code.length <= maxLength) return code;
    return code.substring(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Analysis History</h1>
          <p className="text-gray-400 mt-1">View your past code complexity analyses</p>
        </div>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <FiCode className="h-4 w-4" />
          <span>New Analysis</span>
        </Link>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
          {error}
        </div>
      )}

      {analyses.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg border border-gray-700">
          <FiClock className="h-16 w-16 mx-auto text-gray-600 mb-4" />
          <h3 className="text-xl font-medium text-gray-300 mb-2">No analyses yet</h3>
          <p className="text-gray-400 mb-4">Start by analyzing some code!</p>
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            <FiCode className="h-4 w-4" />
            <span>Analyze Code</span>
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {analyses.map((analysis) => (
            <div
              key={analysis._id}
              className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden"
            >
              <div
                className="p-4 cursor-pointer hover:bg-gray-750"
                onClick={() => setExpandedId(expandedId === analysis._id ? null : analysis._id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded">
                        {analysis.language}
                      </span>
                      <span className="text-gray-400 text-sm">
                        {formatDate(analysis.createdAt)}
                      </span>
                    </div>
                    <code className="text-sm text-gray-300 font-mono">
                      {truncateCode(analysis.code)}
                    </code>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(analysis._id);
                      }}
                      className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                    {expandedId === analysis._id ? (
                      <FiChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <FiChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Complexity Summary */}
                <div className="flex items-center space-x-4 mt-3 text-sm">
                  <span className="text-gray-400">
                    Time: <span className="text-yellow-400 font-mono">{analysis.timeComplexity?.worstCase}</span>
                  </span>
                  <span className="text-gray-400">
                    Space: <span className="text-green-400 font-mono">{analysis.spaceComplexity?.worstCase}</span>
                  </span>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedId === analysis._id && (
                <div className="border-t border-gray-700 p-4 bg-gray-850">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-400 mb-2">Full Code</h4>
                    <pre className="bg-gray-900 p-3 rounded-lg overflow-x-auto text-sm text-gray-300">
                      {analysis.code}
                    </pre>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Time Complexity</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Best:</span>
                          <span className="text-green-400 font-mono">{analysis.timeComplexity?.bestCase}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Average:</span>
                          <span className="text-yellow-400 font-mono">{analysis.timeComplexity?.averageCase}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Worst:</span>
                          <span className="text-red-400 font-mono">{analysis.timeComplexity?.worstCase}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Space Complexity</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Best:</span>
                          <span className="text-green-400 font-mono">{analysis.spaceComplexity?.bestCase}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Average:</span>
                          <span className="text-yellow-400 font-mono">{analysis.spaceComplexity?.averageCase}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Worst:</span>
                          <span className="text-red-400 font-mono">{analysis.spaceComplexity?.worstCase}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {analysis.explanation && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-400 mb-2">Explanation</h4>
                      <p className="text-gray-300 text-sm leading-relaxed">{analysis.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
