import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="h-full bg-gray-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
