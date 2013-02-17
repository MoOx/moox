---
lang: en
title: Run a Virtual Machine with VirtualBox on a Hackintosh
author: MoOx
layout: post
permalink: /blog/run-virtual-machine-virtualbox-hackintosh/
dsq_thread_id:
  - 264802206
categories:
  - Computer
  - Fix
tags:
  - hackintosh
  - os x
  - virtualbox
  - vm
---
You are running on a OS X à la Hackintosh ? You have a « **VT-x is not available. VERR\_VMX\_NO_VMX** » when you start a virtual machine ? Do not panic !

Under the `~/Library/VirtualBox/Machines` directory you will find a folder for each virtual machine you have created. Within this directly you will find an XML file with the machine settings.  


<ins datetime="2012-02-22T16:58:23+00:00">Update: You can now just type in your terminal: `VBoxManage modifyvm &lt;VMname&gt; --hwvirtex off` (change `&lt;VMname&gt;` with your VM name)</ins>

## Edit XML VBox file

So, in your « user folder » (~/), there will be a Library folder, hidden in OS X Lion, so to see it, open the Finder, in the « Go » menu, hold <kbd>⌥</kbd>.

<p style="text-align: center;">
  <a href="{{site.baseurl}}/medias/2011/10/Open-Library-folder-wtih-Finder.png"><img class="size-full wp-image-99 aligncenter" title="Open Library folder with Finder" src="{{site.baseurl}}/medias/2011/10/Open-Library-folder-wtih-Finder.png" alt="" width="693" height="454" /></a>
</p>

Inside that Library folder, there is a folder called VirtualBox, which contains a Machines folder. In each VM folder, open the *.vbox file using a text-editor. It’s a XML file.

It looks like:

<pre class="code blocks">&lt;?xml ...
    &lt;VirtualBox ...
        &lt;Machine ...
            &lt;CPU count="1"&gt;
                &lt;HardwareVirtEx enabled="true" ... /&gt;
            ...</pre>

Exit Virtual Box, change this « true » to « false » and Save. Restart Virtual Box and (or open it if you had it closed) and the hardware virtualization extensions will be disabled.

<p style="text-align: center;">
  <a href="{{site.baseurl}}/medias/2011/10/Edit-Virtualbox-xml-file.png"><img class="size-full wp-image-100 aligncenter" title="Edit Virtualbox xml file" src="{{site.baseurl}}/medias/2011/10/Edit-Virtualbox-xml-file.png" alt="" width="770" height="716" /></a>
</p>

Seems like a clear bug with VirtualBox, being that the setting is grayed out in the GUI but you can change it in the XML config file and that fixes the problem.

*Source: <https://forums.virtualbox.org/viewtopic.php?f=2&t=17090>*
