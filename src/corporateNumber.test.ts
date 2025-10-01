import { describe, it, expect } from 'vitest';
import { validateCorporateNumber } from './corporateNumber';
import { type ErrorType } from './types';

// https://www.houjin-bangou.nta.go.jp/
const fixtures = [
  { name: "トヨタ自動車株式会社", number: "1180301018771" },
  { name: "株式会社三菱ＵＦＪ銀行", number: "5010001008846" },
  { name: "ソニー株式会社", number: "7010401045660" },
] as const;

const dummyFixtures = [
  { name: "ダミー１", number: "1180001051840" },
  { name: "ダミー２", number: "4010001008840" },
  { name: "ダミー３", number: "6010001033581" },
] as const;


describe('validateCorporateNumber', () => {
  it('validates all corporate numbers in fixture as valid', () => {
    for (const entry of fixtures) {
      const digits = entry.number.split('').map((c) => Number(c));
      const result = validateCorporateNumber(digits);
      expect(result.valid).toBe(true);
    }
    for (const entry of dummyFixtures) {
      const digits = entry.number.split('').map((c) => Number(c));
      const result = validateCorporateNumber(digits);
      expect(result.valid).toBe(false);
      // errorType は CHECK_DIGIT_MISMATCH を想定
      if (!result.valid) {
        expect(result.errorType).toBe<'CHECK_DIGIT_MISMATCH'>('CHECK_DIGIT_MISMATCH');
      }
    }
  });

  it('returns NON_NUMERIC for non-numeric string input', () => {
    const result = validateCorporateNumber('12345abc678901');
    if (!result.valid) {
      expect(result.errorType).toBe<'NON_NUMERIC'>('NON_NUMERIC');
    }
  });

  it('returns INVALID_LENGTH for non 13-digit input', () => {
    const result = validateCorporateNumber('123456789012');
    if (!result.valid) {
      expect(result.errorType).toBe<'INVALID_LENGTH'>('INVALID_LENGTH');
    }
  });

  it('returns INVALID_ARRAY_ELEMENT for invalid array digits', () => {
    const result = validateCorporateNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 10]);
    if (!result.valid) {
      expect(result.errorType).toBe<'INVALID_ARRAY_ELEMENT'>('INVALID_ARRAY_ELEMENT');
    }
  });
});


