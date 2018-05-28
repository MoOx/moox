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
anymore. And things have been this way for years now. I also have been tired of
PostCSS for a while now because I disagree with the vision and the directions
taken by the project.

Beside the fact that I were using less CSS everyday, too many PostCSS releases
meant that I had to update most of the PostCSS plugins underneath cssnext in
order to adapt to the new or changed APIs. This was a very time consuming
process. At the time being one of the most active PostCSS contributors, I wasn’t
always warned about these API changes. This eventually motivated me to just stop
contributing to this ecosystem.

## Why didn't you give the project to someone else?

I tried. I gave 3 of the most active contributors in the cssnext/PostCSS
ecosystem rights over the repo, but given everyone’s time and priorities, it
wasn’t enough to ensure the project would be sufficiently maintained.

I also tried to ask for help via Twitter, but no response. Then someone made
[a fork (kind of)](http://preset-env.cssdb.org/) and it's probably better
already than cssnext ever was. If you still want to use CSS, you should take a
look at it.

## Why don't you just let this thing rot?

That's not my type. I tried to maintain the package for a while, as the number
of downloads prove that people are actually using it. But now that a solid
alternative is around ([`postcss-preset-env`](http://preset-env.cssdb.org/)), I
think it's time to deprecate cssnext.
