import { AppPage } from "@/api";
import Image from "@/components/Image";
import LinkButton from "@/components/LinkButton";
import MdAsJsonRenderer from "@/components/MdAsJsonRenderer";
import { size } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles, weight } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import LinkText from "@/react-multiversal/LinkText";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { alpha, colors, gradientFlashyStops, useTheme } from "@/styles";
import SVGAppStoreApple from "@/svgs/components/SVGAppStoreApple";
import SVGAppStoreGoogle from "@/svgs/components/SVGAppStoreGoogle";
import { ReactNode } from "react";
import { StyleSheet, Text, View } from "react-native";

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
 */
export default function AppLandingPage({ app }: { app: AppPage }) {
  const theme = useTheme();
  const shots = app.screenshots.filter((group) => group.shots.length > 0);

  return (
    <View role="article" style={theme.styles.back}>
      {/* The hero band: the site's own flashy gradient, which is already the
          purple-to-pink the app itself is painted in. */}
      <View style={{ overflow: "hidden" }}>
        <GradientLinear style={StyleSheet.absoluteFill} stops={gradientFlashyStops(theme)} />
        <Container horizontal="l" vertical="xxl">
          <View style={styles.heroRow}>
            <Image
              src={app.icon.src}
              width={app.icon.width}
              height={app.icon.height}
              alt=""
              priority={true}
              style={{ width: 96, height: 96, borderRadius: 22 }}
            />
            <View style={styles.heroText}>
              <Text
                role="heading"
                aria-level={1}
                style={[
                  fontStyles.iosEm.largeTitle,
                  styles.onGradient,
                  { fontWeight: weight.bold },
                ]}
              >
                {app.name}
              </Text>
              {app.subtitle ? (
                <Text style={[fontStyles.ios.title2, styles.onGradientSoft]}>{app.subtitle}</Text>
              ) : null}
            </View>
          </View>
          {app.short ? (
            <>
              <Spacer size="l" />
              <Text
                role="paragraph"
                style={[fontStyles.ios.title3, styles.onGradient, { maxWidth: 640 }]}
              >
                {app.short}
              </Text>
            </>
          ) : null}
          <Spacer size="l" />
          <View style={styles.storeRow}>
            <StoreButton
              href={app.stores.appStore}
              label={`${app.name} on the App Store`}
              icon={<SVGAppStoreApple width={26} height={26} />}
            >
              {"App Store"}
            </StoreButton>
            <StoreButton
              href={app.stores.play}
              label={`${app.name} on Google Play`}
              icon={<SVGAppStoreGoogle width={24} height={26} />}
            >
              {"Google Play"}
            </StoreButton>
          </View>
        </Container>
      </View>

      {shots.length > 0 ? (
        <Container horizontal="l" vertical="xxl" gap="xl">
          {shots.map((group) => (
            <View key={group.platform}>
              {group.label ? (
                <>
                  <Text
                    style={[fontStyles.iosEm.caption1, theme.styles.textLight1, styles.eyebrow]}
                  >
                    {group.label}
                  </Text>
                  <Spacer size="s" />
                </>
              ) : null}
              {/* A strip rather than a grid: a press kit is five screens per
                  device, and wrapped two-by-two on a phone that is a screenful
                  of thumbnails before the first word of the description. It
                  only ever scrolls where it does not fit, so a desktop sees
                  the same five in a row. `tabIndex` because a region that
                  scrolls has to be reachable without a pointer. */}
              <View
                role="region"
                aria-label={group.label ? `${group.label} screenshots` : "Screenshots"}
                tabIndex={0}
                style={styles.shotRow}
              >
                {group.shots.map((shot, index) => (
                  <Image
                    key={shot.src}
                    src={shot.src}
                    width={shot.width}
                    height={shot.height}
                    alt={
                      group.label
                        ? `${app.name} on ${group.label}, screen ${index + 1}`
                        : `${app.name}, screen ${index + 1}`
                    }
                    // Flexible, but never wider than a phone screenshot
                    // deserves: five across on a desktop, two on a phone, and
                    // a row left with one does not blow it up to full width.
                    style={{
                      // Fixed, and never shrunk: the strip scrolls instead.
                      width: 176,
                      flexShrink: 0,
                      height: "auto",
                      borderRadius: 18,
                      backgroundColor: alpha(colors.black, 0.06),
                    }}
                  />
                ))}
              </View>
            </View>
          ))}
        </Container>
      ) : null}

      {/* The prose keeps a reading measure of its own, but starts on the same
          left edge as the icon and the screenshots above it. */}
      <Container role="region" aria-label={`About ${app.name}`} horizontal="l" vertical="l">
        <View style={styles.prose}>
          {app.description.map((paragraph) => (
            <Text
              key={paragraph}
              role="paragraph"
              style={[fontStyles.ios.body, theme.styles.text, styles.paragraph]}
            >
              {paragraph}
            </Text>
          ))}
        </View>
      </Container>

      {/* The policy, whole, at the anchor Apple and Google were given. Its own
          <h1> was dropped when it was compiled (see fetch-apps.mjs) so this
          heading is the one that carries the id. */}
      <Container horizontal="l" vertical="l">
        <View style={styles.rule} />
        <Spacer size="l" />
        <View style={styles.prose}>
          <SpacedView id="privacy" role="heading" aria-level={2}>
            {/* largeTitle, not title1: `HtmlElements` renders every markdown
              heading level at largeTitle, so a smaller heading here would sit
              above sections bigger than itself. */}
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
        </View>
      </Container>
    </View>
  );
}

function StoreButton({
  href,
  label,
  icon,
  children,
}: {
  href: string;
  label: string;
  icon: ReactNode;
  children: string;
}) {
  return (
    <LinkButton
      href={href}
      aria-label={label}
      // White on the gradient rather than the site's indigo: the two buttons
      // are the point of the page, and indigo on purple is a button you have
      // to look for.
      color={colors.white}
      textColor={colors.black}
      spaceHorizontal="m"
      spaceVertical="s"
    >
      {(textStyles) => (
        <>
          {icon}
          <Text style={[textStyles, fontStyles.iosEm.callout]}>{children}</Text>
        </>
      )}
    </LinkButton>
  );
}

const styles = StyleSheet.create({
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: size("m"),
  },
  heroText: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 260,
  },
  onGradient: {
    color: colors.white,
  },
  onGradientSoft: {
    color: alpha(colors.white, 0.85),
  },
  storeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: size("s"),
  },
  eyebrow: {
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  shotRow: {
    flexDirection: "row",
    // Without this the images stretch to the tallest one in the strip.
    alignItems: "flex-start",
    overflow: "scroll",
    gap: size("m"),
  },
  /** A reading measure, inside a container that is wider than it. */
  prose: {
    maxWidth: 720,
  },
  paragraph: {
    marginBottom: size("m"),
  },
  rule: {
    height: 1,
    backgroundColor: alpha(colors.black, 0.1),
  },
});
