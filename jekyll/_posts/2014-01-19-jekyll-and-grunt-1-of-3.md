---
layout: post
title: Jekyll & Grunt
published: true
date: 2014-01-19
categories: code
tags: jekyll grunt javascript
comments: true
---

I have already tried to start a blog in the past. Do a quick search for [grancalavera.com in the Wayback Machine](http://web.archive.org/web/20040415000000*/http://grancalavera.com) and you'll find scattered versions of lonely holding pages all the way back to 2004: anything from simple HTML pages, Blogger templates and even one broken Flex microsite.

One of the reasons why I have started over and over again so many times is that I've never been able to choose a blogging platform. I've always wanted to be able to do stuff without having to spend loads of time reading through pages and pages of documentation, obscure details on server configuration and folder structures.

### Jekyll

Having played around with [GitHub Pages](http://pages.github.com/) in the last couple of years, I decided to try [Jekyll](http://jekyllrb.com/), the blog-aware static site generator used by GitHub on their GitHub Pages. Jekyll has proved to be dead-simple to use: once you get it running you can get your head around it in 20 minutes.

<figure id="project_structure">
<figcaption>project structure</figcaption>
{% highlight text %}
  grancalavera.com
* ├── .tmp/
* ├── bower_components/
* ├── gh-pages/
  ├── jekyll/
  │   ├── _drafts/
  │   ├── _includes/
  │   ├── _layouts/
  │   ├── _posts/
  │ * ├── css/
  │ * ├── js/
  │   ├── CNAME
  │   └── index.html
* ├── node_modules/
  ├── scripts/
  ├── styles/
  ├── .gitignore
  ├── _config-production.yml
  ├── _config.yml
  ├── bower.json
  ├── Gemfile
  ├── Gemfile.lock
  ├── grancalavera.com.sublime-project
  ├── Gruntfile.js
  ├── package.json
  └── README.md

* Ignored in .gitignore
{% endhighlight %}</figure>

I'm using the out of the box ```config.yml``` configuration file as the configuration base for my project. I didn't add any custom variables, just changed some of the default values, being the most important two ```source``` and ```destination```.

All the blog files live inside the ```jekyll``` directory, instead of living directly under the root directory of the project. This allows me to keep all the content separate from the building process. Also, to make the use of GitHub Pages explicit, the site gets built into the ```gh-pages``` directory instead of the default ```_site``` directory.

There is a change I want to make: moving the configuration files from the root of the project to the ```jekyll``` directory. This change would allow me to separate the blog building process from the blog content files, keep them in separate git repos, and use the same building process with more than one Jekyll site.

<figure>
<figcaption>_config.yml</figcaption>
{% highlight yaml %}
name: Gran Calavera
markdown: redcarpet
pygments: true
timezone: Europe/London
destination: gh-pages
source: jekyll
permalink: pretty
relative_permalinks: false
{% endhighlight %}
</figure>

The only difference between the base configuration file and the ```_config-production.yml``` configuration file is the ```production``` flag. I use this flath to toggle the livereload script <em>off</em> and the Google Analytics script <em>on</em> during production. I'll go into the details on how I use the livereload script on my next post.

<figure>
<figcaption>_config-production.yml</figcaption>
{% highlight yaml %}
production: true
{% endhighlight %}
</figure>

Using this setup, I can build the Jekyll site and work on my posts locally with this command:

<figure>
<figcaption>local build</figcaption>
{% highlight bash %}
$ jekyll serve -w --drafts
{% endhighlight %}
</figure>

And build with this command when I'm ready to push my changes to GitHub:

<figure>
<figcaption>production build</figcaption>
{% highlight bash %}
$ jekyll build --config _config.yml,_config-production.yml
{% endhighlight %}
</figure>

The last command will concatenate both of my configuration files, overriding any flags in ```_config.yml``` with flags from ```_config-production.yml```. Currently no flags are overridden, just the one ```production``` flag gets appended to the final production configuration.

<p class="epilogue">If you want to learn more about how to get started with Jekyll, head straight to the [Jekyll documentation](http://jekyllrb.com/docs/home/). I have been using [Grunt](http://gruntjs.com) to build my GitHub Pages projects for a while now, and with a little tinkering it was very easy to put a build process together for Jekyll and Grunt. In my next post I'll be explaining such build process in detail, so please stay in tune!</p>


