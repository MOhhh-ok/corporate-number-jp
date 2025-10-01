import { describe, it, expect } from 'vitest';
import { validateCorporateNumber } from './corporateNumber';

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
    }
  });
});


