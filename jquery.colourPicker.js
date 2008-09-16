/**
 * @title:		Colour Picker
 * @version:	2.0
 * @author:		Andreas Lagerkvist
 * @date:		2008-09-16
 * @url:		http://andreaslagerkvist.com/jquery/colour-picker/
 * @license:	http://creativecommons.org/licenses/by/3.0/
 * @copyright:	2008 Andreas Lagerkvist (andreaslagerkvist.com)
 * @requires:	jQuery
 * @usage:		$('select[name="colour"]').colourPicker(); Turns a drop-down full of colours into a colour-picker dialogue.
				You can use this PHP-function to generate a list of "web-safe" colours:

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

				Use it like this: <select name="colours"><?php gwsc(); ?></select>.
 **/
jQuery.fn.colourPicker = function(conf) {
	var config = jQuery.extend({
		ID:			'colour-picker',
		ico:		'ico.gif',
		title:		'Pick a colour',
		inputBG:	true,
		speed:		500
	}, conf);

	var hexInvert = function(hex) {
		return 'ffffff'; // Todo...

		var r = hex.substr(0, 2);
		var g = hex.substr(2, 2);
		var b = hex.substr(4, 2);
	};

	var colourPicker = jQuery('#' +config.ID);

	if(!colourPicker.length) {
		colourPicker = jQuery('<div id="' +config.ID +'"></div>').appendTo('body').hide();

		jQuery(document.body).click(function(event) {
			if(!(jQuery(event.target).is('#' +config.ID) || jQuery(event.target).parents('#' +config.ID).length)) {
				colourPicker.hide(config.speed);
			}
		});
	}

	return this.each(function() {
		var select	= jQuery(this);
		var icon	= jQuery('<a href="#" class="colour-picker-open"><img src="' +config.ico +'" alt="Open Colour-Picker" /></a>').insertAfter(select);
		var input	= jQuery('<input type="text" name="' +select.attr('name') +'" size="6" />').insertAfter(select);
		var iconPos = icon.offset();
		var loc		= '';

		jQuery('option', select).each(function() {
			var option	= jQuery(this);
			var hex		= option.val();
			var title	= option.text();

			loc += '<li><a href="#" title="' +title +'" rel="' +hex +'" style="background: #' +hex +'; colour: ' +hexInvert(hex) +';">' +title +'</a></li>';
		});

		select.remove();

		icon.click(function() {
			colourPicker.html('<h2>' +config.title +'</h2><ul>' +loc +'</ul>').css({position: 'absolute', left: iconPos.left +'px', top: iconPos.top +'px'}).show(config.speed);

			jQuery('a', colourPicker).click(function() {
				var hex = jQuery(this).attr('rel');

				input.val(hex);

				if(config.inputBG) {
					input.css({background: '#' +hex, color: '#' +hexInvert(hex)});
				}

				colourPicker.hide(config.speed);

				return false;
			});

			return false;
		});
	});
};