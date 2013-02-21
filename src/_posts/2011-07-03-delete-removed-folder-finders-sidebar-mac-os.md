---
lang: en
title: 'Delete a removed folder in your Finder&#8217;s sidebar on Mac OS X'
author: MoOx
layout: post
comments: true
permalink: blog/delete-removed-folder-finders-sidebar-mac-os/
categories:
  - Computer
  - Fix
tags:
  - finder
  - os x
  - terminal
  - tips
---
Maybe you done what I just made : remove a folder which was in your Finder sidebar. Now you can’t remove from it.  
  
So here is the solution which require Xcode installed.  
In your terminal do

```bash
open Library/Preferences/com.apple.sidebarlists.plist
```

Or open this file manually.

You should have « Property List Editor » app to do this.

<figure class="flex-media--unknown"><a href="medias/2011/06/Remove-deleted-folder-osx-finder-sidebar.png"><img class="flex-media__item" title="Remove-deleted-folder-osx-finder-sidebar" src="medias/2011/06/Remove-deleted-folder-osx-finder-sidebar.png" alt="" /></a></figure>

Open each entries to find what you want under Root » useritems » CustomListItems. Try to open each item and check the name of the folder. When you found the correct entry, delete the « Item x » and save the file.

When it’s done, just restart Finder.  

```bash
killall Finder
```

Or just make option+click on Finder’s icon in your dock, then Relaunch.

<figure class="flex-media--unknown"><a href="medias/2011/06/relaunch-finder.png"><img class="flex-media__item" title="relaunch-finder" src="medias/2011/06/relaunch-finder.png" alt="" /></a></figure>

It’s that simple :)
