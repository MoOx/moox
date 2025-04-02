import * as React from "react";
import { Text } from "react-native";

import { BlogPost } from "@/api";
import { useTheme } from "@/app/styles";
import MdAsJsonRenderer from "@/components/MdAsJsonRenderer";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";

export default function BlogPostView({ item }: { item: BlogPost }) {
  const theme = useTheme();

  return (
    <SpacedView
      role="article"
      horizontal="l"
      vertical="l"
      style={theme.styles.back}
    >
      <SpacedView>
        <Text
          role="heading"
          aria-level={1}
          style={[fontStyles.iosEm.largeTitle, theme.styles.text]}
        >
          {item.title}
        </Text>
        {item.date && (
          <Text style={[fontStyles.ios.title1, theme.styles.textLight1]}>
            {item.date.slice(0, 10)}
          </Text>
        )}
        <Spacer size="m" />
        {item.body && <MdAsJsonRenderer body={item.body} />}
      </SpacedView>
    </SpacedView>
  );
}
