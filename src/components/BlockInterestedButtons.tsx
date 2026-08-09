import LinkButton from "@/components/LinkButton";
import { useHref, useT } from "@/i18n";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import { alpha, colors, useTheme } from "@/styles";
import SVGEllipsisMessageFill from "@/svgs/components/SVGEllipsisMessageFill";
import SVGMenuResumeFill from "@/svgs/components/SVGMenuResumeFill";
import { Text } from "react-native";

export default function BlockInterestedButtons() {
  const localizeHref = useHref();
  const t = useT();
  const theme = useTheme("dark");

  return (
    <Container>
      <SpacedView
        vertical="xxxl"
        horizontal="xxxl"
        gap="xl"
        style={{ alignItems: "center" }}
      >
        <Text
          style={[
            fontStyles.iosEm.title2,
            theme.styles.text,
            { textAlign: "center" },
          ]}
        >
          {t({
            en: "Ready to build something awesome together?",
            fr: "Prêt·e à construire quelque chose de chouette ensemble ?",
          })}
        </Text>
        <SpacedView
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
          gap="l"
        >
          <LinkButton
            href={localizeHref("/resume/")}
            blurAmount={16}
            color={alpha(colors.white, 0.15)}
            theme="dark"
            spaceHorizontal="xl"
            spaceVertical="m"
          >
            {(textStyles) => (
              <>
                <SVGMenuResumeFill
                  width={36}
                  height={36}
                  color={theme.dynamicColors.textOnMain}
                />
                <Text style={[textStyles, fontStyles.iosEm.title3]}>
                  {t({ en: "More about me", fr: "En savoir plus sur moi" })}
                </Text>
              </>
            )}
          </LinkButton>
          <LinkButton
            href={localizeHref("/contact/")}
            spaceHorizontal="xl"
            spaceVertical="m"
          >
            {(textStyles) => (
              <>
                <SVGEllipsisMessageFill
                  width={36}
                  height={36}
                  color={theme.dynamicColors.textOnMain}
                />
                <Text style={[textStyles, fontStyles.iosEm.title3]}>
                  {t({ en: "Hire me", fr: "Travailler avec moi" })}
                </Text>
              </>
            )}
          </LinkButton>
        </SpacedView>
      </SpacedView>
    </Container>
  );
}
