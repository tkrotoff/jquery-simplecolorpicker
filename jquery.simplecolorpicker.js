/**
 * Very simple jQuery Color Picker.
 *
 * Copyright (C) 2012 Tanguy Krotoff
 *
 * Licensed under the MIT license.
 */

(function($) {
  'use strict';

  /**
   * Constructor.
   */
  var SimpleColorPicker = function(select, options) {
    this.init('simplecolorpicker', select, options);
  };

  /**
   * SimpleColorPicker class.
   */
  SimpleColorPicker.prototype = {
    constructor: SimpleColorPicker,

    init: function(type, select, options) {
      var self = this;

      self.type = type;

      self.$select = $(select);
      var selectValue = self.$select.val();
      self.options = $.extend({}, $.fn.simplecolorpicker.defaults, options);

      self.$select.hide();

      // Trick: fix span alignment
      // When a span does not contain any text, its alignment is not correct
      var fakeText = '&nbsp;&nbsp;&nbsp;&nbsp;';

      self.$colorList = null;

      if (self.options.picker) {
        var selectText = self.$select.find('option:selected').text();
        self.$icon = $('<span class="simplecolorpicker icon" title="' + selectText + '" style="background-color: ' + selectValue + ';" role="button" tabindex="0">'
                     + fakeText
                     + '</span>').insertAfter(self.$select);
        self.$icon.on('click.' + self.type, $.proxy(self.showPicker, self));

        self.$picker = $('<span class="simplecolorpicker picker"></span>').appendTo(document.body);
        self.$colorList = self.$picker;

        // Hide picker when clicking outside
        $(document).on('mousedown.' + self.type, $.proxy(self.hidePicker, self));
        self.$picker.on('mousedown.' + self.type, $.proxy(self.mousedown, self));
      } else {
        self.$inline = $('<span class="simplecolorpicker inline"></span>').insertAfter(self.$select);
        self.$colorList = self.$inline;
      }

      // Build the list of colors
      // <div class="selected" title="Green" style="background-color: #7bd148;" role="button"></div>
      var colors = '';
      $('option', self.$select).each(function() {
        var option = $(this);
        var color = option.val();
        var title = option.text();
        var selected = '';
        if (option.prop('selected') === true || selectValue === color) {
          selected = 'class="selected"';
        }
        colors += '<div ' + selected + ' title="' + title + '" style="background-color: ' + color + ';" role="button" tabindex="0">'
                + fakeText
                + '</div>';
      });

      self.$colorList.html(colors);
      self.$colorList.on('click.' + self.type, $.proxy(self.click, self));
    },

    /**
     * Changes the selected color.
     *
     * @param color the hexadecimal color to select, ex: '#fbd75b'
     */
    selectColor: function(color) {
      var self = this;

      var colorDiv = self.$colorList.find('div').filter(function() {
        var col = $(this).css('background-color');
        return self.rgb2hex(col) === color;
      });

      if (colorDiv.length > 0) {
        self.selectColorDiv(colorDiv);
      } else {
        console.error("The given color '" + color + "' could not be found");
      }
    },

    showPicker: function() {
      var bootstrapArrowWidth = 16; // Empirical value
      var pos = this.$icon.offset();
      this.$picker.css({
        left: pos.left + this.$icon.width() / 2 - bootstrapArrowWidth, // Middle of the icon
        top: pos.top + this.$icon.outerHeight()
      });

      this.$picker.show(this.options.delay);
    },

    hidePicker: function() {
      this.$picker.hide(this.options.delay);
    },

    /**
     * Selects the given div inside $colorList.
     *
     * The given div becomes the selected one.
     * It also changes the HTML select value, this will emit the 'change' event.
     */
    selectColorDiv: function(colorDiv) {
      var color = colorDiv.css('background-color');
      var title = colorDiv.prop('title');

      // Mark this div as the selected one
      colorDiv.siblings().removeClass('selected');
      colorDiv.addClass('selected');

      if (this.options.picker) {
        this.$icon.css('background-color', color);
        this.$icon.prop('title', title);
        this.hidePicker();
      }

      // Change HTML select value
      this.$select.val(this.rgb2hex(color)).change();
    },

    /**
     * The user clicked on a div inside $colorList.
     */
    click: function(e) {
      var target = $(e.target);
      if (target.length === 1) {
        if (target[0].nodeName.toLowerCase() === 'div') {
          // When you click on a color, make it the new selected one
          this.selectColorDiv(target);
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
      function hex(x) {
        return ('0' + parseInt(x, 10).toString(16)).slice(-2);
      }

      var matches = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
      if (matches === null) {
        // Fix for Internet Explorer < 9
        // Variable rgb is already a hexadecimal value
        return rgb;
      } else {
        return '#' + hex(matches[1]) + hex(matches[2]) + hex(matches[3]);
      }
    },

    destroy: function() {
      if (this.options.picker) {
        this.$icon.off('.' + this.type);
        this.$icon.remove();
        $(document).off('.' + this.type);
      }

      this.$colorList.off('.' + this.type);
      this.$colorList.remove();

      this.$select.removeData(this.type);
      this.$select.show();
    }
  };

  /**
   * Plugin definition.
   * How to use: $('#id').simplecolorpicker()
   */
  $.fn.simplecolorpicker = function(option) {
    var args = $.makeArray(arguments);
    args.shift();

    // For HTML element passed to the plugin
    return this.each(function() {
      var $this = $(this),
        data = $this.data('simplecolorpicker'),
        options = typeof option === 'object' && option;
      if (data === undefined) {
        $this.data('simplecolorpicker', (data = new SimpleColorPicker(this, options)));
      }
      if (typeof option === 'string') {
        data[option].apply(data, args);
      }
    });
  };

  /**
   * Default options.
   */
  $.fn.simplecolorpicker.defaults = {
    // Animation delay
    delay: 0,

    // Show the picker or make it inline
    picker: false
  };

})(jQuery);
