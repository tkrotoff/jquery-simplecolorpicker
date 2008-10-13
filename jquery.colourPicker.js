/***
@title:
Colour Picker

@version:
2.0

@author:
Andreas Lagerkvist

@date:
2008-09-16

@url:
http://andreaslagerkvist.com/jquery/colour-picker/

@license:
http://creativecommons.org/licenses/by/3.0/

@copyright:
2008 Andreas Lagerkvist (andreaslagerkvist.com)

@requires:
jquery, jquery.colourPicker.css, jquery.colourPicker.gif

@does:
Turns a drop-down (select-element) full of colours into a colour-picker-widget.

@howto:
jQuery('select[name="colour"]').colourPicker({ico: 'my-icon.gif', title: 'Select a colour from the list'}); Would replace the select with 'my-icon.gif' which, when clicked, would open a dialogue with the title 'Select a colour from the list'.

You can close the colour-picker without selecting a colour by clicking anywhere outside the colour-picker box.

Here's a handy PHP-function to generate a list of "web-safe" colours:

[code]
function gwsc() {
	$cs = array('00', '33', '66', '99', 'CC', 'FF');

	for($i=0; $i<6; $i++) {
		for($j=0; $j<6; $j++) {
			for($k=0; $k<6; $k++) {
				$c = $cs[$i] .$cs[$j] .$cs[$k];
				echo "<option value=\"$c\">#$c</option>\n";
			}
		}
	}
}
[/code]

Use it like this: <select name="colour"><?php gwsc(); ?></select>.

@exampleHTML:
<p>
	<label>
		Pick a colour<br />
		<select name="colour_1">
			<option value="ffffff">White</option>
			<option value="ff0000">Red</option>
			<option value="00ff00">Green</option>
			<option value="0000ff">Blue</option>
			<option value="000000">Black</option>
		</select>
	</label>
</p>

<p>
	<label>
		And one more<br />
		<select name="colour_2">
			<option value="ffffff">White</option>
			<option value="ff0000">Red</option>
			<option value="00ff00">Green</option>
			<option value="0000ff">Blue</option>
			<option value="000000">Black</option>
		</select>
	</label>
</p>

@exampleJS:
jQuery('#jquery-colour-picker-example select').colourPicker({ico: WEBROOT +'aFramework/Styles/__common/gfx/jquery.colourPicker.gif'});
***/
jQuery.fn.colourPicker = function(conf) {
	// Config for plug
	var config = jQuery.extend({
		ID:			'colour-picker',	// ID of colour-picker container
		ico:		'ico.gif',			// SRC to colour-picker icon
		title:		'Pick a colour',	// Default dialogue title
		inputBG:	true,				// Whether to change the input's background to the selected colour's
		speed:		500					// Speed of dialogue-animation
	}, conf);

	// Inverts a hex-colour
	var hexInvert = function(hex) {
		var r = hex.substr(0, 2);
		var g = hex.substr(2, 2);
		var b = hex.substr(4, 2);

		return 0.212671 * r + 0.715160 * g + 0.072169 * b < 0.5 ? 'ffffff' : '000000'
	};

	// Add the colour-picker dialogue if not added
	var colourPicker = jQuery('#' +config.ID);

	if(!colourPicker.length) {
		colourPicker = jQuery('<div id="' +config.ID +'"></div>').appendTo(document.body).hide();

		// Remove the colour-picker if you click outside it (on body)
		jQuery(document.body).click(function(event) {
			if(!(jQuery(event.target).is('#' +config.ID) || jQuery(event.target).parents('#' +config.ID).length)) {
				colourPicker.hide(config.speed);
			}
		});
	}

	// For every select passed to the plug-in
	return this.each(function() {
		// Insert icon and input
		var select	= jQuery(this);
		var icon	= jQuery('<a href="#"><img src="' +config.ico +'" alt="Open colour picker" /></a>').insertAfter(select);
		var input	= jQuery('<input type="text" name="' +select.attr('name') +'" size="6" />').insertAfter(select);
		var loc		= '';

		// Build a list of colours based on the colours in the select
		jQuery('option', select).each(function() {
			var option	= jQuery(this);
			var hex		= option.val();
			var title	= option.text();

			loc += '<li><a href="#" title="' +title +'" rel="' +hex +'" style="background: #' +hex +'; colour: ' +hexInvert(hex) +';">' +title +'</a></li>';
		});

		// Remove select
		select.remove();

		var iconPos = icon.offset();

		// When you click the icon
		icon.click(function() {
			// Show the colour-picker next to the icon and fill it with the colours in the select that used to be there
			colourPicker.html('<h2>' +config.title +'</h2><ul>' +loc +'</ul>').css({position: 'absolute', left: iconPos.left +'px', top: iconPos.top +'px'}).show(config.speed);

			// When you click a colour in the colour-picker
			jQuery('a', colourPicker).click(function() {
				// The hex is stored in the link's rel-attribute
				var hex = jQuery(this).attr('rel');

				input.val(hex);

				// If user wants to, change the input's BG to reflect the newly selected colour
				if(config.inputBG) {
					input.css({background: '#' +hex, color: '#' +hexInvert(hex)});
				}

				// Hide the colour-picker and return false
				colourPicker.hide(config.speed);

				return false;
			});

			return false;
		});
	});
};
