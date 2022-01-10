open Belt
open ReactNative

let defaultIsActive = (href: string, router: Next.Router.router) =>
  router.asPath === href || router.asPath ++ "/" === href

@react.component
let make = (
  ~accessibilityLabel: option<string>=?,
  ~activeStyle: option<ReactNative.Style.t>=?,
  ~children: React.element,
  ~href: string,
  ~isActive: (string, Next.Router.router) => bool=defaultIsActive,
  ~numberOfLines: option<int>=?,
  ~style as styl: option<ReactNative.Style.t>=?,
  ~onPress: option<ReactNative.Event.pressEvent => unit>=?,
) => {
  let router = Next.Router.useRouter()
  let accessibilityRole = #link
  let style = Style.arrayOption([styl, isActive(href, router) ? activeStyle : None])
  href->Js.String2.startsWith("/")
    ? <Next.Link href={href}>
        <Text href ?accessibilityLabel accessibilityRole ?numberOfLines style ?onPress>
          {children}
        </Text>
      </Next.Link>
    : <Text
        href
        ?accessibilityLabel
        accessibilityRole
        ?numberOfLines
        style
        onPress={_ => {
          onPress->Option.map(onPress => onPress(_))->ignore
          Linking.openURL(href)->ignore
        }}>
        {children}
      </Text>
}
