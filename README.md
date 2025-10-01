# corporate-number-jp

日本の法人番号をローカルで検証するライブラリです。TypeScript対応。

## インストール

```bash
npm install corporate-number-jp
```

または

```bash
pnpm add corporate-number-jp
```

## 使い方

```typescript
import { validateCorporateNumber, type ErrorType } from 'corporate-number-jp';

const result = validateCorporateNumber('1180301018771');

if (result.valid) {
  // result.valid が true の場合、TypeScript が自動的に型を絞り込みます
  console.log('チェックデジット:', result.checkDigit);
  console.log('本体部分:', result.bodyDigits);
  console.log('法人番号:', result.corporateNumberDigits);
} else {
  // result.valid が false の場合、error と errorType にアクセスできます
  const errorType: ErrorType = result.errorType;
  console.log('エラータイプ:', errorType);
  console.log('エラー:', result.error);
}
```

## API

### `validateCorporateNumber(corporateNumberDigits: string | number | number[])`

法人番号を検証します。

#### 引数

- `corporateNumberDigits`: 検証する法人番号（文字列、数値、または数値配列）

#### 戻り値

検証に成功した場合:

```typescript
{
  valid: true,
  checkDigit: number,        // チェックデジット
  bodyDigits: number[],      // 本体部分（12桁）
  corporateNumberDigits: number[]  // 全体の桁（13桁）
}
```

検証に失敗した場合:

```typescript
{
  valid: false,
  error: string,        // エラーメッセージ
  errorType: ErrorType  // エラータイプ
}
```

#### エラータイプ (`ErrorType`)

以下の値のいずれかです。

- `NON_NUMERIC`: 文字列/数値入力に数字以外が含まれている
- `INVALID_LENGTH`: 桁数が 13 桁ではない
- `CHECK_DIGIT_MISMATCH`: チェックデジットが一致しない
- `INVALID_ARRAY_ELEMENT`: 配列入力に 0-9 の整数以外が含まれている

## 法人番号について

法人番号は13桁の数字で構成されており、先頭の1桁がチェックデジットです。このライブラリは、チェックデジットの計算式に基づいて、法人番号が正しい形式かどうかを検証します。

詳細は[国税庁の法人番号公表サイト](https://www.houjin-bangou.nta.go.jp/)をご覧ください。

## 開発

```bash
# テストの実行
pnpm test

# ビルド
pnpm build
```

## License

MIT