import { useHref, useT } from "@/i18n";
import ButtonView from "@/components/ButtonView";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { Platform, Text } from "react-native";

export default function WebsiteError({ statusCode }: { statusCode: number }) {
  const localizeHref = useHref();
  const t = useT();
  const theme = useTheme();
  return (
    <WebsiteWrapper>
      <SpacedView horizontal="l" vertical="xxxl">
        <Container>
          <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>Error {statusCode}</Text>
          <Text style={[fontStyles.ios.title1, theme.styles.textLight1]}>
            The page you are looking for does not exist.
          </Text>
          {/* Decorative embed, in an `<iframe>` - web only. The page still
              says what went wrong and still offers the way back. */}
          {Platform.OS === "web" ? (
            <div
              style={{
                maxWidth: "100%",
                width: "100%",
                height: 0,
                paddingBottom: "45%",
                position: "relative",
              }}
            >
              <iframe
                src="https://giphy.com/embed/l2JJKs3I69qfaQleE"
                width="100%"
                height="100%"
                style={{ position: "absolute" }}
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
                sandbox="allow-scripts"
                title={t({ en: "Error animation", fr: "Animation d'erreur" })}
              ></iframe>
            </div>
          ) : null}
          <Spacer size="l" />
          <LinkView
            href={localizeHref("/")}
            // Web only, and the guard has to wrap the whole handler rather
            // than sit inside it: on a device the `else` branch ran, and
            // `window.location` is undefined there (React Native aliases
            // `window` to `global`), so the app's 404 screen threw on press.
            // With no handler the link navigates through the router instead,
            // which lands on the same page.
            onPress={
              Platform.OS === "web"
                ? () => {
                    if (window.history.length > 1) {
                      window.history.back();
                    } else {
                      window.location.href = "/";
                    }
                  }
                : undefined
            }
          >
            <ButtonView>{t({ en: "Go back", fr: "Retour" })}</ButtonView>
          </LinkView>
        </Container>
      </SpacedView>
    </WebsiteWrapper>
  );
}
