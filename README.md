# sharp

<img src="https://cdn.jsdelivr.net/gh/lovell/sharp@main/docs/image/sharp-logo.svg" width="160" height="160" alt="sharp logo" align="right">

この高速なNode-APIモジュールの典型的な使用例は、一般的な形式の大きな画像を、さまざまなサイズの小さくウェブフレンドリーなJPEG、PNG、WebP、GIF、AVIF画像に変換することです。

Node-API v9をサポートするすべてのJavaScriptランタイム（Node.js (^18.17.0または>= 20.3.0)、Deno、Bun）で使用できます。

画像のリサイズは、[libvips](https://github.com/libvips/libvips)を使用するため、最速のImageMagickやGraphicsMagickの設定を使用するよりも4〜5倍速く行われます。

カラースペース、埋め込みICCプロファイル、アルファ透明チャンネルも正しく処理されます。
ランチョス再サンプリングにより、速度のために品質が犠牲になることはありません。

画像のリサイズだけでなく、回転、抽出、合成、ガンマ補正などの操作も利用できます。

ほとんどの最新のmacOS、Windows、Linuxシステムでは、追加のインストールやランタイム依存関係は必要ありません。

## ドキュメント

完全な[インストール手順](https://sharp.pixelplumbing.com/install)、[APIドキュメント](https://sharp.pixelplumbing.com/api-constructor)、[ベンチマークテスト](https://sharp.pixelplumbing.com/performance)、および[変更履歴](https://sharp.pixelplumbing.com/changelog)については、[sharp.pixelplumbing.com](https://sharp.pixelplumbing.com/)をご覧ください。

## 例

```sh
npm install sharp
```

```javascript
const sharp = require('sharp');
```

### コールバック

```javascript
sharp(inputBuffer)
  .resize(320, 240)
  .toFile('output.webp', (err, info) => { ... });
```

### プロミス

```javascript
sharp('input.jpg')
  .rotate()
  .resize(200)
  .jpeg({ mozjpeg: true })
  .toBuffer()
  .then( data => { ... })
  .catch( err => { ... });
```

### Async/await

```javascript
const semiTransparentRedPng = await sharp({
  create: {
    width: 48,
    height: 48,
    channels: 4,
    background: { r: 255, g: 0, b: 0, alpha: 0.5 }
  }
})
  .png()
  .toBuffer();
```

### ストリーム

```javascript
const roundedCorners = Buffer.from(
  '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
);

const roundedCornerResizer =
  sharp()
    .resize(200, 200)
    .composite([{
      input: roundedCorners,
      blend: 'dest-in'
    }])
    .png();

readableStream
  .pipe(roundedCornerResizer)
  .pipe(writableStream);
```

## コントリビューション

バグの報告、機能のリクエスト、コード変更の提出については、[コントリビューターガイド](https://github.com/lovell/sharp/blob/main/.github/CONTRIBUTING.md)をご覧ください。

## ライセンス

Copyright 2013 Lovell Fuller and others.

Apache License, Version 2.0（「ライセンス」）の下でライセンスされています。
このファイルをライセンスに従わずに使用することはできません。
ライセンスのコピーは[https://www.apache.org/licenses/LICENSE-2.0](https://www.apache.org/licenses/LICENSE-2.0)で入手できます。

適用法または書面によって要求されない限り、ソフトウェアは「現状のまま」提供され、保証や条件は一切ないものとします。
ライセンスの下での特定の言語に基づく権利と制限については、ライセンスを参照してください。


----
----
----


# Image Processing with Sharp

このプロジェクトは、ディレクトリ内の画像をAVIFおよびWebP形式に変換するためのスクリプトを提供します。品質設定に応じて、画像の圧縮率を調整できます。

## Quality Settings

以下の表は、JPEG品質設定に対応するAVIFおよびWebPの品質設定を示しています：

| Quality Level  | JPEG Quality | AVIF Quality | WebP Quality |
| -------------- | ------------ | ------------ | ------------ |
| High           | 80           | 64           | 82           |
| Medium-High    | 70           | 56           | 72           |
| Medium-Low     | 60           | 51           | 64           |
| Low            | 50           | 48           | 55           |

### 参考サイト
[AVIF and WebP encoding quality settings](https://www.industrialempathy.com/posts/avif-webp-quality-settings/)

## Usage

以下のコマンドを使用して、画像の品質設定を選択できます：

```sh
npm run high            # 高品質
npm run medium-high     # 中高品質
npm run medium-low      # 中低品質
npm run low             # 低品質
npm run conversion-webp # 最高品質でWebPに変換
npm run conversion-avif # 最高品質でAVIFに変換
```

各コマンドは、対応する品質設定を適用して、`./input`ディレクトリ内の画像を変換し、`./output`ディレクトリに保存します。

## Installation

依存関係をインストールするには、以下のコマンドを実行します：

```sh
npm install
```
