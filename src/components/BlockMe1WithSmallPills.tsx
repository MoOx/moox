import { useT } from "@/i18n";
import Me from "@/components/Me";
import Pill from "@/components/Pill";
import { WindowWidth } from "@/react-multiversal";
import IfWindowWidthIs from "@/react-multiversal/IfWindowWidthIs";
import Parallax from "@/react-multiversal/Parallax";
import TextForReader from "@/react-multiversal/TextForReader";
import { pTransforms } from "@/utils.styles";
import { StyleSheet } from "react-native";

export default function BlockMe1WithSmallPills() {
  const t = useT();
  return (
    <>
      <IfWindowWidthIs
        largerThan={WindowWidth.xs}
        style={[StyleSheet.absoluteFill, { alignItems: "center" }]}
      >
        <TextForReader>
          {t({
            en: "I am building things for a long time.",
            fr: "Je construis des choses depuis longtemps.",
          })}
        </TextForReader>
        <Me>
          <Parallax
            style={{ position: "absolute", top: 150, left: 0 }}
            transforms={pTransforms(5, -5, 0.1)}
          >
            <Pill
              pre={{ en: "Professional", fr: "Professionnel" }}
              title={{ en: "Web Developer", fr: "Développeur web" }}
              year={2007}
            />
          </Parallax>
          <Parallax
            style={{ position: "absolute", bottom: 20, right: 80 }}
            transforms={pTransforms(-5, 5, 0.1)}
          >
            <Pill
              pre={{ en: "Professional", fr: "Professionnel" }}
              title={{ en: "Mobile Developer", fr: "Développeur mobile" }}
              year={2018}
            />
          </Parallax>
          <Parallax
            style={{ position: "absolute", top: 200, right: 40 }}
            transforms={pTransforms(5, -5, -0.1)}
          >
            <Pill title={{ en: "First Website", fr: "Premier site web" }} year={1999} mode="year" />
          </Parallax>
          <Parallax
            style={{ position: "absolute", top: 300, left: -60 }}
            transforms={pTransforms(-5, 5, -0.05)}
          >
            <Pill
              title={{ en: "First Mobile Web App", fr: "Première app web mobile" }}
              detail="PalmOS"
              year={2006}
              mode="ago"
            />
          </Parallax>
        </Me>
      </IfWindowWidthIs>
      <IfWindowWidthIs
        smallerThan={WindowWidth.xs}
        style={[StyleSheet.absoluteFill, { alignItems: "center" }]}
      >
        <Me>
          <Parallax
            style={{ position: "absolute", top: 150, right: 10 }}
            transforms={pTransforms(-5, -10, 0.1)}
          >
            <Pill
              pre={{ en: "Professional", fr: "Professionnel" }}
              title={{ en: "Web Developer", fr: "Développeur web" }}
              year={2007}
              transitionSize="s"
            />
          </Parallax>
          <Parallax
            style={{ position: "absolute", top: 260, right: 50 }}
            transforms={pTransforms(-20, 10, 0.05)}
          >
            <Pill
              pre={{ en: "Professional", fr: "Professionnel" }}
              title={{ en: "Mobile Developer", fr: "Développeur mobile" }}
              year={2018}
              transitionSize="s"
            />
          </Parallax>
          <Parallax
            style={{ position: "absolute", top: 200, left: 10 }}
            transforms={pTransforms(-5, -5, -0.05)}
          >
            <Pill
              title={{ en: "First Website", fr: "Premier site web" }}
              year={1999}
              mode="ago"
              transitionSize="s"
            />
          </Parallax>
          <Parallax
            style={{ position: "absolute", bottom: 40, left: 40 }}
            transforms={pTransforms(-5, 10, -0.1)}
          >
            <Pill
              title={{ en: "First Mobile Web App", fr: "Première app web mobile" }}
              detail="PalmOS"
              year={2006}
              mode="ago"
              transitionSize="s"
            />
          </Parallax>
        </Me>
      </IfWindowWidthIs>
    </>
  );
}
