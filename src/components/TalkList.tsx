import { Talk } from "@/api";
import { fontStyles } from "@/react-multiversal/font";
import LinkView from "@/react-multiversal/LinkView";
import Box from "@/react-multiversal/Box";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { useRef } from "react";
import { Text, View } from "react-native";

function TalkPreview({ item }: { item: Talk }) {
  const theme = useTheme();

  return (
    <LinkView href={`/${item.slug}/`}>
      <Box py="s">
        <Text style={[fontStyles.iosEm.title3, theme.styles.text]}>
          {item.title}
          <Text style={[fontStyles.ios.footnote, theme.styles.text]}>
            {item.lang ? ` [${item.lang}]` : null}
          </Text>
        </Text>
        {item.conference && (
          <Text style={[fontStyles.ios.footnote, theme.styles.text]}>{item.conference}</Text>
        )}
      </Box>
    </LinkView>
  );
}

export default function TalkList({ items }: { items: Talk[] }) {
  const theme = useTheme();
  const latestYear = useRef(String(new Date().getFullYear() + 1));

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
                <Text style={[fontStyles.iosEm.title2, theme.styles.text]}>{year}</Text>
              </View>
            )}
            <TalkPreview item={item} />
          </View>
        );
      })}
    </>
  );
}
