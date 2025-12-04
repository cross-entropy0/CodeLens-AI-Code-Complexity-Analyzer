import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { common, createLowlight } from 'lowlight';
import { 
  FiBold, FiItalic, FiList, FiCode, 
  FiHash, FiSave, FiEye, FiEyeOff, FiX, FiPlus
} from 'react-icons/fi';
import api from '../api/axios';

const lowlight = createLowlight(common);

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const buttonClass = (isActive) =>
    `p-2 rounded ${isActive ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`;

  return (
    <div className="flex flex-wrap gap-2 p-3 bg-gray-800 border-b border-gray-700 rounded-t-lg">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={buttonClass(editor.isActive('heading', { level: 1 }))}
        title="Heading 1"
      >
        <span className="font-bold text-sm">H1</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={buttonClass(editor.isActive('heading', { level: 2 }))}
        title="Heading 2"
      >
        <span className="font-bold text-sm">H2</span>
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={buttonClass(editor.isActive('heading', { level: 3 }))}
        title="Heading 3"
      >
        <span className="font-bold text-sm">H3</span>
      </button>
      
      <div className="w-px bg-gray-600 mx-1" />
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={buttonClass(editor.isActive('bold'))}
        title="Bold"
      >
        <FiBold className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={buttonClass(editor.isActive('italic'))}
        title="Italic"
      >
        <FiItalic className="h-4 w-4" />
      </button>
      
      <div className="w-px bg-gray-600 mx-1" />
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={buttonClass(editor.isActive('bulletList'))}
        title="Bullet List"
      >
        <FiList className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={buttonClass(editor.isActive('orderedList'))}
        title="Ordered List"
      >
        <FiHash className="h-4 w-4" />
      </button>
      
      <div className="w-px bg-gray-600 mx-1" />
      
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCode().run()}
        className={buttonClass(editor.isActive('code'))}
        title="Inline Code"
      >
        <FiCode className="h-4 w-4" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={buttonClass(editor.isActive('codeBlock'))}
        title="Code Block"
      >
        <span className="text-xs font-mono">{'</>'}</span>
      </button>
    </div>
  );
};

const BlogWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: '<p>Start writing your blog here...</p>',
    editorProps: {
      attributes: {
        class: 'tiptap focus:outline-none min-h-[300px]',
      },
    },
  });

  const addTag = () => {
    const tag = tagInput.trim().toLowerCase();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    if (!editor?.getJSON().content?.length) {
      setError('Content is required');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const response = await api.post('/blogs', {
        title,
        content: editor.getJSON(),
        tags,
        published,
      });
      navigate(`/blogs/${response.data.slug}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create blog');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-8">Write a Blog</h1>

      {error && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your blog title..."
            className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white text-xl placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Tags
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(tag)}
                  className="ml-2 hover:text-blue-200"
                >
                  <FiX className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a tag..."
              className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg"
            >
              <FiPlus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Editor */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Content
          </label>
          <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} className="p-4" />
          </div>
        </div>

        {/* Publish Toggle & Submit */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-700">
          <label className="flex items-center space-x-3 cursor-pointer">
            <button
              type="button"
              onClick={() => setPublished(!published)}
              className={`relative w-12 h-6 rounded-full transition-colors ${
                published ? 'bg-blue-600' : 'bg-gray-600'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  published ? 'translate-x-6' : ''
                }`}
              />
            </button>
            <span className="text-gray-300 flex items-center space-x-2">
              {published ? <FiEye className="h-4 w-4" /> : <FiEyeOff className="h-4 w-4" />}
              <span>{published ? 'Publish immediately' : 'Save as draft'}</span>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium rounded-lg flex items-center space-x-2"
          >
            <FiSave className="h-4 w-4" />
            <span>{loading ? 'Saving...' : 'Save Blog'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogWrite;
