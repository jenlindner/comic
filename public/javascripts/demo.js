$(document).ready(function(){
	var imagesCollection = new Array(
          {name : "complexity", id : 17, filename : "man_eating_man.jpg", text: "What is it about street art that's so exciting?"},
                {name : "audacity", id : 16, filename: "woman_power.jpg", text: "Is it the audacity?"},
                {name : "scale", id :20, filename : "spaceman_kreutzberg36.jpg", text: "The scale?"},
                {name : "context", id : 19, filename : "woman_and_tree1.jpg", text: "The way people become part of it?"},
                {name : "social_commentary", id : 18, filename : "wheres_my_bailout.jpg", text: "Maybe it's the social commentary."},
                {name : "recognition", id : 24, filename : "little_girl_is_hip.jpg", text: "Or a feeling of recognition."},
                {name : "only_with_pictures", id : 15, filename : "crying_man.jpg", text: "Or is it because only an outlaw picture is allowed to speak an outlaw truth?"}
                );

	var app = {
		currentImage: "",
		setCurrentImage: function(newImage){
			app.currentImage = newImage;
		},
		getCurrentImage: function(){
			return app.currentImage;
		},
		showNavigation: function(){
			if (app.getCurrentImage() == imagesCollection[imagesCollection.length - 1].name){
				$("#right").hide();
			}else{
				$("#right").show();	
			}
			if (app.getCurrentImage() == imagesCollection[0].name){
				$("#left").hide();
			} else{
				$("#left").show();
			}
		},
		preloadImages: function(images){
	    		$(images).each(function(){
				var source = "images/comics/originals/" +
				this.id + "/original/" + 
	        		this.filename;
				$('<img/>')[0].src = source;
				//append to DOM too
	    		});
		},
		initPage: function(){
			app.currentImage = "complexity";
			app.setNavigationListeners();
			app.showNavigation();
			app.preloadImages(imagesCollection);
			loupe.applyChromeCursor();
		},
		findNextImage: function(direction){
			var location = 0;
			for (i = 0; i < imagesCollection.length; i++){
				if (imagesCollection[i].name == app.getCurrentImage()){
					if (direction == "right"){
						location = i + 1;
					} else{
						location = i - 1;
					}
				}
			}
			return imagesCollection[location].name;
		},
		changeImage: function(imgAdjective){
			var imgID = "#" + imgAdjective;
			for (i in imagesCollection){
				if (imagesCollection[i].name === imgAdjective){
					$("#artWindow img").attr("src", "images/comics/originals/" + 
					imagesCollection[i].id + "/medium/" + 
					imagesCollection[i].filename);

					app.setCurrentImage(imgAdjective);		
							
					$("#retina").css("backgroundImage","url(images/comics/originals/" + 
					imagesCollection[i].id + "/original/" + 
					imagesCollection[i].filename +")");
					
					$("#commentary").text(imagesCollection[i].text);		
				}
			}
		},
		setNavigationListeners: function(attribute){
			$("#right").click(function(){
					app.changeImage(app.findNextImage("right"));
					app.showNavigation();
					
			});
			$("#left").click(function(){
					app.changeImage(app.findNextImage("left"));
					app.showNavigation();
			});
		}

	};
	
	
		var loupe = {
			left : 0,
			top	 : 0,
			sizes	: { retina: { width:190, height:190 }, webpage:{ width:400, height:266 } },
			webpage	: $('#artWindow'),
			retina	: $('#retina'),
			applyChromeCursor: function(){
				if(navigator.userAgent.indexOf('Chrome')!=-1)
				{
					/*	Applying a special chrome cursor,
						as it fails to render completely blank cursors. */

					loupe.retina.addClass('chrome');
				}
			}
	  };
	
		loupe.offset = { left: loupe.webpage.offset().left, top: loupe.webpage.offset().top };
	

	
	loupe.webpage.mousemove(function(e){
		left = (e.pageX-loupe.offset.left);
		top = (e.pageY-loupe.offset.top);

		if(loupe.retina.is(':not(:animated):hidden')){
			/* Fixes a bug where the retina div is not shown */
			loupe.webpage.trigger('mouseenter');
		}

		if(left<0 || top<0 || left > loupe.sizes.webpage.width || top > loupe.sizes.webpage.height){
			/*	If we are out of the bondaries of the
				webpage screenshot, hide the retina div */

			if(!loupe.retina.is(':animated')){
				loupe.webpage.trigger('mouseleave');
			}
			return false;
		}

		/*	Moving the retina div with the mouse
			(and scrolling the background) */

		loupe.retina.css({
			left				: left - loupe.sizes.retina.width/2,
			top					: top - loupe.sizes.retina.height/2,
			backgroundPosition	: '-'+(1.6*left)+'px -'+(1.35*top)+'px'
		});
		
	}).mouseleave(function(){
		loupe.retina.stop(true,true).fadeOut('fast');
	}).mouseenter(function(){
		loupe.retina.stop(true,true).fadeIn('fast');
	});
		app.initPage();
});

