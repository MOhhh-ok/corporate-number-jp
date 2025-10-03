import { CorporateNumberError, ValidateResult } from "./types";
import { calculateCheckDigit, splitCorporateNumberDigits, toDigits } from "./utils";


export function validateCorporateNumber(corporateNumberDigits: string | number | number[]): ValidateResult {
  try {
    const digits = toDigits(corporateNumberDigits);
    const { checkDigit, bodyDigits } = splitCorporateNumberDigits(digits);
    const calculatedCheckDigit = calculateCheckDigit(bodyDigits);
    if (calculatedCheckDigit !== checkDigit) {
      throw new CorporateNumberError('チェックデジットが一致しません', 'CHECK_DIGIT_MISMATCH');
    }
    return { valid: true, checkDigit, bodyDigits, corporateNumberDigits: digits };
  } catch (error: any) {
    if (error instanceof CorporateNumberError) {
      return { valid: false, error: error.message, errorType: error.errorType };
    }
    // 想定外エラーは一般化（型安全のためフォールバック）
    return { valid: false, error: error?.message ?? '不明なエラーが発生しました', errorType: 'CHECK_DIGIT_MISMATCH' };
  }
}


export function fakeCorporateNumber() {
  const bodyDigits: number[] = Array.from({ length: 12 }, () => Math.floor(Math.random() * 10));
  const checkDigit = calculateCheckDigit(bodyDigits);
  const digits = [checkDigit, ...bodyDigits];
  return digits.join('');
}