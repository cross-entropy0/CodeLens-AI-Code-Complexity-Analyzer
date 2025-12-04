import mongoose from 'mongoose';

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    code: {
      type: String,
      required: [true, 'Code is required'],
    },
    language: {
      type: String,
      required: [true, 'Programming language is required'],
      trim: true,
    },
    timeComplexity: {
      bestCase: String,
      averageCase: String,
      worstCase: String,
    },
    spaceComplexity: {
      bestCase: String,
      averageCase: String,
      worstCase: String,
    },
    explanation: {
      type: String,
    },
    rawResponse: {
      type: String, // Store full Gemini response for reference
    },
  },
  {
    timestamps: true,
  }
);

const Analysis = mongoose.model('Analysis', analysisSchema);

export default Analysis;
