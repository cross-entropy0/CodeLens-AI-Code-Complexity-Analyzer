import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlogBySlug,
  getBlogById,
  getMyBlogs,
  updateBlog,
  deleteBlog,
} from '../controllers/blogController.js';
import { protect, optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getBlogs);

// Protected routes - order matters!
router.get('/my', protect, getMyBlogs);
router.get('/edit/:id', protect, getBlogById);
router.post('/', protect, createBlog);

// This must come after /my to avoid treating 'my' as a slug
// Uses optionalAuth to allow author to view their own unpublished blogs
router.get('/:slug', optionalAuth, getBlogBySlug);

router.route('/:id')
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router;
