---
layout: post
title: Jekyll & Grunt, part 2
published: false
date: 2014-01-21
categories: code
tags: jekyll grunt javascript
---

I've already talked about how I'm [using Jekyll to run this blog]({% post_url 2014-01-19-jekyll-and-grunt-1-of-3 %}), now I'm going to talk about [Grunt](http://gruntjs.com). For the sake of clarity, you can assume Jekyll is running on the background all the time, re-generating posts and pages when something changes in the ```jekyll``` directory. Checkout the updated [project structuree]({% post_url 2014-01-19-jekyll-and-grunt-1-of-3 %}#project_structure) to get an idea of the file layout for this project.

### Grunt

This is a very simple website, but even so I wanted as much comfort as possible when working in it. I decided upfront I was going to use as least JavaScript as I possible could, and the simplest possible layout I could. That doesn't mean I'm willing to perform the same tasks over and over again, or that I'm OK with making stupid mistakes: automatic SASS preprocessing and JavaScript linting was something I wanted to get working even before writing the first post.

With those two goals in mind, my next task was to figure out a comfortable workflow to get the design together, and that involved not using Photoshop at all. I went for working directly on the code: small changes on my SASS files should reflect immediately on the browser. That's pretty much straight forward when working on a pure grunt project, you just drop [grunt-contrib-connect](https://npmjs.org/package/grunt-contrib-connect) in the mix and let it serve your static files, but for this blog I'm using the Jekyll server.

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
