---
title: "Why we scope before we quote"
metaTitle: "Scope before we quote: why software quotes need discovery"
description: "Why we scope before we quote: a software quote is an answer, and discovery is where someone finally writes down the question. Here is how it works."
keyword: "scope before we quote"
keywords:
  - discovery phase in software development
  - software project scoping
  - software development quote
  - software project estimate
  - why software projects run late
category: "Product"
date: 2026-09-29
services:
  - custom-software
  - web-applications
  - mobile-apps
faqs:
  - q: "Can I get a ballpark price before discovery?"
    a: "Yes, and we will give you one on the first call. Treat it as a range, not a commitment: at that stage nobody has written down what is in and what is out, so any single number is a guess."
  - q: "Do you charge for discovery?"
    a: "Yes. Discovery is short and paid because it produces real work you keep: a written scope, an estimate with its assumptions, and a recommendation. You can take those documents to any team, including one that is not us."
  - q: "What happens if discovery says not to build it?"
    a: "Then you have saved the full cost of the build for the price of a short piece of thinking. Sometimes the answer is an off-the-shelf tool, a smaller first release, or waiting until one question is answered."
  - q: "Is a discovery phase the same as a requirements document?"
    a: "No. A requirements document lists features. Discovery also decides who the product is for, what ships first and what is explicitly out, and attaches the assumptions behind the estimate."
  - q: "Why do software projects go over budget?"
    a: "Usually because the price was fixed before the scope was. Assumptions nobody recorded turn out to be wrong, and every one of them becomes a change request."
draft: true
---

We scope before we quote because a quote is an answer, and most founders ask for it before anyone has written down the question. If the scope is vague, the price is a guess, and a guessed price is how projects end up late, over budget and argued about. So before we put a number on anything, we agree in writing who the product is for, what ships first and what is explicitly out.

This article explains why we work that way, what a short discovery phase actually produces, and how writing down assumptions keeps a software estimate honest once the build starts.

## A quote is an answer to a question nobody wrote down

Most founders ask us for a quote before they can describe what they are building. That is not a criticism. You want to know whether the project is affordable before you spend time on it. But it is the wrong order, and it is why so many software projects come in late.

Think about what a quote actually contains. It is a number that depends on dozens of decisions: which users get which screens, what happens when a payment fails, whether the admin panel is a spreadsheet export or a full dashboard, which integrations are day one and which are "later". When those decisions have not been made, the person quoting makes them silently, in their head, and prices their own version of your product.

Two agencies will then give you two very different numbers, not because one is cheap and one is greedy, but because they priced two different products. Neither of them wrote that down, so you cannot compare them.

Steve McConnell's research on software estimation puts a size on this. In [the Cone of Uncertainty](https://www.construx.com/books/the-cone-of-uncertainty/), he shows that estimates made at the initial concept stage can be off by a factor of four in either direction: a 16x range between the high and low end. The cone only narrows as decisions are made. It does not narrow because someone spent longer on the spreadsheet.

That is the whole case for why we scope before we quote. The estimate cannot be more precise than the definition of the thing being estimated.

## Three questions we answer before any number

Software project scoping does not need to be a thirty-page document. It needs to answer three questions clearly enough that two people reading it would build the same thing.

### Who it is for

One sentence, one audience. "Students preparing for JEE who need live classes and assignments in one place" is a scope. "An education platform" is not. The audience decides almost everything downstream: which device comes first, how much onboarding the product needs, and what "fast enough" means.

When a product has several audiences (students, teachers and admins on a coaching portal, for example), we name the one the first release must work for, and make the others serve that one.

### What ships first

The smallest thing a real user can pay for, or rely on. Not a demo, and not the full vision with half of it stubbed out. A first release that does one job completely beats a first release that does five jobs partly.

This is also where most of the money is saved. Once the first release is small and complete, the estimate becomes small and believable, and everything else becomes a list you can prioritise with real usage data instead of guesses.

### What is explicitly out

The part everyone assumes is included. It is usually one of: a mobile app when the first release is web, a second language, a reporting dashboard, an integration with the accounting system, or migrating old data.

Writing down what is out is the single most useful line in a scope. McConnell makes the same point: defining the product, "including committing to what you will not do", is what narrows the cone. An item on the "out" list is not rejected. It is scheduled for a later conversation, with its own price.

## What the discovery phase in software development produces

Discovery often gets described as workshops and research, which makes it sound like a cost with nothing to show for it. Ours is short, paid, and ends with three artefacts you keep.

1. **A written scope, in plain language.** Who it is for, what ships first, what is out, and the key flows described step by step. No jargon, so anyone on your side can read it and object.
2. **A build estimate with the assumptions attached.** Not just a number: every assumption the number depends on, listed next to it. "Payments via Razorpay only." "Content is supplied by you before week three." "Up to 500 concurrent users at launch."
3. **The case for not building it, if that case exists.** Sometimes an off-the-shelf tool does the job, or the first release should be much smaller, or one question has to be answered with customers before any code is written.

If discovery says do not build this, that is the cheapest outcome you will ever buy. You have spent a small amount to avoid spending a large one. Our guide to [custom software vs off-the-shelf software](/articles/custom-software-vs-off-the-shelf) goes further into how to make that call.

Discovery sits at the front of our [process](/#process) for this reason. The same people who scope the product go on to design and build it, so nothing is lost between the document and the code.

## How we keep a software estimate honest

Estimates drift because assumptions go unrecorded. When the build is priced on an unwritten assumption and the assumption turns out to be wrong, nobody can tell whether the change is new work or something that was always meant to be included. So the conversation becomes about blame.

We keep the assumptions in the scope document. When one of them turns out to be wrong, and on a real project some always do, the conversation is about that assumption:

- It said payments were Razorpay only; you now need Stripe for international customers too.
- That is new work, here is what it costs, and here is what it pushes back.
- You decide whether it goes in now, or on the list for the next release.

No surprise invoice, and no quiet corner-cutting to absorb it. This is how a fixed software development quote stays fixed: not by padding it, but by being exact about what it covers.

In practice the method looks like this:

```
scope -> estimate -> build -> launch
```

That is the whole method. It is not clever. It is just written down.

## When you already have a spec

Some founders arrive with a detailed brief, wireframes, or an existing product that needs rebuilding. That shortens discovery; it does not remove it. We still read the spec against the three questions, list what it leaves open, and attach assumptions to the estimate. A good spec usually means discovery is quick and the estimate is tight.

If you have an existing codebase, discovery also covers what can be kept. Rewriting everything is rarely the right first move, and it is much easier to say so before a price has been agreed than after.

## The bottom line

A software quote is only as good as the scope underneath it. We scope before we quote so that the number you get describes a product both of us can see on paper, with every assumption written next to it. That makes the estimate smaller, the build calmer, and the inevitable changes a conversation instead of an argument.

If you are planning [custom software](/services/custom-software), a [web application](/services/web-applications) or a [mobile app](/services/mobile-apps), see [what we have built](/work) and [how our pricing works](/pricing), then [tell us what you are working on](/#contact). We will tell you what it takes, starting with what is in and what is out.
