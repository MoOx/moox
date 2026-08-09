import { useHref, useT } from "@/i18n";
import ButtonView from "@/components/ButtonView";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { Text } from "react-native";

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
          <Spacer size="l" />
          <LinkView
            href={localizeHref("/")}
            onPress={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = "/";
              }
            }}
          >
            <ButtonView>{t({ en: "Go back", fr: "Retour" })}</ButtonView>
          </LinkView>
        </Container>
      </SpacedView>
    </WebsiteWrapper>
  );
}
