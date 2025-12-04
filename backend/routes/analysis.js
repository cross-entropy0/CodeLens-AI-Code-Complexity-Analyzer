import express from 'express';
import {
  createAnalysis,
  getAnalysisHistory,
  getAnalysis,
  deleteAnalysis,
} from '../controllers/analysisController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All routes require authentication

router.route('/')
  .post(createAnalysis)
  .get(getAnalysisHistory);

router.route('/:id')
  .get(getAnalysis)
  .delete(deleteAnalysis);

export default router;
