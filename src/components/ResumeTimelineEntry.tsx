import { useHref, defaultLang, Lang, useT, useLang } from "@/i18n";
import { ResumeItem } from "@/api";
import Image from "@/components/Image";
import MdAsJsonRenderer from "@/components/MdAsJsonRenderer";
import StatTile from "@/components/StatTile";
import { pitchOf, resumeEntryPath, resumeEntryTransitionName } from "@/profile";
import { size, Size } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import { boxShadowGlass } from "@/react-multiversal/GlassView";
import LinkText from "@/react-multiversal/LinkText";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { boxShadows, useTheme } from "@/styles";
import SVGExternalLink from "@/svgs/components/SVGExternalLink";
import { differenceInCalendarMonths } from "date-fns";
import { StyleSheet, Text, View } from "react-native";

const borderRadius = size("s");

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
  },
  imageWrapper: {
    overflow: "hidden",
    borderTopLeftRadius: borderRadius,
    borderTopRightRadius: borderRadius,
  },
  company: {
    textAlign: "right",
    fontStyle: "italic",
  },
  description: {
    flexShrink: 1,
    overflow: "hidden",
  },
  links: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  link: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  tags: {
    // flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
});

const getDurationText = (startDate: string, endDate: Date, lang: Lang = defaultLang) => {
  const durationInMonths = Math.floor(differenceInCalendarMonths(endDate, new Date(startDate)));
  const durationYears = Math.floor(durationInMonths / 12);
  const durationMonths = durationInMonths % 12;

  const plural = (n: number, one: string, many: string) => (n === 1 ? `1 ${one}` : `${n} ${many}`);
  const yearText =
    durationYears === 0
      ? ""
      : lang === "fr"
        ? `${durationYears} an${durationYears > 1 ? "s" : ""}`
        : plural(durationYears, "year", "years");

  const monthText =
    durationMonths === 0
      ? ""
      : lang === "fr"
        ? `${durationMonths} mois`
        : plural(durationMonths, "month", "months");

  return yearText ? yearText + " " + monthText : monthText;
};

export const ResumeTimelineEntry = ({
  item,
  horizontal = "l",
  vertical = "l",
  showDetails = true,
  disableLinks = false,
  detail = false,
  transitionEnabled = true,
}: {
  item: ResumeItem;
  horizontal?: Size;
  vertical?: Size;
  showDetails?: boolean;
  disableLinks?: boolean;
  /**
   * Full record (detail page / modal): markdown body, per-mission stats and
   * `groupPitch`. The timeline shows the teaser and links here instead.
   */
  detail?: boolean;
  /**
   * The card and its detail share a view-transition name (the "zoom" effect).
   * Disabled on the timeline card whose detail is currently open - duplicate
   * names on one page would make the browser skip the transition.
   */
  transitionEnabled?: boolean;
}) => {
  const theme = useTheme();
  const t = useT();
  const lang = useLang();
  const localizeHref = useHref();

  return (
    <View
      style={[
        theme.styles.backOnAlt,
        {
          borderRadius,
          flexShrink: 1,
          flexBasis: 640,
          boxShadow: boxShadows.default,
        },
        transitionEnabled ? { viewTransitionName: resumeEntryTransitionName(item) } : null,
      ]}
      role="article"
    >
      {/* No anchor in detail mode: the timeline card behind the modal already
          carries this id, and duplicate ids are invalid HTML. */}
      {disableLinks || detail ? null : (
        // oxlint-disable-next-line jsx_a11y/anchor-has-content, jsx_a11y/anchor-is-valid
        <a id={item.slug} style={{ position: "relative", top: "-100px" }} />
      )}
      {item.image && (
        <View style={styles.imageWrapper}>
          <Image
            src={item.image}
            style={{
              width: "100%",
              maxWidth: "100%",
              height: "auto",
            }}
            width={480}
            height={360}
            priority={true}
            alt={""}
          />
        </View>
      )}
      <View style={[StyleSheet.absoluteFill, { borderRadius, boxShadow: boxShadowGlass() }]} />
      <SpacedView style={{ flexGrow: 1 }} horizontal={horizontal} vertical={vertical}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // alignItems: "flex-start",
          }}
        >
          <Text
            style={[fontStyles.iosEm.subhead, theme.styles.textLight2]}
            role="heading"
            aria-level={4}
          >
            {(item.job_title ?? "").toUpperCase()}
          </Text>
          {item.url && !disableLinks ? (
            <LinkText
              underlineOnFocus={true}
              href={item.url}
              style={[styles.company, theme.styles.textLight1]}
            >
              {item.company ?? ""}
            </LinkText>
          ) : (
            <Text style={[styles.company, theme.styles.textLight1]}>{item.company ?? ""}</Text>
          )}
        </View>
        {!detail && !disableLinks ? (
          <LinkText
            href={localizeHref(resumeEntryPath(item))}
            underlineOnFocus={true}
            style={[styles.description, fontStyles.iosEm.title2, theme.styles.text]}
          >
            {item.title}
          </LinkText>
        ) : (
          <Text
            style={[styles.description, fontStyles.iosEm.title2, theme.styles.text]}
            role="paragraph"
          >
            {item.title}
          </Text>
        )}
        {item.dateEnd ? (
          <>
            <Text style={[fontStyles.ios.footnote, theme.styles.textLight2]}>
              {getDurationText(item.dateStart, new Date(item.dateEnd), lang)}
            </Text>
          </>
        ) : (
          <>
            <Spacer size="xxs" />
            <Text style={[fontStyles.ios.footnote, theme.styles.textLight2]}>
              {item.wip
                ? t({ en: "Work in Progress", fr: "En cours" })
                : `${getDurationText(item.dateStart, new Date(), lang)} and counting`}
            </Text>
          </>
        )}
        {detail && pitchOf(item) ? (
          <>
            <Spacer size="s" />
            <Text style={[fontStyles.iosEm.callout, theme.styles.text]}>{pitchOf(item)}</Text>
          </>
        ) : null}
        {detail && item.body ? (
          <>
            <Spacer size="s" />
            <MdAsJsonRenderer body={item.body} />
          </>
        ) : null}
        {detail && item.stats && item.stats.length > 0 ? (
          <>
            <Spacer size="m" />
            <View
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                alignItems: "stretch",
                gap: size("s"),
              }}
            >
              {item.stats.map((stat) => (
                <StatTile key={stat.label} stat={stat} flexBasis={140} />
              ))}
            </View>
          </>
        ) : null}
        {!showDetails ? null : (
          <>
            <Spacer size="l" />
            <View style={styles.tags}>
              {item.hashtags.map((tag) => (
                <Text
                  key={tag}
                  style={[fontStyles.ios.footnote, theme.styles.textLight1]}
                >{` #${tag.replace(/[^a-zA-Z0-9]/g, "")}`}</Text>
              ))}
            </View>
            {!disableLinks && item.links && item.links.length > 0 && (
              <>
                <Spacer size="xxs" />
                <SpacedView gap="xxs" style={styles.links}>
                  <SVGExternalLink width={12} height={12} fill={theme.dynamicColors.textMain} />
                  {item.links.map((link) => (
                    <LinkText
                      key={link.title}
                      underline={true}
                      href={link.url}
                      style={[styles.link, fontStyles.ios.footnote, theme.styles.textMain]}
                    >
                      {link.title}
                    </LinkText>
                  ))}
                </SpacedView>
              </>
            )}
          </>
        )}
      </SpacedView>
    </View>
  );
};
