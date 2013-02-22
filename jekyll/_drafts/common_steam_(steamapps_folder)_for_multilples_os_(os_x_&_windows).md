# Common Steam (SteamApps folder) for Multilples OS (OS X & Windows)

[TL;DR ?](#tl;dr)

As you know, the Steam platform now works on multiples OS, that's a cool thing. Some apps (games) work on several OS (Valve games running with Source Engine & some others) that's another cool thing, but some don't (Windows only games).

In my case I play sometimes on OS X (I use this OS for work) & sometimes on Windows (for Windows games). One problem is that you can't share your Steam installation between differents OS. You cant' easily. But if you take a quick look into the Steam installation folder on both OS, you will see that's shouldn't be hard since files are organised the same way.

You just need to be able to install Steam on the same folder. So you probably need a common writable space on your hard disk and that's it ? **Oh wait, you can't choose where to install Steam on OS X**.
So you *must* be able to write on the OS X filesystem from Windows. Since Windows can't natively write on HFS+ (OS X default partition format), you will need a specific driver. For that need, you can use MacDrive on Windows to be able to write on HFS+ partition (or Paragon HFS+ but this one won't work for me with Windows 8).
Once you are able to write on the OS X partition from Windows (to simply check, you should be able "Create a new folder" from the Windows context menu (right click) on the file explorer).

## First try
 
After Installing Steam on OS X, go install it on Windows too in your OS X partition (probably Macintosh HD ?). On Windows the path should be something like D:\Users\{your-username}\Library\Application Supports\Steam. At this moment, Windows will tell you that you can't install Steam in a non-empty folder. Ok then just rename the Steam folder to Steam-osx then. And try again. It should work. When the installation is done, just copy each files except maybe *SteamApps* & *ClientRegistry.blob* into Steam-osx folder. Delete the Steam folder & rename Steam-osx to Steam. That's it.
 
#### Problem with Steam Guard
 
The previous solution work great except you will have (each time you start Steam on a different OS) to act like it's a new device & so wait for the mail & enter the Steam Guard code. Not cool.
The problem came from the *ClientRegistry.blob* file which contains login + logged session id + Steam Guard code. So if we can use a different file it will be great.

### Without Steam Guard

You can use the method explained above: *install Steam from Windows into OS X Steam folder (check method for some details)


## Second try

### "SteamApps" folder
 
In fact if you take a deeper look, you will see that only one folder contain 99% of the space used by Steam. It's the SteamApps folder containing all games data & binary. Maybe just sharing this one should do the trick ? But how since on OS X you can't change Steam installation folder ?
 
### The ultimate solution: Symbolic link on OS X .
 
#### What's a symlink ?
If you don't know what is a "symlink", it's just a file which link a path to another.
 
E.g.:
 
	ln -s ~/test ~/Download
 
This test should create a folder test (the symlink) which point to Download. This should be invisible to any program. If you have a movie.avi in Download, you should be able to read it from ~/test/movie.avi. Using this tiny trick, we can't move the huge SteamApps folder anywhere, even on a Windows partition ! (To do that you will need to write on NTFS partition (Windows default partition format) using a OS X driver (Tuxera NTFS, MacFUSE+NTFS-3G or Paragon NTFS))
 
#### Linking SteamApps folder

**The idea is to have 2 Steam folders sharing just one SteamApps folder**. So install Steam on Windows where you want (and where OS X is able to write). I choose to use my OS X HD since I'm most of the time on this OS. So I install Steam Windows on this path.
D:\Users\MoOx\Library\Application Support\Steam-Windows-with-Apps
If you have already a huge SteamApps folder, move it in this path.
Then to have a clean OS X Steam install delete /Users/MoOx/Library/Application Support/Steam, run Steam again (to create a new clean folder), quit, and delete /Users/MoOx/Library/Application Support/Steam/SteamApps. Now just create a symlink using /Application/Utilities/Terminal.app

    ln -s ~/Library/Application\ Support/Steam-Windows-with-Apps/SteamApps ~/Library/Application\ Support/Steam

Run Steam again. This should works.


## TL;DR

Install a driver to have a common writable partition for OS X and Windows (Windows HFS+ driver: MacDrive or Paragon HFS+, OS X NTFS driver: MacFUSE+NTFS-3G (free), Tuxera NTFS, or Paragon NTFS). I choose to have my Steam file on a native OS X filesystem since I use OS X most of the time (I recommand MacDrive solution since I have problem on Windows 8 with Paragon NTFS).
Install Steam on Windows where you want (and where OS X can write). My advice is on D:\Users\$USER\Library\Application Support\Steam-Windows-with-Apps (if D: is your Machintosh HD). Now you can go into OS X to run these commands:


### Assuming that you have your huge SteamApps folder in you OS X Steam installation & no app installed on Windows

    mv ~/Library/Application\ Support/Steam/SteamApps ~/Library/Application\ Support/Steam-Windows-with-Apps/SteamApps

This command just move SteamApps folder into Windows installation folder

### Assuming that you have you don't have any Steam installed games on OS X

    rm -rf ~/Library/Application\ Support/Steam/SteamApps
    
This command just delete the SteamApps folder of OS X Steam folder

### Assuming you want to merge 2 SteamApps folder

     Just do this by hand, it shouldn' be so hard. Move every big files of your OS X folder into Windows one, respecting the folder tree.

### *In every case, you need to create the symlink*

    ln -s ~/Library/Application\ Support/Steam-Windows-with-Apps/SteamApps ~/Library/Application\ Support/Steam

This command link the Windows SteamApps to OS X Steam folder

**You need to understand that the huge games folder is *Steam-Windows-with-Apps/SteamApps***

Bonus: Now Windows games can be updated when you run Steam on OS X. Yep, it's a cool thing.

Note: if you see a game that was "Ready to play" on an OS, if you start Steam on the other OS, you will probably need to wait a little for Steam to download needed file for this OS (e.g: Valve games have windows & os x binaries, but use same games data)

Note 2: You can have differents updates if your OS doesn't have the same languages (eg.: Windows in French, OS X in English). Steam will need to update languages pack probably (you can change Steam language under Steam Preferences).

Note 3: If you have a warning about case-sensitive filesystem when you start Steam on OS X just after creating the symlink, just try one more time (for me it works)

mklink /J "C:\Program Files (x86)\Steam\SteamApps" "D:\Users\MoOx\Library\Application Support\Steam\SteamApps"

*The Happy End ?*
