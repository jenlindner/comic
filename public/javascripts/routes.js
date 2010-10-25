Routes = {
	comicPanelPosterizePath: function(comic_id, id){
		return "/comics/" + comic_id + "/panels/" + id + "/posterize";
	},
	comicPanelZoomPath: function(comic_id, id){
		return "/comics/" + comic_id + "/panels/" + id + "/zoom";
	},
	comicPanelImagePath: function(comic_id, id){
		return "/comics/" + comic_id + "/panels/" + id + "/image";
	},
	comicPanelCharcoalPath: function(comic_id, id){
		return "/comics/" + comic_id + "/panels/" + id + "/charcoal";
	},
	comicPanelPath: function(comic_id, id){
		return "/comics/" + comic_id + "/panels/" + id;
	}
}