import { StyleSheet, Text, View } from "react-native";

import { boxShadows, themeLight, useTheme } from "@/app/styles";
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
import SVGQuote from "@/svgs/components/SVGQuote";
import SVGSocialLinkedin from "@/svgs/components/SVGSocialLinkedin";

export type Testimonial = {
  avatar: string;
  name: string;
  title: string;
  content: React.ReactNode;
};
export const testimonials: Testimonial[] = [
  {
    avatar: "/linkedin/linkedin-aissa.jpeg",
    name: "Aissa",
    title: "CTO at Hove",
    content: (
      <>
        <Text style={{ opacity: 0.6 }}>{"Max is truly a top "}</Text>
        <Text style={{ fontWeight: "bold" }}>{"React expert"}</Text>
        <Text style={{ opacity: 0.6 }}>
          {
            ". Whether it's React Native or React.js, nothing stands in his way."
          }
        </Text>
      </>
    ),
  },
  {
    avatar: "/linkedin/linkedin-alex.jpeg",
    name: "Alex",
    title: "Mobile Developer",
    content: (
      <>
        <Text style={{ fontWeight: "bold" }}>{"Max loves sharing"}</Text>
        <Text style={{ opacity: 0.6 }}>
          {
            " his thirst for learning and his knowledge, which is a real driving force for a team."
          }
        </Text>
      </>
    ),
  },
  {
    avatar: "/linkedin/linkedin-david.jpeg",
    name: "David",
    title: "Software Engineer",
    content: (
      <>
        <Text style={{ opacity: 0.6 }}>
          {"Having collaborated with Max on several "}
        </Text>
        <Text style={{ fontWeight: "bold" }}>{"open source projects"}</Text>
        <Text style={{ opacity: 0.6 }}>
          {
            ", I can attest that he is a knowledgeable and motivated frontend developer."
          }
        </Text>
      </>
    ),
  },
  {
    avatar: "/linkedin/linkedin-cyprien.jpeg",
    name: "Cyprien",
    title: "Software Engineer",
    content: (
      <>
        <Text style={{ opacity: 0.6 }}>
          {"Max is an experienced developer with "}
        </Text>
        <Text style={{ fontWeight: "bold" }}>{"genuine human qualities"}</Text>
        <Text style={{ opacity: 0.6 }}>
          {" who excels in communication.\n "}
        </Text>
      </>
    ),
  },
];

const midpoint = Math.ceil(testimonials.length / 2);

const testimonials1 = testimonials.slice(0, midpoint);
const testimonials2 = testimonials.slice(midpoint);

const TestimonialItem = ({ item }: { item: Testimonial }) => {
  const theme = useTheme("dark");
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
        style={[
          StyleSheet.absoluteFill,
          { borderRadius: size("s"), boxShadow: boxShadowGlass() },
        ]}
      />
      <SpacedView key={item.name} horizontal="m" vertical="m" gap="s">
        <SVGQuote
          width={32}
          height={32}
          fill={theme.dynamicColors.text}
          style={{ zIndex: 1 }}
        />
        <View role="blockquote">
          <Text
            role="paragraph"
            style={[fontStyles.ios.callout, theme.styles.text]}
          >
            {item.content}
          </Text>
        </View>
        <SpacedView
          gap="xs"
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Avatar
            size={36}
            borderWidth={1}
            borderColor="#979797"
            uri={item.avatar}
          />
          <Text
            role="paragraph"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Text
              style={[
                fontStyles.iosEm.body,
                theme.styles.text,
                { opacity: 0.75 },
              ]}
            >
              {item.name}
            </Text>
            <Text
              style={[
                fontStyles.ios.caption1,
                theme.styles.text,
                { opacity: 0.5 },
              ]}
            >
              {item.title}
            </Text>
          </Text>
        </SpacedView>
      </SpacedView>
    </BlurView>
  );
};

export default function BlockTestimonials() {
  const theme = useTheme();

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
      <Container wrapperStyle={{ zIndex: 1 }}>
        <SpacedView vertical="xl" horizontal="xl" gap="xl">
          <SpacedView gap="s">
            <Text
              style={[fontStyles.iosEm.largeTitle, theme.styles.textOnMain]}
              role="heading"
              aria-level={2}
            >
              {"What People Say About Me."}
            </Text>
            <Text
              style={[
                fontStyles.iosEm.body,
                theme.styles.textOnMain,
                { opacity: 0.6 },
              ]}
              role="paragraph"
            >
              {`Real feedback from those who know my work.`}
            </Text>
          </SpacedView>
          <View>
            <SpacedView
              vertical="m"
              gap="xl"
              style={{ flexDirection: "row", flexWrap: "wrap" }}
            >
              {testimonials1.map((item) => (
                <TestimonialItem key={item.name} item={item} />
              ))}
            </SpacedView>
            <SpacedView
              vertical="m"
              gap="xl"
              style={{
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "flex-end",
              }}
            >
              {testimonials2.map((item) => (
                <TestimonialItem key={item.name} item={item} />
              ))}
            </SpacedView>
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
                  <Text
                    style={[fontStyles.iosEm.title3, theme.styles.textOnMain]}
                  >
                    {"Read all my Recommendations"}
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
