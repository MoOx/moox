import { Lang, useLang, useT } from "@/i18n";
import LinkButton from "@/components/LinkButton";
import { socials } from "@/consts";
import { size } from "@/react-multiversal";
import Avatar from "@/react-multiversal/Avatar";
import BlurView from "@/react-multiversal/BlurView";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import { boxShadowGlass } from "@/react-multiversal/GlassView";
import GradientLinear from "@/react-multiversal/GradientLinear";
import { GradientRadial } from "@/react-multiversal/GradientRadial";
import Parallax from "@/react-multiversal/Parallax";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { boxShadows, themeLight, useTheme } from "@/styles";
import SVGQuote from "@/svgs/components/SVGQuote";
import SVGSocialLinkedin from "@/svgs/components/SVGSocialLinkedin";
import { StyleSheet, Text, View } from "react-native";

/** Same text in both languages; one of them is the verbatim original. */
export type Localized = Record<Lang, string>;

export type Testimonial = {
  avatar: string;
  name: string;
  title: Record<Lang, string>;
  /**
   * The language the recommendation was actually written in - the other one is
   * a translation. Recorded because these are someone else's words: it says
   * which side is authentic, and it drives the HTML `lang` attribute when a
   * page shows a quote in a language other than its own.
   */
  originalLang: Lang;
  /** Excerpt, verbatim in `originalLang`. `**bold**` marks the emphasis. */
  content: Record<Lang, string>;
  /**
   * Picked for the CV. The three flagged ones answer three different fears, in
   * escalating order: is he good (a CTO says so), will he own it (a founder
   * says so), will he lift the team (a teammate says so).
   */
  cv?: boolean;
};

/**
 * Renders the `**bold**` markers of an excerpt. Plain strings rather than JSX so
 * a quote stays reviewable as text - it has to be translated, and compared with
 * what the person actually wrote.
 */
export const TestimonialContent = ({ text, dim = 0.6 }: { text: string; dim?: number }) => (
  <>
    {text
      .split(/(\*\*[^*]+\*\*)/g)
      .filter(Boolean)
      .map((chunk, i) =>
        chunk.startsWith("**") ? (
          <Text key={`${i}-${chunk}`} style={{ fontWeight: "bold" }}>
            {chunk.slice(2, -2)}
          </Text>
        ) : (
          <Text key={`${i}-${chunk}`} style={{ opacity: dim }}>
            {chunk}
          </Text>
        ),
      )}
  </>
);

/**
 * Site order: strongest first *and* last - the weaker, more generic quotes sit
 * in the middle row, which is the least read.
 */
export const testimonials: Testimonial[] = [
  {
    avatar: "/linkedin/linkedin-aissa.jpeg",
    name: "Aissa Belaid",
    title: { en: "CTO at Hove", fr: "CTO chez Hove" },
    originalLang: "fr",
    cv: true,
    content: {
      fr: "En tant que CTO chez Hove, j'ai eu la chance d'avoir Maxime dans mes équipes **pendant 3 ans au moins**. Maxime est réellement un **top expert React** : qu'il s'agisse de React Native ou React.js, rien ne lui résiste.",
      en: "As CTO at Hove, I was lucky to have Maxime in my teams **for at least 3 years**. He is truly a **top React expert** — whether it's React Native or React.js, nothing stands in his way.",
    },
  },
  {
    avatar: "/linkedin/linkedin-james.jpeg",
    name: "James Feore",
    title: {
      en: "Co-Founder, Aardvark Intelligence",
      fr: "Co-fondateur, Aardvark Intelligence",
    },
    originalLang: "en",
    cv: true,
    content: {
      en: "Max is one of those really rare engineers who doesn't just work on a project but **takes ownership of it** as well. […] As a scrappy startup where absolutely every dollar mattered […] we found ourselves **consistently looking for reasons to hang on to Max**.",
      fr: "Max fait partie de ces ingénieurs rares qui ne se contentent pas de travailler sur un projet mais **se l'approprient**. […] Dans une startup où chaque euro comptait […] nous nous sommes retrouvés à **chercher sans cesse des raisons de garder Max**.",
    },
  },
  {
    avatar: "/linkedin/linkedin-cyprien.jpeg",
    name: "Cyprien Pannier",
    title: { en: "Software Engineer", fr: "Software Engineer" },
    originalLang: "fr",
    content: {
      fr: "Maxime est un développeur expérimenté qui a en plus de **réelles qualités humaines** et qui sait parfaitement communiquer.",
      en: "Maxime is an experienced developer who also has **genuine human qualities** and communicates perfectly.",
    },
  },
  {
    avatar: "/linkedin/linkedin-nicolas.jpeg",
    name: "Nicolas Moussikian",
    title: {
      en: "Engineering Manager, IT Architect",
      fr: "Engineering Manager, Architecte IT",
    },
    originalLang: "fr",
    content: {
      fr: "Une **réelle compréhension des besoins business** liés aux applicatifs qu'il implémente. Et un collaborateur agréable, **même à distance** (remote worker @ Shopbot).",
      en: "A **real understanding of the business needs** behind the software he implements. And a pleasant collaborator, **even remotely** (remote worker @ Shopbot).",
    },
  },
  {
    avatar: "/linkedin/linkedin-david.jpeg",
    name: "David Clark",
    title: {
      en: "Software Engineer · stylelint maintainer",
      fr: "Software Engineer · mainteneur de stylelint",
    },
    originalLang: "en",
    content: {
      en: "Having collaborated with Maxime on several open source projects […] not only does he stay up-to-date with the latest tools and best practices: **he actively contributes to them**. He demonstrates interest and ability at every level of projects, from **line-by-line code reviews to architectural discussions**.",
      fr: "Après avoir collaboré avec Maxime sur plusieurs projets open source […] non seulement il se tient au courant des derniers outils et bonnes pratiques : **il y contribue activement**. Il fait preuve d'intérêt et de compétence à tous les niveaux d'un projet, de **la revue de code ligne à ligne aux discussions d'architecture**.",
    },
  },
  {
    avatar: "/linkedin/linkedin-alex.jpeg",
    name: "Alexandre Broutin",
    title: {
      en: "Software Engineer at Hove",
      fr: "Software Engineer chez Hove",
    },
    originalLang: "fr",
    cv: true,
    content: {
      fr: "Il est toujours **disponible et pédagogue**, ce qui m'a permis d'appréhender React Native très rapidement. Il aime partager sa soif d'apprendre, ce qui est **un vrai moteur pour une équipe**.",
      en: "He's always **available and a real teacher**, which is how I got to grips with React Native so quickly. He loves sharing his thirst for learning, which is **a real driving force for a team**.",
    },
  },
];

/** The CV's three, in the order they are authored above. */
export const featuredTestimonials = testimonials.filter((t) => t.cv);

/**
 * Quotes are authored in both languages (`content`, `title`), and each one
 * records the language it was originally written in: a quote read in another
 * language is tagged with `lang` so screen readers pronounce it right.
 */

const testimonialRows: Testimonial[][] = [];
for (let i = 0; i < testimonials.length; i += 2) {
  testimonialRows.push(testimonials.slice(i, i + 2));
}

const TestimonialItem = ({ item }: { item: Testimonial }) => {
  const theme = useTheme("dark");
  const lang = useLang();
  return (
    <BlurView
      blurAmount={48}
      style={{
        borderRadius: size("s"),
        flexShrink: 1,
        flexBasis: 360,
        boxShadow: boxShadows.moreVisible,
      }}
    >
      <GradientLinear
        angle={-90}
        stops={[
          { offset: 0, stopColor: "#F2F2F2", stopOpacity: "0.1" },
          {
            offset: 100,
            stopColor: "#E1E1E1",
            stopOpacity: "0.35",
          },
        ]}
        style={[StyleSheet.absoluteFill, { borderRadius: size("s") }]}
      />
      <View
        style={[StyleSheet.absoluteFill, { borderRadius: size("s"), boxShadow: boxShadowGlass() }]}
      />
      <SpacedView key={item.name} horizontal="m" vertical="m" gap="s">
        <SVGQuote width={32} height={32} fill={theme.dynamicColors.text} style={{ zIndex: 1 }} />
        <View role="blockquote">
          <Text
            role="paragraph"
            style={[fontStyles.ios.callout, theme.styles.text]}
            // Flags a quote kept in its original language on a page written in
            // another one, so screen readers pronounce it right.
            {...(item.originalLang !== lang ? { lang } : null)}
          >
            <TestimonialContent text={item.content[lang]} />
          </Text>
        </View>
        <SpacedView
          gap="xs"
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar size={36} borderWidth={1} borderColor="#979797" uri={item.avatar} />
          <Text role="paragraph" style={{ display: "flex", flexDirection: "column" }}>
            <Text style={[fontStyles.iosEm.body, theme.styles.text, { opacity: 0.75 }]}>
              {item.name}
            </Text>
            <Text style={[fontStyles.ios.caption1, theme.styles.text, { opacity: 0.5 }]}>
              {item.title[lang]}
            </Text>
          </Text>
        </SpacedView>
      </SpacedView>
    </BlurView>
  );
};

export default function BlockTestimonials() {
  const theme = useTheme();
  const t = useT();

  return (
    <View>
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            overflow: "hidden",
            transform: [{ skewY: "1deg" }, { scaleY: 1.025 }],
          },
        ]}
      >
        <GradientLinear
          // global gradient
          style={StyleSheet.absoluteFill}
          stops={[
            { offset: 0, stopColor: "#9623c0" },
            { offset: 100, stopColor: themeLight.colors.textIndigoAlt2 },
          ]}
          angle={160}
        />
        <Parallax
          // corner top left blue
          style={StyleSheet.absoluteFill}
          contentStyle={StyleSheet.absoluteFill}
          transforms={[
            { translateX: 100 },
            { translateY: 100 },
            // { scale: 0.2 },
          ]}
          springOptions={{ mass: 2 }}
        >
          <GradientRadial
            style={[
              StyleSheet.absoluteFill,
              { transform: [{ translateX: -100 }, { translateY: -100 }] },
            ]}
            stops={[
              { offset: 0, stopColor: "#12e9ec", stopOpacity: "0.75" },
              { offset: 100, stopColor: "#12e9ec", stopOpacity: "0" },
            ]}
            coordinates={{ cx: "10%", cy: "20%", fx: "5%", fy: "25%" }}
          />
        </Parallax>
        <Parallax
          // corner bottom left purple
          style={StyleSheet.absoluteFill}
          contentStyle={StyleSheet.absoluteFill}
          transforms={[{ translateX: 100 }, { translateY: -100 }]}
          springOptions={{ mass: 4 }}
        >
          <GradientRadial
            style={[
              StyleSheet.absoluteFill,
              { transform: [{ translateX: -100 }, { translateY: 100 }] },
            ]}
            stops={[
              { offset: 0, stopColor: "#9623c0", stopOpacity: "0.75" },
              { offset: 100, stopColor: "#9623c0", stopOpacity: "0" },
            ]}
            coordinates={{
              cx: "20%",
              cy: "100%",
              fx: "15%",
              fy: "80%",
              r: "40%",
            }}
          />
        </Parallax>
        <Parallax
          // bottom right blue
          style={StyleSheet.absoluteFill}
          contentStyle={StyleSheet.absoluteFill}
          transforms={[{ translateX: -200 }]}
          reverse={true}
        >
          <GradientRadial
            style={StyleSheet.absoluteFill}
            stops={[
              { offset: 0, stopColor: "#2816A8", stopOpacity: "0.6" },
              { offset: 100, stopColor: "#2816A8", stopOpacity: "0" },
            ]}
            coordinates={{ cx: "50%", cy: "100%", fx: "60%", fy: "100%" }}
          />
        </Parallax>
      </View>
      <Container
        role="region"
        aria-label={t({ en: "Testimonials", fr: "Témoignages" })}
        wrapperStyle={{ zIndex: 1 }}
      >
        <SpacedView vertical="xl" horizontal="xl" gap="xl">
          <SpacedView gap="s">
            <Text
              style={[fontStyles.iosEm.largeTitle, theme.styles.textOnMain]}
              role="heading"
              aria-level={2}
            >
              {t({ en: "What People Say About Me.", fr: "Ce qu'on dit de moi." })}
            </Text>
            <Text
              style={[fontStyles.iosEm.body, theme.styles.textOnMain, { opacity: 0.6 }]}
              role="paragraph"
            >
              {t({
                en: "Real feedback from those who know my work.",
                fr: "De vrais retours de personnes qui connaissent mon travail.",
              })}
            </Text>
          </SpacedView>
          <View>
            {testimonialRows.map((row, rowIndex) => (
              <SpacedView
                key={row.map((item) => item.name).join("-")}
                vertical="m"
                gap="xl"
                style={{
                  flexDirection: "row",
                  flexWrap: "wrap",
                  justifyContent: rowIndex % 2 === 0 ? "flex-start" : "flex-end",
                }}
              >
                {row.map((item) => (
                  <TestimonialItem key={item.name} item={item} />
                ))}
              </SpacedView>
            ))}
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <LinkButton
              spaceHorizontal="xl"
              spaceVertical="m"
              color="rgb(10, 102, 194)"
              href={`${socials.linkedin.value}/details/recommendations/`}
            >
              {() => (
                <>
                  <Text style={[fontStyles.iosEm.title3, theme.styles.textOnMain]}>
                    {t({
                      en: "Read all my Recommendations",
                      fr: "Lire toutes mes recommandations",
                    })}
                  </Text>
                  <SVGSocialLinkedin
                    width={28}
                    height={28}
                    fill={theme.dynamicColors.textOnMain}
                    style={{ flexShrink: 0 }}
                  />
                </>
              )}
            </LinkButton>
            <Spacer size="m" />
          </View>
        </SpacedView>
      </Container>
    </View>
  );
}
