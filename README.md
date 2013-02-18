# Very simple jQuery color picker

Yet another jQuery color picker. This plugin is unobtrusive and integrates well with Twitter Bootstrap (it works just fine without).
The source code only requires jQuery and is about 200 lines of JavaScript and 100 lines of CSS.

Try the demo [online](http://plnkr.co/edit/VVclW0?p=preview) on Plunker.

* By default it shows the colors inline:

![simplecolorpicker-inline.png](http://img15.hostingpics.net/pics/179473simplecolorpickerinline.png)

* You can show the colors inside a picker:

![simplecolorpicker-picker.png](http://img15.hostingpics.net/pics/748637simplecolorpickerpicker.png)

* It integrates well with Twitter Bootstrap if you use this framework:

![simplecolorpicker-inline-bootstrap.png](http://img15.hostingpics.net/pics/516842simplecolorpickerinlinebootstrap.png)

* And the whole is unobtrusive and based on the regular HTML select tag:

![simplecolorpicker-select.png](http://img15.hostingpics.net/pics/368680simplecolorpickerselect.png)

## How to use

Create a HTML select:

```html
<select name="colorpicker">
  <!-- Colors from Google Calendar -->
  <option value="#7bd148">Green</option>
  <option value="#5484ed">Bold blue</option>
  <option value="#a4bdfc">Blue</option>
  <option value="#46d6db">Turquoise</option>
  <option value="#7ae7bf">Light green</option>
  <option value="#51b749">Bold green</option>
  <option value="#fbd75b">Yellow</option>
  <option value="#ffb878">Orange</option>
  <option value="#ff887c">Red</option>
  <option value="#dc2127">Bold red</option>
  <option value="#dbadff">Purple</option>
  <option value="#e1e1e1">Gray</option>
</select>
```

add the plugin files:

```html
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js"></script>
<script src="jquery.simplecolorpicker.js"></script>

<link rel="stylesheet" type="text/css" href="jquery.simplecolorpicker.css"/>
```

then call the plugin:

```javascript
$('select[name="colorpicker"]').simplecolorpicker();
```

and pass some options if needed:

```javascript
$('select[name="colorpicker"]').simplecolorpicker({
  picker: true
}).change(function() {
  $(document.body).css('background-color', $('select[name="colorpicker"]').val());
});
```

### Options

- picker: show the colors inside a picker instead of inline (default: false)
- delay: show and hide animation delay (default: 0)

## Browser support

Simplecolorpicker supports all modern browsers starting with Internet Explorer 8 included.

## HTML5 new color input

HTML5 provides a new input to select colors. Its implementation inside modern browsers is still lacking.
The new color input does not provide any option to customize the color list and
most of the time the widget is less user-friendly than the one provided by simplecolorpicker.

See http://slides.html5rocks.com/#new-form-types

See http://dev.w3.org/html5/markup/input.color.html#input.color

## Ruby on Rails

A gem is available at https://github.com/tkrotoff/jquery-simplecolorpicker-rails

## Copyright and license

Licensed under the MIT license.
Copyright (C) 2012-2013 Tanguy Krotoff <tkrotoff@gmail.com>
