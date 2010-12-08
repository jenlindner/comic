$(document).ready(function(){

	/* This code is executed on the document ready event */
/* why not an object where you pass in different ids of different divs? when you 
click to scroll to something, set the body class to its name, then in your obj check body class 
to find out which id and image is supposed to go in the object? set an onclick handler to do that.*/
	
	var app = {
		webpage: "foo",
		setWebpage: function(div){
			app.webpage = div;
			//alert(app.webpage);
		},
		setClickListener: function(attribute){
			$("#foo").click(function(){
				 var bar = $("body").attr("class");
				//alert(bar);
				$("#webpage img").attr("src", "/images/comics/originals/9/medium/woman_power.jpg");		
			//$("#retina").css("background-image", "url(/images/woman_power.jpg)");
				$("#retina").css("background-image", "url(images/comics/originals/9/original/woman_power.jpg)");
			});
		}
		//changeWebPage: function(){
		//	$("#webpage img").attr("src", "/images/woman_power.jpg");		
		//}
	};
/*
	var streetPhotos = {
		audacity: "audacity",
		lightheartedness: "lightheartedness",
		wit: "wit", 
		socialCommentary: "socialCommentary",
		onlyInPublic: "onlyInPublic"
	};
*/	
	app.setWebpage("my_mama");
	app.setClickListener();
	
		var left	= 0,
		top		= 0,
		sizes	= { retina: { width:190, height:190 }, webpage:{ width:400, height:265 } },
		webpage	= $('#webpage'),
		offset	= { left: webpage.offset().left, top: webpage.offset().top },
		retina	= $('#retina');

	if(navigator.userAgent.indexOf('Chrome')!=-1)
	{
		/*	Applying a special chrome cursor,
			as it fails to render completely blank curosrs. */
			
		retina.addClass('chrome');
	}
	
	webpage.mousemove(function(e){

		left = (e.pageX-offset.left);
		top = (e.pageY-offset.top);

		if(retina.is(':not(:animated):hidden')){
			/* Fixes a bug where the retina div is not shown */
			webpage.trigger('mouseenter');
		}

		if(left<0 || top<0 || left > sizes.webpage.width || top > sizes.webpage.height)
		{
			/*	If we are out of the bondaries of the
				webpage screenshot, hide the retina div */

			if(!retina.is(':animated')){
				webpage.trigger('mouseleave');
			}
			return false;
		}

		/*	Moving the retina div with the mouse
			(and scrolling the background) */

		retina.css({
			left				: left - sizes.retina.width/2,
			top					: top - sizes.retina.height/2,
			backgroundPosition	: '-'+(1.6*left)+'px -'+(1.35*top)+'px'
		});
		
	}).mouseleave(function(){
		retina.stop(true,true).fadeOut('fast');
	}).mouseenter(function(){
		retina.stop(true,true).fadeIn('fast');
	});
});
