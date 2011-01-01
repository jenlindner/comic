Routes = {
	comicPanelComicifyPath: function(comic_id, id){
		return "/comics/" + comic_id + "/panels/" + id + "/comicify";
	},
	comicPanelImagePath: function(comic_id, id){
		return "/comics/" + comic_id + "/panels/" + id + "/image";
	},
	modifiedImagePath: function(comic_id, id){
			return "/comics/" + comic_id + "/panels/" + id + "/modified_image";
	},
	comicPanelPath: function(comic_id, id){
		return "/comics/" + comic_id + "/panels/" + id;
	}
}