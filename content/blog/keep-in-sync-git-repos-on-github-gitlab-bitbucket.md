---
title: How to keep in sync your Git repos on GitHub, GitLab & Bitbucket without efforts
tags:
  - git
  - github
  - gitlab
  - bitbucket
date: 2018-06-04
---

Sharing code online is pretty easy this days. But keeping in sync your repos on
multiples places is a bit harder. You will easily find scripts and commands to
import/export stuff somewhere. Same thing for read-only mirrors, pretty easy.
But having a transparent workflow to be able to push your code on multiple
places is not that easy. But hey, it's not hard neither.

You can decide to use GitHub, which the most used solution this days, but maybe,
just in case of long outages or because you don’t want to be tied to GitHub that
much (for political reasons, or just because they had been acquired by Microsoft
and you are afraid of the Skype syndrome), you may want to have _not-read-only
mirrors_ of your repos somewhere else.

**Here is a nice trick to keep in sync real git repos on multiple places** like
GitLab and BitBucket, that you can pull and push to, without any efforts after a
quick initial setup. Not read-only mirrors. Real repos. And this **just be
relying on git pull and push features**.

_Reminder: to be safe setup SSH and Two factor Auth (2FA) for all places (except
for BitBucket, cause it’s not compatible with the CLI tool)._

<!--([Looking for the tl;dr?](#tldr))-->

## Git Tooling

In order to facilitate the setup, we will install some CLI tools for each
services.

### Github

We will use [hub](https://github.com/github/hub).

For macOS

```console
brew install hub
```

See
[Hub installation instruction page](https://github.com/github/hub#installation)
for others OS.

You will need a [GitHub token](https://github.com/settings/tokens/new).

Place it in your home folder in a `.github_token` file, and load it in your
`.bash/zshrc` like this:

```sh
if [[ -f $HOME/.github_token ]]
then
  export GITHUB_TOKEN=$(cat $HOME/.github_token)
fi
```

### GitLab

[GitLab CLI](http://narkoz.github.io/gitlab/cli) is available via
[rubygem](https://rubygems.org/):

```console
gem install gitlab
```

(You might want to use `sudo gem install` if you rely on macOS ruby version.)

#### `Please set an endpoint to API`

GitLab requires a token and an endpoint (because you can setup a GitLab instance
yourself).

For the token,
[grab your GitLab private token here](https://gitlab.com/profile/account) and
use the same solution as GitHub. Here is an example using GitLab “official”
online instance that you should add in your `.bash/zshrc`:

```sh
if [[ -f $HOME/.gitlab_token ]]
then
  export GITLAB_API_PRIVATE_TOKEN=$(cat $HOME/.gitlab_token)
fi
export GITLAB_API_ENDPOINT="https://gitlab.com/api/v3"
```

### BitBucket

[BitBucket CLI](https://bitbucket.org/zhemao/bitbucket-cli) is available via
[pip](https://pip.pypa.io/en/stable/):

```sh
pip install bitbucket-cli
```

(You might want to use `sudo pip install` if you rely on macOS Python version.)

BitBucket does not work well with a token… 2fa is not convenient (and
[impossible to use with ssh](https://bitbucket.org/zhemao/bitbucket-cli/issues/25/create-issue-ssh-not-taken-in)).
So you will have to enter login/pwd all the time or
[put that in clear in a .bitbucket file](https://bitbucket.org/zhemao/bitbucket-cli#markdown-header-configuration).

---

Now that we have all the tools, let's start by creating a repo on each services.

## Create a repo on GitHub, GitLab & Bitbucket using CLI

The commands below assume that your username is the same on each services. If
that's not the case, just adjust the command by replacing all variables.

We will create/reuse a folder, init a local git repo, and push it to all those
services.

### Your git repo exists

We will assume that the folder name is the name of the project.

Open a terminal session and do

```console
export GIT_USER_NAME=$USER
export GIT_REPO_NAME=$(basename $(pwd))
```

Adjust variables if the snippet above is not matching your setup.

### You don't have a git repo yet

```console
export GIT_REPO_NAME="your-repo"
mkdir $GIT_REPO_NAME && cd $GIT_REPO_NAME
git init
```

### Create repo on GitHub via CLI

```console
hub create
```

This command create the repo and add the remote automatically.

### Create repo on GitLab via CLI

```console
gitlab create_project $GIT_REPO_NAME "{visibility_level: 20}"
```

(Public visibility). [Source](http://stackoverflow.com/a/31338095/988941)

We will add the remote later, it's part of the trick ;)

### Create repo on BitBucket via CLI

```console
bb create --protocol=ssh --scm=git --public $GIT_REPO_NAME
```

[Source](http://stackoverflow.com/a/12795747/988941)

## Configuring remotes

Depending on what you want or need, you will have multiple choice to configure
your repo.

For a single main repo and simple “mirrors”, you can use this

```console
git remote set-url origin --add https://gitlab.com/${GIT_USER_NAME}/${GIT_REPO_NAME}.git
git remote set-url origin --add https://bitbucket.org/${GIT_USER_NAME}/${GIT_REPO_NAME}.git
```

You can check that the commands are ok with

```console
git remote -v
```

This should give you something like this

```
origin	https://github.com/YOU/YOUR-REPO.git (fetch)
origin	https://github.com/YOU/YOUR-REPO.git (push)
origin	https://gitlab.com/YOU/YOUR-REPO.git (push)
origin	https://bitbucket.org/YOU/YOUR-REPO.git (push)
```

Now you can just use `git push` and it will push on all remote 🙂.

---

⚠️ **Note: to enforce ssh instead of https here is a simple trick**

```console
git config --global url.ssh://git@github.com/.insteadOf https://github.com/
git config --global url.ssh://git@gitlab.com/.insteadOf https://gitlab.com/
git config --global url.ssh://git@bitbucket.org/.insteadOf https://bitbucket.org/
```

### Problem is `git pull` will only pull from the first url.

There is inconsitencies with `git push --all` (push all branches to default
remote) and `git pull --all` (pull from the first url of the default remote).

[Here is a detailed post on configuring multiples remote for push, pull or both](https://astrofloyd.wordpress.com/2015/05/05/git-pushing-to-and-pulling-from-multiple-remote-locations-remote-url-and-pushurl/).

_tl;dr: we will have to add other remotes to be able to push._

```console
git remote add origin-gitlab https://gitlab.com/${GIT_USER_NAME}/${GIT_REPO_NAME}.git
git remote add origin-bitbucket https://bitbucket.org/${GIT_USER_NAME}/${GIT_REPO_NAME}.git
```

You can double check the setup with this command again

```console
git remote -v
```

Should give you something like this

```
origin	ssh://git@github.com/YOU/YOUR-REPO.git (fetch)
origin	ssh://git@github.com/YOU/YOUR-REPO.git (push)
origin	ssh://git@gitlab.com/YOU/YOUR-REPO.git (push)
origin	ssh://git@bitbucket.org/YOU/YOUR-REPO.git (push)
origin-gitlab	ssh://git@gitlab.com/YOU/YOUR-REPO.git (fetch)
origin-gitlab	ssh://git@gitlab.com/YOU/YOUR-REPO.git (push)
origin-bitbucket	ssh://git@bitbucket.org/YOU/YOUR-REPO.git (fetch)
origin-bitbucket	ssh://git@bitbucket.org/YOU/YOUR-REPO.git (push)
```

Now you can use `git push` to push to all remotes and use `git pull --all` to
pull from all remotes.

**My 2 cents: use an alias to `pull --all` by default.**

If you have a single remote this won’t change anything and will work if you have
more than one.

In my `.bashrc`/`.zshrc`

```sh
alias g="git"
```

In my `.gitconfig`

```ini
g = pull --all
p = push
```

Now I use `g g` to pull and `g p` to push.

### Pulling from multiple remotes with different updates

One edge case can be problematic: a commit in master in one repo (eg: pull
request on github), and another in another distant repo (eg: merge request on
gitlab). You may be able to fetch all those things (if you use
[`pull --rebase` by default](https://github.com/MoOx/setup/blob/60ec182707168e4cf9ffcb2d0351dc0ce2eac7ed/dotfiles/.gitconfig#L30-L31))
but when you will want to push back... You will have a failure unless you force
push.

This is the only (edge case) that can be problematic. If you accept PR/MR with
care, you should not face this very often.

#### Note about force push

If you encounter this case and want to force push, be sure that your branch is
not protected on

###### GitHub

```
https://github.com/${GIT_USER_NAME}/${GIT_REPO_NAME}/settings/branches
```

##### GitLab

```
https://gitlab.com/${GIT_USER_NAME}/${GIT_REPO_NAME}/protected_branches
```

GitLab protect the master branch **by default**. So force push will not work if
you don't change configuration.

I always make one force push or two for the first commit of a project, when CI
fail etc (don't juge me). **Now you have been warned.**

## For existing GitHub repos

I didn't find or setup an automated way to do this technique for all repos at
once. So each time I work on a project that I want to "backup", I check my memo
and run the appropriate command for the places where my repo is missing.

Alternatively, you might be interested by this things

* https://pypi.python.org/pypi/github2gitlab
* https://github.com/xuhdev/backup-on-the-go

## FAQ

### Handling issues and Pull/Merge request

Good question. For that, I don’t have the silver bullet. I think I will use
GitHub as the main repo. But if there is outage, I will have fallbacks! That’s
the idea of this approach: not being tied that much to a single service.

### Commit from web UI

Not a problem. I tried. You commit on the web (eg: comment, notes in README
etc). You pull via CLI, you push. Done. The origin you edited on the web will be
up to date already, but others will be updated.

---

## tl;dr

**Once** Install some CLI tools

```console
brew install hub
gem install gitlab
pip install bitbucket-cli
```

Note: be sure to have tokens as env var, see the beginning of this post for
details.

(Also, configure a git alias that will do `pull --all` if you want to pull all
remote by default.)

### For each repos

1.  Export your username (assuming you have the same on all platforms)

```console
export GIT_USER_NAME=$USER
```

2.  For new repo (if your repo already exist on GitHub, go to step below.)

```console
export GIT_REPO_NAME=your-repo
mkdir $GIT_REPO_NAME && cd $GIT_REPO_NAME
git init
hub create
```

3.  For existing GitHub repo

```console
export GIT_REPO_NAME=$(basename $(pwd))
gitlab create_project $GIT_REPO_NAME "{visibility_level: 20}"
bb create --protocol=ssh --scm=git --public $GIT_REPO_NAME
```

Then, to add remotes

```
git remote set-url origin --add https://gitlab.com/${GIT_USER_NAME}/${GIT_REPO_NAME}.git
git remote set-url origin --add https://bitbucket.org/${GIT_USER_NAME}/${GIT_REPO_NAME}.git
git remote add origin-gitlab https://gitlab.com/${GIT_USER_NAME}/${GIT_REPO_NAME}.git
git remote add origin-bitbucket https://bitbucket.org/${GIT_USER_NAME}/${GIT_REPO_NAME}.git
```

4.  Check that everything is ok

```console
git remote -v
```

You should get something like

```
origin  ssh://git@github.com/YOU/YOUR-REPO.git (fetch)
origin  ssh://git@github.com/YOU/YOUR-REPO.git (push)
origin  ssh://git@gitlab.com/YOU/YOUR-REPO.git (push)
origin  ssh://git@bitbucket.org/YOU/YOUR-REPO.git (push)
origin-bitbucket        ssh://git@bitbucket.org/YOU/YOUR-REPO.git (push)
origin-bitbucket        ssh://git@bitbucket.org/YOU/YOUR-REPO.git (fetch)
origin-gitlab   ssh://git@gitlab.com/YOU/YOUR-REPO.git (fetch)
origin-gitlab   ssh://git@gitlab.com/YOU/YOUR-REPO.git (push)
```

😇 Now you can just `git push` and `git pull --all`!

## Bonus: badges

You can add some nices badges to show the redundancy on your project README

```markdown
[![Repo on GitHub](https://img.shields.io/badge/repo-GitHub-3D76C2.svg)](https://github.com/YOU/YOUR-REPO)
[![Repo on GitLab](https://img.shields.io/badge/repo-GitLab-6C488A.svg)](https://gitlab.com/YOU/YOUR-REPO)
[![Repo on BitBucket](https://img.shields.io/badge/repo-BitBucket-1F5081.svg)](https://bitbucket.org/YOU/YOUR-REPO)
```

**Adjust `YOU/YOUR-REPO` to your need in the markdown**.

It will look like this

[![Repo on GitHub](https://img.shields.io/badge/repo-GitHub-3D76C2.svg)](https://github.com/YOU/YOUR-REPO)
[![Repo on GitLab](https://img.shields.io/badge/repo-GitLab-6C488A.svg)](https://gitlab.com/YOU/YOUR-REPO)
[![Repo on BitBucket](https://img.shields.io/badge/repo-BitBucket-1F5081.svg)](https://bitbucket.org/YOU/YOUR-REPO)

I pushed this [tl;dr on a repo](https://github.com/MoOx/git-init), maybe I will
make a script someday 😄. Well, three repos.

* https://github.com/MoOx/git-init
* https://gitlab.com/MoOx/git-init
* https://bitbucket.org/MoOx/git-init
