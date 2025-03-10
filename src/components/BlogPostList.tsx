"use client";

import * as React from "react";
import { Text, View } from "react-native";

import { BlogPost } from "@/api";
import { useTheme } from "@/app/styles";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import SpacedView from "@/react-multiversal/SpacedView";
import Spacer from "@/react-multiversal/Spacer";

function BlogPostPreview({ item }: { item: BlogPost }) {
  const theme = useTheme();

  return (
    <LinkView href={`/${item.slug}`}>
      <SpacedView vertical="s">
        <Text style={[fontStyles.ios.title3, theme.styles.text]}>
          {item.title}
          <Text style={[fontStyles.ios.footnote, theme.styles.text]}>
            {item.lang ? ` [${item.lang}]` : null}
          </Text>
        </Text>
      </SpacedView>
    </LinkView>
  );
}

export default function PostList({ items }: { items: BlogPost[] }) {
  const theme = useTheme();
  const latestYear = React.useRef(String(new Date().getFullYear() + 1));

  return (
    <>
      {items.map((item) => {
        const year = item.date?.slice(0, 4) ?? "2050";
        const newYear = year !== latestYear.current;
        latestYear.current = year;

        return (
          <View key={item.slug}>
            {newYear && (
              <View style={{ alignItems: "center" }}>
                <Spacer size="l" />
                <Text style={[fontStyles.iosEm.title2, theme.styles.text]}>
                  {year}
                </Text>
              </View>
            )}
            <BlogPostPreview item={item} />
          </View>
        );
      })}
    </>
  );
}
