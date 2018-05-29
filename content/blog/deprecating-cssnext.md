---
date: 2018-05-29
title: "Deprecating cssnext"
tags:
  - css
---

Following my [farewell to CSS](../farewell-css/), I am deprecating
[cssnext](http://cssnext.io).

## tl;dr

Just switch to [`postcss-preset-env`](http://preset-env.cssdb.org/).

## Why are you doing this?

Like I said in my [farewell to CSS](../farewell-css/) post, I don't use CSS
directly anymore. And things have been this way for years now. I also have been
tired of PostCSS (because I disagree with the vision and the directions taken by
the project).

Beside the fact that I were not using CSS directly anymore, too many PostCSS
releases meant that I had to update most of the PostCSS plugins underneath
cssnext in order to adapt to the new or changed APIs. This was a very time
consuming process. At the time being one of the most active PostCSS
contributors, I wasn’t always warned about these API changes. This eventually
motivated me to just stop contributing to this ecosystem, even if I created the
PostCSS GitHub organization in the first place.

## Why didn't you give the project to someone else?

I tried. I gave 3 of the most active contributors in the cssnext/PostCSS
ecosystem rights over the repo, but given everyone’s time and priorities, it
wasn’t enough to ensure the project would be sufficiently maintained.

I also tried to ask for help via Twitter, but no response.

Then on active member of PostCSS organization made
[a fork (kind of)](http://preset-env.cssdb.org/) and it's probably better
already than cssnext ever was. If you still want to use CSS, you should take a
look at it.

## Why don't you just let this thing rot?

That's not my type. I tried to maintain the package for a while, as the number
of downloads prove that people are actually using it. But now that a solid
alternative is around ([`postcss-preset-env`](http://preset-env.cssdb.org/)), I
think it's time to deprecate cssnext.

## Migration to `postcss-preset-env`

Migration should be pretty easy.

In short, just replace `postcss-cssnext` with `postcss-preset-env` and
[choose your stage](https://github.com/csstools/postcss-preset-env#stage).

If you want a sort of changelog, here is what you can expect

### Removed

* pixrem (generates pixel fallbacks for rem units)
* postcss-calc (reduces calc, not really a polyfill)
* postcss-color-function (color() is now color-mod())
* postcss-color-rgba-fallback (IE8 fallback for alpha colors)
* postcss-pseudoelements (IE8 fallback for : => :: pseudos)

### Added

* postcss-color-mod-function (color() is now color-mod())
* postcss-dir-pseudo-class (:dir(ltr) and :dir(rtl) directional selectors)
* postcss-focus-visible (requires WICG focus-visible js polyfill)
* postcss-focus-within (requires focus-within js polyfill)
* postcss-logical (new margin-block, inset, etc. directional properties)
* postcss-page-break (fallback break-_ properties with page-break-_ alias)

#### Available but inactive by default (Stage 3+ is active by default):

* postcss-color-rgb (Stage 2)
* postcss-custom-media (Stage 2)
* postcss-custom-selectors (Stage 2)
* postcss-nesting (Stage 1)
* postcss-apply (Rejected as a standard)

---

Hope this way you don't feel abandonned. This is better for you to upgrade and
rely on a more mature database, with stages, or like me,
[stop using CSS directly](../farewell-css/).
