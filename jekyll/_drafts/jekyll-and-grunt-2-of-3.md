---
layout: post
title: Jekyll & Grunt, part 2
published: false
date: 2014-01-21
categories: code
tags: jekyll grunt javascript
---

On my [previous post]({% post_url 2014-01-19-jekyll-and-grunt-1-of-3 %}) I explained how I'm using Jekyll in this blog. The setup is pretty much the same you get out of the box, with just some minor changes to accomodate automated builds with Grunt and deployments to GitHub Pages. Since the last time, I updated the [project structure]({% post_url 2014-01-19-jekyll-and-grunt-1-of-3 %}#project_structure) outlined in the Jekyll post. I decided to add all the hidden files, because it gives context on the tools I'm using and the building process itself.

### Grunt

Grunt, ["The JavaScript Task Runner"](http://gruntjs.com/), is a command line tool

automating, expressive, intention, repeatable, portable

community, ecosystem, plugins

[The Gruntfile](https://github.com/grancalavera/grancalavera/blob/master/Gruntfile.js) for this blog

### Working on my blog

  - JS linting
  - Local build:
    - Compass
    - Concat to > ?
  - Watch and livereload

### Deploying to GitHub Pages

  - JS linting
  - Production build:
    - Compass
    - Concat to > ?
  - Shell: Push to GitHub

### Helpers stuff

  - Shell: init gh-pages
  - Shell: reset gh-pages

<figure>
<figcaption>Automatic commit message</figcaption>
{% highlight js %}
var commitMessage = function commitMessage () {
  return pkg.name + ' - v' +
    pkg.version + ' - ' +
    grunt.template.today('isoDateTime');
};
{% endhighlight %}
</figure>
