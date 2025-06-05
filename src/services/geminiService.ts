import { GoogleGenerativeAI } from '@google/generative-ai';
import { GoogleGenAI } from "@google/genai";
import { CountrySpec, ImageAnalysisResult, ValidationError } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);
const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export const analyzeImage = async (
  imageFile: File,
  countrySpec: CountrySpec
): Promise<ImageAnalysisResult> => {
  try {
    // Create a new FileReader to get image dimensions
    const img = new Image();
    const imageUrl = URL.createObjectURL(imageFile);
    await new Promise((resolve) => {
      img.onload = resolve;
      img.src = imageUrl;
    });
    URL.revokeObjectURL(imageUrl);

    const width = img.width;
    const height = img.height;
    const fileSize = imageFile.size / 1024; // KB

    // Create prompt for Gemini
    const prompt = `
      Analyze this passport photo against these requirements:
      - Face must be clearly visible and detected in image properly with accuracy
      - Required dimensions: ${countrySpec.width}x${countrySpec.height} px
      - Maximum file size: ${countrySpec.maxSizeKB} KB
      - Background color should be white and light-colored
      - Face should be clearly visible and centered
      - Eyes should be open and visible
      - Neutral facial expression (no smiling)
      
      Provide a JSON response with these fields:
      - backgroundColor: detected background color
      - faceDetected: boolean
      - faceCoverage: percentage of frame the face occupies (ideal: 70-80%)
      - eyesOpen: boolean
      - neutralExpression: boolean
      - issues: array of specific problems with the photo
    `;

    // Convert File to base64
    const base64Data = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });

    // Generate content using base64 data
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        { text: prompt },
        { inlineData: { data: base64Data, mimeType: imageFile.type } }
      ]
    });

    const text = response.text || '';
    //console.log('Gemini response:', text);
    
    // Extract JSON from the response
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || 
                     text.match(/{[\s\S]*?}/);
    
    let analysisData = {};
    if (jsonMatch) {
      try {
        analysisData = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } catch (e) {
        console.error('Failed to parse Gemini response:', e);
      }
    }

    // Prepare validation errors
    const errors: ValidationError[] = [];

    // Check dimensions
    if (width !== countrySpec.width || height !== countrySpec.height) {
      errors.push({
        type: 'dimension',
        message: `Image dimensions must be ${countrySpec.width}x${countrySpec.height}px. Yours: ${width}x${height}px`,
        severity: 'error'
      });
    }

    // Check file size
    if (fileSize > countrySpec.maxSizeKB) {
      errors.push({
        type: 'size',
        message: `File size must be under ${countrySpec.maxSizeKB}KB. Yours: ${fileSize.toFixed(1)}KB`,
        severity: 'error'
      });
    }

    // Add any issues from Gemini analysis
    if (analysisData && (analysisData as any).issues) {
      (analysisData as any).issues.forEach((issue: string) => {
        let type: ValidationError['type'] = 'other';
        
        if (issue.toLowerCase().includes('background')) type = 'background';
        else if (issue.toLowerCase().includes('face')) type = 'face';
        else if (issue.toLowerCase().includes('expression')) type = 'expression';
        
        errors.push({
          type,
          message: issue,
          severity: 'error'
        });
      });
    }

    return {
      dimensions: { width, height },
      fileSize,
      backgroundColor: (analysisData as any)?.backgroundColor || undefined,
      faceDetected: (analysisData as any)?.faceDetected || false,
      faceCoverage: (analysisData as any)?.faceCoverage,
      eyesOpen: (analysisData as any)?.eyesOpen,
      neutralExpression: (analysisData as any)?.neutralExpression,
      errors,
      passed: errors.length === 0
    };
  } catch (error) {
    console.error('Error analyzing image with Gemini:', error);
    return {
      dimensions: { width: 0, height: 0 },
      fileSize: 0,
      faceDetected: false,
      errors: [{
        type: 'other',
        message: 'Failed to analyze image. Please try again.',
        severity: 'error'
      }],
      passed: false
    };
  }
};


