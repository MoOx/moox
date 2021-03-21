open ReactNative

let defaultIsActive = (href: string, router: Next.router) =>
  router.pathname === href || router.pathname ++ "/" === href

@react.component
let make = (
  ~accessibilityLabel: option<string>=?,
  ~activeStyle: option<ReactNative.Style.t>=?,
  ~children: React.element,
  ~href: string,
  ~isActive: (string, Next.router) => bool=defaultIsActive,
  ~numberOfLines: option<int>=?,
  ~style as styl: option<ReactNative.Style.t>=?,
) => {
  let router = Next.useRouter()
  let accessibilityRole = #link
  let style = Style.arrayOption([styl, isActive(href, router) ? activeStyle : None])
  href->Js.String2.startsWith("/")
    ? <Next.Link href={href}>
        <Text ?accessibilityLabel accessibilityRole ?numberOfLines style> {children} </Text>
      </Next.Link>
    : <Text
        ?accessibilityLabel
        accessibilityRole
        ?numberOfLines
        style
        onPress={_ => Linking.openURL(href)->ignore}>
        {children}
      </Text>
}
