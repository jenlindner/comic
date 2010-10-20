// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults


function createPusher(){
	var paint = new Pusher('279b70cc663845e74c75', 'image_data');	
//	var paint = push;
	return paint;
}

function bindPaintToPusher(canvas, paint){
	canvas = canvas.getContext('2d');
	console.log("bind "+ canvas)
	paint.bind('begin_painting', function(data){
		var x = 0;
		data.colors.forEach(function(color) {
			seurrat.color(canvas, x, data.y, color, 5);
			x += 5;
		});
	});
}

$(document).ready( function(){ 
	var paint = createPusher();	
	$(".sortable").sortable({
		handle: "img.drag", 
		update: function(event, ui){
			var list = $(ui.item).parents(".sortable");
			console.log(list.sortable("serialize"));
			$.post('/comics/' + list.attr("id") + '/reorder',list.sortable("serialize"));
		}
	});
	
	$(".pixelate").click(function(){
		console.log($(this).parent("li").attr("data-panel-id"));
		bindPaintToPusher($(this).parents(".edit_panel_dialog").find(".canvas")[0], paint);
		
		var panel = $(this).parents(".edit_panel_dialog").find("img").first();
		var href = $(this).attr("data-remote-url");
		console.log($(this).attr("data-remote-url"));
	
		$.post(href);
	});

	$(".zoom").click(function(){
		bindPaintToPusher($(this).parents(".edit_panel_dialog").find(".canvas")[0], paint);
		var panel = $(this).parents(".edit_panel_dialog").find("img").first();
		var href = $(this).attr("data-remote-url");
	  $.post(href);
	});

	$(".export_art").click(function(){
		seurrat.export_art($("#canvas")[0]);
	});

	$(".clear_canvas").click(function(){
		var canvas = $(this).parents(".edit_panel_dialog").find(".canvas")[0];
		$(canvas).replaceWith("<canvas class='canvas' height='200' width='300'>nope</canvas>");
	});

	$("#art_form").live("submit", function(){
		var canvas = $(this).parents(".edit_panel_dialog").find(".canvas")[0];
		$(this).parents(".edit_panel_dialog").parents("li").find("img").first().attr("src", canvas.toDataURL());
		$(this).parents(".edit_panel_dialog").dialog("close");
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

	$(".edit_panel").live("click", function(){
		$(this).parent().find('.edit_panel_dialog').dialog( {minWidth: 660, width: 660, height: 320} );
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