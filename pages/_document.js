import { Children } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { AppRegistry } from "react-native";

export default class extends Document {
  static async getInitialProps(ctx) {
    AppRegistry.registerComponent("App", () => Main);
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: AppRegistry.getApplication("App").getStyleElement(),
    };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
