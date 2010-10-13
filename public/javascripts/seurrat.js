function setEverythingUp($){
	var element = document.getElementById('canvas');
	var canvas = element.getContext('2d');
	
	var paint = new Pusher('279b70cc663845e74c75', 'image_data');	
	paint.bind('begin_painting', function(data){
		var x = 0;
		data.colors.forEach(function(color) {
			seurrat.color(canvas, x, data.y, color, 5);
			x += 5;
		});
	});
}

// $(document).ready(function() { setEverythingUp(jQuery) });

var seurrat = {
	color: function(el,x,y,color,factor){
		el.fillStyle = color;
		el.fillRect(x,y,x+5,y+5);
	},	
	downloads: [],
	export_art: function(el){
		if (seurrat.export_png(el)){
			seurrat.downloads.push(el);
		}
	},
	export_png: function(el){
		return Canvas2Image.saveAsPNG(el);
	}
}