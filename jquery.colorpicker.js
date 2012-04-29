/**
 * jQuery Color Picker.
 *
 * Copyright (C) 2008-2011 Andreas Lagerkvist
 *
 * http://andreaslagerkvist.com/jquery/colour-picker/
 *
 * License: http://creativecommons.org/licenses/by/3.0/
 */
(function($) {
  $.fn.colorpicker = function(conf) {
    // Config for plugin
    var config = $.extend({
      colors: ["ffffff", "000000", "111fff", "C0C0C0", "FFF000"],
      delay: 0          // Animation delay for the dialog
    }, conf);

    // Inverts a hex-color
    var colorInvert = function(hex) {
      var r = hex.substr(0, 2);
      var g = hex.substr(2, 2);
      var b = hex.substr(4, 2);

      return 0.212671 * r + 0.715160 * g + 0.072169 * b < 0.5 ? 'ffffff' : '000000'
    };

    var dialog = $('#colorpicker');
    if (!dialog.length) {
      dialog = $('<div id="colorpicker"></div>').appendTo(document.body).hide();
    }

    // Remove the color-picker if you click outside it
    $(document).click(function(event) {
      if (!($(event.target).is('#colorpicker') || $(event.target).parents('#colorpicker').length)) {
        dialog.hide(config.delay);
      }
    });

    // For HTML element passed to the plugin
    return this.each(function() {
      var element = $(this);

      // Build the list of colors
      // <li><a href="#" style="background: #111fff; color: inverted-color;">111fff</a></li>
      var colorList = '';
      $.each(config.colors, function(index, color) {
        colorList += '<li><a href="#" style="background: #' + color + '; color: ' + colorInvert(color) + ';">' + color + '</a></li>';
      });

      // When you click on the HTML element
      element.click(function() {
        // Show the dialog next to the HTML element
        var elementPos = element.offset();
        dialog.html('<ul>' + colorList + '</ul>').css({
          position: 'absolute',
          left: elementPos.left + 'px',
          top: elementPos.top + 'px'
        }).show(config.delay);

        // When you click on a color inside the dialog
        $('a', dialog).click(function() {
          // The color hex is stored in the link's text
          var color = $(this).text();

          // Change the input's background to reflect the newly selected color
          element.css({background: '#' + color, color: '#' + colorInvert(color)});

          // Hide the color-picker and return false
          dialog.hide(config.delay);

          return false;
        });

        return false;
      });
    });
  };
})(jQuery);
