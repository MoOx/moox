export function ReactNativeForWebNextLayoutRequirementsforStaticExport() {
  /*
  react-native-web
  Normally requires something like this
  
  const appName = "App";
  AppRegistry.registerComponent(appName, () => App);
  const { getStyleElement } = AppRegistry.getApplication(appName);
  
  then
  
  {getStyleElement()}
  or 
  useServerInsertedHTML(() => getStyleElement())
  
  But in practise, this create issue for static export
  This way to integrate RNW stylesheet can create rendering mismatches when you don't use SSR.
  And also issue for dynamic styles as the RNW stylesheet is not correctly introduced before 
  
  RNW will create a stylesheet if it doesn't exist.
  Instead of using the StyleSheet API that create an element,
  we just put this style tag so RNW will use it.
  */
  return <style key="react-native-stylesheet" id="react-native-stylesheet" />;
}
