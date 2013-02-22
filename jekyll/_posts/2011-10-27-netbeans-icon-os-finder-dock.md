---
lang: en
title: Keep one Netbeans icon in your OS X Finder Dock
author: MoOx
layout: post
comments: true
permalink: blog/netbeans-icon-os-finder-dock/
categories:
  - IDE
  - Web Development
tags:
  - ide
  - netbeans
  - os x
---
After installing Netbeans, you drag the Netbeans.app in your dock. And each time you start Netbeans, you have a second Netbeans icon which appears… That’s boring.

Here is the solution :

Go into the `/Applications/Netbeans` folder, and open the Netbeans package.

<figure class="flex-media--unknown">
    <a href="{{ site.baseurls.medias }}/2011/10/open-netbeans-package.png">
        <img class="flex-media__item" src="{{ site.baseurls.medias }}/2011/10/open-netbeans-package.png" alt="" title="Open Netbeans.app package" />
    </a>
</figure>

Then open `etc/netbeans.conf`

<figure class="flex-media--unknown">
    <a href="{{ site.baseurls.medias }}/2011/10/open-netbeans-conf.png">
        <img class="flex-media__item" src="{{ site.baseurls.medias }}/2011/10/open-netbeans-conf.png" alt="" title="Edit netbeans.conf" />
    </a>
</figure>

You should see in the file :

```bash
# Default location of JDK, can be overridden by using --jdkhome [<dir>:
#netbeans_jdkhome="/path/to/jdk"
```
Just add `netbeans_jdkhome="/System/Library/Frameworks/JavaVM.framework/Versions/CurrentJDK/Home/"` after theses lines.

Restart Netbeans and voilà !
