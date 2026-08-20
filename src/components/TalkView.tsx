import { Talk } from "@/api";
import MdAsJsonRenderer from "@/components/MdAsJsonRenderer";
import { fontStyles } from "@/react-multiversal/font";
import LinkText from "@/react-multiversal/LinkText";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { Platform, StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  back: {
    flexGrow: 1,
    flexShrink: 1,
  },
  videoContainer: {
    position: "relative",
    aspectRatio: "16 / 9",
    borderRadius: 7,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "rgba(0, 0, 0, 0.1)",
    boxShadow: "0 0 3px rgb(0 0 0 / 10%)",
  },
  iframe: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    clipPath: `inset(0% 0% 0% 0% round 6px)`,
  },
});

export default function TalkView({ item }: { item: Talk }) {
  const theme = useTheme();

  return (
    <SpacedView
      role="article"
      horizontal="l"
      vertical="l"
      style={[styles.back, theme.styles.back]}
    >
      <Text
        role="heading"
        aria-level={1}
        style={[fontStyles.iosEm.largeTitle, theme.styles.text]}
      >
        {item.title}
      </Text>
      {item.conference && (
        <Text style={[fontStyles.ios.title1, theme.styles.textLight1]}>
          {item.conference}
        </Text>
      )}
      {item.date && (
        <Text style={[fontStyles.ios.title1, theme.styles.textLight1]}>
          {item.date.slice(0, 10)}
        </Text>
      )}
      <Spacer size="m" />
      {item.videoEmbed && (
        <View>
          {/* An `<iframe>` has no native equivalent. Rather than pull in a
              WebView for a demo, native links out to the embed. */}
          {Platform.OS === "web" ? (
            <div style={styles.videoContainer}>
              <iframe
                src={item.videoEmbed}
                style={styles.iframe}
                allowFullScreen
                frameBorder="0"
                title="Video"
                // youtube requires both allow-scripts and allow-same-origin to work properly
                // oxlint-disable-next-line react/iframe-missing-sandbox
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          ) : (
            <LinkText href={item.videoEmbed} underline={true}>
              {"Open the video ↗"}
            </LinkText>
          )}
          <Spacer />
        </View>
      )}
      {item.slidesEmbed && (
        <View>
          {/* An `<iframe>` has no native equivalent. Rather than pull in a
              WebView for a demo, native links out to the embed. */}
          {Platform.OS === "web" ? (
            <div style={styles.videoContainer}>
              <iframe
                src={item.slidesEmbed}
                style={styles.iframe}
                allowFullScreen
                frameBorder="0"
                title="Slides"
                // slidedeck requires both allow-scripts and allow-same-origin to work properly
                // oxlint-disable-next-line react/iframe-missing-sandbox
                sandbox="allow-scripts allow-same-origin"
              />
            </div>
          ) : (
            <LinkText href={item.slidesEmbed} underline={true}>
              {"Open the slides ↗"}
            </LinkText>
          )}
          <Spacer />
        </View>
      )}
      {item.slides && (
        <LinkText
          href={item.slides}
          underlineOnFocus={true}
          style={theme.styles.textMainDark}
        >
          {item.slides}
        </LinkText>
      )}
      {item.body && <MdAsJsonRenderer body={item.body} />}
    </SpacedView>
  );
}
