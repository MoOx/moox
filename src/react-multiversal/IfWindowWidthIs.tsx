import { size, Size, WindowWidth } from "@/react-multiversal";
import { StyleSheet, View, ViewProps } from "react-native";

const cssKey = "IfWindowWidthIs";

const buildClass = (smallerThan?: Size, largerThan?: Size) => {
  const smaller = smallerThan ? `smaller-${smallerThan}` : "";
  const larger = largerThan ? `larger-${largerThan}` : "";
  return `${cssKey}-${smaller}-${larger}`.replace(/--/g, "-").replace(/-$/, "");
};

const buildCssRules = (smallerThan?: Size, largerThan?: Size) => {
  const rules: string[] = [];

  if (smallerThan && largerThan) {
    rules.push(
      `@media (max-width: ${size(smallerThan) - 1}px), (min-width: ${size(
        largerThan,
      )}px) {
        [data-window-width-filter="${buildClass(smallerThan, largerThan)}"] {
          display: none !important;
        }
      }`,
    );
  } else if (smallerThan) {
    rules.push(
      `@media (min-width: ${size(smallerThan)}px) {
        [data-window-width-filter="${buildClass(smallerThan)}"] {
          display: none !important;
        }
      }`,
    );
  } else if (largerThan) {
    rules.push(
      `@media (max-width: ${size(largerThan) - 1}px) {
        [data-window-width-filter="${buildClass(undefined, largerThan)}"] {
          display: none !important;
        }
      }`,
    );
  }

  return rules;
};
const generateAllCssRules = () => {
  const validWindowSizes = Object.entries(WindowWidth)
    .filter(([, value]) => typeof value === "number" && value !== Infinity)
    .map(([key, value]) => ({ key, value: value as number }));

  const rules: Set<string> = new Set();

  validWindowSizes.forEach(({ value: smallerThan }) => {
    buildCssRules(smallerThan, undefined).forEach((rule) => rules.add(rule));
  });

  validWindowSizes.forEach(({ value: largerThan }) => {
    buildCssRules(undefined, largerThan).forEach((rule) => rules.add(rule));
  });

  validWindowSizes.forEach(({ value: smallerThan }, idx) => {
    validWindowSizes.slice(idx + 1).forEach(({ value: largerThan }) => {
      buildCssRules(smallerThan, largerThan).forEach((rule) => rules.add(rule));
    });
  });

  return Array.from(rules);
};
export const cssRules = generateAllCssRules();

const styles = StyleSheet.create({
  ifWrapper: { display: "contents" },
});

export default function IfWindowWidthIs({
  smallerThan,
  largerThan,
  ...props
}: ViewProps & {
  smallerThan?: Size;
  largerThan?: Size;
}) {
  if (smallerThan && largerThan && smallerThan >= largerThan) {
    throw new Error(
      `[IfWindowWidthIs] Invalid props: "smallerThan" (${smallerThan}) must be smaller than "largerThan" (${largerThan}).`,
    );
  }

  const filterClass = buildClass(smallerThan, largerThan);

  return (
    <View
      {...props}
      style={[styles.ifWrapper, props.style]}
      dataSet={{ ...props.dataSet, windowWidthFilter: filterClass }}
    />
  );
}
