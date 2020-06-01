# Learning Git
* initialise git repo inside root folder with: `git commit`
* .gitignore file is used to list all files inside folder you want git to ignore
* in this case we want to ignore node_modules/ since this can be recreated instantly by running `npm install` cml command arg

## Git Commands:
* `git status` command shows us status of our git repo, which files are untracked, which have been added, etc. They've been added to 'staging' area
* `git add *` means add all files in the current directory, except for files whose name begin with a dot. This is your shell functionality and Git only ever receives a list of files.

* `git add .` has no special meaning in your shell, and thus Git adds the entire directory recursively, which is almost the same, but including files whose names begin with a dot.

* `git commit -m "..."` this commits all files in the 'stage' area that have been added. It bundles them up and gives the commit a unique ID. each commit needs a `-m` flag to add a concise message of what is being commited.

## VScode integrates with git.
1. All files appearing in green means they haven't been commited
2. If a 'U' appears next to file it means it's untracked
3. Files in grey signify they are being ignored (via .gitignore file)