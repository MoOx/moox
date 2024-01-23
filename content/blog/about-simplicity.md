---
date: 2024-01-23
title: About simplicity
---

<small>[🇫🇷 Version de cette article en français](/blog/parlons-simplicite/)</small>

Today, I feel like talking to you simply... about simplicity. It's a concept
that is dear to my heart and often misunderstood. Without further ado, I'll
share with you a quote as simple as it is profound:

> "Simplicity is the ultimate sophistication." - Leonardo da Vinci

Simple doesn't mean easy. Far from it. Look at our smartphones: they are simple
to use, but their design is increasingly complex. Simplicity requires practice,
technique, and patience. We have hardware, software, and everything must work
seamlessly together. It's a meticulous job, and that's what makes the achieved
simplicity so beautiful.

Our smartphones and the apps on them are often intuitive. No need for a manual.
Some, more than others, reach a level of simplicity that makes them almost
magical. Apple, for example, through its mastery of software coupled with
hardware, manages to offer an unparalleled experience. In terms of user
experience, today no brand can boast of offering features as simple and
intuitive as AirDrop (though technically imperfect), Handoff, or iMessage with
continuity between connected devices. Sharing an experience between different
devices is easily done, and today, no one else offers this level of refinement.

When it comes to development, the same struggle with two main components: the
code and its result. We all know that for a given result, there can be a
thousand possible implementations.

So, how should one go about achieving a result that is both simple for users to
use and functional, but also simple for developers to understand and, most
importantly, easy to maintain?

## Starting simple doesn't mean being simple-minded

We all know that when starting a new project, there's a tendency to dream big
and go for complex features... that might never see the light of day. We rush to
the latest libraries without questioning their actual efficiency for our needs.
So, wait a minute before projecting yourself into the stratosphere and keep your
feet on the ground. Start simple. But beware, simple doesn't mean being
simple-minded. It means creating a solid foundation, like the foundations of a
house in good condition. Don't worry about the finishing touches, just focus on
a good base.

For example, choosing
[React Native (and/or React Native for Web) for your mobile and/or web project is a safe and solid foundation](/blog/why-you-should-use-react-native-for-web/).
I'm not talking about choosing THE super CSS-in-JS solution or picking the
solution for your internal store, but about choosing a good foundation. The
simplicity equation can be quite delicate. So, it's more about finding the right
balance between simplicity and functionality. Don't complicate things, but don't
be timid either.

## KISS?

You've probably heard of KISS, which stands for "Keep It Simple, Stupid." I see
the "Stupid" part more as a naive aspect. Be naive and kind with your code and
with yourselves. Simplicity is a way of expressing love for our future selves
who will have to maintain this code. If you can implement a part in a 500-line
file, why insist on separating things into 10 files of 50 lines each? What does
it bring immediately? Don't think about reusability before it really makes
sense. Overengineering is a bit like putting Formula 1 wheels on a bicycle. It
can work, but is it really relevant?

Don't overload your project from the start. Wait until it really makes sense and
your code sends you clear signals saying, "Hey, I really need this piece of code
to be redesigned NOW!" And not before.

One of the things I find absurd on many front-end projects, for example, is unit
testing. Writing unit tests for React components doesn't guarantee that your
application works. It guarantees that your components work according to the
tests you've specified. Through your perspective and biases. Whereas setting up
functional tests, which perform real actions on your application, will guarantee
that your application works with a much more interesting degree of certainty.
And that's much more important than knowing if your component is "rendered" with
the right props. And rendering, what is it? Does testing CSS props really tells
you if your button is clickable in practice? Rarely will you have as high a
degree of certainty as with a functional test. Having a program that performs
user actions, clicks, scrolls, inputs, and checks that the result is as expected
is much more powerful and relevant. And it's often much simpler to write than a
unit test.

This post was was just a little thing to make you think about your relationship
with your code and your architecture. Don't complicate things before you have a
real need.

Have a minimalist approach. Don't do anything that isn't useful in the moment.

Hugs.
