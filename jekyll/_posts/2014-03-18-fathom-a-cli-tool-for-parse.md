---
layout: post
title: 'Fathom: a Node.js command line tool for Parse'
published: true
date: 2014-03-18
tags: node.js parse bdd cucumber fathom
comments: true
---

We've been using [Parse](https://parse.com/) for a while at the office, but mainly for small projects and pet projects. The thing is, the more we use it, the more we want to use it again. So, there comes this project and it isn't that small and we said: "lets build it with Parse and to test it with Cucumber". I start working on it, and by the second day there I was searching the interwebs for a way to drop an entire Parse class using the REST API. Good luck with that.

As it Turned out, to be able to do any trivial testing you need to constantly mess around with your application's data: you need to mock up models before running your features and scenarios, then wipe them out and mock them up again and again.

To cope with all the mocking and wiping, I decided to take the Grunt route, just wrote a simple task to delete all the objects from a Parse class (my only class at that stage) and that was it. But after a couple of times of typing:

```
 ~ grunt parse:delete
```

... I started to feel increasingly irritated. Creeping thoughts started to haunt me, I figured I needed to create mock data on not just one but many different classes. Frustration and despair fell over me, I was doomed by my very own short-sightedness.

And then I thought... what if?

What if I build a command line application that communicates with Parse and deletes and creates all that mock data on more than one class? Or any class? Maybe even do stuff with users and manage that ACL stuff? So, obviously, I spent the next 2 hours searching for an awesome name that wasn't already taken in the npm registry.

And that's how a couple of months ago I started writing [Fathom](https://bitbucket.org/mcsaatchi/fathom). Since then I've been using it with Cucumber and Ruby and I must say it is pretty awesome. It has [some rough edges](https://bitbucket.org/mcsaatchi/fathom/issues?status=new&status=open), but still, I think there's something going on in there.

If you feel like giving it a try, just go:

```
~ npm install -g fathom
```

Drop me a line if you like it, or if you think it makes sense, or if you think it makes no sense. Also, take a look a the [documentation](https://bitbucket.org/mcsaatchi/fathom/src/c8fc1d5df504c0ebc2d1ce12685070c76dc54c21/readme.md?at=master), there are some features that I'm planning to release in the following weeks.


