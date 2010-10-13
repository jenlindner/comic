class ComicsController < ApplicationController
  
  def index
    @comics = Comic.all
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
    @panel = @comic.panels.last
  end
  
  def edit
    @comic = Comic.find(params[:id])
  end
  
end