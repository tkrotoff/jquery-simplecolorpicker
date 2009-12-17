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
Use this plug-in on a normal <select>-element filled with colours to turn it in to a colour-picker widget that allows users to view all the colours in the drop-down as well as enter their own, preferred, custom colour. Only about 1k compressed.

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
		<select name="colour">
			<option value="ffffff">#ffffff</option>
			<option value="ffccc9">#ffccc9</option>
			<option value="ffce93">#ffce93</option>
			<option value="fffc9e">#fffc9e</option>
			<option value="ffffc7">#ffffc7</option>
			<option value="9aff99">#9aff99</option>
			<option value="96fffb">#96fffb</option>
			<option value="cdffff">#cdffff</option>
			<option value="cbcefb">#cbcefb</option>
			<option value="cfcfcf">#cfcfcf</option>
			<option value="fd6864">#fd6864</option>
			<option value="fe996b">#fe996b</option>
			<option value="fffe65">#fffe65</option>
			<option value="fcff2f">#fcff2f</option>
			<option value="67fd9a">#67fd9a</option>
			<option value="38fff8">#38fff8</option>
			<option value="68fdff">#68fdff</option>
			<option value="9698ed">#9698ed</option>
			<option value="c0c0c0">#c0c0c0</option>
			<option value="fe0000">#fe0000</option>
			<option value="f8a102">#f8a102</option>
			<option value="ffcc67">#ffcc67</option>
			<option value="f8ff00">#f8ff00</option>
			<option value="34ff34">#34ff34</option>
			<option value="68cbd0">#68cbd0</option>
			<option value="34cdf9">#34cdf9</option>
			<option value="6665cd">#6665cd</option>
			<option value="9b9b9b">#9b9b9b</option>
			<option value="cb0000">#cb0000</option>
			<option value="f56b00">#f56b00</option>
			<option value="ffcb2f">#ffcb2f</option>
			<option value="ffc702">#ffc702</option>
			<option value="32cb00">#32cb00</option>
			<option value="00d2cb">#00d2cb</option>
			<option value="3166ff">#3166ff</option>
			<option value="6434fc">#6434fc</option>
			<option value="656565">#656565</option>
			<option value="9a0000">#9a0000</option>
			<option value="ce6301">#ce6301</option>
			<option value="cd9934">#cd9934</option>
			<option value="999903">#999903</option>
			<option value="009901">#009901</option>
			<option value="329a9d">#329a9d</option>
			<option value="3531ff">#3531ff</option>
			<option value="6200c9">#6200c9</option>
			<option value="343434">#343434</option>
			<option value="680100">#680100</option>
			<option value="963400">#963400</option>
			<option value="986536">#986536</option>
			<option value="646809">#646809</option>
			<option value="036400">#036400</option>
			<option value="34696d">#34696d</option>
			<option value="00009b">#00009b</option>
			<option value="303498">#303498</option>
			<option value="000000">#000000</option>
			<option value="330001">#330001</option>
			<option value="643403">#643403</option>
			<option value="663234">#663234</option>
			<option value="343300">#343300</option>
			<option value="013300">#013300</option>
			<option value="003532">#003532</option>
			<option value="010066">#010066</option>
			<option value="340096">#340096</option>
		</select>
	</label>
</p>

@exampleJS:
jQuery('#jquery-colour-picker-example select').colourPicker({
	ico:	WEBROOT +'aFramework/Styles/gfx/jquery.colourPicker.gif', 
	title:	false
});
***/
jQuery.fn.colourPicker = function(conf) {
	// Config for plug
	var config = jQuery.extend({
		ID:					'colour-picker',	// ID of colour-picker container
		ico:				'ico.gif',			// SRC to colour-picker icon
		title:				'Pick a colour',	// Default dialogue title
		inputBG:			true,				// Whether to change the input's background to the selected colour's
		speed:				500,				// Speed of dialogue-animation
		allowTransparent:	false, 
		transparentTxt:		'Transparent', 
		transparentVal:		''
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
			if(!(jQuery(event.target).is(':input') || jQuery(event.target).is('#' +config.ID) || jQuery(event.target).parents('#' +config.ID).length)) {
				colourPicker.hide(config.speed);
			}
		});
	}

	// For every select passed to the plug-in
	return this.each(function() {
		// Insert icon and input
		var select	= jQuery(this);
		var icon	= jQuery('<a href="#"><img src="' +config.ico +'" alt="Open colour picker" /></a>').insertAfter(select);
		var input	= jQuery('<input type="text" name="' +select.attr('name') +'" value="' +select.val() +'" size="6" />').insertAfter(select);
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

		// If user wants to, change the input's BG to reflect the newly selected colour
		if(config.inputBG) {
			input.change(function() {
				var bg = '#' +input.val();

				if (bg == '#' + config.transparentVal) {
					var bg = 'transparent';
				}

				input.css({
					background: bg, 
					color: '#' +hexInvert(input.val())
				});
			});
		}

		// When you click the icon
		icon.click(function() {
			openColourPicker();

			return false;
		});

		// Or focus the input
		input.focus(function() {
			openColourPicker();

			return false;
		});

		// Open the colour picker
		var openColourPicker = function() {
			// Show the colour-picker next to the icon and fill it with the colours in the select that used to be there
			var iconPos	= icon.offset();
			var heading	= config.title ? '<h2>' +config.title +'</h2>' : '';
			var trans	= config.allowTransparent ? '<a href="#" rel="' +config.transparentVal +'">' +config.transparentTxt +'</a>' : '';

			colourPicker
				.html(heading +'<ul>' +loc +'</ul>' +trans)
				.css({
					position: 'absolute', 
					left: iconPos.left +'px', 
					top: iconPos.top +'px'
				})
				.show(config.speed, function () {
					if (jQuery.fn.bgiframe) {
						colourPicker.bgiframe();
					}
				});

			// When you click a colour in the colour-picker
			jQuery('a', colourPicker).click(function() {
				// The hex is stored in the link's rel-attribute
				var hex = jQuery(this).attr('rel');

				// Change val and trigger change-event on input
				input.val(hex).change();

				// Hide the colour-picker and return false
				colourPicker.hide(config.speed);

				return false;
			});
		};
	});
};
jQuery.fn.colourPicker = function (conf) {
	// Config for plug
	var config = jQuery.extend({
		id:			'jquery-colour-picker',	// id of colour-picker container
		ico:		'ico.gif',				// SRC to colour-picker icon
		title:		'Pick a colour',		// Default dialogue title
		inputBG:	true,					// Whether to change the input's background to the selected colour's
		speed:		500,					// Speed of dialogue-animation
		openTxt:	'Open colour picker'
	}, conf);

	// Inverts a hex-colour
	var hexInvert = function (hex) {
		var r = hex.substr(0, 2);
		var g = hex.substr(2, 2);
		var b = hex.substr(4, 2);

		return 0.212671 * r + 0.715160 * g + 0.072169 * b < 0.5 ? 'ffffff' : '000000'
	};

	// Add the colour-picker dialogue if not added
	var colourPicker = jQuery('#' + config.id);

	if (!colourPicker.length) {
		colourPicker = jQuery('<div id="' + config.id + '"></div>').appendTo(document.body).hide();

		// Remove the colour-picker if you click outside it (on body)
		jQuery(document.body).click(function(event) {
			if (!(jQuery(event.target).is('#' + config.id) || jQuery(event.target).parents('#' + config.id).length)) {
				colourPicker.hide(config.speed);
			}
		});
	}

	// For every select passed to the plug-in
	return this.each(function () {
		// Insert icon and input
		var select	= jQuery(this);
		var icon	= jQuery('<a href="#"><img src="' + config.ico + '" alt="' + config.openTxt + '" /></a>').insertAfter(select);
		var input	= jQuery('<input type="text" name="' + select.attr('name') + '" value="' + select.val() + '" size="6" />').insertAfter(select);
		var loc		= '';

		// Build a list of colours based on the colours in the select
		jQuery('option', select).each(function () {
			var option	= jQuery(this);
			var hex		= option.val();
			var title	= option.text();

			loc += '<li><a href="#" title="' 
					+ title 
					+ '" rel="' 
					+ hex 
					+ '" style="background: #' 
					+ hex 
					+ '; colour: ' 
					+ hexInvert(hex) 
					+ ';">' 
					+ title 
					+ '</a></li>';
		});

		// Remove select
		select.remove();

		// If user wants to, change the input's BG to reflect the newly selected colour
		if (config.inputBG) {
			input.change(function () {
				input.css({background: '#' + input.val(), color: '#' + hexInvert(input.val())});
			});
		}

		// When you click the icon
		icon.click(function () {
			// Show the colour-picker next to the icon and fill it with the colours in the select that used to be there
			var iconPos	= icon.offset();
			var heading	= config.title ? '<h2>' + config.title + '</h2>' : '';

			colourPicker.html(heading + '<ul>' + loc + '</ul>').css({
				position: 'absolute', 
				left: iconPos.left + 'px', 
				top: iconPos.top + 'px'
			}).show(config.speed);

			// When you click a colour in the colour-picker
			jQuery('a', colourPicker).click(function () {
				// The hex is stored in the link's rel-attribute
				var hex = jQuery(this).attr('rel');

				input.val(hex);

				// If user wants to, change the input's BG to reflect the newly selected colour
				if (config.inputBG) {
					input.css({background: '#' + hex, color: '#' + hexInvert(hex)});
				}

				// Trigger change-event on input
				input.change();

				// Hide the colour-picker and return false
				colourPicker.hide(config.speed);

				return false;
			});

			return false;
		});
	});
};
