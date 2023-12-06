---
date: 2023-12-06
title: "Farewell ReScript"
tags:
  - rescript
  - typescript
---

Programming languages play a crucial role in shaping the development process of
software projects. As developers, we often find ourselves at crossroads, having
to make decisions about which language to use for a particular project. As a
front-end developer, the shift from [ReScript](https://rescript-lang.org/), a
language that instilled confidence with its unique features, to
[TypeScript](https://www.typescriptlang.org), a more widely adopted but arguably
less powerful language, was motivated by a delicate balance between individual
confidence and community support.

ReScript,
[formerly known as BuckleScript](https://rescript-lang.org/blog/bucklescript-is-rebranding),
is a statically-typed functional programming language that compiles to
JavaScript. Its type system is robust, providing developers with strong
guarantees about their code's correctness. The language's syntax, very similar
to modern JavaScript, is clean and expressive, making it a joy to work with.
Additionally, ReScript is equipped with powerful features like pattern matching
and algebraic data types, enabling developers to write concise and maintainable
code.

Using ReScript had instilled in me a sense of confidence in my codebases. The
strong type system caught many potential errors at compile-time, reducing the
likelihood of JavaScript runtime issues. This confidence translated into
increased productivity and at some point, faster development cycles. The ability
to express complex ideas in a concise and readable manner added to the appeal of
ReScript, making it a language that aligned with my programming philosophy.

## My problem with ReScript

However, the Achilles' heel of ReScript is its small and niche community. While
the community is passionate and supportive, the limited pool of developers meant
fewer bindings, resources, and third-party integrations. Troubleshooting issues
or finding solutions to specific problems often proved to be a challenging task.
At some point in time, the lack of a large user base also translated to slower
language evolution and fewer tools available for ReScript developers.

In contrast, TypeScript, a superset of JavaScript, has gained widespread
adoption in the industry. Its gradual typing system provides a middle ground
between the dynamically-typed nature of JavaScript and the statically-typed
assurance of languages like ReScript. TypeScript's popularity ensures a vast and
active community, resulting in a plethora of bindings, documentation, and
community-driven tools.

In front-end development, it has been choosen by many frameworks and libraries
as the default language. Even if React & React Native still rely on
[Flow](https://flow.org) (since it's widely used internally at Facebook/Meta),
some huge projects like [Next.js](https://nextjs.org/) and
[Jest](https://jestjs.io/) embraced it.

My decision to transition from ReScript to TypeScript was largely motivated by
the desire for a more robust user base. The TypeScript community is vast and
diverse, providing an extensive knowledge base and a wealth of resources. This
rich ecosystem facilitates easier problem-solving, so somehow, faster
development, and a smoother onboarding process for new team members, which is a
crucial factor when working in a team.

Choosing TypeScript also aligns with industry standards, as many large-scale
projects and organizations prefer or mandate its use. This widespread adoption
ensures compatibility with a variety of tools, frameworks, and services.
Integration with existing projects and collaboration with other developers
become more seamless, contributing to a smoother development experience.

In the journey from ReScript to TypeScript, my decision was not a dismissal of
ReScript's strengths but rather a calculated move to balance individual
confidence with a more expansive support system. This shift reflects the
practical considerations I faced when choosing tools for my projects. While
ReScript brought a sense of superheroic confidence, the broader community
support and industry alignment of TypeScript proved essential for navigating the
complex landscape of modern software development.

So as of today, when starting a project, I will prefer TypeScript over ReScript.
But I will still keep an eye on ReScript, and I hope to see it grow in the
future.

I love ReScript, and I'm grateful for the time I spent with it. I'm also
grateful for the community, which is one of the most welcoming and supportive
I've ever seen. I'm sure I'll come back to it in the future, but for now, I'm
saying goodbye to ReScript as my main language.
