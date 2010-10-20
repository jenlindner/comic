class Admin::PanelsController < ApplicationController
  
  def create
    @panel = Panel.new(params[:panel])
    puts @panel.save!
    if @panel.save
      flash[:original_id] = @panel.id
      redirect_to admin_comic_path(@panel.comic)
    else
      render :action => "new" 
    end
  end
  
  def pixelate
    @panel = Panel.find(params[:id])
    path = @panel.original_image.path(:medium)
    @photo_artist = PhotoArtist.new(path)
    @photo_artist.paint
    redirect_to admin_comic_path(@panel.comic)
  end
  
  def zoom
    @panel = Panel.find(params[:id])
    path = @panel.original_image.path(:medium)
    @photo_artist = PhotoArtist.new(path)
    @photo_artist.zoom(2)
    redirect_to admin_comic_path(@panel.comic)
  end

  def edit
  end

  def update
    blob, = Datafy::decode_data_uri(params[:my_panel]) 
    @panel = Panel.find(params[:id])
    @panel.modified_image_file_name = "panel_id_#{@panel.id}.png"
    image = Magick::Image.from_blob(blob) 
    image[0].write("public/images/comics/panel_id_#{@panel.id}.png")
    @panel.save
    redirect_to admin_comic_path(@panel.comic)
  end

  def destroy
    @panel = Panel.find(params[:id])
    @panel.destroy
    redirect_to admin_comic_path(@panel.comic)
  end

end