import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="h-full bg-red-200 dark">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
