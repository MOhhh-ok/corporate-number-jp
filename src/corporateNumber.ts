type ValidResult = {
  valid: true,
  checkDigit: number,
  bodyDigits: number[],
  corporateNumberDigits: number[],
}

type InvalidResult = {
  valid: false,
  error: string,
}

type Result = ValidResult | InvalidResult;

export function validateCorporateNumber(corporateNumberDigits: string | number | number[]): Result {
  const digits = toDigits(corporateNumberDigits);
  try {
    const { checkDigit, bodyDigits } = splitCorporateNumberDigits(digits);
    const calculatedCheckDigit = calculateCheckDigit(bodyDigits);
    if (calculatedCheckDigit !== checkDigit) {
      throw new Error('チェックデジットが一致しません');
    }
    return { valid: true, checkDigit, bodyDigits, corporateNumberDigits: digits };
  } catch (error: any) {
    return { valid: false, error: error.message };
  }
}

function toDigits(corporateNumberDigits: string | number | number[]): number[] {
  if (typeof corporateNumberDigits === 'string') {
    return corporateNumberDigits.split('').map((c) => Number(c));
  }
  if (typeof corporateNumberDigits === 'number') {
    return corporateNumberDigits.toString().split('').map((c) => Number(c));
  }
  return corporateNumberDigits;
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
    throw new Error('法人番号は13桁で入力してください');
  }
  const checkDigit = corporateNumberDigits[0]!;
  const bodyDigits = corporateNumberDigits.slice(1)!;
  return { checkDigit, bodyDigits };
}