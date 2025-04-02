import * as React from "react";
import { View } from "react-native";

import { useTheme } from "@/app/styles";
import WebsiteFooter from "@/components/WebsiteFooter";
import WebsiteHeader from "@/components/WebsiteHeader";
import WebsiteMobileMenu, {
  WebsiteMobileMenuPlaceholder,
} from "@/components/WebsiteMobileMenu";
import { WindowWidth } from "@/react-multiversal";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import Spacer from "@/react-multiversal/Spacer";

export default function WebsiteWrapper({
  children,
}: {
  children?: React.ReactNode;
}) {
  const theme = useTheme();
  return (
    <View style={[theme.styles.back, { flex: 1 }]}>
      <WebsiteHeader />
      <View role="main">{children}</View>
      <Spacer size="xxl" />
      <WebsiteFooter />
      <IfWindowWidthIs smallerThan={WindowWidth.s}>
        <WebsiteMobileMenuPlaceholder />
        <WebsiteMobileMenu />
      </IfWindowWidthIs>
    </View>
  );
}
