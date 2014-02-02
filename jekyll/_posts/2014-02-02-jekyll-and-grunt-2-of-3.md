---
layout: post
title: Jekyll & Grunt, part 2
published: true
date: 2014-02-02
categories: code
tags: jekyll grunt javascript yeoman disqus tools workflow
comments: true
---

If you read my [previous post]({% post_url 2014-01-19-jekyll-and-grunt-1-of-3 %}) then you already know I'm using Jekyll to generate this website. Today I want to share how [Grunt](http://gruntjs.com) makes hacking and blogging so much more pleasurable around here.

### Simple and Beautiful

I'm an hedonistic person, I like when things look pretty, work in a quiet and efficient manner and make you feel comfortable: I like working on a pleasurable way. No need to say, but I've never liked any blogging platform very much.

Jekyll is so cool, it just sits there, diligently building your website as you move *plain text files* around. And that's pretty much it, If you can move text files to the right places, Jekyll will carry on building your website and keeping everything shiny and neat. Enters Grunt.

Grunt will do everything else for you: transform text files from one format to another and then moving them around for you, gently poking Jekyll to put all the pieces together, and finally taking the whole lot and sending it to [GitHub Pages](http://pages.github.com).

<figure>
<figcaption>List of available tasks</figcaption>
{% highlight  text %}
~ grunt -h

# Grunt's help here...

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

The list above contains both Grunt task contributed by the community, as well as tasks that I configured to build and manage this website. Feel free to read the [Gruntfile.js](https://github.com/grancalavera/grancalavera/blob/master/Gruntfile.js) to see all the implementation details.

### The Workflow

With this setup I can make design, code and content changes, while getting immediate feedback in the browser:

<figure>
<figcaption>Hacking and blogging</figcaption>
{% highlight text %}
~ grunt
{% endhighlight %}
</figure>

Once everything is ready, I can deploy my changes with a single command:

<figure>
<figcaption>Deploying to GitHub pages</figcaption>
{% highlight text %}
~ grunt deploy
{% endhighlight %}
</figure>

Sometimes the ```gh-pages``` directory gets messed up, mainly because I delete it by mistake.
Even when Grunt can recreate the missing directory just fine, the ```.git``` directory with all the GitHub Pages deployment details inside it gets lost, which in turn contains all the deployment details. That means loosing the ```gh-pages``` directory breaks my deployments. No biggie:

<figure>
<figcaption>Housekeeping and troubleshooting</figcaption>{% highlight text %}
~ grunt gh_reset
{% endhighlight %}
</figcaption>

### Would I use it again?

Absolutely yes, in fact I have already started a new project using Jekyll and very similar workflow. Also, I'm planning to build a [Yeoman](http://yeoman.io) generator to make the process of starting new Jekyll projects easier.

<em class="epilogue">Hopefully you are enjoying my ramblings. Watch this space for the third and final part on this series. I'll talk about Yeoman and Disqus integration (yes, you can [comment on this]({% post_url 2014-02-02-jekyll-and-grunt-2-of-3 %}#disqus_thread)).</em>

