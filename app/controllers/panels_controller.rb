class PanelsController < ApplicationController
  
  def create
    @panel = Panel.new(params[:panel])
    # @panel.comic_id = params[:panel][:comic_id]
    if @panel.save
      flash[:original_id] = @panel.id
      redirect_to @panel.comic
    else
       render :action => "new" 
    end
  end
  
  def draw
    @original = Original.find(params[:original_id])
    path = @original.image.path(:medium)
    @photo_artist = PhotoArtist.new(path)
    @photo_artist.paint
  end

  def update
    @panel = Panel.find(params[:id])
    if @panel.update_attributes(params[:panel])
      # ajaxify
    else
    
    end
  end

  def destroy
    @panel = Panel.find(params[:id])
    @panel.destroy
  end

end