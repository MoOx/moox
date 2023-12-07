---
date: 2023-12-07
title: "Why you should use React Native for your Web apps"
tags:
  - react
  - react-native
---

[_React Native for Web_](https://necolas.github.io/react-native-web/), a web
clone of the widely embraced [React Native](https://reactnative.dev) framework,
is really something you should consider when doing a front-end not just for its
prowess in cross-platform applications but as a standalone solution for web
development.

_React Native for Web_, when if was originally created, was not supposed to be a
clone of _React Native_. It was just supposed to bring a web SDK, inspired by
_React Native_ yes, but not a clone. At this time, it was called
[React Web SDK](https://github.com/necolas/react-native-web/commit/e34820c11c82417f673103c2d67ecd19e26f0193).
The motivation probably lies into the fact that React itself, was a framework
focused on the web but heavily relying on the DOM. Thus the name React DOM that
we know this days. React is a low level library, and React DOM is the glue
between React and the DOM. Like _React Native_ is the glue between React and the
native platforms. React DOM is just an implementation of the React reconciler
for the DOM. There are other implementations like
[React Native for Windows and macOS](https://microsoft.github.io/react-native-windows/)
or even [@react-three/xr](https://github.com/pmndrs/react-xr) for VR content.

So back in time, _React Native for Web_ creator,
[@necolas](https://github.com/necolas), probably just aimed to offer a simple
set of primitives to build web applications, not explicitely tied to the DOM,
like _React Native_ offers for iOS and Android. Simple things like `<View />`,
`<Text />`, `<Image />`, `<ScrollView />`, `<Touchable />` and so on. But as the
project grew, it became more and more a clone of _React Native_, with the same
API, the same components, the same behavior, the same everything. And this is a
good thing, because it means that you can use _React Native for Web_ as a
standalone solution for web development, not just as a companion for
cross-platform applications.

Necolas was at the time of the creation of this project working at
[~~Twitter~~ X](https://twitter.com/) and was working on new implementation web
implementation. And the result of his work was
[amazing](https://twitter.com/necolas/status/1058949372837122048). The
enhancement of the CSS itself could have justified _React Native for Web_.

Front-end developers all knows that consistency in styling is a perennial
challenge in web development. _React Native for Web_ offers a reliable styling
solution. By relying on the CSS subset _React Native_ offers (mainly Flexbox),
developers can maintain consistent styles across browsers on all platforms. This
consistency not only streamlines the development process but also ensures that
the visual identity of the application remains cohesive, even if a mobile app is
not in the immediate development pipeline. But _React Native for Web_ was not
just about CSS, as there were already many CSS-in-JS solutions available. It was
about the whole web platform. And the result is a framework that could be used
to build accessible web applications.

### _React Native for Web_ accessibility

One standout feature of _React Native for Web_ is its commitment to
[accessibility](https://necolas.github.io/react-native-web/docs/accessibility/).
HTML itself provides a lot of accessibility features, but it's not always easy
to use them. _React Native for Web_, on the other hand, makes it easy to build
accessible web applications. By exposing these accessibility features with
simple React props like _React Native_ does (even if there are differences, that
might end up in _React Native_ itself someday), developers can ensure that web
applications built with _React Native for Web_ are inclusive and adhere to web
accessibility standards. This is particularly crucial for projects that
prioritize accessibility or need to comply with industry regulations. But when
we talk about the web plateform, we are not just talking about desktop. Mobile
is a huge part of the web now.

_React Native for Web_ brings the hallmark of _React Native_ - high-quality,
native-like user interactions - to the web. The framework's ability to easily
handle gestures, animations, and transitions, honed in the mobile realm,
translates seamlessly to web applications. This results in a web experience that
almost mirrors the smooth and responsive interactions users have come to expect
from native mobile applications. When using _React Native for Web_, a new world
of possibilities opens up. You can now use libraries like
[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
and
[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
which opens the door to a whole new world of possibilities. You can now build
web applications with the same level of interactions as native applications by
simply using things like
[React Native Bottom Sheet](https://github.com/gorhom/react-native-bottom-sheet).
That's just an example but you can easily do so much more with these kind of
libraries.

### _React Native for Web_ doesn't restrict you

One of the key strengths of _React Native for Web_ is its compatibility with
React DOM, allowing for incremental adoption. Developers can gradually introduce
_React Native for Web_ components into an existing React application,
selectively replacing parts of the UI. This incremental approach facilitates a
smooth transition, enabling teams to integrate _React Native for Web_ into their
projects without the need for a full-scale rewrite. And on the other hand, if
you directly start a project using _React Native for Web_, you are not stuck
with _React Native_ API. At any moment, you can just decide in some components
to use React DOM API and use the whole web platform without any kind of
limitation. You can use `<div>`, `<canvas>` or anything you want to. No
restrictions ! And it's very easy to do so. You can rely on the
[Platform](https://reactnative.dev/docs/platform) or directly create a specific
web file, using `.web.js` extension.

Wait what ? What did I just mention ? A web implementation for a given component
?

### _React Native for Web_ keep the door open to Mobile Platforms

Even if the immediate plan does not include the development of an iOS or Android
app, **using _React Native for Web_ can keep a door open to these platforms
while the opposite isn't true**. If you start a web app using React DOM
directly, you won't easily be able to share your codebase with other platforms
since you will be restricted to the DOM. The shared codebase and components
between _React Native for Web_ and _React Native_ for mobile make it easier to
extend the application to mobile platforms in the future. This strategic choice
allows for flexibility in future development plans without the need for a
complete overhaul of the existing web application. You could even use your
codebase for Windows or macOS applications using
[React Native for Windows and macOS](https://microsoft.github.io/react-native-windows/),
a project maintained by Microsoft, used on
[huge products like Office or the Windows Xbox app](https://microsoft.github.io/react-native-windows/resources-showcase).
Yes Microsoft Office and Xbox use _React Native_ API ! That's something isn't it
?

But keep in mind that _React Native for Web_ is not just here as a capable
companion for cross-platform development but mainly as a standalone powerhouse
for web applications. With its commitment to accessibility, native-like
interactions, styling consistency, and seamless incremental adoption, _React
Native for Web_ offers a versatile and robust solution. Moreover, by keeping the
door open to future mobile platforms, developers can make strategic choices that
allow for flexibility and scalability, making _React Native for Web_ a key
player in the dynamic landscape of web development.

And it might becomes something even more serious in the future. Necolas is
working at [Meta](https://www.meta.com) for a while now and made a lot of
contributions to React itself to ensure a bright future for cross-platform
codebase. If you are curious, you can take a look at its latest
[RFC: React DOM for Native](https://github.com/react-native-community/discussions-and-proposals/pull/496)
or even the [StyleX project](https://stylexjs.com/blog/introducing-stylex) that
[will end up in _React Native_ and _React Native for Web_](https://www.threads.net/@nicolas.img/post/C0fxzFuL4gp).

So next time you start a web app, consider using _React Native for Web_ instead
of React DOM directly. You won't regret it. I never did for the past years I
have been using it.
