/**
 * Very simple jQuery Color Picker.
 *
 * Copyright (C) 2008-2011 Andreas Lagerkvist
 * Copyright (C) 2012 Tanguy Krotoff
 *
 * Original source code and demo: http://andreaslagerkvist.com/jquery/colour-picker/
 *
 * License: http://creativecommons.org/licenses/by/3.0/
 */

!function($) {

  /**
   * Constructor.
   */
  var Colorpicker = function(element, options) {
    this.select = $(element);
    this.options = $.extend({}, $.fn.colorpicker.defaults, options);

    this.select.hide();

    // Build the list of colors
    // <div title="Green" style="background-color: #7bd148;"></div>
    var colorList = '';
    $('option', this.select).each(function() {
      var option = $(this);
      var color = option.val();
      var title = option.text();
      colorList += '<div title="' + title + '" style="background-color: ' + color + ';"></div>';
    });

    if (this.options.picker) {
      this.icon = $('<span class="colorpicker-icon" title="' + this.select.find('option:selected').text() + '" style="background-color: ' + this.select.val() + ';"></span>').insertAfter(this.select);
      this.icon.on('click', $.proxy(this.show, this));

      this.picker = $('<span class="colorpicker picker"></span>').appendTo(document.body);
      this.picker.html(colorList);
      this.picker.on('click', $.proxy(this.click, this));

      // Hide picker when clicking outside
      $(document).on('mousedown', $.proxy(this.hide, this));
      this.picker.on('mousedown', $.proxy(this.mousedown, this));
    } else {
      this.inline = $('<span class="colorpicker"></span>').insertAfter(this.select);
      this.inline.html(colorList);
      this.inline.on('click', $.proxy(this.click, this));
    }
  }

  /**
   * Colorpicker class.
   */
  Colorpicker.prototype = {
    constructor: Colorpicker,

    show: function() {
      var pos = this.icon.offset();
      this.picker.css({
        left: pos.left - this.icon.outerWidth() / 2,
        top: pos.top + this.icon.outerHeight()
      });

      this.picker.show(this.options.delay);
    },

    hide: function() {
      this.picker.hide(this.options.delay);
    },

    click: function(e) {
      var target = $(e.target);
      if (target.length == 1) {
        switch (target[0].nodeName.toLowerCase()) {

          // When you click on a color inside the picker
          case 'div':
            var color = target.css('background-color');
            var title = target.attr('title');

            // Mark this div as the active one
            target.siblings().removeClass('active');
            target.addClass('active');

            if (this.options.picker) {
              this.icon.css('background-color', color);
              this.icon.attr('title', title);

              // Hide the picker
              this.hide();
            }

            // Change select value
            this.select.val(this.rgb2hex(color)).change();

            break;

        }
      }
    },

    /**
     * Prevents the mousedown event from "eating" the click event.
     */
    mousedown: function(e) {
      e.stopPropagation();
      e.preventDefault();
    },

    /**
     * Inverts a hex-color.
     */
    invertColor: function(hex) {
      var r = hex.substr(0, 2);
      var g = hex.substr(2, 2);
      var b = hex.substr(4, 2);

      return 0.212671 * r + 0.715160 * g + 0.072169 * b < 0.5 ? 'ffffff' : '000000'
    },

    /**
     * Converts a RGB color to its hexadecimal value.
     *
     * See http://stackoverflow.com/questions/1740700/get-hex-value-rather-than-rgb-value-using-jquery
     */
    rgb2hex: function(rgb) {
      rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      function hex(x) {
        return ("0" + parseInt(x).toString(16)).slice(-2);
      }
      return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }
  }

  /**
   * Plugin definition.
   */
  $.fn.colorpicker = function(option) {
    // For HTML element passed to the plugin
    return this.each(function () {
      var $this = $(this),
      data = $this.data('colorpicker'),
      options = typeof option == 'object' && option;
      if (!data) {
        $this.data('colorpicker', (data = new Colorpicker(this, options)));
      }
      if (typeof option == 'string') data[option]();
    });
  }

  $.fn.colorpicker.Constructor = Colorpicker;

  /**
   * Default options.
   */
  $.fn.colorpicker.defaults = {
    // Animation delay
    delay: 0,

    picker: false
  };

}(window.jQuery);
