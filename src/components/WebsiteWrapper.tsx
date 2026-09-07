import WebsiteFooter from "@/components/WebsiteFooter";
import WebsiteHeader from "@/components/WebsiteHeader";
import WebsiteMobileMenu, {
  WebsiteMobileMenuPlaceholder,
} from "@/components/WebsiteMobileMenu";
import { WindowWidth } from "@/react-multiversal";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { ReactNode } from "react";
import { Platform, View } from "react-native";

export default function WebsiteWrapper({
  children,
  bare = Platform.OS !== "web",
}: {
  children?: ReactNode;
  /** Bare layout (no header/footer/mobile menu), used for the PDF export. */
  bare?: boolean;
}) {
  const theme = useTheme();
  return (
    // minHeight: the html background is the flashy purple (it is what tints
    // Safari's chrome, see styles.css); on short pages (e.g. /resume/<slug>)
    // the wrapper must still cover the whole viewport or the purple shows
    // below the content.
    // `vh` is a CSS unit React Native cannot parse, and it is only there for
    // the html background behind a short page - a native screen has no such
    // thing, and `flexGrow: 1, flexShrink: 1` already fills it.
    <View
      style={[
        theme.styles.back,
        Platform.OS === "web" && { minHeight: "100vh" },
      ]}
    >
      {bare ? null : <WebsiteHeader />}
      <View role="main">{children}</View>
      {bare ? null : (
        <>
          <Spacer size="xxl" />
          <WebsiteFooter />
          <IfWindowWidthIs smallerThan={WindowWidth.s}>
            <WebsiteMobileMenuPlaceholder />
            <WebsiteMobileMenu />
          </IfWindowWidthIs>
        </>
      )}
    </View>
  );
}
