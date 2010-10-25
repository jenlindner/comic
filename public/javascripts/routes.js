Routes = {
	comicPanelPosterizePath: function(comic_id, id){
		return "/comics/" + comic_id + "/panels/" + id + "/posterize";
	},
	comicPanelColorizePath: function(comic_id, id){
		return "/comics/" + comic_id + "/panels/" + id + "/colorize";
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