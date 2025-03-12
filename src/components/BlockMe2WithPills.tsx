import * as React from "react";
import { StyleSheet, View } from "react-native";

import Me from "@/components/Me";
import Pill from "@/components/Pill";
import { WindowWidth } from "@/react-multiversal";
import { fontStyles } from "@/react-multiversal/font";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import Parallax from "@/react-multiversal/Parallax";
import { pTransforms } from "@/utils.styles";

export default function BlockMe2WithPills() {
  return (
    <>
      <IfWindowWidthIs largerThan={WindowWidth.s}>
        <Me src="/max-2.png" imgWidth={512 / 2} imgHeight={890 / 2}>
          <Parallax
            style={{ position: "absolute", top: 160, left: -120 }}
            transforms={pTransforms(5, -5, 0.05)}
          >
            <Pill
              pre="Professional"
              title="Web Developer"
              year={2007}
              titleStyle={[fontStyles.iosEm.title3, { fontWeight: "900" }]}
              pillSpace="s"
              horizontalSpace="xxl"
              verticalSpace="xs"
            />
          </Parallax>
          <Parallax
            style={{ position: "absolute", top: 420, left: 80 }}
            transforms={pTransforms(-5, 5, 0.05)}
          >
            <Pill
              pre="Professional"
              title="Mobile Developer"
              year={2018}
              titleStyle={[fontStyles.iosEm.headline, { fontWeight: "900" }]}
              pillSpace="s"
              horizontalSpace="xxl"
              verticalSpace="xs"
            />
          </Parallax>
          <Parallax
            style={{ position: "absolute", top: 60, right: 0 }}
            transforms={pTransforms(10, -5, -0.1)}
          >
            <Pill title="First Website" year={1999} ago={true} />
          </Parallax>
          <Parallax
            style={{ position: "absolute", top: 260, right: 20 }}
            transforms={pTransforms(-5, 5, -0.05)}
          >
            <Pill
              title="First Mobile Web App"
              detail="PalmOS"
              year={2006}
              ago={true}
            />
          </Parallax>
        </Me>
      </IfWindowWidthIs>
      <IfWindowWidthIs smallerThan={WindowWidth.s}>
        <View
          style={[
            StyleSheet.absoluteFill,
            { pointerEvents: "none", overflow: "hidden" },
          ]}
        >
          <View
            style={{
              position: "absolute",
              top: 0,
              left: "50%",
              right: -80,
              transform: [{ scale: 0.8 }],
            }}
          >
            <Me src="/max-2.png" imgWidth={512 / 2} imgHeight={890 / 2}>
              <Parallax
                style={{ position: "absolute", top: 160, left: -60 }}
                transforms={pTransforms(-10, -5, 0.15)}
              >
                <Pill
                  pre="Professional"
                  title="Web Developer"
                  year={2007}
                  pillSpace="s"
                />
              </Parallax>
              <Parallax
                style={{ position: "absolute", bottom: -30, left: 20 }}
                transforms={pTransforms(5, -5, 0.05)}
              >
                <Pill
                  pre="Professional"
                  title="Mobile Developer"
                  year={2018}
                  pillSpace="s"
                  horizontalSpace="xl"
                  verticalSpace="xs"
                  titleStyle={[fontStyles.iosEm.callout]}
                />
              </Parallax>
              <Parallax
                style={{ position: "absolute", top: -50, right: 80 }}
                transforms={pTransforms(10, 0, -0.05)}
              >
                <Pill title="First Website" year={1999} ago={true} />
              </Parallax>
              <Parallax
                style={{ position: "absolute", top: 280, left: 30 }}
                transforms={pTransforms(-5, 0, -0.05)}
              >
                <Pill
                  title="First Mobile Web App"
                  detail="PalmOS"
                  year={2006}
                  ago={true}
                />
              </Parallax>
            </Me>
          </View>
        </View>
      </IfWindowWidthIs>
    </>
  );
}
