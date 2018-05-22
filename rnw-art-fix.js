// https://github.com/necolas/react-native-web/issues/737
if (typeof document === "undefined") {
  global.document = {
    createElement: () => null,
    querySelector: () => null
  };
}
