$(document).ready( function(){
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
		$("#edit_panel_dialog").bind("dialogclose", function(){
			$("#edit_panel_dialog canvas")[0].getContext('2d').clearRect(0,0,200,300);
		});
	}
	
	function applyEffect(route){
		var comic_id = $("#edit_panel_dialog").data("comic_id");
		var id = $("#edit_panel_dialog").data("id");

		bindPaintToPusher($("#edit_panel_dialog").find(".canvas")[0], paint);
		var panel = $("#edit_panel_dialog img");
		var href = route(comic_id, id);
	  $.post(href);
	}
		
	var $edit_panel = $("#edit_panel_dialog").dialog( {minWidth: 660, width: 660, height: 322, autoOpen: false} );
	
	var paint = createPusher();	
	var disable = $("#disable").attr("data-disable");
	
	$(".sortable").sortable({
		handle: "img.drag", 
		update: function(event, ui){
			var list = $(ui.item).parents(".sortable");
			$.post('/comics/' + list.attr("id") + '/reorder',list.sortable("serialize"));
		}
	});
	
	$(".pixelate").click(function(){
		applyEffect(Routes.comicPanelPixelatePath);
	});

	$(".zoom").click(function(){
		applyEffect(Routes.comicPanelZoomPath);
	});
	
	$(".delineate").click(function(){
		applyEffect(Routes.comicPanelDelineatePath);
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
			$("#panel_original_image").css("padding", ".3em");
			$("#panel_original_image").css("background-color", "#F93");
			return false;
		}
	});

	$("#art_form").live("submit", function(){
		var canvas = $(this).parents(".edit_panel_dialog").find(".canvas")[0];
		var el_panel_id = "#"+ $(this).parents(".edit_panel_dialog").attr("data-panel-element-id");
		$(el_panel_id).find("img").attr("height", 200);
		$(el_panel_id).find("img").attr("width", 300);
		$(el_panel_id).find("img").attr("src", canvas.toDataURL());
		$(this).parents(".edit_panel_dialog").dialog('close');
		$.ajax({
			type: "put",
			url:$(this).attr('action'),
			data: {
			"my_panel": canvas.toDataURL()
			}
		 });
			
		return false; 
	});
	
	$("#add_panel").click(function(){
		$("#new_panel_dialog").dialog();
	});
	
	$(".edit_panel").click(function(){
		var comic_id = $(this).parent().parent().attr("data-comic-id");
		var id = $(this).parent().parent().attr("data-panel-id");
		var title = $(this).parent().parent().attr("data-comic-title");
		var comic_and_panel_id = comic_id + "_" + id;
		var img_src = Routes.comicPanelImagePath(comic_id, id);
		$("#edit_panel_dialog img").attr("src", img_src);
		$("#edit_panel_dialog").data("comic_id", comic_id).data("id", id);
		$edit_panel.dialog("option", "title", title);
		$edit_panel.dialog("open");
	});

	$(".delete_panel").click(function(){
		var panel = $(this).closest("li");
		var href = $(this).attr("data-remote-url");
		var js_confirm = $(this).attr("data-confirm");
		
		if(js_confirm && confirm(js_confirm)) {
			$.ajax({
				type: "delete",
				url: href,
				success: function(){
					panel.remove();
				}
			});
		}
	});
});