import { ViewStyle } from "react-native";
import { match } from "ts-pattern";

export type PositionName =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"
  | "left-top"
  | "left-center"
  | "left-bottom"
  | "right-top"
  | "right-center"
  | "right-bottom"
  | "right-auto"
  | "left-auto"
  | "top-auto"
  | "bottom-auto";

export const preferHorizontal = [
  "left-top",
  "left-center",
  "left-bottom",
  "right-top",
  "right-center",
  "right-bottom",
] as PositionName[];

export const preferVertical = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
] as PositionName[];

export type ElementDimensions = { width: number; height: number };
export type ElementLayout = ElementDimensions & { x: number; y: number };

export function calculateOptimalPosition({
  window,
  referenceItem,
  itemToPlace,
  preferredPositions = [],
}: {
  window: ElementDimensions;
  referenceItem: { width: number; height: number; x: number; y: number };
  itemToPlace: ElementDimensions;
  preferredPositions?: PositionName[];
}): {
  x: number;
  y: number;
  width: number;
  height: number;
  usedPosition: PositionName;
} {
  const positions: { [key in PositionName]: { x: number; y: number } } = {
    "top-left": {
      x: referenceItem.x,
      y: referenceItem.y - itemToPlace.height,
    },
    "top-center": {
      x: referenceItem.x + (referenceItem.width - itemToPlace.width) / 2,
      y: referenceItem.y - itemToPlace.height,
    },
    "top-right": {
      x: referenceItem.x + referenceItem.width - itemToPlace.width,
      y: referenceItem.y - itemToPlace.height,
    },
    "bottom-left": {
      x: referenceItem.x,
      y: referenceItem.y + referenceItem.height,
    },
    "bottom-center": {
      x: referenceItem.x + (referenceItem.width - itemToPlace.width) / 2,
      y: referenceItem.y + referenceItem.height,
    },
    "bottom-right": {
      x: referenceItem.x + referenceItem.width - itemToPlace.width,
      y: referenceItem.y + referenceItem.height,
    },
    "left-top": {
      x: referenceItem.x - itemToPlace.width,
      y: referenceItem.y,
    },
    "left-center": {
      x: referenceItem.x - itemToPlace.width,
      y: referenceItem.y + (referenceItem.height - itemToPlace.height) / 2,
    },
    "left-bottom": {
      x: referenceItem.x - itemToPlace.width,
      y: referenceItem.y + referenceItem.height - itemToPlace.height,
    },
    "right-top": {
      x: referenceItem.x + referenceItem.width,
      y: referenceItem.y,
    },
    "right-center": {
      x: referenceItem.x + referenceItem.width,
      y: referenceItem.y + (referenceItem.height - itemToPlace.height) / 2,
    },
    "right-bottom": {
      x: referenceItem.x + referenceItem.width,
      y: referenceItem.y + referenceItem.height - itemToPlace.height,
    },
    "right-auto": {
      x: referenceItem.x + referenceItem.width,
      y: Math.max(
        0,
        Math.min(
          window.height - itemToPlace.height,
          referenceItem.y < window.height / 3
            ? referenceItem.y
            : referenceItem.y > (window.height * 2) / 3
              ? referenceItem.y + referenceItem.height - itemToPlace.height
              : referenceItem.y +
                (referenceItem.height - itemToPlace.height) / 2
        )
      ),
    },
    "left-auto": {
      x: referenceItem.x - itemToPlace.width,
      y: Math.max(
        0,
        Math.min(
          window.height - itemToPlace.height,
          referenceItem.y < window.height / 3
            ? referenceItem.y
            : referenceItem.y > (window.height * 2) / 3
              ? referenceItem.y + referenceItem.height - itemToPlace.height
              : referenceItem.y +
                (referenceItem.height - itemToPlace.height) / 2
        )
      ),
    },
    "top-auto": {
      x: Math.max(
        0,
        Math.min(
          window.width - itemToPlace.width,
          referenceItem.x < window.width / 3
            ? referenceItem.x
            : referenceItem.x > (window.width * 2) / 3
              ? referenceItem.x + referenceItem.width - itemToPlace.width
              : referenceItem.x + (referenceItem.width - itemToPlace.width) / 2
        )
      ),
      y: referenceItem.y - itemToPlace.height,
    },
    "bottom-auto": {
      x: Math.max(
        0,
        Math.min(
          window.width - itemToPlace.width,
          referenceItem.x < window.width / 3
            ? referenceItem.x
            : referenceItem.x > (window.width * 2) / 3
              ? referenceItem.x + referenceItem.width - itemToPlace.width
              : referenceItem.x + (referenceItem.width - itemToPlace.width) / 2
        )
      ),
      y: referenceItem.y + referenceItem.height,
    },
  };

  // first, preffered positions
  for (const position of preferredPositions) {
    const pos = positions[position];
    if (isInViewport({ ...itemToPlace, ...pos }, window)) {
      return {
        ...itemToPlace,
        ...pos,
        usedPosition: position,
      };
    }
  }

  // if no one is available, try all positions, with the best score

  const calculateVisibleArea = (x: number, y: number): number => {
    const visibleWidth =
      Math.min(x + itemToPlace.width, window.width) - Math.max(x, 0);
    const visibleHeight =
      Math.min(y + itemToPlace.height, window.height) - Math.max(y, 0);
    return Math.max(visibleWidth, 0) * Math.max(visibleHeight, 0);
  };
  const calculateCenteringScore = (x: number, y: number): number => {
    const centerX = x + itemToPlace.width / 2;
    const centerY = y + itemToPlace.height / 2;
    const centerScoreX = Math.abs(centerX - window.width / 2);
    const centerScoreY = Math.abs(centerY - window.height / 2);
    return -(centerScoreX + centerScoreY); // Negative to prefer lower scores
  };

  let bestPosition: PositionName = "bottom-center";
  let bestScore = -Infinity;
  for (const position in positions) {
    const pos = positions[position as PositionName];
    if (isInViewport({ ...itemToPlace, ...pos }, window)) {
      const visibleArea = calculateVisibleArea(pos.x, pos.y);
      const centeringScore = calculateCenteringScore(pos.x, pos.y);
      const combinedScore = visibleArea + centeringScore;

      if (combinedScore > bestScore) {
        bestScore = combinedScore;
        bestPosition = position as PositionName;
      }
    }
  }
  const final = {
    x: positions[bestPosition].x,
    y: positions[bestPosition].y,
    width: itemToPlace.width,
    height: itemToPlace.height,
    usedPosition: bestPosition,
  };

  if (!isInViewport(final, window)) {
    final.x = Math.max(0, Math.min(final.x, window.width - itemToPlace.width));
    final.y = Math.max(
      0,
      Math.min(final.y, window.height - itemToPlace.height)
    );

    if (!isInViewport(final, window)) {
      final.width = Math.min(itemToPlace.width, window.width - final.x);
      final.height = Math.min(itemToPlace.height, window.height - final.y);
    }
  }

  return final;
}

export function getArrowStyle({
  position,
  color,
  arrowSize = 10,
  arrowOffset = 8,
}: {
  position: PositionName;
  color: string;
  arrowSize: number;
  arrowOffset: number;
}): ViewStyle {
  const baseStyle: ViewStyle = {
    width: 0,
    height: 0,
    position: "absolute",
    borderStyle: "solid",
  };

  const borderStyles: {
    top: ViewStyle;
    bottom: ViewStyle;
    left: ViewStyle;
    right: ViewStyle;
  } = {
    top: {
      borderBottomColor: color,
      borderBottomWidth: arrowSize,
      borderLeftWidth: arrowSize,
      borderLeftColor: "transparent",
      borderRightWidth: arrowSize,
      borderRightColor: "transparent",
    },
    bottom: {
      borderTopColor: color,
      borderTopWidth: arrowSize,
      borderLeftWidth: arrowSize,
      borderLeftColor: "transparent",
      borderRightWidth: arrowSize,
      borderRightColor: "transparent",
    },
    left: {
      borderRightColor: color,
      borderRightWidth: arrowSize,
      borderTopWidth: arrowSize,
      borderTopColor: "transparent",
      borderBottomWidth: arrowSize,
      borderBottomColor: "transparent",
    },
    right: {
      borderLeftColor: color,
      borderLeftWidth: arrowSize,
      borderTopWidth: arrowSize,
      borderTopColor: "transparent",
      borderBottomWidth: arrowSize,
      borderBottomColor: "transparent",
    },
  };

  const offsetStyles: {
    top: ViewStyle;
    bottom: ViewStyle;
    left: ViewStyle;
    right: ViewStyle;
    centerHorizontal: ViewStyle;
    centerVertical: ViewStyle;
  } = {
    top: { bottom: -arrowSize + 1 },
    bottom: { top: -arrowSize + 1 },
    left: { right: -arrowSize + 1 },
    right: { left: -arrowSize + 1 },
    centerHorizontal: {
      left: "50%",
      transform: [{ translateX: -arrowSize }],
    },
    centerVertical: {
      top: "50%",
      transform: [{ translateY: -arrowSize }],
    },
  };

  return {
    ...baseStyle,
    ...match(position)
      .with("top-left", () => ({
        ...borderStyles.bottom,
        ...offsetStyles.top,
        left: arrowOffset,
      }))
      .with("top-center", () => ({
        ...borderStyles.bottom,
        ...offsetStyles.top,
        ...offsetStyles.centerHorizontal,
      }))
      .with("top-right", () => ({
        ...borderStyles.bottom,
        ...offsetStyles.top,
        right: arrowOffset,
      }))
      .with("bottom-left", () => ({
        ...borderStyles.top,
        ...offsetStyles.bottom,
        left: arrowOffset,
      }))
      .with("bottom-center", () => ({
        ...borderStyles.top,
        ...offsetStyles.bottom,
        ...offsetStyles.centerHorizontal,
      }))
      .with("bottom-right", () => ({
        ...borderStyles.top,
        ...offsetStyles.bottom,
        right: arrowOffset,
      }))
      .with("left-top", () => ({
        ...borderStyles.right,
        ...offsetStyles.left,
        top: arrowOffset,
      }))
      .with("left-center", () => ({
        ...borderStyles.right,
        ...offsetStyles.left,
        ...offsetStyles.centerVertical,
      }))
      .with("left-bottom", () => ({
        ...borderStyles.right,
        ...offsetStyles.left,
        bottom: arrowOffset,
      }))
      .with("right-top", () => ({
        ...borderStyles.left,
        ...offsetStyles.right,
        top: arrowOffset,
      }))
      .with("right-center", () => ({
        ...borderStyles.left,
        ...offsetStyles.right,
        ...offsetStyles.centerVertical,
      }))
      .with("right-bottom", () => ({
        ...borderStyles.left,
        ...offsetStyles.right,
        bottom: arrowOffset,
      }))
      .with("right-auto", () => ({
        ...borderStyles.left,
        ...offsetStyles.right,
        bottom: arrowOffset,
      }))
      .with("left-auto", () => ({
        ...borderStyles.right,
        ...offsetStyles.left,
        top: arrowOffset,
      }))
      .with("top-auto", () => ({
        ...borderStyles.bottom,
        ...offsetStyles.top,
        left: arrowOffset,
      }))
      .with("bottom-auto", () => ({
        ...borderStyles.top,
        ...offsetStyles.bottom,
        left: arrowOffset,
      }))
      .exhaustive(),
  };
}

export function isInViewport(
  item: ElementLayout,
  window: ElementDimensions
): boolean {
  return (
    item.x >= 0 &&
    item.y >= 0 &&
    item.x + item.width <= window.width &&
    item.y + item.height <= window.height
  );
}

export function isPartiallyInViewport(
  item: ElementLayout,
  window: ElementDimensions
): boolean {
  return (
    item.x < window.width &&
    item.y < window.height &&
    item.x + item.width > 0 &&
    item.y + item.height > 0
  );
}
