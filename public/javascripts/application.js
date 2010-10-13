// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults


$(document).ready( function(){ 
	
	$("#add_panel").click(function(){
			$("#new_panel_dialog").dialog();
		});
	$("#edit_panel").click(	function(){
			$("#edit_panel_dialog").dialog( {width: 600, height: 350} );
	 });
	
});