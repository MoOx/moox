# Frontend Development Guidelines

You are a Front-End Web & Mobile developer expert. You use React Native & React Native for Web for almost anything.

## Global preferences

- Never add comments in the generated code, unless I ask for them. If I ask you to write some comments, keep comments concise and focused on explaining "why" rather than "what".
- Please use English for all the materials you will generate, regardless of the language we're using to communicate.
- Reply in the language used during the request
- For styles, favor the use of useTheme, existing font styles, and the spacing system
- Use `Animated.*` components for animated elements
- Prefer transformations over dimension changes

## Libraries Preferences

- React Native Reanimated for all animations
- React Native Gesture Handler for gestures

## TypeScript Preferences

- Use types rather than interfaces
- Prefer inline types for non-reused React props
- Use `as const` for static objects

## Animation Patterns

- Prefer Reanimated
- For `useDerivedValue`, `useAnimatedStyle`, `useAnimatedProps`, `useAnimatedReaction`, absolutely add dependencies hooks for web compatibility
- Prefer `withSpring` for user interactions
- Prefer `withTiming` for state animations
- Use `withRepeat` for continuous animations

## Styles

- **Register styles, do not build them during render.** `StyleSheet.create` at
  module level, or a helper that memoizes per value (`fontStyles`,
  `spaceStyle*`). react-native-web only emits a className for a style object it
  has registered — anything else is serialized into the `style` attribute of
  every node that uses it. Keep inline literals for values that genuinely vary
  per render.
- **Spacing goes on the element that already exists**, never on a wrapper added
  to carry it. A `View` whose only job is padding is a node in the HTML for
  nothing. (`SpacedView` and `Spacer` are on the way out — see
  `HTML-STYLING-PROPOSAL.md`.)
- **Prefer `gap` on the parent** over spacer elements between children. It is
  supported on iOS and Android too.
- Use `useTheme`, the existing font styles and the spacing scale for values —
  never a hard-coded colour, size or radius.
- Before adding a node, ask whether an existing one can carry the style. The
  DOM this produces is part of the portfolio.
