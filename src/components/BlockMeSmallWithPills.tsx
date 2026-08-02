import Me from "@/components/Me";
import Pill from "@/components/Pill";
import Parallax from "@/react-multiversal/Parallax";
import { pTransforms } from "@/utils.styles";

export default function BlockMeSmallWithPills() {
  return (
    <Me width={320}>
      <Parallax
        style={{ position: "absolute", top: 150, left: -60 }}
        transforms={pTransforms(5, -5, 0.1)}
      >
        <Pill pre="Professional" title="Web Developer" year={2007} />
      </Parallax>
      <Parallax
        style={{ position: "absolute", bottom: 10, right: 40 }}
        transforms={pTransforms(-5, 5, 0.1)}
      >
        <Pill pre="Professional" title="Mobile Developer" year={2018} />
      </Parallax>
      <Parallax
        style={{ position: "absolute", top: 110, right: 0 }}
        transforms={pTransforms(5, -5, -0.1)}
      >
        <Pill title="First Website" year={1999} mode="year" />
      </Parallax>
    </Me>
  );
}
