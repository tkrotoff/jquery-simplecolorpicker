# Very simple jQuery color picker

Yet another jQuery color picker.

## Original source code

The [original source code](http://andreaslagerkvist.com/jquery/colour-picker/) is from [Andreas Lagerkvist](http://andreaslagerkvist.com/).
I have extracted the original source code from [svn](http://code.google.com/p/aframework/source/browse/trunk/aFramework/Modules/Base/jquery.colourPicker.js) to git using these commands:

    git svn clone http://aframework.googlecode.com/svn/ --no-metadata -A authors.txt -T trunk/aFramework/Modules/Base colorpicker
    git filter-branch -f --prune-empty --index-filter 'git ls-tree -r --name-only --full-tree $GIT_COMMIT | grep -v "jquery.colourPicker.js" | grep -v "jquery.colourPicker.css" | xargs git rm --cached -r' -- --all
    git filter-branch -f --index-filter 'git rm --cached --ignore-unmatch aframework.js' --prune-empty -- --all
    rm -rf .git/refs/original/ && git reflog expire --all &&  git gc --aggressive --prune

Then I rewrote the commits using `git rebase -i`.

## License

[CC BY 3.0](http://creativecommons.org/licenses/by/3.0/), you are free:

- to Share — to copy, distribute and transmit the work
- to Remix — to adapt the work
- to make commercial use of the work

You must attribute the work in the manner specified by the author.

Copyright (C) 2008-2011 Andreas Lagerkvist
