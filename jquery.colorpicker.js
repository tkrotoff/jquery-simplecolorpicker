/**
 * Very simple jQuery Color Picker.
 *
 * Copyright (C) 2012 Tanguy Krotoff
 *
 * Licensed under the MIT license.
 */

!function($) {

  /**
   * Constructor.
   */
  var Colorpicker = function(element, options) {
    this.select = $(element);
    this.options = $.extend({}, $.fn.colorpicker.defaults, options);

    this.select.hide();

    // Trick: fix span alignment
    // When a span does not contain any text, its alignment is not correct
    var fakeText = '&nbsp;&nbsp;&nbsp;&nbsp;';

    // Build the list of colors
    // <div title="Green" style="background-color: #7bd148;"></div>
    var colorList = '';
    $('option', this.select).each(function() {
      var option = $(this);
      var color = option.val();
      var title = option.text();
      colorList += '<div title="' + title + '" style="background-color: ' + color + ';">' + fakeText + '</div>';
    });

    if (this.options.picker) {
      var selectText = this.select.find('option:selected').text();
      var selectValue = this.select.val();
      this.icon = $('<span class="colorpicker icon" title="' + selectText + '" style="background-color: ' + selectValue + ';">'
                    + fakeText +
                    '</span>').insertAfter(this.select);
      this.icon.on('click', $.proxy(this.show, this));

      this.picker = $('<span class="colorpicker picker"></span>').appendTo(document.body);
      this.picker.html(colorList);
      this.picker.on('click', $.proxy(this.click, this));

      // Hide picker when clicking outside
      $(document).on('mousedown', $.proxy(this.hide, this));
      this.picker.on('mousedown', $.proxy(this.mousedown, this));
    } else {
      this.inline = $('<span class="colorpicker inline"></span>').insertAfter(this.select);
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
      var bootstrapArrowWidth = 16; // Empirical value
      var pos = this.icon.offset();
      this.picker.css({
        left: pos.left + this.icon.width() / 2 - bootstrapArrowWidth, // Middle of the icon
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

          // When you click on a color
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

    // Show the picker or make it inline
    picker: false
  };

}(window.jQuery);
