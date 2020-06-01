# Learning Git
* initialise git repo inside root folder with: `git commit`
* .gitignore file is used to list all files inside folder you want git to ignore
* in this case we want to ignore node_modules/ since this can be recreated instantly by running `npm install` cml command arg

## Git Commands:
* `git status` command shows us status of our git repo, which files are untracked, which have been added, etc. They've been added to 'staging' area
* `git add *` means add all files in the current directory, except for files whose name begin with a dot. This is your shell functionality and Git only ever receives a list of files.

* `git add .` has no special meaning in your shell, and thus Git adds the entire directory recursively, which is almost the same, but including files whose names begin with a dot.

* `git commit -m "..."` this commits all files in the 'stage' area that have been added. It bundles them up and gives the commit a unique ID. each commit needs a `-m` flag to add a concise message of what is being commited.

*  `ls -a -l` lists out all files in directory including hidden ones in a table

## VScode integrates with git.
1. All files appearing in green means they haven't been commited. Appearing in orange with 'M' mean they've been modified and are being tracked
2. If a 'U' appears next to file it means it's untracked
3. Files in grey signify they are being ignored (via .gitignore file)
4. You can have multiple commits without pushing


## Setting up SSH Keys
How to transfer code between our machine/computer and third party repo servers in a secure way?
Answer: `SSH Keys`, stands for Secure Shell

SSH key pair are a couple files to make sure this transfer is secure.

If you have no SSH keys you have to make them

`ssh-keygen -t rsa -b 4096 -C myemail@mail.com` this command allows us to generate the private rsa ssh key, `-t` type of protocols like `rsa`, `-b` 4096 -> 4096 bits for the key, `-C myname@email.com` comment for key (label)

this command will take us through a wizard:
1. Enter file to save key (default is the `.ssh dir`, w/ filename `id_rsa`): `hit enter to keey default`
2. Enter passphrase (empty for no passphrase): `enter for No passphrase`
3. generates randomart w/ Key
```
The key's randomart image is:
+---[RSA 4096]----+
|++*...+.         |
|.*.+ @o .        |
|.oB B =o         |
|o+.. =..         |
|= +.+.o S        |
|oo.+ +..         |
|..+ ... .        |
|.+.E.. . .       |
|o.o.    .        |
```

THEN:
1. `ls -a -l ~/.ssh` use this to see the internals of ./ssh folder

Something like this should appear:
```terminal
total 24
drwx------   5 workstudy  staff   170  1 Jun 14:53 .
drwxr-xr-x+ 78 workstudy  staff  2652 31 May 16:10 ..
-rw-------   1 workstudy  staff  3247  1 Jun 14:58 id_rsa
-rw-r--r--   1 workstudy  staff   750  1 Jun 14:58 id_rsa.pub
-rw-r--r--   1 workstudy  staff   416 25 Sep  2019 known_hosts
```
2. You should have 2 files: 
    * `id_rsa` which is a secret file we will keep on our machine and never share w/ anyone, 
    * `id_rsa.pub` is a public file, we will share w/ github and heroku so they can secure communication between our machine and their servers

Last thing to do is to make sure our SSH key pair is used next time we setup an SSH connection
1. Make sure program is running. Do this by running `eval "$(ssh-agent -s)"`. This command will startup an SSH agent, if it's running it will tell us by printing process ID
    *  this should print `Agent pid 55104` or any other ID, which means things are running
2. Register our new private key file `id_rsa`. To do this run command: `ssh-add -K ~/.ssh/id_rsa`
    * prints: `Identity added: /Users/workstudy/.ssh/id_rsa (/Users/workstudy/.ssh/id_rsa)`
    * this mean identity has been added, now when we try to facilitate an SSH communication we will be able to do it securely using our key-pair



