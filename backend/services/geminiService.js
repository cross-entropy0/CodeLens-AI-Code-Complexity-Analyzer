import createGeminiClient, { geminiModel } from '../config/gemini.js';

const COMPLEXITY_PROMPT = `You are an expert algorithm analyst. Analyze the following code and provide time and space complexity analysis.

IMPORTANT: Respond ONLY with valid JSON in this exact format, no other text:
{
  "time_complexity": {
    "best_case": "O(?)",
    "average_case": "O(?)",
    "worst_case": "O(?)"
  },
  "space_complexity": {
    "best_case": "O(?)",
    "average_case": "O(?)",
    "worst_case": "O(?)"
  },
  "explanation": "Brief explanation of why these complexities apply, mentioning key factors like loops, recursion, data structures used, etc."
}

Code language: {{LANGUAGE}}

Code to analyze:
\`\`\`{{LANGUAGE}}
{{CODE}}
\`\`\``;

export const analyzeCode = async (code, language) => {
  try {
    const ai = createGeminiClient();
    
    const prompt = COMPLEXITY_PROMPT
      .replace(/{{LANGUAGE}}/g, language)
      .replace('{{CODE}}', code);

    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContent({
      model: geminiModel,
      contents,
    });

    const responseText = response.text;
    
    // Extract JSON from response (handle potential markdown code blocks)
    let jsonString = responseText;
    const jsonMatch = responseText.match(/```(?:json)?\s*([\s\S]*?)```/);
    if (jsonMatch) {
      jsonString = jsonMatch[1].trim();
    }

    // Parse the JSON response
    const analysis = JSON.parse(jsonString);

    return {
      success: true,
      data: {
        timeComplexity: {
          bestCase: analysis.time_complexity?.best_case || 'N/A',
          averageCase: analysis.time_complexity?.average_case || 'N/A',
          worstCase: analysis.time_complexity?.worst_case || 'N/A',
        },
        spaceComplexity: {
          bestCase: analysis.space_complexity?.best_case || 'N/A',
          averageCase: analysis.space_complexity?.average_case || 'N/A',
          worstCase: analysis.space_complexity?.worst_case || 'N/A',
        },
        explanation: analysis.explanation || 'No explanation provided',
        rawResponse: responseText,
      },
    };
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      success: false,
      error: error.message || 'Failed to analyze code',
    };
  }
};
