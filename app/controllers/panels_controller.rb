class PanelsController < ApplicationController
  
  before_filter :find_panel, :except => :create
  
  def create
    @panel = Panel.new(params[:panel])
    puts @panel.temp_filename = "temp"
    puts @panel.save!
    if @panel.save
      flash[:original_id] = @panel.id
      redirect_to comic_path(@panel.comic)
    else
      render :action => "new" 
    end
  end
  
  def comicify
    path = @panel.original_image.path(:medium)
    @photo_artist = PhotoArtist.new(path)
    @photo_artist.comicify(@panel.id)
    @panel.temp_filename = "/images/comics/panel_id_#{@panel.id}.png"
    @panel.save
    @panel.update_attributes(params[:panel])
    redirect_to comic_path(@panel.comic)
  end
 
 def modified_image
   @panel.temp_filename
   render :text => "#{@panel.temp_filename}"
 end

  def update
    @panel.modified_image_file_name = "panel_id_#{@panel.id}.png"
    @panel.save
    @panel.update_attributes(params[:panel])

    redirect_to comic_path(@panel.comic)
  end

  def destroy
    @panel.destroy
    redirect_to comic_path(@panel.comic)
  end
  
  def image
    redirect_to @panel.original_image.url(:medium)
  end
  
  protected
    def find_panel
      @panel = Panel.find(params[:id])
    end
end







