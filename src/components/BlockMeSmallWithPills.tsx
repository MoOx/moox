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
        <Pill
          pre={{ en: "Professional", fr: "Professionnel" }}
          title={{ en: "Web Developer", fr: "Développeur web" }}
          year={2007}
        />
      </Parallax>
      <Parallax
        style={{ position: "absolute", bottom: 10, right: 40 }}
        transforms={pTransforms(-5, 5, 0.1)}
      >
        <Pill
          pre={{ en: "Professional", fr: "Professionnel" }}
          title={{ en: "Mobile Developer", fr: "Développeur mobile" }}
          year={2018}
        />
      </Parallax>
      <Parallax
        style={{ position: "absolute", top: 110, right: 0 }}
        transforms={pTransforms(5, -5, -0.1)}
      >
        <Pill title={{ en: "First Website", fr: "Premier site web" }} year={1999} mode="year" />
      </Parallax>
    </Me>
  );
}
