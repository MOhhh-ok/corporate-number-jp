import { CorporateNumberError, ValidateResult } from "./types";


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

function toDigits(corporateNumberDigits: string | number | number[]): number[] {
  let result: number[];
  switch (typeof corporateNumberDigits) {
    case 'string':
    case 'number':
      const splited = corporateNumberDigits.toString().split('');
      if (splited.some(c => isNaN(Number(c)))) {
        throw new CorporateNumberError('法人番号は数字で入力してください', 'NON_NUMERIC');
      }
      result = splited.map((c) => Number(c));
      break;
    default:
      result = corporateNumberDigits;
      // 配列要素の妥当性チェック（0-9 の整数）
      const invalidIndex = result.findIndex((n) => !Number.isInteger(n) || n < 0 || n > 9);
      if (invalidIndex !== -1) {
        throw new CorporateNumberError('配列内の要素は 0 から 9 の整数である必要があります', 'INVALID_ARRAY_ELEMENT');
      }
      break;
  }
  return result;
}


function calculateCheckDigit(bodyDigits: number[]): number {
  const evens = bodyDigits.filter((_, i) => i % 2 === 0);
  const odds = bodyDigits.filter((_, i) => i % 2 === 1);
  const evensSum = evens.reduce((acc, cur) => acc + cur, 0);
  const oddsSum = odds.reduce((acc, cur) => acc + cur, 0);
  return 9 - ((evensSum * 2 + oddsSum) % 9);
}

function splitCorporateNumberDigits(corporateNumberDigits: number[]) {
  if (corporateNumberDigits.length !== 13) {
    throw new CorporateNumberError('法人番号は13桁で入力してください', 'INVALID_LENGTH');
  }
  const checkDigit = corporateNumberDigits[0]!;
  const bodyDigits = corporateNumberDigits.slice(1)!;
  return { checkDigit, bodyDigits };
}