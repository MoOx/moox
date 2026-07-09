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
import { View } from "react-native";

export default function WebsiteWrapper({
  children,
  bare = false,
}: {
  children?: ReactNode;
  /** Bare layout (no header/footer/mobile menu), used for the PDF export. */
  bare?: boolean;
}) {
  const theme = useTheme();
  return (
    <View style={[theme.styles.back, { flex: 1 }]}>
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
