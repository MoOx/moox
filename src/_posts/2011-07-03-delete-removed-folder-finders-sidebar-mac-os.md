---
lang: en
title: 'Delete a removed folder in your Finder&#8217;s sidebar on Mac OS X'
author: MoOx
layout: post
permalink: /blog/delete-removed-folder-finders-sidebar-mac-os/
dsq_thread_id:
  - 264802206
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

[<img class="size-full wp-image-86 aligncenter" title="Remove-deleted-folder-osx-finder-sidebar" src="{{site.baseurl}}/medias/2011/06/Remove-deleted-folder-osx-finder-sidebar.png" alt="" width="749" height="472" />][1]

Open each entries to find what you want under Root » useritems » CustomListItems. Try to open each item and check the name of the folder. When you found the correct entry, delete the « Item x » and save the file.

When it’s done, just restart Finder.  

```bash
killall Finder
```

Or just make option+click on Finder’s icon in your dock, then Relaunch.

[<img class="size-full wp-image-85 aligncenter" title="relaunch-finder" src="{{site.baseurl}}/medias/2011/06/relaunch-finder.png" alt="" width="324" height="295" />][2]

It’s that simple :)

 [1]: {{site.baseurl}}/medias/2011/06/Remove-deleted-folder-osx-finder-sidebar.png
 [2]: {{site.baseurl}}/medias/2011/06/relaunch-finder.png
