export type ErrorType =
  | 'NON_NUMERIC'
  | 'INVALID_LENGTH'
  | 'CHECK_DIGIT_MISMATCH'
  | 'INVALID_ARRAY_ELEMENT';

export class CorporateNumberError extends Error {
  public readonly errorType: ErrorType;
  constructor(message: string, errorType: ErrorType) {
    super(message);
    this.name = 'CorporateNumberError';
    this.errorType = errorType;
  }
}

export type ValidResult = {
  valid: true,
  checkDigit: number,
  bodyDigits: number[],
  corporateNumberDigits: number[],
}

export type InvalidResult = {
  valid: false,
  error: string,
  errorType: ErrorType,
}

export type ValidateResult = ValidResult | InvalidResult;