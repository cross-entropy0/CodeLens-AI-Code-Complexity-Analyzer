import Blog from '../models/Blog.js';

// @desc    Create new blog
// @route   POST /api/blogs
// @access  Private
export const createBlog = async (req, res) => {
  try {
    const { title, content, tags, published } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const blog = await Blog.create({
      author: req.user._id,
      title,
      content,
      tags: tags || [],
      published: published || false,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all published blogs
// @route   GET /api/blogs
// @access  Public
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true })
      .populate('author', 'name')
      .sort({ createdAt: -1 })
      .select('-content'); // Exclude full content for list view

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog by slug
// @route   GET /api/blogs/:slug
// @access  Public
export const getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug })
      .populate('author', 'name');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // If not published, only author and admin can view
    if (!blog.published) {
      if (!req.user || 
          (blog.author._id.toString() !== req.user._id.toString() && 
           req.user.role !== 'admin')) {
        return res.status(404).json({ message: 'Blog not found' });
      }
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single blog by ID (for editing)
// @route   GET /api/blogs/edit/:id
// @access  Private (author or admin)
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate('author', 'name');

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user is author or admin
    const isAuthor = blog.author._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to edit this blog' });
    }

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's own blogs
// @route   GET /api/blogs/my
// @access  Private
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .select('-content');

    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update blog
// @route   PUT /api/blogs/:id
// @access  Private (author or admin)
export const updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user is author or admin
    const isAuthor = blog.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this blog' });
    }

    const { title, content, tags, published } = req.body;

    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.tags = tags !== undefined ? tags : blog.tags;
    blog.published = published !== undefined ? published : blog.published;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete blog
// @route   DELETE /api/blogs/:id
// @access  Private (author or admin)
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: 'Blog not found' });
    }

    // Check if user is author or admin
    const isAuthor = blog.author.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this blog' });
    }

    await blog.deleteOne();
    res.json({ message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
