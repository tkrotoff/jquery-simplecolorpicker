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

(function($) {

  /**
   * Constructor.
   */
  var Colorpicker = function(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, $.fn.colorpicker.defaults, options);
    this.picker = $('<div class="colorpicker"></div>').appendTo(document.body);

    // Build the list of colors
    // <li><a href="#" style="background-color: #111fff;">111fff</a></li>
    colorList = '';
    $.each(this.options.colors, function(index, color) {
      colorList += '<li><a href="#" style="background-color: #' + color + ';">' + color + '</a></li>';
    });

    // Attach the list of colors
    this.picker.html('<ul>' + colorList + '</ul>');

    // Click event
    this.$element.on('click', $.proxy(this.click, this));

    // Hide picker when clicking outside
    $(document).on('mousedown', $.proxy(this.hide, this));
  }

  /**
   * Colorpicker class.
   */
  Colorpicker.prototype = {
    constructor: Colorpicker,

    show: function() {
      // Show the picker next to the HTML element
      var elementPos = this.$element.offset();
      this.picker.css({
        position: 'absolute',
        left: elementPos.left,
        top: elementPos.top + this.$element.outerHeight()
      });

      this.picker.show(this.options.delay);
    },

    hide: function(e) {
      this.picker.hide();
    },

    click: function(e) {
      // When you click on a color inside the picker
      $('a', this.picker).click(function() {
        // The color is stored in the link's value
        var color = $(this).text();

        this.$element.trigger({
          type: 'changeColor',
          color: '#' + color
        });
      });

      this.show();
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
   * Default color picker options.
   */
  $.fn.colorpicker.defaults = {
    // Default colors
    colors: [
      // Colors from Google Calendar
      '7BD148', // Green
      '5484ED', // Bold blue
      'A4BDFC', // Blue
      '46D6DB', // Turquoise
      '7AE7BF', // Green
      '51B749', // Bold green
      'FBD75B', // Yellow
      'FFB878', // Orange
      'FF887C', // Red
      'DC2127', // Bold red
      'DBADFF', // Purple
      'E1E1E1', // Gray

      // More colors from Google Calendar
      'AC725E',
      'D06B64',
      'F83A22',
      'FA573C',
      'FF7537',
      'FFAD46',
      '42D692',
      '16A765',
      '7BD148',
      'B3DC6C',
      'FBE983',
      'FAD165',
      '92E1C0',
      '9FE1E7',
      '9FC6E7',
      '4986E7',
      '9A9CFF',
      'B99AFF',
      'C2C2C2',
      'CABDBF',
      'CCA6AC',
      'F691B2',
      'CD74E6',
      'A47AE2'
    ],

    // Animation delay
    delay: 0
  };

})(jQuery);
