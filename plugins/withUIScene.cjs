// UIScene life cycle adoption for the prebuilt iOS project.
//
// Xcode 27 (iOS 27 SDK) turns what iOS 26 only logged as a runtime issue into a
// launch-time assert: an app whose Info.plist has no `UIApplicationSceneManifest`
// dies with "UIScene life cycle is required for apps built with this SDK" before
// `application(_:didFinishLaunchingWithOptions:)` ever runs. Neither React
// Native 0.86 nor Expo 57 emits a scene delegate yet (expo/expo#46664, still
// open and tagged upstream), so this plugin adds the two missing pieces: the
// manifest, and the `SceneDelegate` it names.
//
// It is a plugin rather than a hand edit under `ios/` because `expo prebuild`
// regenerates both files from its template and would drop the patch.
//
// CommonJS, and `.cjs` rather than `.js`, because the repo is
// `"type": "module"`. TypeScript is not an option here even though the plugin
// resolver accepts `.ts`: config plugins and `app.config.*` are loaded through
// `@expo/require-utils`, which strips types with `mode: "transform"`, and Node
// 26 removed that mode. `metro.config.ts` and `babel.config.ts` are fine, they
// go through Node's own loader.
const { withAppDelegate, withInfoPlist } = require("expo/config-plugins");

// Appended to `AppDelegate.swift` rather than added as its own file: the
// generated `project.pbxproj` lists sources explicitly (no synchronized file
// group), so a new file would also need a build phase entry, which is far more
// fragile to patch than appending a class to a file already compiled.
const SCENE_DELEGATE = `
#if os(iOS) || os(tvOS)
// Scene life cycle, required by the iOS 27 SDK. See plugins/withUIScene.cjs.
//
// This deliberately does not create the window. \`AppDelegate\` still does, in
// \`didFinishLaunchingWithOptions\`, which UIKit calls before the first scene
// connects, and React Native reads it back from there
// (\`RCTDeviceInfo.interfaceOrientationDidChange\` -> \`application.delegate.window\`)
// and crashes when it is nil (react-native#53602). So the scene adopts the
// window the app delegate already owns instead of owning one itself.
class SceneDelegate: UIResponder, UIWindowSceneDelegate {
  var window: UIWindow?

  func scene(
    _ scene: UIScene,
    willConnectTo session: UISceneSession,
    options connectionOptions: UIScene.ConnectionOptions
  ) {
    guard let windowScene = scene as? UIWindowScene else { return }

    window = (UIApplication.shared.delegate as? AppDelegate)?.window
    window?.windowScene = windowScene
    window?.makeKeyAndVisible()

    // A cold start through a deep link is delivered here, not to
    // \`application(_:open:options:)\`, and expo-dev-client loads a bundle that
    // way (\`moox://expo-development-client/?url=…\`).
    connectionOptions.urlContexts.forEach { forwardOpenURL($0) }
    connectionOptions.userActivities.forEach { forwardUserActivity($0) }
  }

  func scene(_ scene: UIScene, openURLContexts URLContexts: Set<UIOpenURLContext>) {
    URLContexts.forEach { forwardOpenURL($0) }
  }

  func scene(_ scene: UIScene, continue userActivity: NSUserActivity) {
    forwardUserActivity(userActivity)
  }

  // Both hand back to the app delegate, so the linking code stays in one place
  // and keeps working the way every Expo module expects.
  private func forwardOpenURL(_ context: UIOpenURLContext) {
    let application = UIApplication.shared
    var options: [UIApplication.OpenURLOptionsKey: Any] = [
      .openInPlace: context.options.openInPlace
    ]
    options[.sourceApplication] = context.options.sourceApplication
    options[.annotation] = context.options.annotation
    _ = application.delegate?.application?(application, open: context.url, options: options)
  }

  private func forwardUserActivity(_ userActivity: NSUserActivity) {
    let application = UIApplication.shared
    _ = application.delegate?.application?(
      application,
      continue: userActivity,
      restorationHandler: { _ in }
    )
  }
}
#endif
`;

const withSceneDelegate = (config) =>
  withAppDelegate(config, (config) => {
    if (config.modResults.language !== "swift") {
      throw new Error(
        `withUIScene expects a Swift AppDelegate, got "${config.modResults.language}"`,
      );
    }
    // Idempotent: prebuild runs the mods again over a file that may already
    // carry them.
    if (!config.modResults.contents.includes("class SceneDelegate")) {
      config.modResults.contents = `${config.modResults.contents.trimEnd()}\n${SCENE_DELEGATE}`;
    }
    return config;
  });

const withSceneManifest = (config) =>
  withInfoPlist(config, (config) => {
    config.modResults.UIApplicationSceneManifest = {
      UIApplicationSupportsMultipleScenes: false,
      UISceneConfigurations: {
        UIWindowSceneSessionRoleApplication: [
          {
            UISceneConfigurationName: "Default Configuration",
            // Xcode expands the build setting; the target's module is `MoOx`.
            UISceneDelegateClassName: "$(PRODUCT_MODULE_NAME).SceneDelegate",
          },
        ],
      },
    };
    return config;
  });

module.exports = (config) => withSceneManifest(withSceneDelegate(config));
