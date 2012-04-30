# Very simple jQuery color picker

Yet another jQuery color picker. The look integrates very well with Bootstrap Twitter.
Design and colors taken from Google Calendar.
The source code only requires jQuery and is about 100 lines of JavaScript.

![Screenshot](https://raw.github.com/tkrotoff/jquery-colorpicker/master/screenshot.png)

## How to use

Call the color picker via JavaScript:

    $('#mycolorpicker').colorpicker();

and pass some options if needed:

    $('#mycolorpicker').colorpicker({
      colors: ["FFFFFF", "000000", "111FFF", "C0C0C0", "FFF000"],
      delay: 500
    }).on('changeColor', function (event) {
      $(document.body).css('background-color', event.color);
    });

### Options

- colors: an array of colors to initialize the picker with
- delay: show and hide animation delay

### Events

- changeColor: triggered when a color has been selected by the user

## Original source code

The [original source code](http://andreaslagerkvist.com/jquery/colour-picker/) is from [Andreas Lagerkvist](http://andreaslagerkvist.com/).
I have extracted the original source code from [svn](http://code.google.com/p/aframework/source/browse/trunk/aFramework/Modules/Base/jquery.colourPicker.js) to git using these commands:

    git svn clone http://aframework.googlecode.com/svn/ --no-metadata -A authors.txt -T trunk/aFramework/Modules/Base colorpicker
    git filter-branch -f --prune-empty --index-filter 'git ls-tree -r --name-only --full-tree $GIT_COMMIT | grep -v "jquery.colourPicker.js" | grep -v "jquery.colourPicker.css" | xargs git rm --cached -r' -- --all
    git filter-branch -f --index-filter 'git rm --cached --ignore-unmatch aframework.js' --prune-empty -- --all
    rm -rf .git/refs/original/ && git reflog expire --all &&  git gc --aggressive --prune

Then I rewrote the commits using `git rebase -i`.

## Copyright and license

Copyright (C) 2008-2011 Andreas Lagerkvist

Copyright (C) 2012 Tanguy Krotoff

[CC BY 3.0](http://creativecommons.org/licenses/by/3.0/), you are free:

- to Share — to copy, distribute and transmit the work
- to Remix — to adapt the work
- to make commercial use of the work

You must attribute the work in the manner specified by the author.
