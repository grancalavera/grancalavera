---
layout: post
title: Jekyll & Grunt, part 2
published: false
date: 2014-01-21
categories: code
tags: jekyll grunt javascript
comments: true
---

If you read my [previous post]({% post_url 2014-01-19-jekyll-and-grunt-1-of-3 %}) then you already know I'm using Jekyll to generate this website. Today I want to share how [Grunt](http://gruntjs.com) makes hacking and blogging so much more pleasurable around here.

### Simple and Beautiful

In a way I'm very hedonistic person; I like when things look pretty, work in a quite and efficient manner, and give the feeling they "fit" your needs nicely. No need to say, but I've never liked any blogging platform very much.

Jekyll is so cool, it just sits there and diligently builds your website as you move *plain text files* around, and that's pretty much it. If you find a way to move text files to the right places, Jekyll will carry on building your website and keeping everything shiny and neat. Enters Grunt.

Grunt will do everything else for you: preparing more text files and moving them around for you, then gently poking Jekyll to put all he pieces together, and finally taking the whole lot and sending it to GitHub. After that, your website will be in [GitHub Pages](#) hands.

<figure>
<figcaption>List of available tasks</figcaption>
{% highlight  text %}
~ grunt -h

[ Grunt's help here... ]

Available tasks
       compass  Compile Sass to CSS using Compass *
         watch  Run predefined tasks whenever watched files change.
        jshint  Validate files with JSHint. *
        concat  Concatenate files. *
        cssmin  Minify CSS files *
       connect  Start a connect web server. *
         clean  Clean files and folders. *
         shell  Run shell commands *
       gh_init  Alias for "clean:gh_pages", "shell:gh_clone", "shell:gh_init"
                tasks.
      gh_reset  Alias for "clean:gh_pages", "shell:gh_clone",
                "shell:gh_checkout" tasks.
         build  Alias for "jshint", "clean:tmp", "compass", "concat" tasks.
        deploy  Alias for "build", "shell:jk_build_production", "shell:gh_push"
                tasks.
       default  Alias for "build", "shell:jk_build", "connect", "watch" tasks.
{% endhighlight %}
</figure>

The *list of available tasks* contains both Grunt task contributed by the community as well as task that I configured [to build and manage this website](https://github.com/grancalavera/grancalavera/blob/master/Gruntfile.js).

### The Workflow

With this setup I can make design, code and content changes, while getting immediate feedback in the browser:

<figure>
<figcaption>Hacking and blogging</figcaption>
{% highlight bash %}
~ grunt
{% endhighlight %}
</figure>

Once everything is ready, I can deploy my changes with a single command:

<figure>
<figcaption>Deploying to GitHub pages</figcaption>
{% highlight bash %}
~ grunt deploy
{% endhighlight %}
</figure>

Sometimes the ```gh-pages``` directory gets messed up, manly because I delete it (quite often) by mistake, thus loosing the ```.git``` directory inside it that specifies the deployment details. No biggie:

<figure>
<figcaption>Housekeeping and troubleshooting</figcaption>{% highlight bash %}
~ grunt gh_reset
{% endhighlight %}
</figcaption>

### Would I use it again?

Absolutely yes, in fact I have already started a new project [at the office](http://mcsaatchi.com) using Jekyll and very similar workflow. Also, I'm planning to build a [Yeoman](http://yeoman.io) generator to make the process of starting new Jekyll projects much easier.

<p class="epilogue">Hopefully you are enjoying my ramblings. Please this watch this space for the third and final part on this series. I'll talk about Yeoman and Disqus integration.</p>
