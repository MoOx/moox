---
date: 2018-05-23
title: How I write React stateless functional components
tags:
  - react
  - javascript
---

This article have been inspired by this spectrum thread
[How do you write your functional components?](https://spectrum.chat/thread/91f98b74-a6b0-44ea-807f-372695da6926)
and the
[following twitter thread](https://twitter.com/mxstbr/status/996653187481460736).

**This post is certainly a personal preference** and clearly, it doesn’t really
matter at the end of the day and won’t affect runtime performance. However let
me tell you how I like to write my stateless components and why (because that’s
the interesting part).

## tl;dr

```js
const Name = props => {
  return <View style={props.style}>{props.children}></View>;
};
```

**Note about code formatting**: I don’t want to think about it ever again. If
you do write JavaScript, stop bikeshedding and just use
[prettier](http://prettier.io)!

Back to the component. Why this style?

Let’s compare to alternatives.

## `function`

```js
function Name(props) {
  return <View style={props.style}>{props.children}></View>;
}
```

Here no big changes, we use a named function instead of arrow function, that’s
ok too. First win is that you can directly export the function

```js
export default function Name() {}
```

In comparison, for arrow function, you have to do

```js
const Name = () => {};

export default Name;
```

But this argument is not relevant if you don’t export the component. And
sometimes you don’t (or not as the default), unless you have to reuse it.

Some people say relying on function name inference is not good, because of the
environment may not support it or that it’s harder to grep & sha blah blah. I
don’t care about those arguments as we mostly still use babel this days (or at
least one transpiler/optimizer) that will handle this for us. This things are
covered. We should not have to think about this kind of problem when we use
modern syntax. Otherwise we should not even use class or arrow function in the
first place, right?

Anyway, I rarely use `function` this days, because it’s long. You can laugh.

_Long you said?_

```js
function Name() {}
// vs
const Name = () => {};
```

Yeah laugh again. It's good for your health, you are welcome.

Real thing is: I don't like to use `this.` and when we use arrow function we are
sure that `this` won't be a thing (at least nothing tied to the function body.

You can see a second win for the `function`: hoisting can be helpful if you have
write many components in one file and want to define them in top-to-bottom
order. But I don’t never had the need to rely on hoisting so it doesn’t matter
for me.

Now let’s have a look to destructuring.

## Destructured `props`

```js
const Name = ({ style, children }) => {
  return <View style={style}>{children}></View>;
};
```

This problem is basically not related to React component but more _“how do you
define your arguments in functions”_. I will stick to React but this argument
can be applied to regular JavaScript functions.

It’s acceptable when you have 2 or 3 arguments, but quickly can become annoying
if you have 6 or 8.

```js
const Name = ({
  style,
  defaultValue,
  children,
  another,
  andAnother,
  andAnotherMore,
  andAnotherChild
}) => {
  const computedValue = defaultValue * 10 - 2;
  return (
    <View style={style} another={another} andAnother={andAnother}>
      {children}
      {andAnotherMore && <View>{andAnotherChild}</View>}
    </View>
  );
};
```

In comparison, if you use `props` argument (could be `args` or `options`)

```js
const Name = props => {
  const computedValue = props.defaultValue * 10 - 2;
  return (
    <View
      style={props.style}
      another={props.another}
      andAnother={props.andAnother}
      computedValue={computedValue}
    >
      {props.children}
      {props.andAnotherMore && <View>{props.andAnotherChild}</View>}
    </View>
  );
};
```

You end up with less lines. Some find the destructured syntax noizy. `props`
always have the same length and make it clear that your value comes as the
component input. That’s why I prefer to stay consistent and use `props` all the
time.

Some people will say that using destructuring helps to see the accepted props.
That’s true if you don’t use propTypes or flow annotations. I personally
recommend flow (...if you have to do JavaScript - hello
[Reason](https://reasonml.github.io/)) so my components might look like this:

```js
type props = {|
  style: any,
  children: React.Node
|};

const Name = (props: props) => {
  return <View style={props.style}>{props.children}></View>;
};
```

Here you see upfront the accepted arguments, **and their types**. Way better in
my opinion.

And if you avoid defining your type before, and inline it... And add to that
destructuring... Well, hello repetition.

```js
const Name = ({ style, children }: {| style: any, children: React.Node |}) => {
  return <View style={style}>{children}></View>;
};
```

Now classes.

## `Classes`

I know, if you think `classes`, you think "stateful". But that's not an
obligation.

```js
class Name extends React.Component {
  render() {
    return <View style={this.props.style}>{this.props.children}</div>;
  }
}
```

That's ok too. A bit verbose, but extensible. That said, I am always trying to
avoid using `this` in JavaScript just because I like functional things.

Well, you could do

```js
class Name extends React.Component {
  render() {
    const { props } = this
    return <View style={props.style}>{props.children}</div>;
  }
}
```

But now it’s starting to be a bit more verbose compared to the initial example.
That’s why I prefer to use functions whenever I can. That’s why they have been
accepted as React components by the way.

Some people might think that classes (especially `PureComponent`) are better
since React can optimise more easily this component lifecycle. But if that’s the
case, we could probably imagine a babel transformation that does it for us,
right?

Now let’s take a look to the minimal example without any return statement.

## No `return`

```js
const Name = props => <View style={props.style}>{props.children}></View>;
```

Yeah that’s definitely shorter. Sometime I do that, but as soon as I have to
compute something, or add a condition, I switch to explicit return statement.
Because when you want to add computations, breakpoints, logs etc, you can’t do
that easily without return statement. You can’t inject a computation (except
inline maybe - but I am not a one liner guy anymore). It can become annoying to
have to edit the component wrapper to add the return statement. That’s why I
prefer to always have it. For consitency.

I don’t really want to talk about this unnamed version

```js
export default props => <View style={props.style}>{props.children}></View>;
```

Clearly fun and concise, but not good for actual debugging for the same reasons
as the previous example.

That’s why I like to end up with something like this:

```js
const Name = props => {
  return <View style={props.style}>{props.children}></View>;
};
```

But again, _it doesn’t really matter_. If you are not consistent in your
codebase about this _it’s totally fine_.

And never forget to _never put all your eggs in the same basket._
