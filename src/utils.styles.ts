import { DegreeValue, ParallaxTransform } from "@/react-multiversal/Parallax";

export function pTransforms(
  translateY: number = 0,
  translateX: number = 0,
  scale: number = 1,
  rotate: DegreeValue = "0deg"
): ParallaxTransform[] {
  return [
    { translateY: translateY },
    { translateX: translateX },
    { scale: scale },
    { rotate: rotate },
  ];
}
