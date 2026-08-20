import WebsiteError from "@/components/WebsiteError";
import Screen from "@/native/Screen";

/**
 * Expo Router's convention for an unmatched route, and the counterpart of
 * `notFoundComponent` on the web root. It exists because deep links can point
 * anywhere: `moox://resume/nope` has to land somewhere.
 */
export default function NotFoundScreen() {
  return (
    <Screen>
      <WebsiteError statusCode={404} />
    </Screen>
  );
}
