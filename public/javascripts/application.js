$(document).ready( function(){
	
	function hideText(){
		$('.text').each(function(index, text){
			if(!$(text).text().match(/\w/)){
				$(text).hide();
			}
		});
	}
	function currentComicId(){
		var comic_id = $edit_panel.data("comic_id");
		return comic_id;
	}
	
	function currentPanelId(){
		var	panel_id = $edit_panel.data("id");
		return panel_id;
	}
	
	function addPanelLinkDisplay(){
		console.log($(".sortable").attr("data-panels-length"));
		var panels = $(".sortable").attr("data-panels-length");
		if (panels >= 6){
			$("#add_panel").hide();
		}
	}
	
	function imgEffectApplied(){
		$edit_panel.data("imgEffectApplied", true);
	}
	
	addPanelLinkDisplay();
	hideText();
	
	function getPanelTextPosition(panel){
		$(panel).find(".text").css("left", $(panel).attr("data-panel-text_x") + "px");
		$(panel).find(".text").css("top", $(panel).attr("data-panel-text_y") + "px");
	}
		
	function createPusher(){
		var paint = new Pusher('279b70cc663845e74c75', 'image_data');	
		return paint;
	}

	function bindPaintToPusher(canvas, paint){
		canvas = canvas.getContext('2d');
		paint.bind('begin_painting', function(data){
			var x = 0;
			var square_size = data.square_size
			data.colors.forEach(function(color) {
				seurrat.color(canvas, x, data.y, color, square_size);
				x += square_size;
			});
		});
	}
	
	function clearCanvas(){
		$("#canvas")[0].getContext('2d').clearRect(0,0,300,200);
		$("#canvas_text").text("")
										 .hide();
	}
	
	function applyEffect(route){
		imgEffectApplied();

		bindPaintToPusher($("#edit_panel_dialog #canvas")[0], paint);
		var panel = $("#edit_panel_dialog img");
		var href = route(currentComicId(), currentPanelId());
	  $.post(href);
	}
	
	var $add_text = $("#add_text_dialog").dialog({width: 300, height: 240, autoOpen: false, modal: true});
	var $add_panel = $("#new_panel_dialog").dialog({autoOpen: false,  modal: true});
	var $edit_panel = $("#edit_panel_dialog").dialog( {minWidth: 644, width: 644, height: 322, close: function(){ clearCanvas();}, autoOpen: false,  modal: true} );
	
	var paint = createPusher();	
	var disable = $("#disable").attr("data-disable");
	
	$(".sortable").sortable({
		handle: "img.drag", 
		update: function(event, ui){
			var list = $(ui.item).parents(".sortable");
			$.post('/comics/' + list.attr("id") + '/reorder',list.sortable("serialize"));
		}
	});
	
	$(".sortable").children().each(function(index,child){
		getPanelTextPosition(child);
	});
	
	$(".posterize").click(function(){
		applyEffect(Routes.comicPanelPosterizePath);
	});

	$(".colorize").click(function(){
		applyEffect(Routes.comicPanelColorizePath);
	});
	
	$(".charcoal").click(function(){
		applyEffect(Routes.comicPanelCharcoalPath);
	});	

	$(".export_art").click(function(){
		seurrat.export_art($("#edit_panel_dialog canvas"));
	});

	$(".clear_canvas").click(function(){
		clearCanvas();
	});

	$("#new_comic").submit(function(){
		if ($("#comic_title").val() == ""){
			$("#comic_title_error").show();
			return false;
		}
	});
	
	$("#upload_photo_form").submit(function(){
		if ($("#panel_original_image").val() == ""){
			$("#panel_original_image").css("padding", ".3em")
																.css("background-color", "#F93");
			return false;
		}
	});

	$(".save_panel").live("click", function(){
		
		var canvas = $("#canvas")[0];
		
		var el_panel_id = "#panels_"+ $edit_panel.data("panel_id");
		if ($edit_panel.data("imgEffectApplied")){
			$(el_panel_id).find("img").attr("height", 200)
																	.attr("width", 300)
																	.attr("src", canvas.toDataURL());											
			
			if ($("#canvas_text").text().match(/\w/)){	
				$(el_panel_id).find(".text").text($("#canvas_text").text())
																		.css("left", $("#canvas_text")[0].style.left)
																		.css("top", $("#canvas_text")[0].style.top)
																		.show();
			}
			$.ajax({
				type: "put",
				url:Routes.comicPanelPath(currentComicId(), currentPanelId()),
				data: {
					"my_panel": canvas.toDataURL(),
					"panel[text_x]" : $("#canvas_text")[0].style.left, 
					"panel[text_y]" : $("#canvas_text")[0].style.top,
					"panel[text]" : $("#panel_text").val()
				}
			});
			$("#panel_text").val("");
			$edit_panel.dialog('close');
		}	else {
			alert("You can't save a panel without a transformed image.");
		}
		
	});
	
	$(".add_text").click(function(){
		$add_text.dialog("open");
	});
	
	$("#add_text_form").submit(function(){
		if ($("#panel_text").val().length == 0){
			alert("You must enter text for your panel.");
		}else if ($("#panel_text").val().length > 50){
			alert("A panel's text cannot exceed 50 characters.");
		}else{
				
			var panel_id = "#panels_" + currentPanelId();
		
			$(panel_id).find(".text").text($("#panel_text").val());
			$("#canvas_text").draggable({ containment: 'parent'})
											 .text($("#panel_text").val())	
											 .show()
			$add_text.dialog("close");
		}
			return false;
	});
	
	
	$("#add_panel").click(function(){
		$add_panel.dialog("open");
	});
	
	$(".edit_panel").click(function(){
		$edit_panel.data("imgEffectApplied", false);
		
		var comic_id = $(this).parent().parent().attr("data-comic-id");
		var id = $(this).parent().parent().attr("data-panel-id");
		
		var title = "Add Effects and Text to Your Panel"; //+ $(this).parent().parent().attr("data-comic-title");
		var comic_and_panel_id = comic_id + "_" + id;
		var img_src = Routes.comicPanelImagePath(comic_id, id);
		$("#edit_panel_dialog img").attr("src", img_src);
		//when we open the edit dialog we set the parent lis id on the data 
		$edit_panel.data("comic_id", comic_id).data("id", id);
		$edit_panel.data("panel_id", id);
		$edit_panel.dialog("option", "title", title);
		$edit_panel.dialog("open");
	});

	$(".delete_panel").click(function(){
		var panel = $(this).closest("li");
		console.log($(panel).parent().children().length);
		var href = $(this).attr("data-remote-url");
		var title = $(this).attr("data-comic-title");
		var js_confirm = $(this).attr("data-confirm");
		
		if(js_confirm && confirm(js_confirm)) {
			$.ajax({
				type: "delete",
				url: href,
				success: function(){
					if ($(panel).parent().children().length < 7){
							$("#add_panel").show();
					}
					panel.remove();
				}
			});
		}
	});
});