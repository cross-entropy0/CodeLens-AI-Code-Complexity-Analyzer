import Analysis from '../models/Analysis.js';
import { analyzeCode } from '../services/geminiService.js';

// @desc    Analyze code complexity
// @route   POST /api/analysis
// @access  Private
export const createAnalysis = async (req, res) => {
  try {
    const { code, language } = req.body;

    if (!code || !language) {
      return res.status(400).json({ message: 'Code and language are required' });
    }

    // Get analysis from Gemini
    const result = await analyzeCode(code, language);

    if (!result.success) {
      return res.status(500).json({ message: result.error });
    }

    // Save to database
    const analysis = await Analysis.create({
      user: req.user._id,
      code,
      language,
      timeComplexity: result.data.timeComplexity,
      spaceComplexity: result.data.spaceComplexity,
      explanation: result.data.explanation,
      rawResponse: result.data.rawResponse,
    });

    res.status(201).json({
      _id: analysis._id,
      code: analysis.code,
      language: analysis.language,
      timeComplexity: analysis.timeComplexity,
      spaceComplexity: analysis.spaceComplexity,
      explanation: analysis.explanation,
      createdAt: analysis.createdAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user's analysis history
// @route   GET /api/analysis
// @access  Private
export const getAnalysisHistory = async (req, res) => {
  try {
    const analyses = await Analysis.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .select('-rawResponse'); // Exclude raw response for list view

    res.json(analyses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single analysis
// @route   GET /api/analysis/:id
// @access  Private
export const getAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }

    // Check ownership
    if (analysis.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete analysis
// @route   DELETE /api/analysis/:id
// @access  Private
export const deleteAnalysis = async (req, res) => {
  try {
    const analysis = await Analysis.findById(req.params.id);

    if (!analysis) {
      return res.status(404).json({ message: 'Analysis not found' });
    }

    // Check ownership
    if (analysis.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await analysis.deleteOne();
    res.json({ message: 'Analysis deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
