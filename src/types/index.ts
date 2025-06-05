export interface Country {
  _id?: string;
  country: string;
}

export interface CountrySpec {
  _id?: string;
  country: string;
  width: number;
  height: number;
  maxSizeKB: number;
  backgroundColor?: string;
  eyesOpen?: boolean;
  neutralExpression?: boolean;
  faceCoverage?: number;
  additionalRequirements?: string[];
}

export interface ValidationError {
  type: 'dimension' | 'size' | 'background' | 'face' | 'expression' | 'other';
  message: string;
  severity: 'error' | 'warning';
}

export interface ImageAnalysisResult {
  dimensions: {
    width: number;
    height: number;
  };
  fileSize: number;
  backgroundColor?: string;
  faceDetected: boolean;
  faceCoverage?: number;
  eyesOpen?: boolean;
  neutralExpression?: boolean;
  errors: ValidationError[];
  passed: boolean;
}