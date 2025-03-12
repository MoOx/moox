"use client";

import * as React from "react";
import { StyleSheet } from "react-native";

import Me from "@/components/Me";
import Pill from "@/components/Pill";
import { WindowWidth } from "@/react-multiversal";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import Parallax from "@/react-multiversal/Parallax";
import { pTransforms } from "@/utils.styles";

export default function BlockMe1WithSmallPills() {
  return (
    <Me>
      <IfWindowWidthIs
        largerThan={WindowWidth.xs}
        style={[StyleSheet.absoluteFill, { alignItems: "center" }]}
      >
        <Parallax
          style={{ position: "absolute", top: 150, left: 0 }}
          transforms={pTransforms(5, -5, 0.1)}
        >
          <Pill pre="Professional" title="Web Developer" year={2007} />
        </Parallax>
        <Parallax
          style={{ position: "absolute", bottom: 20, right: 80 }}
          transforms={pTransforms(-5, 5, 0.1)}
        >
          <Pill pre="Professional" title="Mobile Developer" year={2018} />
        </Parallax>
        <Parallax
          style={{ position: "absolute", top: 200, right: 40 }}
          transforms={pTransforms(5, -5, -0.1)}
        >
          <Pill title="First Website" year={1999} ago={true} />
        </Parallax>
        <Parallax
          style={{ position: "absolute", top: 300, left: -60 }}
          transforms={pTransforms(-5, 5, -0.05)}
        >
          <Pill
            title="First Mobile Web App"
            detail="PalmOS"
            year={2006}
            ago={true}
          />
        </Parallax>
      </IfWindowWidthIs>
      <IfWindowWidthIs
        smallerThan={WindowWidth.xs}
        style={[StyleSheet.absoluteFill, { alignItems: "center" }]}
      >
        <Parallax
          style={{ position: "absolute", top: 150, right: 10 }}
          transforms={pTransforms(-5, -10, 0.1)}
        >
          <Pill pre="Professional" title="Web Developer" year={2007} />
        </Parallax>
        <Parallax
          style={{ position: "absolute", top: 260, right: 50 }}
          transforms={pTransforms(-20, 10, 0.05)}
        >
          <Pill pre="Professional" title="Mobile Developer" year={2018} />
        </Parallax>
        <Parallax
          style={{ position: "absolute", top: 200, left: 10 }}
          transforms={pTransforms(-5, -5, -0.05)}
        >
          <Pill title="First Website" year={1999} ago={true} />
        </Parallax>
        <Parallax
          style={{ position: "absolute", bottom: 40, left: 40 }}
          transforms={pTransforms(-5, 10, -0.1)}
        >
          <Pill
            title="First Mobile Web App"
            detail="PalmOS"
            year={2006}
            ago={true}
          />
        </Parallax>
      </IfWindowWidthIs>
    </Me>
  );
}
