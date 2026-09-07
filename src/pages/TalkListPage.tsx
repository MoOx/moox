import { ContentTypeMap } from "@/api";
import TalkList from "@/components/TalkList";
import WebsiteWrapper from "@/components/WebsiteWrapper";
import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import Spacer from "@/react-multiversal/Spacer";
import { useTheme } from "@/styles";
import { Text, View } from "react-native";

export default function TalkListPage({ items }: { items: ContentTypeMap["talks"][] }) {
  const theme = useTheme();
  return (
    <WebsiteWrapper>
      <Container
        horizontal="l"
        vertical="m"
        style={theme.styles.back}
        maxWidth={640}
        role="article"
      >
        <View role="heading" aria-level={1}>
          <Text style={[fontStyles.ios.headline, theme.styles.textLight1]}>{"Latest"}</Text>
          <Text style={[fontStyles.iosEm.largeTitle, theme.styles.text]}>{"Talks"}</Text>
        </View>
        <Spacer />
        <TalkList items={items} />
      </Container>
    </WebsiteWrapper>
  );
}
