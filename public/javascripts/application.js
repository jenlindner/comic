// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
function setEverythingUp($){
	var paint = new Pusher('279b70cc663845e74c75', 'image_data');	
	console.log($("#canvas"));
	var canvas = $("#canvas")[0].getContext('2d');
	paint.bind('begin_painting', function(data){
		var x = 0;
		data.colors.forEach(function(color) {
			seurrat.color(canvas, x, data.y, color, 5);
			x += 5;
		});
	});
}

$(document).ready( function(){ 
	setEverythingUp(jQuery);

	$("#draw").click(function(){
		$.post("/panels/draw", {panel_id : $("img").attr("id")});
	});

	$("#zoom").click(function(){
		$.post("/panels/zoom", {panel_id : $("img").attr("id")});
	});

	$("#export_art").click(function(){
		canvas = document.getElementById("canvas");
		seurrat.export_art(canvas);
	});

	$("#clear_canvas").click(function(){
		$("#canvas").replaceWith("<canvas id='canvas' height='200' width='300'>nope</canvas>");
	});

	$("#art_form").submit(function(){
		$("#my_panel").val(canvas.toDataURL());
		console.log($(this)[0])
		$.ajax({
		   type: "put",
		   url:$(this).attr('action'),
		   data: $(this)[0].serialize(),
		   success: function(msg){
		     alert( "Data Saved: " + msg );
		   }
		 }); 
		return false; 
	});
	
	$("#add_panel").click(function(){
			$("#new_panel_dialog").dialog();
		});
	$("#edit_panel").click(	function(){
			$("#edit_panel_dialog").dialog( {minWidth: 660, width: 660, height: 320} );
	 });
	
});