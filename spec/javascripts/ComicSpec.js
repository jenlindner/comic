describe("Comic", function() {
		
  it("should open the add a panel dialog when you click to add a panel", function(){
  	$("<div id='new_panel_dialog'>").appendTo($(document.body));
		$("#add_panel").click();

    expect($("#new_panel_dialog").css("display")).toEqual("block");
 	});

	it ("should open the edit panel dialog when you click edit panel", function(){
	});
	
	it ("should apply the posterize effect when you click posterize button", function(){
	});
	
	
	it ("should delete a panel dialog when you click its delete button", function(){
	});
	
	it ("should append text to a panel when you click add text", function(){
	});


});