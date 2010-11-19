$(document).ready( function(){
	var comicMaker = {
		hideText: function(){
			$('.text').each(function(index, text){
			if(!$(text).text().match(/\w/)){
				$(text).hide();
			}
			});			
		},
		
		currentComicId: function(){
			var comic_id = $edit_panel.data("comic_id");
			return comic_id;
		},
	
		currentPanelId: function(){
			var panel_id = $edit_panel.data("id");
			return panel_id;
		}
	};	
		
	
	function addPanelLinkDisplay(){
		var panels = $(".sortable").attr("data-panels-length");
		if ((panels == undefined) || (panels >= 6)){
			$("#add_panel").hide();
		}
	}
	
	function imgEffectApplied(){
		$edit_panel.data("imgEffectApplied", true);
	}
	
	function setPanelHeight(){
		if ($(".sortable").length == 0){
			$("li.panel").css("height", 200);
		}
	}
	
	setPanelHeight();
	addPanelLinkDisplay();
	comicMaker.hideText();

	var $add_text = $("#add_text_dialog").dialog({width: 300, height: 240, autoOpen: false, modal: true});
	var $add_panel = $("#new_panel_dialog").dialog({autoOpen: false,  modal: true});
	var $edit_panel = $("#edit_panel_dialog").dialog( {width: 660, height: 322, close: function(){ clearCanvas();}, autoOpen: false,  modal: true} );
	
	function getPanelTextPosition(panel){
		$(panel).find(".text").css("left", $(panel).attr("data-panel-text_x") + "px");
		$(panel).find(".text").css("top", $(panel).attr("data-panel-text_y") + "px");
	}
	
	function clearCanvas(){
		$("#canvas").empty();
		$("#canvas_text").text("")
										 .hide();
	}
	
	function applyEffect(route, route2){
		imgEffectApplied();
		var panel = $("#edit_panel_dialog img");
		var href = route(comicMaker.currentComicId(), comicMaker.currentPanelId());
		$.ajax({
			type: "post",
			url: href,
			dataType: "text",
			success: function(data){
				var panel_id = "#panels_" + comicMaker.currentPanelId();
				var href2 = route2(comicMaker.currentComicId(), comicMaker.currentPanelId());
				$.get(href2, function(stringData){
							console.log(stringData);
							var src = stringData;
						  $("#canvas").append("<img src='" + src + "' border=0 />");	
						});
			}
		});
	}
	
	$(".sortable").sortable({
		handle: "img.drag", 
		update: function(event, ui){
			var list = $(ui.item).parents(".sortable");
			$.post('/comics/' + list.attr("id") + '/reorder',list.sortable("serialize"));
		}
	});
	
	$(".inline_list").children().each(function(index,child){
		getPanelTextPosition(child);
	});
	
	$(".comicify").click(function(){
		applyEffect(Routes.comicPanelComicifyPath, Routes.modifiedImagePath);
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
	
	$(".add_text").click(function(){
		$add_text.dialog("open");
	});
	
	$("#add_text_form").submit(function(){
		if ($("#panel_text").val().length == 0){
			alert("You must enter text for your panel.");
		}else if ($("#panel_text").val().length > 50){
			alert("A panel's text cannot exceed 50 characters.");
		}else{
			var panel_id = "#panels_" + comicMaker.currentPanelId();
	
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
		var title = "Add Effects and Text to Your Panel"; 
		var img_src = Routes.comicPanelImagePath(comic_id, id);
		$("#edit_panel_dialog img").attr("src", img_src);
		$edit_panel.data("comic_id", comic_id).data("id", id);
		$edit_panel.data("panel_id", id);
		$edit_panel.dialog("option", "title", title);
		$edit_panel.dialog("open");
	});

	$(".save_panel").live("click", function(){
		var canvas = $("#canvas")[0];
		var el_panel_id = "#panels_"+ $edit_panel.data("panel_id");
		if ($edit_panel.data("imgEffectApplied")){
			$(el_panel_id).find("img").attr("height", 200)
																	.attr("width", 300)
																	.attr("src", $("#canvas img").attr("src"));			
			if ($("#canvas_text").text().match(/\w/)){	
				$(el_panel_id).find(".text").text($("#canvas_text").text())
																		.css("left", $("#canvas_text")[0].style.left)
																		.css("top", $("#canvas_text")[0].style.top)
																		.show();
			}
			$.ajax({
				type: "put",
				url:Routes.comicPanelPath(comicMaker.currentComicId(), comicMaker.currentPanelId()),
				data: {
					//okay i have a temp filename image -- i should just save that to modified image name
					//if it's there, or use original if not. which reminds me, i need to allow people to just add
					//text without having to modify an image.
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

	$(".delete_panel").click(function(){
		var panel = $(this).closest("li");
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
