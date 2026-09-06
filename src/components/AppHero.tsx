import { AppPage, AppStoryStep, AppSummary } from "@/api";
import DeviceiPhoneDynamicIsland from "@/components/DeviceIphoneDynamicIsland";
import Image from "@/components/Image";
import LinkButton from "@/components/LinkButton";
import { size, WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles, weight } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import Parallax from "@/react-multiversal/Parallax";
import SpacedView from "@/react-multiversal/SpacedView";
import { colors, gradientTextFlashyStyles, useTheme } from "@/styles";
import { pTransforms } from "@/utils.styles";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";

/**
 * The top of an app's page: what it is on one side, the app itself on the
 * other, laid out like `BlockHey`. `/apps` renders the same block once per app
 * with a link through to the full page, so the two never drift.
 */
export default function AppHero({
  app,
  level = 1,
  moreHref,
}: {
  /** The whole page or the summary `/apps` carries; both know the lead shot. */
  app: AppPage | AppSummary;
  /** 1 on the app's own page, 2 on `/apps`, where the h1 is the list itself. */
  level?: 1 | 2;
  /** Set on `/apps`: turns the block into a card that leads somewhere. */
  moreHref?: string;
}) {
  const theme = useTheme();
  const windowWidth = useWindowDimensions().width;
  const deviceWidth = windowWidth > WindowWidth.m ? 280 : 230;
  // The deck's opening step, which the summary carries flattened and the page
  // carries at the head of its story. Same screen either way.
  const lead: AppStoryStep | undefined = "story" in app ? app.story[0] : app.lead;
  const title = (
    <Text
      style={[
        fontStyles.iosEm.largeTitle,
        theme.styles.text,
        gradientTextFlashyStyles(theme, 176),
        heroTitleSize,
        { fontWeight: weight.black },
      ]}
    >
      {app.name}
    </Text>
  );

  return (
    <Container
      role="region"
      aria-label={app.name}
      style={styles.split}
      horizontal="l"
      // `xxl`, not `xl`: the site header floats over the top of the page, and
      // this block is the first thing under it.
      vertical="xxl"
    >
      <SpacedView horizontal="l" vertical="l" gap="m" style={styles.column}>
        <Image
          src={app.icon.src}
          width={app.icon.width}
          height={app.icon.height}
          alt=""
          priority={level === 1}
          style={{ width: 88, height: 88, borderRadius: 20 }}
        />
        <View>
          <View role="heading" aria-level={level}>
            {/* On `/apps` the name is the link, which is what anyone scanning
                a list clicks first; on the app's own page it leads nowhere. */}
            {moreHref ? <LinkView href={moreHref}>{title}</LinkView> : title}
          </View>
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
        {moreHref ? (
          <LinkButton
            href={moreHref}
            // The site's indigo, not `backAlt`: this block alternates between
            // two surfaces and one of them *is* `backAlt`, where a button
            // painted with it is a button nobody can see.
            color={theme.dynamicColors.backMain}
            textColor={theme.dynamicColors.textOnMain}
            spaceHorizontal="m"
            style={{ alignSelf: "flex-start" }}
            aria-label={`More details about ${app.name}`}
          >
            <SpacedView horizontal="m">
              <Text style={fontStyles.iosEm.callout}>{"More details"}</Text>
            </SpacedView>
          </LinkButton>
        ) : null}
      </SpacedView>
      <AppHeroDevice name={app.name} lead={lead} width={deviceWidth} priority={level === 1} />
    </Container>
  );
}

/** The deck's opening screen, in the frame the home page uses for its phone. */
function AppHeroDevice({
  name,
  lead,
  width,
  priority,
}: {
  name: string;
  lead: AppStoryStep | undefined;
  width: number;
  priority: boolean;
}) {
  const image = lead?.image;
  if (!image) return null;
  return (
    <View style={styles.deviceColumn}>
      <Parallax
        springOptions={{ mass: 3, damping: 90, stiffness: 100 }}
        transforms={pTransforms(-16, 0, -0.03)}
      >
        <DeviceiPhoneDynamicIsland width={width} backgroundColor={colors.black}>
          <Image
            src={image.src}
            width={image.width}
            height={image.height}
            alt={`${name}: ${(lead?.headline ?? []).join(" ")}`}
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
 * this repository draws. Same height for both, above Apple's 40px floor, and
 * the row keeps a quarter of that height clear around them, which is the
 * stricter of the two rules.
 */
export function StoreBadges({ app }: { app: Pick<AppPage, "stores"> }) {
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

/** The deck's own short claims - free, no ads, no account - as the deck has them. */
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

/** Same fluid scale as the home page's own hero (see `BlockHey`). */
const heroTitleSize = {
  fontSize: "clamp(32px, 1.6vw + 26px, 46px)" as unknown as number,
  lineHeight: "clamp(37px, 1.5vw + 31.5px, 52px)" as unknown as number,
};

const styles = StyleSheet.create({
  split: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
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
});

export { heroTitleSize };
