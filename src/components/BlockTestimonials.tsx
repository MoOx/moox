import { StyleSheet, Text, View } from "react-native";

import { gradientStaticIndigoStyles, useTheme } from "@/app/styles";
import { socials } from "@/consts";
import { size } from "@/react-multiversal";
import Avatar from "@/react-multiversal/Avatar";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import GradientLinear from "@/react-multiversal/GradientLinear";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import SVGQuote from "@/svgs/components/SVGQuote";
import SVGSocialLinkedin from "@/svgs/components/SVGSocialLinkedin";

export type Testimonial = {
  avatar: string;
  name: string;
  title: string;
  content: JSX.Element;
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
            ". Whether it’s React Native or React.js, nothing stands in his way."
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
  const theme = useTheme("light");
  return (
    <SpacedView
      key={item.name}
      horizontal="m"
      vertical="m"
      gap="s"
      style={[
        theme.styles.back,
        { borderRadius: size("s"), flexShrink: 1, flexBasis: 360 },
      ]}
    >
      {/* <GradientLinear
        angle={-90}
        stops={[
          { offset: 0, stopColor: "#F2F2F2", stopOpacity: "0.2" },
          {
            offset: 100,
            stopColor: "#E1E1E1",
            stopOpacity: "0.5",
          },
        ]}
        style={[StyleSheet.absoluteFill, { borderRadius: size("s") }]}
      /> */}
      <SVGQuote width={32} height={32} fill={theme.dynamicColors.text} />
      <Text style={[fontStyles.ios.callout, theme.styles.text]}>
        {item.content}
      </Text>
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
        <View>
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
        </View>
      </SpacedView>
    </SpacedView>
  );
};

export default function BlockTestimonials() {
  const theme = useTheme();
  return (
    <View
      style={
        [
          // theme.styles.backMain,
          // {
          //   backgroundImage: `radial-gradient(circle at 50% 50%, #352A9F 0%,rgb(25, 18, 87) 50%)`,
          // },
        ]
      }
    >
      <GradientLinear
        stops={gradientStaticIndigoStyles}
        angle={190}
        style={[
          StyleSheet.absoluteFill,
          { transform: [{ skewY: "1deg" }, { scaleY: 1.025 }] },
        ]}
      />
      {/* <Image
        src={"/bg/priscilla-du-preez-XkKCui44iM0-unsplash.jpg"}
        width={1024}
        height={500}
        alt=""
        style={{
          ...StyleSheet.absoluteFillObject,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          mixBlendMode: "luminosity",
          opacity: 0.1,
          filter: "blur(6px)",
        }}
      /> */}
      <Container>
        <SpacedView vertical="xxl" horizontal="xl" gap="xl">
          <SpacedView gap="s">
            <Text
              style={[fontStyles.iosEm.largeTitle, theme.styles.textOnMain]}
            >
              {"Testimonials."}
            </Text>
            <Text
              style={[
                fontStyles.iosEm.body,
                theme.styles.textOnMain,
                { opacity: 0.6 },
              ]}
            >
              {`What coworkers say about me.`}
            </Text>
          </SpacedView>
          <View>
            <SpacedView
              // horizontal="l"
              vertical="m"
              gap="xl"
              style={{ flexDirection: "row", flexWrap: "wrap" }}
            >
              {testimonials1.map((item) => (
                <TestimonialItem key={item.name} item={item} />
              ))}
            </SpacedView>
            <SpacedView
              // horizontal="l"
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
            <LinkView
              href={`${socials.linkedin}/details/recommendations/`}
              style={[
                theme.styles.backMain,
                { borderRadius: size("xl"), maxWidth: "100%" },
              ]}
            >
              <SpacedView
                horizontal="xxl"
                vertical="m"
                gap="s"
                style={{ flexDirection: "row", alignItems: "center" }}
              >
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
              </SpacedView>
            </LinkView>
          </View>
        </SpacedView>
      </Container>
    </View>
  );
}
