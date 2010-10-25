class ComicsController < ApplicationController
  
  def index
    @comics = Comic.all
    @comic_cover_set = @comics.select {|comic| comic.panels.size >= 4 }
    render :layout => "comics_index"
  end
  
  def create
    @comic = Comic.new
    @comic.title = params[:comic][:title]
    if @comic.save
      redirect_to @comic
    else
      redirect_to :action => :index
    end
  end
  
  def show
    @comic = Comic.find(params[:id])
    if @comic.panels
      @panels = @comic.panels.all(:order => :sort_order)  
    end
  end
  
  def edit
    @comic = Comic.find(params[:id])
  end
  
  def reorder
    params[:panels].each_with_index do |item, index|
      Panel.find(item).update_attributes(:sort_order => index)
    end
    render :text => ""    
  end  
  
end