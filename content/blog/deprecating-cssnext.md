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
anymore. And this has been this way for years now. I also have been tired of
PostCSS for a while now because of the lack of coherence and vision (please
PostCSS maintainers, don't take this personally).

Between weird breaking changes that required me to update around 20 plugins
without telling me first (I was at this time probably the more active
contributors around the tool itself - in number of plugins), some breaking
changes in minor releases that broke every CI in the world and the lack of
vision for the tool, I became bored. Another example: PostCSS
[still does not have a simple way to have a shared config](https://github.com/postcss/postcss/issues/477).
And don't reply to me
["it will be"](https://github.com/postcss/postcss/issues/1147) as this issue has
been opened this month, while mine has been for 3 years. 3 years is a long time
in web development right?

## Why didn't you give the project to someone else?

I tried. I added 3 of the most active contributors in cssnext/PostCSS ecosystem,
but nobody never really contributed to cssnext (I don't want to offense those
people but contributions were not enough to move forward with this project).

I also tried to ask for help via Twitter, but no response. Then someone made
[a fork (kind of)](http://preset-env.cssdb.org/) and it's probably better
already than cssnext ever was. If you still want to use CSS, you should take a
look at it.

## Why don't you just let this thing rot?

That's not my type. I tried to maintain the package for a while, as the number
of download prove that people are actually using it. But now that an solid
alternative is around ([`postcss-preset-env`](http://preset-env.cssdb.org/)), I
think it's time to deprecate cssnext.
