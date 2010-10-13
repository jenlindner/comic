$(document).ready( function(){ 
	
	$("#draw").click(function(){
		$.post("/panels/draw", {original_id : $("#img").attr("id")});
	});
	$("#zoom").click(function(){
			canvas = document.getElementById("canvas");
			$.post("/canvases/zoom", {original_id : $("#img").attr("id")});
	});
	$("#export_art").click(function(){
		canvas = document.getElementById("canvas");
		seurrat.export_art(canvas);
	});
	$("#clear_canvas").click(function(){
		// canvas = document.getElementById("canvas");
		$("#canvas").replaceWith("<canvas id='canvas' height='200' width='300'>nope</canvas>");
	});
	$("#art_form").submit(function(){
		$("#my_panel").val(canvas.toDataURL())
		
		$.post($(this).attr('action'), $(this).serialize(), null, "script");  
		return false; 
	});
	
});

