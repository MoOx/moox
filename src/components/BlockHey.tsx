import BlockMe1WithSmallPills from "@/components/BlockMe1WithSmallPills";
import JobTitleHeading from "@/components/JobTitleHeading";
import { useT } from "@/i18n";
import { WindowWidth } from "@/react-multiversal";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";
import { gradientTextFlashyStyles, useTheme } from "@/styles";
import { Text, View } from "react-native";

export default function BlockHey() {
  const theme = useTheme();
  const t = useT();
  return (
    <View style={{ zIndex: 1 }}>
      <Container
        // maxWidth={920}
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <SpacedView
          horizontal="l"
          vertical="m"
          style={{
            flexGrow: 1,
            flexShrink: 1,
            flexBasis: 450,
          }}
          // role="header"
        >
          <View style={{ flexDirection: "column-reverse" }}>
            {/* The heading holds the job title and nothing else: the subtitle
                below is an apposition, not part of the <h1>, and the two
                responsive sizes are one node styled by a media query (see
                `heroTitleSize` above) - rendering both variants
                put the title in the HTML twice. */}
            {/* Wrapper: the parent stacks in `column-reverse`, so heading and
                subtitle must travel together to keep the subtitle under the
                title. The title itself is shared with the social-preview
                image (JobTitleHeading), so the two cannot drift. */}
            <JobTitleHeading viewTransitionName="text--senior-developer" />
            <Spacer size="l" />
            <Text role="paragraph" style={{ display: "flex", flexDirection: "column" }}>
              <Text style={[fontStyles.ios.headline, theme.styles.textLight1]}>
                {t({ en: "Hey,", fr: "Hey," })}
              </Text>
              <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>
                {t({ en: "I'm ", fr: "Moi c'est " })}
                <Text
                  style={[
                    gradientTextFlashyStyles(theme, -16),
                    { viewTransitionName: "text--max" },
                  ]}
                >
                  {"Max."}
                </Text>
              </Text>
            </Text>
          </View>
          <IfWindowWidthIs largerThan={WindowWidth.m}>
            <Spacer size="xxxl" />
          </IfWindowWidthIs>
        </SpacedView>
        <BlockMe1WithSmallPills />
      </Container>
    </View>
  );
}
