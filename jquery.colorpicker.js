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

    // Hide select
    //this.select.hide();

    // Create the picker
    this.picker = $('<div class="colorpicker"></div>').appendTo(document.body);
    this.input = $('<input type="text" name="' + this.select.attr('name') + '" value="' + this.select.val() + '"/>').insertAfter(this.select);

    // Build the list of colors
    // <li><a href="#" title="Green" style="background-color: #7bd148;">#7bd148</a></li>
    var colorList = '';
    $('option', this.select).each(function() {
      var option = $(this);
      var color = option.val();
      var title = option.text();
      colorList += '<li><a href="#" title="' + title + '" style="background-color: ' + color + ';">' + color + '</a></li>';
    });

    // Attach the list of colors
    this.picker.html('<ul>' + colorList + '</ul>');

    // Click event
    this.picker.on('click', $.proxy(this.click, this));
    this.input.on('click', $.proxy(this.show, this));

    // Hide picker when clicking outside
    $(document).on('mousedown', $.proxy(this.hide, this));
    this.picker.on('mousedown', $.proxy(this.mousedown, this));
  }

  /**
   * Colorpicker class.
   */
  Colorpicker.prototype = {
    constructor: Colorpicker,

    show: function() {
      // Show the picker next to the HTML element
      var elementPos = this.input.offset();
      this.picker.css({
        position: 'absolute',
        left: elementPos.left,
        top: elementPos.top + this.input.outerHeight()
      });

      this.picker.show(this.options.delay);
    },

    hide: function() {
      this.picker.hide();
    },

    click: function(e) {
      var target = $(e.target).closest('a');
      if (target.length == 1) {
        switch (target[0].nodeName.toLowerCase()) {

          // When you click on a color inside the picker
          case 'a':
              // The color is stored inside the link
              var color = target.text();

              // Change select value
              this.select.val(color).change();

              // Hide the picker
              this.hide();

              break;
        }
      }
    },

    mousedown: function(e) {
      e.stopPropagation();
      e.preventDefault();
    },

    /**
     * Inverts a hex-color
     */
    colorInvert: function(colorHex) {
      var r = colorHex.substr(0, 2);
      var g = colorHex.substr(2, 2);
      var b = colorHex.substr(4, 2);

      return 0.212671 * r + 0.715160 * g + 0.072169 * b < 0.5 ? 'ffffff' : '000000'
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
    delay: 0
  };

}(window.jQuery);
