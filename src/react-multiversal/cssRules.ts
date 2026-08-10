/**
 * The CSS rules this design system writes by hand - the `IfWindowWidthIs` media
 * queries and `responsiveStyle`'s variants - as opposed to the atomic classes
 * react-native-web compiles for us.
 *
 * Collected as an import-time side effect, so everything a bundle contains is
 * registered before anything renders, and written into one <style> by
 * `__root.tsx`.
 */
export const cssRulesStyleId = "react-multiversal--css-rules";

const rules = new Set<string>();

export const insertCssRule = (rule: string) => rules.add(rule);

export const cssRulesTextContent = () => [...rules].join("\n");
