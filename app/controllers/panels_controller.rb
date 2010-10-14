class PanelsController < ApplicationController
  
  def create
    @panel = Panel.new(params[:panel])
    if @panel.save
      flash[:original_id] = @panel.id
      redirect_to @panel.comic
    else
      render :action => "new" 
    end
  end
  
  def draw
    @panel = Panel.find(params[:panel_id])
    path = @panel.original_image.path(:medium)
    @photo_artist = PhotoArtist.new(path)
    @photo_artist.paint
    redirect_to @panel.comic
  end
  
  def zoom
    @panel = Panel.find(params[:panel_id])
    path = @panel.original_image.path(:medium)
    @photo_artist = PhotoArtist.new(path)
    @photo_artist.zoom(2)
    redirect_to @panel.comic
  end

  def edit
  end

  def update
    blob, = Datafy::decode_data_uri(params[:my_panel]) 
    @panel = Panel.find(params[:id])
    @panel.comic_id = params[:panel][:comic_id] 
    @panel.modified_image_file_name = "panel_id_#{@panel.id}.png"
    image = Magick::Image.from_blob(blob) 
    image[0].write("public/images/comics/panel_id_#{@panel.id}.png")
    @panel.save
  end

  def destroy
    @panel = Panel.find(params[:id])
    @panel.destroy
  end

end