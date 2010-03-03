/*
 * contactable 1.2.1 - jQuery Ajax contact form
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Revision: $Id: jquery.contactable.js 2010-01-18 $
 *
 */
 
//extend the plugin
(function($){

	//define the new for the plugin ans how to call it	
	$.fn.contactable = function(options) {
		//set default options  
		var defaults = {
			name: 'Name',
			email: 'Email',
			message : 'Message',
			subject : 'A contactable message',
			label_name: 'Name',
      label_email: 'E-Mail',
      label_website: 'Website',
      label_feedback: 'Your Feedback',
      label_send: 'SEND',
			recievedMsg : 'Thankyou for your message',
			notRecievedMsg : 'Sorry but your message could not be sent, try again later',
			disclaimer: 'Please feel free to get in touch, we value your feedback',
			hide_email: 'false',
      hide_website: 'false',
			fileMail: 'mail.php',
			hideOnSubmit: true
		};

		//call in the default otions
		var options = $.extend(defaults, options);
		//act upon the element that is passed into the design    
		return this.each(function(options) {
			//construct the form
			div_form = '<div id="contactable"></div><form id="contactForm" method="" action=""><div id="loading"></div><div id="callback"></div><div class="holder">';
			div_form += '<p><label for="name">'+defaults.label_name+' <span class="red"> * </span></label><br /><input id="name_mc" class="contact" name="name" /></p>';
			if(defaults.hide_email == 'false'){
			  div_form += '<p><label for="email">'+defaults.label_email+' <span class="red"> * </span></label><br /><input id="email_mc" class="contact" name="email" /></p>';
		  }
		  if(defaults.hide_website == 'false'){
			  div_form += '<p><label for="email">'+defaults.label_website+' <span class="red"> * </span></label><br /><input id="website_mc" class="contact" name="url" /></p>';
		  }
			div_form += '<p><label for="comment">'+defaults.label_feedback+' <span class="red"> * </span></label><br /><textarea id="comment_mc" name="comment" class="comment" rows="4" cols="30" ></textarea></p>';
			div_form += '<p><input class="submit" type="submit" value="'+defaults.label_send+'"/></p>';
			div_form += '<p class="disclaimer">'+defaults.disclaimer+'</p></div></form>';
			
			$(this).html(div_form);
			//show / hide function
			$('div#contactable').toggle(function() {
				$('#overlay').css({display: 'block'});
				$(this).animate({"marginLeft": "-=5px"}, "fast"); 
				$('#contactForm').animate({"marginLeft": "-=0px"}, "fast");
				$(this).animate({"marginLeft": "+=387px"}, "slow"); 
				$('#contactForm').animate({"marginLeft": "+=390px"}, "slow"); 
			}, 
			function() {
				$('#contactForm').animate({"marginLeft": "-=390px"}, "slow");
				$(this).animate({"marginLeft": "-=387px"}, "slow").animate({"marginLeft": "+=5px"}, "fast"); 
				$('#overlay').css({display: 'none'});
			});
			
			//validate the form 
			$("#contactForm").validate({
				//set the rules for the fild names
				rules: {
					name: {
						required: true,
						minlength: 2
					},
					email: {
						required: true,
						email: true
					},
					url: {
						required: true,
						url: true
					},
					comment: {
						required: true
					}
				},
				//set messages to appear inline
					messages: {
						name: "",
						email: "",
						url: "",
						comment: ""
					},			

				submitHandler: function() {
					$('.holder').hide();
					$('#loading').show();
					name_val = $('#contactForm #name_mc').val();
					if(defaults.hide_email == 'false') email_val = $('#contactForm #email_mc').val();
					else email_val = 'nothing';
					if(defaults.hide_website == 'false') website_val = $('#contactForm #website_mc').val();
					else website_val = 'nothing';
					comment_val = $('#contactForm #comment_mc').val();
					$.post(defaults.fileMail,{subject:defaults.subject, name: name_val, email: email_val, website: website_val, comment:comment_val},
					function(data){
						$('#loading').css({display:'none'}); 
						if( data == 'success') {
							$('#callback').show().append(defaults.recievedMsg);
							if(defaults.hideOnSubmit == true) {
								//hide the tab after successful submition if requested
								$('#contactForm').animate({dummy:1}, 2000).animate({"marginLeft": "-=450px"}, "slow");
								$('div#contactable').animate({dummy:1}, 2000).animate({"marginLeft": "-=447px"}, "slow").animate({"marginLeft": "+=5px"}, "fast"); 
								$('#overlay').css({display: 'none'});	
							}
						} else {
							$('#callback').show().append(defaults.notRecievedMsg);
						}
					});		
				}
			});
		});
	};
})(jQuery);

