import { Children } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { AppRegistry } from "react-native";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    AppRegistry.registerComponent("App", () => Main);
    const { getStyleElement } = AppRegistry.getApplication("App");
    const styles = getStyleElement();
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps, styles };
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
