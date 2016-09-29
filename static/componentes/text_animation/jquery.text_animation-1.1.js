/*
jQuery Text Animation, by Damian Szewczyk (netkevin)
damian.szewczyk@gmail.com
Version 1.1
Text Animation plugin lets you to add to any text specified text animations. Currently those are: random_explosion, random_implosion, sinusoid, twitching, mouseover_escape, shuffle, typing.
Just choose a container with a text and fire "netkevin_text_animation" on it with chosen animation method and animation settings.
General usage:
$(selector).netkevin_text_animation(method_name, [settings]);

Example usage:
$("#div_with_text").netkevin_text_animation("random_explosion", { timer: 2000, font_start: '12px', font_end: '56px', fade_out: true, radius: 300 },  function(){ alert('Callback function!')});

Added in 1.1
- callback functions after effect is finished
- 'typing' effect
- multiline support for: random_explosion, random_implosion, twitching, mouseover_escape, typing
*/

(function($) {
	var nk_unique_id_var = 0;
	var methods = {
		//Helper functions
		//generate next unique id number
		nk_unique_id : function() {
			nk_unique_id_var++;
			return nk_unique_id_var;
		},
		//function to get a random number from 1 to n
		rand : function(n) {
			return ( Math.floor ( Math.random () * n + 1 ) );
		},
		//shuffles the array
		shuffle_array : function(o){ 
			for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
			return o;
		},
		
		//Animation methods below
		
		/* Random explosion - the characters explode in random directions for radius set (font size can be changed too)
		Settings:
		param	 options                  hash                    object containing config options
		param	 options[timer]       	  int                     animation duration (in miliseconds)
		param	 options[font_start]      string				  font size when animation starts
		param	 options[font_end]		  string				  font size when animation ends
		param	 options[fade_out]	  	  bool				  	  should animated characters fade out (true)
		param	 options[radius]       	  int                     the explosion radius - how far the characters will explode (in px)
		*/
		random_explosion : function(options, callback) {
			return this.each(function() {
				var settings = {
					timer: 1500,
					font_start: '18px',
					font_end: '56px',
					fade_out: true, 
					radius: 300
				};
				if (options) $.extend(settings, options);
				$this = $(this);
				$this.addClass("netkevin_text_animation");
				var text = $this.text();
				$this.html('');
				var text_width = 0,
				positions = [],
				offset;
				var callbackFired = false;
				//animate each character
				for (var i=0; i < text.length; i++) {
					letter = (text.charAt(i) == ' ') ? " " : text.charAt(i);
					unique_id = methods.nk_unique_id();
					$this.append('<span id="l' + unique_id + '" style=";font-size:' + settings.font_start + 'px">' + letter + '</span>');
					letter_width =  $this.find('#l'+unique_id).width();
					
					text_width += letter_width;		
				}	
				
				// Calculate positions
				$(this).find('span').each( function(index) {
					//store current positions
					offset = $(this).position();
					positions.push([offset.left, offset.top]);
				});
				
				// Set absolute positions for each letter and fire explosion
				$(this).find('span').each( function(index) {
					var offset = positions[index];
					$(this).addClass("netkevin-letter").css({top: offset[1], left: offset[0]});
					left_sign = (methods.rand(2) == 1) ? '+' : '-';
					top_sign = (methods.rand(2) == 1) ? '+' : '-';
				    $(this).animate({
						opacity: (settings.fade_out) ? 0 : 1,
						fontSize: settings.font_end,
						left: left_sign + '=' + methods.rand(settings.radius),
						top: top_sign + '=' + methods.rand(settings.radius)
					}, settings.timer, function() {
						 // now call a callback function
						if($.isFunction(callback)){
							if(!callbackFired) {
								callback.call(this);
								callbackFired = true;
							}
						}
					});
				});
			});			
		},	
		
		/* Random implosion - the characters implode to a straight text from random directions from radius set (font size can be changed too)
		Settings:
		param	 options                  hash                    object containing config options
		param	 options[timer]       	  int                     animation duration (in miliseconds)
		param	 options[font_start]      string				  font size when animation starts
		param	 options[font_end]		  string				  font size when animation ends
		param	 options[radius]       	  int                     the explosion radius - how far the characters will explode (in px)
		*/
		random_implosion : function(options, callback) {
			return this.each(function() {
				var settings = {
					timer: 1500,
					font_start: '56px',
					font_end: '18px',
					radius: 300
				};
				if (options) $.extend(settings, options);
				$this = $(this);
				$this.addClass("netkevin_text_animation");
				var text = $this.text();
				$this.html('');
				var text_width = 0,
				positions = [],
				offset;
				var callbackFired = false;
				//animate each character
				for (var i=0; i < text.length; i++) {
					letter = (text.charAt(i) == ' ') ? " " : text.charAt(i);
					unique_id = methods.nk_unique_id();
					$this.append('<span id="l' + unique_id + '" style="font-size:' + settings.font_end + ';">' + letter + '</span>');
					letter_width =  $('#l'+unique_id).width();
					//$this.find('#l'+unique_id).css({'font-size': settings.font_start, 'opacity': 0 });
					
					text_width += letter_width;		
				}

				// Calculate positions
				$(this).find('span').each( function(index) {
					//store current positions
					offset = $(this).position();
					positions.push([offset.left, offset.top]);
				});
				
				// Set absolute positions for each letter and fire explosion
				$(this).find('span').each( function(index) {
					var offset = positions[index];
					left_sign = (methods.rand(2) == 1) ? methods.rand(settings.radius) : - methods.rand(settings.radius);
					top_sign = (methods.rand(2) == 1) ? methods.rand(settings.radius) : - methods.rand(settings.radius);
					$(this).addClass("netkevin-letter").css({'font-size': settings.font_start, opacity: 0, top: top_sign, left: left_sign });
				    $(this).animate({
						fontSize: settings.font_end,
						opacity: 1,
						left: offset[0],
						top: offset[1]
					  }, settings.timer, function() {
						 // now call a callback function
						if($.isFunction(callback)){
							if(!callbackFired) {
								callback.call(this);
								callbackFired = true;
							}
						}					  
					  });
				});
			});
		},
		
		/* Sinusoid - the characters form a sinusoid. There can be continous animation of "waving" sinusoid
		Settings:
		param	 options                  hash                    object containing config options
		param	 options[timer]       	  int                     animation duration (in miliseconds)
		param	 options[height]      	  int				  	  the height of sinusoid (in px)
		param	 options[width_proportion]int		  			  the proportional width, comparing to current text width (ie. 2 means that the sinusoid will be 2 times wider)
		param	 options[sinus_width]     float                   the sinus function width (the full sinusoid is for 2*Math.PI, but can be wider or narrower)
		param	 options[continous_animation]bool				  if true, the animation will be continues (changing from sinus to cosinus)
		*/
		sinusoid : function(options, callback) {
			return this.each(function() {
				var settings = {
					timer: 1500,
					height: 50,
					width_proportion: 1,
					sinus_width: 2*Math.PI,
					continous_animation: true
				};

				if (options) $.extend(settings, options);
				//set minimum time for continous animation (because browser could hang)
				if (settings.continous_animation) {
					if (settings.timer < 500) {
						settings.timer = 500;
					}
				}
				$this = $(this);
				$this.addClass("netkevin_text_animation");
				var text = $this.text();
				$this.find("span").data("remove", 1).stop(true, true).hide().appendTo("body"); //stop any previous animation
				$this.html('');
				total = 0;
				var text_width = 0;
				var callbackFired = false;
				//split word to single characters
				for (var i = 0; i < text.length; i++) {
					letter = (text.charAt(i) == ' ') ? "&nbsp;" : text.charAt(i);
					unique_id = methods.nk_unique_id();
					$this.append('<span id="l' + unique_id + '" class="netkevin-letter" style="left:' + text_width + 'px">' + letter + '</span>');
					letter_width =  $this.find('#l'+unique_id).width();
					text_width += letter_width;
					if (i == 0) { index_start = unique_id; }
				}
				explosion_width = settings.width_proportion * text_width;
				var interval = parseFloat((settings.sinus_width) / (text.length - 1)); //calculate the interval 
				//explosion_width / Math.PI = explosion_interval / interval 
				explosion_interval = (explosion_width * interval) / (settings.sinus_width); //final interval between characters
				//starting left position
				left_pos = -((explosion_width - text_width) / 2);
				index_end = index_start + (text.length - 1);
				//animate each character
				for (var i = index_start; i < index_end; i++) {
					  left_sign = (left_pos < 0) ? '-' : '+';
					  var top_pos = Math.sin(total) * settings.height;
					  
					  $this.find('#l'+i).animate({
						left:  (settings.width_proportion != 1) ? left_pos : '+=0',
						top: '-=' + top_pos
					  }, settings.timer, function() {
						if (settings.continous_animation) {
							animateTop($(this), settings);
						} else {
							// now call a callback function
							if($.isFunction(callback)){
								if(!callbackFired) {
									callback.call(this);
									callbackFired = true;
								}
							}
						}
					 });
					 
					left_pos += explosion_interval;
					total += interval;
				}
			});
			//recurrent function that changes top CSS position
			function animateTop(object, settings){
				if (object.data("remove")) { //stop animation and remove object
					object.remove();
					return false;
				}
				object.animate({	
						top: '-=' + (2*(parseFloat(object.css("top"))))
					}, settings.timer, function() {
						animateTop(object, settings);
					});
			}
		},
	
		/* Twitching - the characters are moving out from their positions and go back (can be random or set). Can be continous animation or repeated number of times
		Settings:
		param	 options                  hash                    object containing config options
		param	 options[timer]       	  int                     animation duration (in miliseconds)
		param	 options[horizontal_shift]int				  	  the maximum horizontal shift for single character (in px) (or top position for random=false)
		param	 options[vertical_shift]  int		  			  the maximum vertical shift for single character (in px) (or left position for random=false)
		param	 options[repeat]     	  int                     how many times repeat the animation, 0 = neverending
		param	 options[random]		  bool				      if true, the shifts are random, if false the shifts are set (top and left CSS position)
		*/
		twitching : function(options, callback) {
			var callbackFired = false;
			return this.each(function() {
				var settings = {
					timer: 500,
					horizontal_shift: 20,
					vertical_shift: 20,
					repeat: 0, //0 = neverending
					random: true
				};
				if (options) $.extend(settings, options);
				$this = $(this);
				$this.addClass("netkevin_text_animation");
				var text = $this.text();
				if($this.find("span").length) {
					$this.find("span").data("repeat", 1).data("remove", 1).stop(true, true).hide().appendTo("body"); 
				}
				$this.html('');
				var text_width = 0,
				positions =[],
				offset;
				
				//animate each character
				for (var i=0; i < text.length; i++) {
					letter = (text.charAt(i) == ' ') ? " " : text.charAt(i);
					unique_id = methods.nk_unique_id();
					$this.append('<span id="l' + unique_id + '">' + letter + '</span>');
					letter_obj = $this.find('#l'+unique_id);
					letter_width =  letter_obj.width();
					left_sign = (methods.rand(2) == 1) ? '+' : '-';
					top_sign = (methods.rand(2) == 1) ? '+' : '-';
					//store current positions
					letter_obj.data("repeat", settings.repeat);
					
					
					text_width += letter_width;		
				}
				
				// Calculate positions
				$(this).find('span').each( function(index) {
					//store current positions
					offset = $(this).position();
					positions.push([offset.left, offset.top]);
					$(this).data("current_left", offset.left);
					$(this).data("current_top", offset.top);
				});
				
				// Set absolute positions for each letter
				$(this).find('span').each( function(index) {
					var offset = positions[index];
					$(this).addClass("netkevin-letter").css({top: offset[1], left: offset[0]});
					if(settings.random) {
						left_sign = (methods.rand(2) == 1) ? '+' : '-';
						top_sign = (methods.rand(2) == 1) ? '+' : '-';
						var set_top = top_sign + '=' + methods.rand(settings.vertical_shift);
						var set_left = left_sign + '=' + methods.rand(settings.horizontal_shift);
					} else {
						var set_top = '+=' + settings.vertical_shift;
						var set_left = '+=' + settings.horizontal_shift;
					}
				    $(this).animate({
						left: set_left,
						top: set_top
					}, settings.timer, function() {
						animateShake($(this), settings,  true, callback);
					});
				});
			});
			

			
			//recurrent function that animates top and left CSS positions
			function animateShake(object, settings, go_back, callback) {

				if(object == undefined || object.length == 0) {
					return false;
				}
				if (go_back) {
					var set_top = object.data("current_top");
					var set_left = object.data("current_left");
				} else {
					repeat = object.data("repeat");
					if (repeat != 0) {
						repeat = repeat - 1;
						if (repeat <= 0) { //stop the animation
							object.data("repeat", -1);
							if (object.data("remove")) {
								object.remove();
							}
							// now call a callback function
							if($.isFunction(callback)){
								if(!callbackFired) {
									callback.call(this);
									callbackFired = true;
								}
							}							
							return false;
						} else {
							object.data("repeat", repeat);
						}
					}
					if(settings.random) {
						left_sign = (methods.rand(2) == 1) ? '+' : '-';
						top_sign = (methods.rand(2) == 1) ? '+' : '-';
						var set_top = top_sign + '=' + methods.rand(settings.vertical_shift);
						var set_left = left_sign + '=' + methods.rand(settings.horizontal_shift);
					} else {
						var set_top = '+=' + settings.vertical_shift;
						var set_left = '+=' + settings.horizontal_shift;
					}
				}
				object.animate({	
						top: set_top,
						left: set_left
					}, settings.timer, function() {
						go_back = !go_back;
						animateShake(object, settings, go_back, callback);
					});
			}
		},	
		
		/* Mouseover escape - characters escaping after mouseover
		Settings:
		param	 options                  hash                    object containing config options
		param	 options[timer]       	  int                     animation duration (in miliseconds)
		param	 options[horizontal_shift]int				  	  the maximum horizontal shift for single character (in px) (or top position for random=false)
		param	 options[vertical_shift]  int		  			  the maximum vertical shift for single character (in px) (or left position for random=false)
		param	 options[random]		  bool				      if true, the shifts are random, if false the shifts are set (top and left CSS position)
		*/
		mouseover_escape : function(options, callback) {
			return this.each(function() {
				var settings = {
					timer: 500,
					horizontal_shift: 20,
					vertical_shift: 20,
					random: true
				};
				if (options) $.extend(settings, options);
				$this = $(this);
				$this.addClass("netkevin_text_animation");
				var text = $this.text(),
				positions = [],
				offset;
				$this.html('');
				var text_width = 0;
				//animate each character
				for (var i=0; i < text.length; i++) {
					letter = (text.charAt(i) == ' ') ? " " : text.charAt(i);
					unique_id = methods.nk_unique_id();
					$this.append('<span id="l' + unique_id + '">' + letter + '</span>');//left:' + text_width + 'px;top:0px;
					letter_obj = $this.find('#l'+unique_id);
					letter_width =  letter_obj.width();
					left_sign = (methods.rand(2) == 1) ? '+' : '-';
					top_sign = (methods.rand(2) == 1) ? '+' : '-';
					
					
				    letter_obj.mouseover( function() {
						if($(this).queue().length == 0)
							animateShake($(this), settings);
					});
					text_width += letter_width;		
				}
				// Calculate positions
				$(this).find('span').each( function(index) {
					//store current positions
					offset = $(this).position();
					positions.push([offset.left, offset.top]);
					$(this).data("current_left", offset.left);
					$(this).data("current_top", offset.top);
				});
				
				// Set absolute positions for each letter
				$(this).find('span').each( function(index) {
					var offset = positions[index];
					$(this).addClass("netkevin-letter").css({top: offset[1], left: offset[0]});
				});
				
			});
			//function that animates top and left CSS positions - and then go back to previous position 
			function animateShake(object, settings) {
				var current_top = object.data("current_top");
				var current_left = object.data("current_left");
				if(settings.random) {
					left_sign = (methods.rand(2) == 1) ? '+' : '-';
					top_sign = (methods.rand(2) == 1) ? '+' : '-';
					var set_top = top_sign + '=' + methods.rand(settings.vertical_shift);
					var set_left = left_sign + '=' + methods.rand(settings.horizontal_shift);
				} else {
					var set_top = '+=' + settings.vertical_shift;
					var set_left = '+=' + settings.horizontal_shift;
				}
				object.animate({	
						top: set_top,
						left: set_left
					}, settings.timer, function() {
						
						object.animate({
							top: current_top,
							left: current_left
						}, settings.timer,
						function() {
							var callbackFired = false;
							// now call a callback function
							if($.isFunction(callback)){
								if(!callbackFired) {
									callback.call(this);
									callbackFired = true;
								}
							}	
						}
						);
					});
			}
		},	

		/* Shuffle - characters in the text are shuffled
		Settings:
		param	 options                  hash                    object containing config options
		param	 options[timer]       	  int                     animation duration (in miliseconds)
		*/
		shuffle : function(options, callback) {
			return this.each(function() {
				var settings = {
					timer: 1000
				};
				if (options) $.extend(settings, options);
				$this = $(this);
				$this.addClass("netkevin_text_animation");
				var text = $this.text();
				$this.html('');
				var text_width = 0;
				var callbackFired = false;
				var characters = new Array();
				//split the text to single characters and wrpa them wth <span>
				for (var i=0; i < text.length; i++) {
					letter = (text.charAt(i) == ' ') ? "&nbsp;" : text.charAt(i);
					unique_id = methods.nk_unique_id();
					$this.append('<span id="l' + unique_id + '" class="netkevin-letter" style="top:0px;left:' + text_width + 'px">' + letter + '</span>');
					letter_width =  $this.find('#l'+unique_id).width();
					characters[i] = $this.find('#l'+unique_id);
					if(i == 0) { index_start =  unique_id; }
					text_width += letter_width;		
				}
				
				
				//left:' + text_width + 'px;top:0px;
				characters = methods.shuffle_array(characters);
				text_width = 0;
				var new_word = '';
				//animate each character
				for (var i in characters) {
					letter = characters[i];
					new_word = new_word + letter.text();
					letter.animate({
						left:  text_width
					}, settings.timer, function() {
						// now call a callback function
						if($.isFunction(callback)){
							if(!callbackFired) {
								callback.call(this);
								callbackFired = true;
							}
						}						
					});
					letter_width = letter.width();
					text_width += letter_width;
				}
				setTimeout(function() { $this.text(new_word);  
				}, (settings.timer+10));
			});

		},

		/* Typing - characters are typed onto the screen
		Settings:
		param	 options                  hash                    object containing config options
		param	 options[timer]       	  int                     animation duration (in miliseconds)
		*/
		typing : function(options, callback) {
			return this.each(function() {
				var settings = {
					timer: 100
				};
				if (options) $.extend(settings, options);
				$this = $(this);
				$this.addClass("netkevin_text_animation");
				var text = $this.text();
				$this.html('');
				var text_width = 0;
				var callbackFired = false;
				var characters = new Array();
				//split the text to single characters
				var timeout = settings.timer;
				for (var i=0; i < text.length; i++) {
					characters[i] = (text.charAt(i) == ' ') ? " " : text.charAt(i);
				}
				//for (var i in characters) {
					var interval = setInterval(function(){ 
						letter = characters.shift();
						$this.append(letter); 
						if(characters.length == 0) {
							clearInterval(interval);
							if($.isFunction(callback)){
								if(!callbackFired) {
									callback.call(this);
									callbackFired = true;
								}
							}
						}
					}, timeout);	
					//timeout = timeout + settings.timer;
				//}
			});

		}		
	
	};

	//extend jQuery to add "netkevin_text_animation" function
   $.fn.netkevin_text_animation = function( method ) {
    //fire the chosen method or return error if not exists
    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ), Array.prototype.slice.call( arguments, 2 ));
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.netkevin_text_animation' );
    }    
  
  };
	//add some CSS - so there is no need to add this styles manually 
	$("<style>.netkevin_text_animation { position: relative; } .netkevin_text_animation .netkevin-letter { position: absolute; display: block; z-index: 10000; }</style><!--[if lte IE 8]><style>.netkevin_text_animation {white-space: pre-wrap; }</style><![endif]-->").appendTo("head");
})( jQuery );