var seurrat = {
	color: function(el,x,y,color,factor){
		el.fillStyle = color;
		el.fillRect(x,y,factor,factor);
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