import ContactPage from "@/pages/ContactPage";
import { View } from "react-native";
import Screen from "@/native/Screen";

/**
 * `/contact` - the one screen with no data to load, so nothing here replaces
 * the loader. Which is also why it carries the test handle by hand: there is
 * no `QueryView` to say when it is ready, because it always is.
 */
export default function ContactScreen() {
  return (
    <Screen>
      <View testID="loaded-contact">
        <ContactPage />
      </View>
    </Screen>
  );
}
