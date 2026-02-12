import Container from "@/react-multiversal/Container";
import { fontStyles } from "@/react-multiversal/font";
import SpacedView from "@/react-multiversal/SpacedView";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#01093C",
    paddingVertical: 60,
  },
  text: {
    color: "#fff",
    textAlign: "center",
  },
});

export default function JumbotronTalks() {
  return (
    <View style={styles.container}>
      <Container>
        <SpacedView horizontal="xl">
          <Text style={[fontStyles.iosEm.largeTitle, styles.text]}>
            Public Speaking
          </Text>
          <Text style={[fontStyles.ios.body, styles.text, { opacity: 0.8 }]}>
            I occasionally speak at conferences about React, React Native, and
            Frontend Development
          </Text>
        </SpacedView>
      </Container>
    </View>
  );
}
