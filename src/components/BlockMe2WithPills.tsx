import Me from "@/components/Me";
import { WindowWidth } from "@/react-multiversal";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import { StyleSheet, View } from "react-native";

export default function BlockMe2WithPills() {
  return (
    <>
      <IfWindowWidthIs largerThan={WindowWidth.m}>
        <Me width={300} imgWidth={512 / 3} imgHeight={835 / 3} />
      </IfWindowWidthIs>
      <IfWindowWidthIs smallerThan={WindowWidth.m}>
        <View style={[StyleSheet.absoluteFill, { pointerEvents: "none", overflow: "hidden" }]}>
          <View
            style={{
              position: "absolute",
              top: "25%",
              bottom: 0,
              right: -40,
              left: "60%",
            }}
          >
            <Me src="/max-2.png" width={260} imgWidth={512 / 2.5} imgHeight={890 / 2.5} />
          </View>
        </View>
      </IfWindowWidthIs>
    </>
  );
}
