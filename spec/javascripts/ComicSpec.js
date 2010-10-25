describe("Comic", function() {
	
  it("should open the add a panel dialog when you click to add a panel", function() {

  $("<div id='new_panel_dialog'>").appendTo($(document.body));
	$("#add_panel").click();

    expect($("#new_panel_dialog").css("display")).toEqual("block");
		// $("<div id='new_panel_dialog'>").remove($(document.body)); --> would be nice to do
		// setup and teardown of all dom elements for each test in a before block. no leftover test data.
  });

	it ("should open the edit panel dialog when you click edit panel", function(){
		$("<div id='edit_panel_dialog dialog'>").appendTo($(document.body));	
			$(".edit_panel").click();
			$(".edit_panel").parents.find();
			expect($(".new_panel_dialog").css("display")).toEqual("block");
	});
	
	
	it ("should delete a panel dialog when you click its delete button", function(){
		$("<div id='edit_panel_dialog dialog'>").appendTo($(document.body));	
	
			expect($(".new_panel_dialog").toEqual("undefined"));
	});
	
	it ("should append text to a panel when you click add text", function(){
		$("<div id='edit_panel_dialog dialog'>").appendTo($(document.body));	
	
			expect($(".new_panel_dialog").toEqual("undefined"));
	});


});