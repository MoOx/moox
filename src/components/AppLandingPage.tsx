import { AppPage, AppStoryStep } from "@/api";
import AppHero, { heroTitleSize } from "@/components/AppHero";
import DeviceiPhoneDynamicIsland from "@/components/DeviceIphoneDynamicIsland";
import Image from "@/components/Image";
import LinkButton from "@/components/LinkButton";
import { size, WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import LinkText from "@/react-multiversal/LinkText";
import Parallax from "@/react-multiversal/Parallax";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import {
  alpha,
  colors,
  gradientFlashyStops,
  gradientStaticIndigoStyles,
  useTheme,
} from "@/styles";
import { pTransforms } from "@/utils.styles";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

/**
 * One app's landing page, and the same page for every app: it renders whatever
 * `scripts/fetch-apps.mjs` read from the app's own repository and knows
 * nothing about any particular app. There is no `hide-the-notch` anywhere in
 * this file, and there should never be.
 *
 * The shape comes from the deck the stores already show. `story` is that deck
 * as data - one screen, one line, in the order somebody chose - so the page is
 * a block per step, alternating white and a tinted band the way the home page
 * does, with the screenshot inside the same iPhone frame `BlockBuilder` uses.
 * The first step is the hero (shared with `/apps`, see `AppHero`); the rest are
 * the blocks; the one with no image is the card the deck closes on.
 *
 * The privacy policy is a page of its own, `/apps/<slug>/privacy`, because it
 * is a document and not a section of a pitch. What stays here is the `#privacy`
 * block that leads to it - the anchor the stores were given still lands on
 * something that says Privacy and links to the whole of it.
 */
export default function AppLandingPage({ app }: { app: AppPage }) {
  const theme = useTheme();
  const windowWidth = useWindowDimensions().width;
  const deviceWidth = windowWidth > WindowWidth.m ? 280 : 230;
  const [, ...steps] = app.story;

  return (
    <View role="article">
      <View style={theme.styles.back}>
        <AppHero app={app} level={1} />
      </View>

      {steps.map((step, index) =>
        // The closing card is the one step the deck draws rather than
        // photographs, so it is a band of its own rather than half a split.
        step.image ? (
          <StoryBlock
            key={step.id}
            app={app}
            step={step}
            width={deviceWidth}
            // Alternating, like the home: a tinted band, then white, and the
            // device changes side each time so the eye has somewhere to go.
            band={index % 2 === 0}
            deviceFirst={index % 2 === 0}
          />
        ) : (
          <ClosingBlock key={step.id} step={step} />
        ),
      )}

      {/* The store description, whole. It repeats the deck on purpose: the
          blocks above are the pitch, this is the text the stores show, and it
          is what a search engine reads. */}
      <View style={theme.styles.backAlt}>
        <Container role="region" aria-label={`About ${app.name}`} horizontal="l" vertical="xl">
          <SpacedView horizontal="l" style={styles.prose}>
            {app.description.map((paragraph) => (
              <Text
                key={paragraph}
                role="paragraph"
                style={[fontStyles.ios.body, theme.styles.text, styles.paragraph]}
              >
                {paragraph}
              </Text>
            ))}
          </SpacedView>
        </Container>
      </View>

      <View style={theme.styles.back}>
        <Container horizontal="l" vertical="xl">
          <SpacedView id="privacy" horizontal="l" gap="s" style={styles.prose}>
            <View role="heading" aria-level={2}>
              <Text style={[fontStyles.iosEm.title1, theme.styles.text]}>{app.privacy.title}</Text>
            </View>
            {app.privacy.summary ? (
              <Text role="paragraph" style={[fontStyles.ios.body, theme.styles.textLight1]}>
                {app.privacy.summary}
              </Text>
            ) : null}
            <Spacer size="xs" />
            <LinkButton
              href={`/apps/${app.slug}/privacy`}
              color={theme.dynamicColors.backMain}
              textColor={theme.dynamicColors.textOnMain}
              spaceHorizontal="m"
              style={{ alignSelf: "flex-start" }}
            >
              <SpacedView horizontal="m">
                <Text style={fontStyles.iosEm.callout}>{`Read the ${app.privacy.title}`}</Text>
              </SpacedView>
            </LinkButton>
            <Spacer size="m" />
            <Text style={[fontStyles.ios.footnote, theme.styles.textLight2]}>
              {"Every word and every picture on this page is read from "}
              <LinkText href={app.repoUrl} style={theme.styles.textMainDark}>
                {app.repoUrl.replace(/^https:\/\//, "")}
              </LinkText>
              {app.generated ? `, press kit of ${app.generated}.` : "."}
            </Text>
          </SpacedView>
        </Container>
      </View>
    </View>
  );
}

/**
 * The deck composes its headlines on two lines, and they are two stacked
 * `Text` blocks here. Trailing space on all but the last: without it a text
 * extractor - a crawler, a screen reader buffer, an LLM - reads
 * "The effectyou want." (the same reason `BlockHey` carries one).
 */
const headlineLines = (headline: string[]) =>
  headline.map((line, index) => (index < headline.length - 1 ? `${line} ` : line));

/** One step of the deck: the screen on one side, the words it carries on the other. */
function StoryBlock({
  app,
  step,
  width,
  band,
  deviceFirst,
}: {
  app: AppPage;
  step: AppStoryStep;
  width: number;
  band: boolean;
  deviceFirst: boolean;
}) {
  const theme = useTheme();
  return (
    <View style={band ? styles.bandClip : theme.styles.back}>
      {band ? (
        <GradientLinear
          stops={gradientStaticIndigoStyles}
          angle={190}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {/* `row-reverse` rather than two orders of children: the words come
          first in the markup every time, so one column always reads line then
          screen, block after block, while a desktop still gets the device on
          alternating sides. */}
      <Container
        style={[styles.split, deviceFirst ? styles.splitReversed : null]}
        horizontal="l"
        vertical="xl"
      >
        <SpacedView horizontal="l" vertical="l" gap="s" style={styles.column}>
          <View role="heading" aria-level={2}>
            {headlineLines(step.headline).map((line) => (
              <Text
                key={line}
                style={[
                  fontStyles.iosEm.largeTitle,
                  heroTitleSize,
                  band ? theme.styles.textOnMain : theme.styles.text,
                ]}
              >
                {line}
              </Text>
            ))}
          </View>
          {step.sub ? (
            <Text
              role="paragraph"
              style={[
                fontStyles.iosEm.body,
                band ? theme.styles.textOnMain : theme.styles.text,
                band ? { opacity: 0.9 } : null,
              ]}
            >
              {step.sub}
            </Text>
          ) : null}
          {step.body ? (
            <Text
              role="paragraph"
              style={[
                fontStyles.ios.callout,
                band ? theme.styles.textOnMain : theme.styles.textLight1,
                band ? { opacity: 0.7 } : null,
              ]}
            >
              {step.body}
            </Text>
          ) : null}
        </SpacedView>
        <Device app={app} step={step} width={width} lift={band ? 20 : -20} />
      </Container>
    </View>
  );
}

/** The deck's last card - the one with no screenshot, only the promise. */
function ClosingBlock({ step }: { step: AppStoryStep }) {
  const theme = useTheme();
  return (
    <View style={styles.bandClip}>
      <GradientLinear style={StyleSheet.absoluteFill} stops={gradientFlashyStops(theme)} />
      <Container horizontal="l" vertical="xxl">
        <SpacedView horizontal="l" gap="m" style={styles.prose}>
          <View role="heading" aria-level={2}>
            {headlineLines(step.headline).map((line) => (
              <Text
                key={line}
                style={[fontStyles.iosEm.largeTitle, heroTitleSize, styles.onGradient]}
              >
                {line}
              </Text>
            ))}
          </View>
          {step.line ? (
            <Text role="paragraph" style={[fontStyles.iosEm.title3, styles.onGradient]}>
              {step.line}
            </Text>
          ) : null}
          {step.note ? (
            <Text role="paragraph" style={[fontStyles.ios.callout, styles.onGradientSoft]}>
              {step.note}
            </Text>
          ) : null}
        </SpacedView>
      </Container>
    </View>
  );
}

/**
 * A screenshot in the frame the home page already uses for the phone.
 *
 * The parallax is deliberately almost nothing - twenty pixels and three
 * percent across the whole scroll - so the device has some life without the
 * page becoming a ride. `lift` alternates its direction block to block.
 */
function Device({
  app,
  step,
  width,
  lift,
}: {
  app: AppPage;
  step: AppStoryStep;
  width: number;
  lift: number;
}) {
  if (!step.image) return null;
  return (
    <View style={styles.deviceColumn}>
      <Parallax
        springOptions={{ mass: 3, damping: 90, stiffness: 100 }}
        transforms={pTransforms(lift, 0, lift > 0 ? 0.03 : -0.03)}
      >
        <DeviceiPhoneDynamicIsland width={width} backgroundColor={colors.black}>
          <Image
            src={step.image.src}
            width={step.image.width}
            height={step.image.height}
            alt={`${app.name} on ${app.device}: ${step.headline.join(" ")}`}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </DeviceiPhoneDynamicIsland>
      </Parallax>
    </View>
  );
}

const styles = StyleSheet.create({
  /** Two columns that become one, the way every split block on the home does. */
  split: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
  },
  splitReversed: {
    flexDirection: "row-reverse",
  },
  column: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 380,
  },
  deviceColumn: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 300,
    alignItems: "center",
    paddingVertical: size("l"),
  },
  /** A tinted band: the gradient is absolutely positioned, so it must clip. */
  bandClip: {
    overflow: "hidden",
  },
  onGradient: {
    color: colors.white,
  },
  onGradientSoft: {
    color: alpha(colors.white, 0.82),
  },
  /** A reading measure, inside a container that centres it like every block. */
  prose: {
    maxWidth: 720,
  },
  paragraph: {
    marginBottom: size("m"),
  },
});
