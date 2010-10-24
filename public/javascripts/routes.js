Routes = {
	comicPanelPixelatePath: function(comic_id, id){
		return "/comics/"+ comic_id + "/panels/" + id + "/pixelate";
	},
	comicPanelZoomPath: function(comic_id, id){
		return "/comics/"+ comic_id + "/panels/" + id + "/zoom";
	},
	comicPanelImagePath: function(comic_id, id){
		return "/comics/"+ comic_id + "/panels/" + id + "/image";
	},
	comicPanelDelineatePath: function(comic_id, id){
		return "/comics/"+ comic_id + "/panels/" + id + "/delineate";
	},
	comicPanelPath: function(comic_id, id){
		return "/comics/"+ comic_id + "/panels/" + id;
	}
}