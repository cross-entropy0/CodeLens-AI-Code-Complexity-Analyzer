import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { oneDark } from '@codemirror/theme-one-dark';
import { FiPlay, FiCode, FiAlertCircle } from 'react-icons/fi';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import ComplexityResult from '../components/ComplexityResult';

const LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', extension: javascript },
  { value: 'python', label: 'Python', extension: python },
  { value: 'java', label: 'Java', extension: java },
  { value: 'cpp', label: 'C++', extension: cpp },
  { value: 'c', label: 'C', extension: cpp },
];

const DEFAULT_CODE = `// Paste your code here or write one
function example(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}`;

const Analyzer = () => {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [language, setLanguage] = useState('javascript');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const getLanguageExtension = () => {
    const lang = LANGUAGES.find(l => l.value === language);
    return lang ? [lang.extension()] : [javascript()];
  };

  const handleAnalyze = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!code.trim()) {
      setError('Please enter some code to analyze');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const response = await api.post('/analysis', { code, language });
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">
          Code Complexity Analyzer
        </h1>
        <p className="text-gray-400">
          Paste your code below and get instant time & space complexity analysis powered by AI
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Editor Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <FiCode className="h-5 w-5 text-blue-500" />
              <h2 className="text-lg font-semibold text-white">Your Code</h2>
            </div>
            
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500"
            >
              {LANGUAGES.map((lang) => (
                <option key={lang.value} value={lang.value}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>

          <CodeMirror
            value={code}
            height="400px"
            theme={oneDark}
            extensions={getLanguageExtension()}
            onChange={(value) => setCode(value)}
            className="rounded-lg overflow-hidden"
          />

          {error && (
            <div className="p-3 bg-red-900/50 border border-red-500 rounded-lg flex items-center space-x-2 text-red-200">
              <FiAlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <FiPlay className="h-5 w-5" />
                <span>Analyze Complexity</span>
              </>
            )}
          </button>

          {!isAuthenticated && (
            <p className="text-center text-gray-400 text-sm">
              You need to{' '}
              <a href="/login" className="text-blue-400 hover:text-blue-300">
                login
              </a>{' '}
              to analyze code
            </p>
          )}
        </div>

        {/* Results Section */}
        <div>
          {loading ? (
            <div className="h-full flex items-center justify-center bg-gray-800 rounded-lg border border-gray-700">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Analyzing your code with AI...</p>
              </div>
            </div>
          ) : result ? (
            <ComplexityResult result={result} />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-800 rounded-lg border border-gray-700 min-h-[400px]">
              <div className="text-center text-gray-400">
                <FiCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>Your analysis results will appear here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analyzer;
