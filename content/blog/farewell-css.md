---
date: 2018-05-28
title: "Farewell CSS"
tags:
  - css
---

I've been fighting with CSS long enough in production now that I don’t enjoy
working with it anymore unfortunately, so at least for now this my formal
farewell! [\*](#https://medium.com/@tjholowaychuk/farewell-node-js-4ba9e7f3e52b)

CSS has been designed to style documents, not applications. And everyone that
have tried to use CSS at scale know how it requires too many restrictions and
rules to make it work. In short, it's painful and not really a pleasure.

CSS selectors are the main problem we have to face with CSS. It's like global
mutable variables. Because of how selectors works, it's very hard to know if
removing a piece of CSS is ok or not. There is still no way to write trustable
scoped CSS. So yeah, you can use BEM, CSS modules and other fancy tools &
methodologies, but at the end, those are just patch. Not solution for the
future.

Many have already talk & written about the limit of CSS for apps and the most
accurate reference to me is still one of the first (from 2014)
http://blog.vjeux.com/2014/javascript/react-css-in-js-nationjs.html

To refresh your memory, here is the list of problem that you encounter when
working is CSS on apps

* No local variables.
* Implicit dependencies.
* No dead code elimination.
* No code minification.
* No sharing of constants.
* Non-deterministic resolution.
* No isolation.

The way CSS is currently evolving won't fix anything.

## CSS-in-JS, until we got something better

Meanwhile, CSS-in-JS is becoming clearly more and more popular as it can help to
avoid all those problems and also has some benefits

* Generates the minimum required CSS.
* Offers good runtime performance.
* Supports static and dynamic styles.
* Helps to pre-rendering critical CSS.

At the end, at least for now on the web, we still use CSS, but as a primitive
(like React is using the DOM).

But when relying on a nice abstraction, you can write code similar to CSS
(without selectors) that will works in other places, thanks to
[Yoga](http://yogalayout.com). Yoga is the solution used in
[React-Native](http://facebook.github.io/react-native/) and some others engines.
Yoga is just an example and you can probably find other alternatives like
[flex](https://github.com/jordwalke/flex) (a Yoga reimplementation in
[Reason](https://reasonml.github.io/)).

In addition to previous benefits, using this kind of solution also adds

* Simple API and expressive subset of CSS.
* Support for RTL layouts.
* Easy pre-rendering of critical CSS (if your target compilation is the web)
* Statically type-checked styles.

## “But you don't know how to use CSS”

For those that are going to said something like

> But if you are a smart, you will use the cascade to your advantage

Before saying anything like this, be sure that:

* you didn't shipped one-shot projects only without having to maintain those on
  the long run
* you actually had more than 1000 CSS selectors in production for a single
  project

Using CSS for small project is probably ok, but it's not for large websites &
apps. Please watch and read about the motivations of CSS-in-JS until we are
convinced. And if you are not... 🙃

## Deprecating cssnext

For this reasons, I will only use CSS when I will use HTML directly, so that
means 2 times per year when I do a real quick landing pages.

I really believe that CSS will become a low level primitive, a target for
compilation, and nothing more in a near future. And for a far future, it may
even become obsolete and not used.

This is why I am [deprecating cssnext](../deprecating-cssnext/) as of today.
