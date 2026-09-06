import { AppPage, AppStoryStep } from "@/api";
import DeviceiPhoneDynamicIsland from "@/components/DeviceIphoneDynamicIsland";
import Image from "@/components/Image";
import MdAsJsonRenderer from "@/components/MdAsJsonRenderer";
import { size, WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles, weight } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import LinkText from "@/react-multiversal/LinkText";
import LinkView from "@/react-multiversal/LinkView";
import Parallax from "@/react-multiversal/Parallax";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import {
  alpha,
  colors,
  gradientFlashyStops,
  gradientStaticIndigoStyles,
  gradientTextFlashyStyles,
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
 * It answers three jobs at one URL, because that is the URL the two stores
 * were given: it presents the app, it links to both stores, and it carries the
 * privacy policy in full under `#privacy`. The third is the one with a
 * deadline attached - a store review that follows the link and finds no policy
 * is a rejection - so the policy is on this page, never a link to another one.
 *
 * The shape comes from the deck the stores already show. `story` is that deck
 * as data - one screen, one line, in the order somebody chose - so the page is
 * a block per step, alternating white and a tinted band the way the home page
 * does, with the screenshot inside the same iPhone frame `BlockBuilder` uses.
 * The first step illustrates the hero; the rest are the blocks.
 */
export default function AppLandingPage({ app }: { app: AppPage }) {
  const theme = useTheme();
  const windowWidth = useWindowDimensions().width;
  const deviceWidth = windowWidth > WindowWidth.m ? 280 : 230;
  const [lead, ...steps] = app.story;

  return (
    <View role="article">
      {/* The hero, on the site's own white, laid out like `BlockHey`: what the
          app is on one side, the app itself on the other. */}
      <View style={theme.styles.back}>
        <Container
          role="region"
          aria-label={app.name}
          style={styles.split}
          horizontal="l"
          vertical="xl"
        >
          <SpacedView horizontal="l" vertical="l" gap="m" style={styles.column}>
            <Image
              src={app.icon.src}
              width={app.icon.width}
              height={app.icon.height}
              alt=""
              priority={true}
              style={{ width: 88, height: 88, borderRadius: 20 }}
            />
            <View>
              <Text
                role="heading"
                aria-level={1}
                style={[
                  fontStyles.iosEm.largeTitle,
                  theme.styles.text,
                  gradientTextFlashyStyles(theme, 176),
                  headlineSize,
                  { fontWeight: weight.black },
                ]}
              >
                {app.name}
              </Text>
              {app.subtitle ? (
                <Text style={[fontStyles.ios.title2, theme.styles.textLight1]}>{app.subtitle}</Text>
              ) : null}
            </View>
            {app.short ? (
              <Text role="paragraph" style={[fontStyles.iosEm.body, theme.styles.text]}>
                {app.short}
              </Text>
            ) : null}
            {app.badges.length > 0 ? <BadgeRow badges={app.badges} /> : null}
            <StoreBadges app={app} />
          </SpacedView>
          <Device app={app} step={lead} width={deviceWidth} lift={-16} priority={true} />
        </Container>
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
          <ClosingBlock key={step.id} app={app} step={step} />
        ),
      )}

      {/* The store description, whole. It repeats the deck on purpose: the
          blocks above are the pitch, this is the text the stores show, and it
          is what a search engine reads. */}
      <View style={theme.styles.backAlt}>
        <Container
          role="region"
          aria-label={`About ${app.name}`}
          horizontal="l"
          vertical="xl"
          style={styles.prose}
        >
          {app.description.map((paragraph) => (
            <Text
              key={paragraph}
              role="paragraph"
              style={[fontStyles.ios.body, theme.styles.text, styles.paragraph]}
            >
              {paragraph}
            </Text>
          ))}
        </Container>
      </View>

      {/* The policy, at the anchor Apple and Google were given. Its own <h1>
          was dropped when it was compiled (see fetch-apps.mjs), so this
          heading is the one that carries the id. */}
      <View style={theme.styles.back}>
        <Container horizontal="l" vertical="xl" style={styles.prose}>
          <SpacedView id="privacy" role="heading" aria-level={2}>
            {/* largeTitle, not title1: `HtmlElements` renders every markdown
                heading level at largeTitle, so a smaller heading here would
                sit above sections bigger than itself. */}
            <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
              {app.privacy.title}
            </Text>
          </SpacedView>
          <MdAsJsonRenderer body={app.privacy.body} />
          <Spacer size="l" />
          <Text style={[fontStyles.ios.footnote, theme.styles.textLight2]}>
            {"Every word and every picture on this page is read at build time from "}
            <LinkText href={app.repoUrl} style={theme.styles.textMainDark}>
              {app.repoUrl.replace(/^https:\/\//, "")}
            </LinkText>
            {app.generated ? `, press kit of ${app.generated}.` : "."}
          </Text>
        </Container>
      </View>
    </View>
  );
}

/**
 * The deck's headlines, at the size the home page gives its own: 32px on a
 * phone, 46px past ~1250px, interpolated in between. A CSS function in an
 * inline style, which is what react-native-web writes anyway, so this stays
 * one node rather than two rendered variants (see `BlockHey`).
 */
const headlineSize = {
  fontSize: "clamp(32px, 1.6vw + 26px, 46px)" as unknown as number,
  lineHeight: "clamp(37px, 1.5vw + 31.5px, 52px)" as unknown as number,
};

/**
 * The deck composes its headlines on two lines, and they are two stacked
 * `Text` blocks here. Trailing space on all but the last: without it a text
 * extractor - a crawler, a screen reader buffer, an LLM - reads
 * "The effectyou want." (the same reason `BlockHey` carries one).
 */
const headlineLines = (headline: string[]) =>
  headline.map((line, index) => (index < headline.length - 1 ? `${line} ` : line));

/** One step of the deck: the screen on one side, the line it carries on the other. */
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
  const device = <Device app={app} step={step} width={width} lift={band ? 20 : -20} />;
  const words = (
    <SpacedView horizontal="l" vertical="l" gap="s" style={styles.column}>
      <View role="heading" aria-level={2}>
        {headlineLines(step.headline).map((line) => (
          <Text
            key={line}
            style={[
              fontStyles.iosEm.largeTitle,
              headlineSize,
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
            band ? theme.styles.textOnMain : theme.styles.textLight1,
            band ? { opacity: 0.85 } : null,
          ]}
        >
          {step.sub}
        </Text>
      ) : null}
    </SpacedView>
  );

  return (
    <View style={band ? styles.bandClip : theme.styles.back}>
      {band ? (
        <GradientLinear
          stops={gradientStaticIndigoStyles}
          angle={190}
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {/* `row-reverse` rather than two orders of children: the screen comes
          first in the markup every time, so a phone - one column, no reversing
          - always reads screen then line, block after block, while a desktop
          still gets the device on alternating sides. */}
      <Container
        style={[styles.split, deviceFirst ? null : styles.splitReversed]}
        horizontal="l"
        vertical="xl"
      >
        {device}
        {words}
      </Container>
    </View>
  );
}

/** The deck's last card - the one with no screenshot, only the promise. */
function ClosingBlock({ app, step }: { app: AppPage; step: AppStoryStep }) {
  const theme = useTheme();
  return (
    <View style={styles.bandClip}>
      <GradientLinear style={StyleSheet.absoluteFill} stops={gradientFlashyStops(theme)} />
      <Container horizontal="l" vertical="xxl">
        <SpacedView horizontal="l" gap="m" style={{ maxWidth: 720 }}>
          <View role="heading" aria-level={2}>
            {headlineLines(step.headline).map((line) => (
              <Text
                key={line}
                style={[fontStyles.iosEm.largeTitle, headlineSize, styles.onGradient]}
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
          <Spacer size="xs" />
          <StoreBadges app={app} />
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
  priority = false,
}: {
  app: AppPage;
  /** Undefined only if an app ever ships an empty story, which the build refuses. */
  step: AppStoryStep | undefined;
  width: number;
  lift: number;
  priority?: boolean;
}) {
  if (!step?.image) return null;
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
            priority={priority}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </DeviceiPhoneDynamicIsland>
      </Parallax>
    </View>
  );
}

/**
 * The two badges, as their owners publish them.
 *
 * Both guidelines require the artwork exactly as it ships and only let a page
 * choose its size, so these are the SVG files themselves rather than anything
 * this repository draws - see `public/badges/README.md`. Same height for both,
 * above Apple's 40px floor, and the row keeps a quarter of that height clear
 * around them, which is the stricter of the two rules.
 */
function StoreBadges({ app }: { app: AppPage }) {
  return (
    <View style={styles.badgeRow}>
      <StoreBadge
        href={app.stores.appStore}
        src="/badges/download-on-the-app-store.svg"
        alt="Download on the App Store"
        ratio={119.66 / 40}
      />
      <StoreBadge
        href={app.stores.play}
        src="/badges/get-it-on-google-play.svg"
        alt="Get it on Google Play"
        ratio={239.17 / 70.87}
      />
    </View>
  );
}

const badgeHeight = 44;

function StoreBadge({
  href,
  src,
  alt,
  ratio,
}: {
  href: string;
  src: string;
  alt: string;
  ratio: number;
}) {
  return (
    <LinkView href={href}>
      <Image
        src={src}
        alt={alt}
        width={Math.round(badgeHeight * ratio)}
        height={badgeHeight}
        style={{ height: badgeHeight, width: badgeHeight * ratio, display: "block" }}
      />
    </LinkView>
  );
}

/** The deck's own three words - free, no ads, no account - as the deck has them. */
function BadgeRow({ badges }: { badges: string[] }) {
  const theme = useTheme();
  return (
    <View style={styles.pillRow}>
      {badges.map((badge) => (
        <SpacedView
          key={badge}
          horizontal="s"
          vertical="xxs"
          // `ultraLight` rather than a fixed alpha: it is black in the light
          // theme and white in the dark one, where a black hairline is nothing.
          style={[styles.pill, { borderColor: theme.dynamicColors.ultraLight }]}
        >
          <Text style={[fontStyles.iosEm.caption1, theme.styles.textLight1]}>{badge}</Text>
        </SpacedView>
      ))}
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
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: badgeHeight / 4,
    paddingVertical: badgeHeight / 4,
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: size("xs"),
  },
  pill: {
    borderRadius: 100,
    borderWidth: 1,
  },
  /** A reading measure, inside a container that is wider than it. */
  prose: {
    maxWidth: 720,
    alignSelf: "flex-start",
  },
  paragraph: {
    marginBottom: size("m"),
  },
});
